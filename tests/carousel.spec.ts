import { test, expect, devices } from '@playwright/test';

const mobile = devices['Pixel 7'];
test.use({ ...mobile });

test.describe('Photo Carousel', () => {
  test('renders carousel with slides and dots on gallery page', async ({ page }) => {
    await page.goto('http://localhost:4321/galerie');
    await page.waitForLoadState('networkidle');

    // Scroll to carousel section
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(500);

    const carousel = page.locator('.photo-carousel');
    await expect(carousel).toBeVisible();

    // Should have 5 slides
    const slides = carousel.locator('.carousel-slide');
    expect(await slides.count()).toBe(5);

    // First slide visible, second hidden
    await expect(slides.nth(0)).toHaveClass(/opacity-100/);
    await expect(slides.nth(1)).toHaveClass(/opacity-0/);

    // Should have 5 dots
    const dots = carousel.locator('.carousel-dot');
    expect(await dots.count()).toBe(5);

    // Take screenshot
    await page.screenshot({ path: '/tmp/screenshots/gallery-carousel.png' });
  });

  test('auto-advances to next slide', async ({ page }) => {
    await page.goto('http://localhost:4321/galerie');
    await page.waitForLoadState('networkidle');

    const carousel = page.locator('.photo-carousel');
    const slides = carousel.locator('.carousel-slide');

    // First slide active
    await expect(slides.nth(0)).toHaveClass(/opacity-100/);

    // Wait for auto-advance (5s interval + buffer)
    await page.waitForTimeout(5500);

    // Second slide should now be active
    await expect(slides.nth(1)).toHaveClass(/opacity-100/);
    await expect(slides.nth(0)).toHaveClass(/opacity-0/);
  });

  test('dot click navigates to correct slide', async ({ page }) => {
    await page.goto('http://localhost:4321/galerie');
    await page.waitForLoadState('networkidle');

    const carousel = page.locator('.photo-carousel');
    const slides = carousel.locator('.carousel-slide');
    const dots = carousel.locator('.carousel-dot');

    // Click third dot
    await dots.nth(2).click();
    await page.waitForTimeout(300);

    await expect(slides.nth(2)).toHaveClass(/opacity-100/);
    await expect(slides.nth(0)).toHaveClass(/opacity-0/);
  });

  test('prev/next buttons navigate slides', async ({ page }) => {
    await page.goto('http://localhost:4321/galerie');
    await page.waitForLoadState('networkidle');

    const carousel = page.locator('.photo-carousel');
    const slides = carousel.locator('.carousel-slide');

    // Click next
    await carousel.locator('.carousel-next').click();
    await page.waitForTimeout(300);
    await expect(slides.nth(1)).toHaveClass(/opacity-100/);

    // Click prev
    await carousel.locator('.carousel-prev').click();
    await page.waitForTimeout(300);
    await expect(slides.nth(0)).toHaveClass(/opacity-100/);
  });
});
