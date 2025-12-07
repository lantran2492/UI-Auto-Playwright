import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../scripts/pages/loginPage";
import { NewProductPage } from "../scripts/pages/newProductPage";
import { ProductPage } from "../scripts/pages/productPage";

let loginPage: LoginPage;
let newProductPage: NewProductPage;
let productPage: ProductPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  newProductPage = new NewProductPage(page);
  productPage = new ProductPage(page);
});

test("Create new product", async ({ page }) => {
  let random = new Date().getTime();
  await loginPage.adminLogin();
  await newProductPage.clickMenuByLabel("New Product");

  await expect(page.locator(newProductPage.xpathHeading)).toBeVisible();
  let productName = `Giày Thể Thao Biti's Hunter X Nam Màu Đen ${random}`;
  await newProductPage.inputTextByLabel("Name", productName);
  let sku = `SKU-${random}`;
  await newProductPage.inputTextByLabel("SKU", sku);
  await newProductPage.inputTextByLabel("Price", "800000");
  await newProductPage.inputTextByLabel("Weight", "0.2");

  await newProductPage.selectDropdownByLabel("Tax class", "Taxable Goods");

  await newProductPage.uploadProductImage("data/images/bitis.jpg");

  await newProductPage.inputTextByLabel("Quantity", "100");
  await newProductPage.inputTextByLabel(
    "Url key",
    `giay-the-thao-biti-s-hunter-x-nam-mau-den-hsm${random}`
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
  await newProductPage.selectRadioByLabel("Status", "Disabled");
  await newProductPage.selectRadioByLabel("Visibility", "Not visible");
  await newProductPage.selectRadioByLabel("Manage stock?", "No");
  await newProductPage.selectRadioByLabel("Stock availability", "No");

  await newProductPage.clickButtonByLabel("Save");
  await newProductPage.verifyPopupMessage("Product saved successfully!");

  //expect after create product
  await newProductPage.clickMenuByLabel("Products");

  await expect(page.locator(productPage.xpathHeading)).toBeVisible();

  await productPage.searchInComponentByValue(`${random}`);
  await expect(page.getByText(productName)).toBeVisible();
  await page.getByText(productName).click();
  await expect(page.getByText(`Editing ${productName}`)).toBeVisible();

  expect(await productPage.getInputValueByLabel("Name")).toEqual(productName);
  expect(await productPage.getInputValueByLabel("SKU")).toEqual(sku);
});
