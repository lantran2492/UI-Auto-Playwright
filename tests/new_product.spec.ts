import { test, expect, Page } from "@playwright/test";
import { login } from "../scripts/common";

async function clickMenuByLabel(page: Page, label: string) {
  let xpath = `//div[contains(concat(' ',normalize-space(@class),' '),' admin-nav ')]//a[normalize-space(text())="${label}"]`;
  await page.locator(xpath).click();
}

test("Create new product", async ({ page }) => {
  await login(page, "lan@mail.com", "12345678");
  await clickMenuByLabel(page, "New Product");
  //   await expect(
  //     page.getByRole("heading", { name: "Create a new product" })
  //   ).toBeVisible();
  let xpathHeading = `//h1[normalize-space(text())="Create a new product"]`;
  await expect(page.locator(xpathHeading)).toBeVisible();
});
