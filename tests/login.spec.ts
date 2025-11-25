import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../scripts/pages/loginPage";

async function verifyInlineErrorByLabel(
  page: Page,
  label: string,
  message: string
) {
  let xpath = `(//label[normalize-space(text())="${label}"]//following::span[normalize-space(text())="${message}"])[1]`;

  await expect(page.locator(xpath)).toBeVisible();
}

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
});

test("Login successful", async ({ page }) => {
  await loginPage.adminLogin();

  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});

test("Login failed", async ({ page }) => {
  await loginPage.login("lan@mail.commmmm", "1234aaa");

  await expect(page.getByText("Invalid email or password")).toBeVisible();
});

test("Login empty", async ({ page }) => {
  await loginPage.login("", "");

  await verifyInlineErrorByLabel(page, "Email", "This field can not be empty");
  await verifyInlineErrorByLabel(
    page,
    "Password",
    "This field can not be empty"
  );
});
