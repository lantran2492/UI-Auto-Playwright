import { test, expect } from "@playwright/test";

test.beforeAll("Before All", async ({ browser, browserName }) => {
  console.log("Before all");
});

test.beforeEach("Before Each", async ({ page }) => {
  console.log("Before each");
  await page.waitForTimeout(1000);
});

test.afterAll("After All", async ({ browser, browserName }) => {
  console.log("After all");
});

test.afterEach("After Each", async ({ page }) => {
  console.log("After each");
  await page.waitForTimeout(1000);
});

test("test", async ({ page, context, browser, browserName, request }) => {
  await page.goto("https://playwright.dev/");
});

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});
