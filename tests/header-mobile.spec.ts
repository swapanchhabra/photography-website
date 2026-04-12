import { test, expect, type Locator } from '@playwright/test';

/** Parse any CSS color to RGB(A) via a 1x1 canvas (handles oklab, etc.) */
function parseColor(locator: Locator, property: 'color' | 'backgroundColor') {
  return locator.evaluate((el, prop) => {
    const value = getComputedStyle(el)[prop as 'color' | 'backgroundColor'];
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = value;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    return { r, g, b, a };
  }, property);
}

test.describe('Mobile header visibility', () => {
  test('header text is visible after scrolling past hero on home page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const header = page.locator('#header');
    const logo = page.locator('#logo-link');

    await expect(header).not.toHaveClass(/scrolled/);

    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(500);

    await expect(header).toHaveClass(/scrolled/);

    const logoColor = await parseColor(logo, 'color');
    expect(logoColor.r).toBeLessThan(100);
    expect(logoColor.g).toBeLessThan(100);
    expect(logoColor.b).toBeLessThan(100);
  });

  test('header has scrolled state on pages without hero', async ({ page }) => {
    await page.goto('/impressum');
    await page.waitForLoadState('networkidle');

    const header = page.locator('#header');
    await expect(header).toHaveClass(/scrolled/);

    const logo = page.locator('#logo-link');
    const logoColor = await parseColor(logo, 'color');
    expect(logoColor.r).toBeLessThan(100);
    expect(logoColor.g).toBeLessThan(100);
    expect(logoColor.b).toBeLessThan(100);
  });

  test('mobile menu opens, navigates, and hamburger is clickable after', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const menuBtn = page.locator('#mobile-menu-btn');
    const menu = page.locator('#mobile-menu');

    await expect(menuBtn).toBeVisible();

    await menuBtn.click();
    await page.waitForTimeout(600);
    await expect(menu).toHaveCSS('opacity', '1');

    const navLinks = menu.locator('nav ul a');
    expect(await navLinks.count()).toBeGreaterThan(0);

    await navLinks.first().click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(menu).toHaveCSS('opacity', '0');
    await expect(menuBtn).toBeVisible();
    await expect(menuBtn).not.toHaveClass(/invisible/);

    await menuBtn.click();
    await page.waitForTimeout(600);
    await expect(menu).toHaveCSS('opacity', '1');
  });

  test('mobile menu has cream background when opened after scrolling', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(500);

    const header = page.locator('#header');
    await expect(header).toHaveClass(/scrolled/);

    const menuBtn = page.locator('#mobile-menu-btn');
    await menuBtn.click();
    await page.waitForTimeout(600);

    const menu = page.locator('#mobile-menu');
    await expect(menu).toHaveCSS('opacity', '1');

    const menuBg = await parseColor(menu, 'backgroundColor');
    expect(menuBg.r).toBeGreaterThan(220);
    expect(menuBg.g).toBeGreaterThan(220);
    expect(menuBg.b).toBeGreaterThan(200);
    expect(menuBg.a).toBe(255);

    await expect(header).toHaveClass(/menu-open/);
  });

  test('header bars (hamburger icon) change color on scroll', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const bar = page.locator('#bar1');

    const initialBg = await parseColor(bar, 'backgroundColor');
    expect(initialBg.r).toBe(255);
    expect(initialBg.g).toBe(255);
    expect(initialBg.b).toBe(255);

    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(500);

    const scrolledBg = await parseColor(bar, 'backgroundColor');
    expect(scrolledBg.r).toBeLessThan(100);
    expect(scrolledBg.g).toBeLessThan(100);
    expect(scrolledBg.b).toBeLessThan(100);
  });
});
