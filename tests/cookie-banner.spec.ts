import { test, expect, devices } from '@playwright/test';

const mobile = devices['Pixel 7'];
test.use({ ...mobile });

test.describe('Cookie Banner', () => {
  test('shows banner on first visit', async ({ page }) => {
    await page.goto('http://localhost:4321/');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => localStorage.removeItem('cookie-consent'));
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    const banner = page.locator('#cookie-banner');
    await expect(banner).toHaveClass(/translate-y-0/);
    await expect(banner).toBeVisible();

    const privacyLink = banner.locator('a[href="/datenschutz"]');
    await expect(privacyLink).toBeVisible();

    await page.screenshot({ path: '/tmp/screenshots/cookie-banner.png' });
  });

  test('hides banner after accepting and stays hidden on reload', async ({ page }) => {
    await page.goto('http://localhost:4321/');
    await page.evaluate(() => localStorage.removeItem('cookie-consent'));
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    const banner = page.locator('#cookie-banner');
    await expect(banner).toHaveClass(/translate-y-0/);

    await page.locator('#cookie-accept').click();
    await page.waitForTimeout(600);
    await expect(banner).toHaveClass(/translate-y-full/);

    // Reload — banner should stay hidden (localStorage persists)
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    await expect(banner).toHaveClass(/translate-y-full/);
  });

  test('hides banner after choosing necessary only', async ({ page }) => {
    await page.goto('http://localhost:4321/');
    await page.evaluate(() => localStorage.removeItem('cookie-consent'));
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    const banner = page.locator('#cookie-banner');
    await expect(banner).toHaveClass(/translate-y-0/);

    await page.locator('#cookie-necessary').click();
    await page.waitForTimeout(600);
    await expect(banner).toHaveClass(/translate-y-full/);
  });

  test('privacy policy link navigates to datenschutz page', async ({ page }) => {
    await page.goto('http://localhost:4321/');
    await page.evaluate(() => localStorage.removeItem('cookie-consent'));
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    const link = page.locator('#cookie-banner a[href="/datenschutz"]');
    await link.click();
    await page.waitForURL('**/datenschutz');

    expect(page.url()).toContain('/datenschutz');
  });
});
