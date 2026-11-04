# Static sales site and once-off PayFast checkout

Version 1.2 is one product: **DataLeek Personal**, R2,995 excluding VAT, for one person on one activated device. It includes Learn, 24 practice checks and every analytical Work feature. The static `site/` is served by the existing GitHub Pages workflow. There is no application account, payment server, hosted analytical storage or activation service.

## Add checkout later

The seller selected PayFast and will supply the public link later. Checkout stays disabled while configuration is null. When ready, set only the public values in `site/commerce-config.js`:

```js
window.DATALEEK_COMMERCE = Object.freeze({
  salesEmail: "YOUR_REAL_PUBLIC_SALES_EMAIL",
  checkoutUrl: "YOUR_PUBLIC_PAYFAST_HTTPS_LINK"
});
```

These are illustrative placeholders, not working configuration. Never put a merchant password, passphrase, secret key, card information or customer record in the website.

Create **one fixed-amount, once-off hosted payment link**. Base price is R2,995 excluding VAT. Perpetual use covers the purchased major version; maintenance is included for 12 months and product support for 90 days, up to two hours. Future major upgrades are optional at 35% of the equivalent new licence. There are no seat bundles, feature tiers, recurring charges or automatic renewals. Confirm applicable tax and the actual charge in PayFast before enabling the link; static JavaScript cannot safely create signed dynamic prices.

Only HTTPS on the explicit PayFast host allowlist is accepted. Sandbox and unrelated hosts are rejected. Verify any new official hostname before changing the allowlist in `site.js`. Terms must be accepted before checkout. No test contacts a merchant or performs a payment.

Before accepting payment, publish the matching 1.2 installers with the seller's public licence verifier and test activation on packaged supported platforms. Add the real seller contact and remaining commercial identification/tax details from the existing launch checklist. An empty public verifier cannot activate a paid copy. Source changes do not publish installers or the site.

## Manual fulfilment and activation

1. The purchaser exports `activation-request.json` from the installed app. It contains a one-way device code, platform and major version; the app does not send it automatically.
2. They purchase through PayFast and send the request with their order reference through the private receipt contact.
3. Verify settlement in the merchant dashboard. Do not accept a return URL or screenshot as proof of payment.
4. On the private seller workstation, use the source repository's `tools/license_admin.py issue --request ...` with the offline signing key to issue a signed licence for that device. See the source repository's `docs/COMMERCIAL_RELEASE.md` for exact commands and key handling.
5. Deliver the signed file using the order contact. The purchaser imports it and uses Learn and Work offline. Keep only necessary order, accounting and fulfilment records; do not request their analytical data.

No webhook, delivery database, mail server or licence API is required. Normal merchant and order-contact communication is still necessary. The website promises manual delivery after verification, not instant automated activation.

An app reinstall on the same OS/platform identity can reuse the licence. OS reinstallations, relevant hardware changes or a new computer may require a replacement after receipt review and a new activation request. The purchaser must stop using the old installation. Offline activation cannot remotely revoke it, distinguish every cloned OS identity or prevent executable modification. Say **device-bound copy deterrence**, never uncrackable DRM. Copied data remains readable/exportable without activation; new work and practice require it. There is no unrestricted executable trial.

## Validate and preview

```sh
python3 -m http.server 8976 --bind 127.0.0.1 --directory site
npm install --no-save --no-package-lock playwright@1.63.0 axe-core@4.10.2
npx playwright install --with-deps chromium
node tests/site-smoke.cjs
```

For installed system Chromium, set `CHROMIUM_PATH=/usr/bin/chromium`. Screenshots go to ignored `test-results/` or `SITE_TEST_OUTPUT`. Checks cover the single product/price, eight project cards, unavailable checkout, terms consent, unsafe-URL rejection, desktop/mobile layouts, accessibility, policy pages and an intercepted PayFast handoff.

The Learn and Work screenshots are captured from the real application using temporary signed test fixtures, not mockups. Deployment and live merchant settlement remain separate from local validation.
