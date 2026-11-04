const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const ROOT = path.resolve(__dirname, '..');
const output = process.env.SITE_TEST_OUTPUT || path.join(ROOT, 'test-results');
fs.mkdirSync(output, { recursive: true });
const base = 'http://127.0.0.1:8976';
const server = spawn('python3', ['-m', 'http.server', '8976', '--bind', '127.0.0.1', '--directory', path.join(ROOT, 'site')], { stdio: 'ignore' });
let browser;
const failures = [];
function check(ok, message) { console.log(`${ok ? '✓' : '✗'} ${message}`); if (!ok) failures.push(message); }
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
(async () => {
 try {
  for (let i=0; i<60; i++) { try { if ((await fetch(base)).ok) break; } catch {} await delay(100); }
  browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const errors=[]; page.on('pageerror', e => errors.push(e.message));
  await page.goto(base); await page.waitForSelector('#pricing');
  const axe = async label => {
   await page.addScriptTag({path: require.resolve('axe-core/axe.min.js')});
   const violations = await page.evaluate(async () => (await window.axe.run(document, {runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}})).violations.filter(v=>['serious','critical'].includes(v.impact)).map(v=>`${v.id}: ${v.nodes[0].target}`));
   check(!violations.length, `accessibility: ${label}${violations.length ? '\n'+violations.join('\n') : ''}`);
  };
  check(await page.locator('.price-card').count()===1, 'one personal product with all features');
  check(await page.locator('.course-card').count()===8, 'eight real learning projects described');
  for(const img of await page.locator('img').all())await img.scrollIntoViewIfNeeded();
  await page.waitForFunction(()=>[...document.images].every(img=>img.complete&&img.naturalWidth>0));
  await page.evaluate(()=>window.scrollTo(0,0));
  check(true, 'product screenshots load');
  check(!(await page.locator('input[type=password]').count()), 'no account or secret collection');
  await axe('desktop');
  await page.screenshot({path:path.join(output,'site-hero.png')});
  await page.screenshot({path:path.join(output,'site-desktop.png'), fullPage:true});
  for(const width of [1024,768]) {
    await page.setViewportSize({width,height:900});
    check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no page overflow at '+width+'px');
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.click('[data-product="personal"]');
  await page.waitForSelector('dialog[open]');
  check((await page.textContent('#order-price')).replace(/\s/g,'')==='R2,995', 'personal: correct once-off price');
  check((await page.textContent('.order-summary')).includes('1 person · 1 device'), 'personal: one device, one person');
  check(await page.isDisabled('#checkout-button'), 'unconfigured checkout safely unavailable');
  check((await page.textContent('#checkout-status')).includes('aren’t open'), 'missing checkout explained');
  await axe('purchase details');
  await page.keyboard.press('Escape');
  await page.setViewportSize({width:390,height:844});
  await page.goto(base);
  await page.click('.menu-toggle');
  await page.click('#nav-links a[href="#pricing"]');
  check(await page.getAttribute('.menu-toggle','aria-expanded')==='false', 'mobile navigation closes after selection');
  check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth), 'no page overflow on mobile');
  await page.screenshot({path:path.join(output,'site-mobile.png'),fullPage:true});
  await axe('mobile');
  for (const name of ['privacy.html','terms.html']) { await page.goto(base+'/'+name); await axe(name); check(await page.locator('h1').count()===1, `${name} loads`); }
  // Simulate public configuration and intercept the handoff; never contact or pay a real merchant.
  let payment = 'javascript:alert(1)';
  await page.route('**/commerce-config.js', route=>route.fulfill({contentType:'text/javascript',body:`window.DATALEEK_COMMERCE={salesEmail:"sales@example.test",checkoutUrl:${JSON.stringify(payment)}};`}));
  await page.route('https://www.payfast.co.za/**', route=>route.fulfill({contentType:'text/html',body:'<h1>Intercepted test handoff</h1>'}));
  await page.goto(base); await page.click('[data-product="personal"]'); check(await page.isDisabled('#checkout-button'), 'rejects javascript payment URL'); await page.keyboard.press('Escape');
  payment = 'https://evil.example/checkout';
  await page.reload(); await page.click('[data-product="personal"]'); check(await page.isDisabled('#checkout-button'), 'rejects unrelated payment hosts'); await page.keyboard.press('Escape');
  payment = 'https://www.payfast.co.za/eng/process?fixture=personal';
  await page.reload(); await page.click('[data-product="personal"]');
  check(await page.isEnabled('#checkout-button'), 'valid hosted payment link enables handoff');
  await page.click('#checkout-button'); check(page.url().startsWith(base), 'terms acceptance required before checkout');
  await page.check('#agree'); await page.click('#checkout-button'); await page.waitForURL('https://www.payfast.co.za/**');
  check((await page.textContent('h1')).includes('Intercepted'), 'PayFast handoff works without sending a live payment');
  check(!errors.length,'no browser errors');
 } catch(e) { console.error(e); failures.push(e.message); }
 finally { if(browser) await browser.close(); server.kill(); }
 if(failures.length) { console.error(`${failures.length} website checks failed.`); process.exitCode=1; }
 else console.log('All website checks passed.');
})();
