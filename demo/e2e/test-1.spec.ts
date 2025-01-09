import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:4200/connectors');
  await page.getByTestId('goeie-form').getByLabel('Naam:').click();
  await page.getByTestId('goeie-form').getByLabel('Naam:').fill('Ba');
  await page.getByTestId('goeie-form').getByLabel('Naam:').press('Enter');
  await page.getByTestId('goeie-form').getByLabel('Type:').selectOption('Screwed');
  await page.getByTestId('goeie-form').locator('li').filter({ hasText: 'Is reversebaar:' }).click();
  await page.getByTestId('goeie-form').getByLabel('Is reversebaar:').check();
  await page.getByTestId('goeie-form').getByLabel('Is reversebaar:').press('s');
  await page.getByTestId('goeie-form').getByLabel('Foto URL:').click();
  await page.getByTestId('goeie-form').getByLabel('Foto URL:').fill('fsdf');
  await page.getByTestId('submit-button').click();
});