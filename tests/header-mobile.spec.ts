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

    // After scroll: header should have scrolled class (cream bg, dark text)
    await expect(header).toHaveClass(/scrolled/);

    // Logo text should be dark (visible on cream background)
    const logoColor = await logo.evaluate((el) => {
      const color = getComputedStyle(el).color;
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      return { r, g, b };
    });
    // #564f4a = dark brownish gray - all values should be < 100
    expect(logoColor.r).toBeLessThan(100);
    expect(logoColor.g).toBeLessThan(100);
    expect(logoColor.b).toBeLessThan(100);
  });

  test('header has scrolled state on pages without hero', async ({ page }) => {
    await page.goto('/impressum');
    await page.waitForLoadState('networkidle');

    const header = page.locator('#header');

    // Should immediately have scrolled class on non-hero pages
    await expect(header).toHaveClass(/scrolled/);

    // Logo should be dark
    const logo = page.locator('#logo-link');
    const logoColor = await logo.evaluate((el) => {
      const color = getComputedStyle(el).color;
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      return { r, g, b };
    });
    expect(logoColor.r).toBeLessThan(100);
    expect(logoColor.g).toBeLessThan(100);
    expect(logoColor.b).toBeLessThan(100);
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

  test('mobile menu has cream background when opened after scrolling', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Scroll down so header enters scrolled state
    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(500);

    const header = page.locator('#header');
    await expect(header).toHaveClass(/scrolled/);

    // Open mobile menu
    const menuBtn = page.locator('#mobile-menu-btn');
    await menuBtn.click();
    await page.waitForTimeout(600);

    const menu = page.locator('#mobile-menu');
    await expect(menu).toHaveCSS('opacity', '1');

    // Menu overlay should have light cream background (#f5f0e8)
    const menuBg = await menu.evaluate((el) => {
      const bg = getComputedStyle(el).backgroundColor;
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
      return { r, g, b, a };
    });
    // Should be light cream (r,g,b all > 220) and fully opaque
    expect(menuBg.r).toBeGreaterThan(220);
    expect(menuBg.g).toBeGreaterThan(220);
    expect(menuBg.b).toBeGreaterThan(200);
    expect(menuBg.a).toBe(255);

    // Header should have menu-open class
    await expect(header).toHaveClass(/menu-open/);
  });

  test('header bars (hamburger icon) change color on scroll', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const bar = page.locator('#bar1');

    // Initially white
    const initialBg = await bar.evaluate((el) => {
      const bg = getComputedStyle(el).backgroundColor;
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      return { r, g, b };
    });
    expect(initialBg.r).toBe(255);
    expect(initialBg.g).toBe(255);
    expect(initialBg.b).toBe(255);

    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(500);

    // After scroll: bars should be dark
    const scrolledBg = await bar.evaluate((el) => {
      const bg = getComputedStyle(el).backgroundColor;
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      return { r, g, b };
    });
    // #564f4a = dark brownish gray
    expect(scrolledBg.r).toBeLessThan(100);
    expect(scrolledBg.g).toBeLessThan(100);
    expect(scrolledBg.b).toBeLessThan(100);
  });
});
