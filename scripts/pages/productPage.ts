import { Page, request as apiRequest } from "@playwright/test";
import { CommonPage } from "../commonPage";
import { UI_PRODUCT_PATH } from "../utils/constant";
export class ProductPage extends CommonPage {
  xpathHeading = `//h1[normalize-space(text())="Products"]`;

  constructor(page: Page) {
    super(page);
    this.searchComponentLocator = `#keyword`;
  }

  async deleteProduct(productId: string, cookieHeader: string) {
    let request = await apiRequest.newContext();

    await request.delete(`${UI_PRODUCT_PATH}/${productId}`, {
      headers: {
        Cookie: cookieHeader,
      },
    });
  }
}
