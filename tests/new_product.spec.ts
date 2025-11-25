import { test, expect, Page } from "@playwright/test";

import { LoginPage } from "../scripts/pages/loginPage";

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
});

async function clickMenuByLabel(page: Page, label: string) {
  let xpath = `//div[contains(concat(' ',normalize-space(@class),' '),' admin-nav ')]//a[normalize-space(text())="${label}"]`;
  await page.locator(xpath).click();
}

test("Create new product", async ({ page }) => {
  await loginPage.adminLogin();
  await clickMenuByLabel(page, "New Product");

  let xpathHeading = `//h1[normalize-space(text())="Create a new product"]`;
  await expect(page.locator(xpathHeading)).toBeVisible();
});
