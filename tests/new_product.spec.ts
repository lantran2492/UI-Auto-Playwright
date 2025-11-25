import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../scripts/pages/loginPage";
import { NewProductPage } from "../scripts/pages/newProductPage";

let loginPage: LoginPage;
let newProductPage: NewProductPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  newProductPage = new NewProductPage(page);
});

test("Create new product", async ({ page }) => {
  await loginPage.adminLogin();
  await newProductPage.clickMenuByLabel("New Product");

  let xpathHeading = `//h1[normalize-space(text())="Create a new product"]`;
  await expect(page.locator(xpathHeading)).toBeVisible();
});
