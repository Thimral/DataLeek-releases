(() => {
  "use strict";
  const config = window.DATALEEK_COMMERCE || {};
  const dialog = document.querySelector("#purchase-dialog");
  function checkoutURL(value) {
    try {
      const url = new URL(value);
      if (url.protocol !== "https:" || url.username || url.password || url.port || !["www.payfast.co.za", "payfast.co.za", "payment.payfast.io"].includes(url.hostname)) return null;
      // A sandbox endpoint is never a production payment route.
      if (/sandbox/i.test(url.href)) return null;
      return url.href;
    } catch { return null; }
  }
  const sales = typeof config.salesEmail === "string" && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(config.salesEmail) ? config.salesEmail : null;
  if (sales) { const a = document.querySelector("#sales-link"); a.href = "mailto:" + encodeURIComponent(sales); a.hidden = false; }
  document.querySelectorAll(".purchase").forEach(button => button.addEventListener("click", () => {
    document.querySelector("#agree").checked = false;
    const ready = checkoutURL(config.checkoutUrl);
    document.querySelector("#checkout-button").disabled = !ready;
    const status = document.querySelector("#checkout-status");
    status.replaceChildren();
    if (!ready) {
      status.append(document.createTextNode("Online purchases aren’t open yet. Please check back shortly."));
      if (sales) { const a = document.createElement("a"); a.href = "mailto:" + encodeURIComponent(sales) + "?subject=" + encodeURIComponent("DataLeek Personal licence enquiry"); a.textContent = " Contact sales"; status.append(a); }
    }
    dialog.showModal();
  }));
  document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  document.querySelector("#purchase-form").addEventListener("submit", event => {
    event.preventDefault();
    if (!document.querySelector("#agree").checked) return;
    const url = checkoutURL(config.checkoutUrl);
    if (url) window.location.assign(url);
  });
  const menu = document.querySelector(".menu-toggle");
  menu.addEventListener("click", () => {
    const expanded = menu.getAttribute("aria-expanded") === "true";
    menu.setAttribute("aria-expanded", String(!expanded));
    document.querySelector("#nav-links").classList.toggle("open", !expanded);
  });
  document.querySelectorAll("#nav-links a").forEach(a => a.addEventListener("click", () => { menu.setAttribute("aria-expanded", "false"); document.querySelector("#nav-links").classList.remove("open"); }));
})();
