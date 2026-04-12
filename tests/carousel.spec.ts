import { test, expect, devices } from '@playwright/test';

const mobile = devices['Pixel 7'];
test.use({ ...mobile });

test.describe('Photo Carousel Hero', () => {
  test('renders as hero with title overlay and 5 slides', async ({ page }) => {
    await page.goto('http://localhost:4321/galerie');
    await page.waitForLoadState('networkidle');

    const carousel = page.locator('.photo-carousel');
    await expect(carousel).toBeVisible();

    // Should have data-hero attribute (for header transparency)
    await expect(carousel).toHaveAttribute('data-hero', '');

    // Should have 5 slides
    const slides = carousel.locator('.carousel-slide');
    expect(await slides.count()).toBe(5);

    // Title overlay should be visible
    const title = carousel.locator('h1');
    await expect(title).toHaveText('Galerie');

    // First slide visible
    await expect(slides.nth(0)).toHaveClass(/opacity-100/);

    // Should have 5 dots
    expect(await carousel.locator('.carousel-dot').count()).toBe(5);

    await page.screenshot({ path: '/tmp/screenshots/gallery-hero-carousel.png' });
  });

  test('auto-advances to next slide', async ({ page }) => {
    await page.goto('http://localhost:4321/galerie');
    await page.waitForLoadState('networkidle');

    const slides = page.locator('.carousel-slide');
    await expect(slides.nth(0)).toHaveClass(/opacity-100/);

    // Wait for auto-advance (5s interval + buffer)
    await page.waitForTimeout(5500);

    await expect(slides.nth(1)).toHaveClass(/opacity-100/);
    await expect(slides.nth(0)).toHaveClass(/opacity-0/);
  });

  test('dot click navigates to correct slide', async ({ page }) => {
    await page.goto('http://localhost:4321/galerie');
    await page.waitForLoadState('networkidle');

    const slides = page.locator('.carousel-slide');
    const dots = page.locator('.carousel-dot');

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

    await carousel.locator('.carousel-next').click();
    await page.waitForTimeout(300);
    await expect(slides.nth(1)).toHaveClass(/opacity-100/);

    await carousel.locator('.carousel-prev').click();
    await page.waitForTimeout(300);
    await expect(slides.nth(0)).toHaveClass(/opacity-100/);
  });
});
