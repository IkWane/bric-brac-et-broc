import { test } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Box Depot' }).click();
    // await page.getByRole('button', { name: 'Tape it to the bin' }).click();
    await page.locator('[id="_r_16_-message"]').isEnabled();
});
