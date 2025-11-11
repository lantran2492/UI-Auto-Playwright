import { test, expect, Page } from "@playwright/test";

async function inputTextByLabel(page: Page, label: string, value: string) {
  let xpath = `(//label[normalize-space(text())="${label}"]//following::input)[1]`;
  await page.locator(xpath).fill(value);
}

async function findInlineErrorByLabel(page: Page, label: string) {
  let xpath = `((//label[normalize-space(text())="${label}"]//following::input)[1]//following::span)[1]`;
  await expect(page.locator(xpath)).toHaveText("This field can not be empty");
}

test("Login successful", async ({ page }) => {
  await page.goto("http://localhost:3000/admin/login");
  await inputTextByLabel(page, "Email", "lan@mail.com");
  await inputTextByLabel(page, "Password", "12345678");
  await page.getByRole("button", { name: "SIGN IN" }).click();
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});

test("Login failed", async ({ page }) => {
  await page.goto("http://localhost:3000/admin/login");
  await inputTextByLabel(page, "Email", "lan@mail.commmmmm");
  await inputTextByLabel(page, "Password", "1234aaa");
  await page.getByRole("button", { name: "SIGN IN" }).click();
  await expect(page.getByText("Invalid email or password")).toBeVisible();
});

test("Login empty", async ({ page }) => {
  await page.goto("http://localhost:3000/admin/login");
  await inputTextByLabel(page, "Email", "");
  await inputTextByLabel(page, "Password", "");
  await page.getByRole("button", { name: "SIGN IN" }).click();
  await findInlineErrorByLabel(page, "Email");
  await findInlineErrorByLabel(page, "Password");
  //   await expect(page.getByText("This field can not be empty")).toBeVisible();
});
