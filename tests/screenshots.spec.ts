import { test, devices } from '@playwright/test';

const mobile = devices['Pixel 7'];
const pages = [
  { name: 'home', path: '/' },
  { name: 'home-scrolled', path: '/', scroll: 800 },
  { name: 'home-menu-open', path: '/', openMenu: true },
  { name: 'leistungen', path: '/leistungen' },
  { name: 'business-portraits', path: '/business-portraits' },
  { name: 'preise', path: '/preise' },
  { name: 'preise-scrolled', path: '/preise', scroll: 1200 },
  { name: 'galerie', path: '/galerie' },
  { name: 'ueber-mich', path: '/ueber-mich' },
  { name: 'kontakt', path: '/kontakt' },
  { name: 'faq', path: '/faq' },
  { name: 'impressum', path: '/impressum' },
];

test.use({ ...mobile });

for (const pg of pages) {
  test(`screenshot: ${pg.name}`, async ({ page }) => {
    await page.goto(`http://localhost:4321${pg.path}`);
    await page.waitForLoadState('networkidle');

    if (pg.scroll) {
      await page.evaluate((y) => window.scrollBy(0, y), pg.scroll);
      await page.waitForTimeout(500);
    }

    if (pg.openMenu) {
      await page.locator('#mobile-menu-btn').click();
      await page.waitForTimeout(600);
    }

    await page.screenshot({ path: `/tmp/screenshots/${pg.name}.png`, fullPage: !pg.scroll && !pg.openMenu });
  });
}
