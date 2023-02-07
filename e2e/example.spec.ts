import { expect, test } from "@playwright/test";

const PAGE_URL = "http://localhost:3000/";

test("page title", async ({ page }) => {
  await page.goto(PAGE_URL);

  await expect(page).toHaveTitle(/Satellite/);
});

test("connect wallet link", async ({ page }) => {
  await page.goto(PAGE_URL);

  await expect(
    page.getByText("Connect Wallet", {
      exact: true,
    })
  ).toBeVisible();

  await expect(page.getByTestId("web3-modal")).toHaveText(/Select Wallet/);
});
