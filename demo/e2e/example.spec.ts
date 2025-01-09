import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });


// test('bla', async ({context, page } ) => {
//   context.route('api/bla', route => route.fulfill({
//     status: 200,
//     body: JSON.stringify([])
//   }));

//   // page.getByTestId('bla').screenshot()

//   // (await page.screenshot()).compare;
// });

// PAGE OBJECT MODEL

test('adds a connector to the table when the form is submitted', async ({ page }) => {
  await page.goto('http://localhost:4200/connectors');

  let rowLocator = page.locator('css=tbody tr');
  await page.waitForLoadState('networkidle');
  let nrOfConnectors = await rowLocator.count();

  let form = page.getByTestId('goeie-form');

  await form.getByText('Naam:').fill('HDMI');
  await form.getByText('Type:').selectOption('Round');
  await form.getByText('Is reversebaar:').check();
  await form.getByText('Foto URL:').fill('https://media.rs-online.com/image/upload/bo_1.5px_solid_white,b_auto,c_pad,dpr_2,f_auto,h_399,q_auto,w_710/c_pad,h_399,w_710/Y2368317-01?pgw=1');
  await form.getByTestId('submit-button').click();

  
  // await page.locator('app-loading').waitFor({ state: 'detached'})
  await page.waitForTimeout(3000);

  await page.waitForLoadState('networkidle');

  expect(await rowLocator.count()).toBe(nrOfConnectors + 1);
});