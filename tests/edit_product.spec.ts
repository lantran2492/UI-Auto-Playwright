import { test, expect, Page, request as apiRequest } from "@playwright/test";
import { LoginPage } from "../scripts/pages/loginPage";
import { NewProductPage } from "../scripts/pages/newProductPage";
import { ProductPage } from "../scripts/pages/productPage";
import newProductTemplate from "../data/product/newProductTemplate.json";
let loginPage: LoginPage;
let newProductPage: NewProductPage;
let productPage: ProductPage;
type ProductId = {
  key: string;
  value: string;
};
let productIds: ProductId[] = [];
let cookieHeader: string;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  newProductPage = new NewProductPage(page);
  productPage = new ProductPage(page);
  await loginPage.adminLogin();
  cookieHeader = await loginPage.getCookieHeader();
});

test.afterEach(async () => {
  let currentProductId = productIds.find((p) => p.key == test.info().title);
  if (currentProductId) {
    await productPage.deleteProduct(currentProductId.value, cookieHeader);
  }
});

test("Edit product", async ({ page }) => {
  let random = new Date().getTime();
  let productName = `Giày Thể Thao Biti's Hunter X Nam Màu Đen ${random}`;
  let sku = `SKU-${random}`;
  let urlKey = `giay-the-thao-biti-s-hunter-x-nam-mau-den-hsm${random}`;
  newProductTemplate.name = productName;
  newProductTemplate.sku = sku;
  newProductTemplate.url_key = urlKey;
  let response = await newProductPage.createProduct(
    newProductTemplate,
    cookieHeader
  );
  await expect(response).toBeOK();
  let responseBody = await response.json();
  let productId: ProductId = {
    key: test.info().title,
    value: responseBody.data.uuid,
  };
  productIds.push(productId);

  //Click on product
  await newProductPage.clickMenuByLabel("Products");
  await expect(page.locator(productPage.xpathHeading)).toBeVisible();

  await productPage.searchInComponentByValue(`${random}`);
  await expect(page.getByText(productName)).toBeVisible();
  await page.getByText(productName).click();
  await expect(page.getByText(`Editing ${productName}`)).toBeVisible();

  //Edit
  await newProductPage.inputTextByLabel("Price", "1000000");
  await newProductPage.clickButtonByLabel("Save");
  await newProductPage.verifyPopupMessage("Product saved successfully!");

  //Verify latest update on UI
  //Find product
  await newProductPage.clickMenuByLabel("Products");
  await expect(page.locator(productPage.xpathHeading)).toBeVisible();

  await productPage.searchInComponentByValue(`${random}`);
  await expect(page.getByText(productName)).toBeVisible();
  await page.getByText(productName).click();
  await expect(page.getByText(`Editing ${productName}`)).toBeVisible();
  //Verify
  expect(await productPage.getInputValueByLabel("Price")).toEqual("1000000");
});
