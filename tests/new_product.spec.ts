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
  await newProductPage.inputTextByLabel(
    "Name",
    "Giày Thể Thao Biti's Hunter X Nam Màu Đen"
  );
  await newProductPage.inputTextByLabel("SKU", "HSM011700DEN");
  await newProductPage.inputTextByLabel("Price", "800000");
  await newProductPage.inputTextByLabel("Weight", "0.2");

  await newProductPage.selectDropdownByLabel("Tax class", "Taxable Goods");

  await newProductPage.inputTextByLabel("Quantity", "100");
  await newProductPage.inputTextByLabel(
    "Url key",
    "giay-the-thao-biti-s-hunter-x-nam-mau-den-hsm011700den"
  );
  await newProductPage.inputTextByLabel("Meta title", "Giay bitis");
  await newProductPage.inputTextByLabel("Meta keywords", "bitis den");
  await newProductPage.inputTextAreaByLabel(
    "Meta description",
    "Giay bitis den"
  );

  await newProductPage.selectDropdownByLabel("Attribute group", "Default");
  await newProductPage.selectDropdownByLabel("Color", "White");
  await newProductPage.selectDropdownByLabel("Size", "XL");
});
