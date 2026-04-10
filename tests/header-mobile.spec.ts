import { test, expect } from '@playwright/test';

test.describe('Mobile header visibility', () => {
  test('header text is visible after scrolling past hero on home page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const header = page.locator('#header');
    const logo = page.locator('#logo-link');

    // Initially: header should NOT have scrolled class (transparent over hero)
    await expect(header).not.toHaveClass(/scrolled/);

    // Scroll down past the hero section
    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(500);

    // After scroll: header should have scrolled class (white bg, dark text)
    await expect(header).toHaveClass(/scrolled/);

    // Logo text should be dark (visible on white background)
    const logoColor = await logo.evaluate((el) => getComputedStyle(el).color);
    // #171717 = rgb(23, 23, 23)
    expect(logoColor).toBe('rgb(23, 23, 23)');
  });

  test('header has scrolled state on pages without hero', async ({ page }) => {
    await page.goto('/impressum');
    await page.waitForLoadState('networkidle');

    const header = page.locator('#header');

    // Should immediately have scrolled class on non-hero pages
    await expect(header).toHaveClass(/scrolled/);

    // Logo should be dark
    const logo = page.locator('#logo-link');
    const logoColor = await logo.evaluate((el) => getComputedStyle(el).color);
    expect(logoColor).toBe('rgb(23, 23, 23)');
  });

  test('mobile menu opens, navigates, and hamburger is clickable after', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const menuBtn = page.locator('#mobile-menu-btn');
    const menu = page.locator('#mobile-menu');

    // Hamburger button should be visible
    await expect(menuBtn).toBeVisible();

    // Open mobile menu
    await menuBtn.click();
    await page.waitForTimeout(600);

    // Menu overlay should be visible
    await expect(menu).toHaveCSS('opacity', '1');

    // Click a nav link to navigate
    const navLinks = menu.locator('nav ul a');
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThan(0);

    // Click the first nav link
    await navLinks.first().click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // After navigation: menu should be closed
    await expect(menu).toHaveCSS('opacity', '0');

    // Hamburger button should be visible and clickable again
    await expect(menuBtn).toBeVisible();
    await expect(menuBtn).not.toHaveClass(/invisible/);

    // Verify it can be clicked again
    await menuBtn.click();
    await page.waitForTimeout(600);
    await expect(menu).toHaveCSS('opacity', '1');
  });

  test('header bars (hamburger icon) change color on scroll', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const bar = page.locator('#bar1');

    // Initially white
    const initialBg = await bar.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(initialBg).toBe('rgb(255, 255, 255)');

    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(500);

    // After scroll: bars should be dark
    const scrolledBg = await bar.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(scrolledBg).toBe('rgb(23, 23, 23)');
  });
});
