import { test, expect, Page } from "@playwright/test";
import { login, inputTextByLabel } from "../scripts/common";

// async function inputTextByLabel(page: Page, label: string, value: string) {
//   let xpath = `(//label[normalize-space(text())="${label}"]//following::input)[1]`;
//   await page.locator(xpath).fill(value);
// }

async function verifyInlineErrorByLabel(
  page: Page,
  label: string,
  message: string
) {
  // let xpath = `((//label[normalize-space(text())="${label}"]//following::input)[1]//following::span)[1]`;
  let xpath = `(//label[normalize-space(text())="${label}"]//following::span[normalize-space(text())="${message}"])[1]`;
  // await expect(page.locator(xpath)).toHaveText("This field can not be empty");
  await expect(page.locator(xpath)).toBeVisible();
  // let error = await page.locator(xpath).textContent();
  // return error;
}

// async function login(page: Page, username: string, password: string) {
//   await page.goto("http://localhost:3000/admin/login");
//   await inputTextByLabel(page, "Email", username);
//   await inputTextByLabel(page, "Password", password);
// }

test("Login successful", async ({ page }) => {
  // await page.goto("http://localhost:3000/admin/login");
  // await inputTextByLabel(page, "Email", "lan@mail.com");
  // await inputTextByLabel(page, "Password", "12345678");
  await login(page, "lan@mail.com", "12345678");
  // await page.getByRole("button", { name: "SIGN IN" }).click();
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});

test("Login failed", async ({ page }) => {
  // await page.goto("http://localhost:3000/admin/login");
  // await inputTextByLabel(page, "Email", "lan@mail.commmmmm");
  // await inputTextByLabel(page, "Password", "1234aaa");
  await login(page, "lan@mail.commmmm", "1234aaa");
  // await page.getByRole("button", { name: "SIGN IN" }).click();
  await expect(page.getByText("Invalid email or password")).toBeVisible();
});

test("Login empty", async ({ page }) => {
  // await page.goto("http://localhost:3000/admin/login");
  // await inputTextByLabel(page, "Email", "");
  // await inputTextByLabel(page, "Password", "");
  await login(page, "", "");
  // await page.getByRole("button", { name: "SIGN IN" }).click();
  await verifyInlineErrorByLabel(page, "Email", "This field can not be empty");
  await verifyInlineErrorByLabel(
    page,
    "Password",
    "This field can not be empty"
  );
  //   await expect(page.getByText("This field can not be empty")).toBeVisible();
});
