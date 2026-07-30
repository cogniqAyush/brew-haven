import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
const imgResults = [];
page.on('response', (res) => {
  const url = res.url();
  if (url.includes('unsplash') && (url.includes('1544787219') || url.includes('1594631252845'))) {
    imgResults.push({ url, status: res.status() });
  }
});
await page.goto('http://localhost:8080/?v=' + Date.now());
const scriptSrc = await page.$eval('script[src*="script.js"]', (s) => s.src);
await page.click('.menu-tab[data-category="tea"]');
await page.waitForTimeout(2000);
const t6 = await page.$eval('.menu-card:last-child .menu-card-img', (img) => ({
  alt: img.alt,
  src: img.currentSrc || img.src,
  complete: img.complete,
  naturalWidth: img.naturalWidth,
  naturalHeight: img.naturalHeight,
}));
console.log('script tag:', scriptSrc);
console.log('t6 img:', JSON.stringify(t6, null, 2));
console.log('network:', JSON.stringify(imgResults, null, 2));
await browser.close();
