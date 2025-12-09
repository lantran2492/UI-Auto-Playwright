import { Page, request as apiRequest } from "@playwright/test";
import { CommonPage } from "../commonPage";

export class ProductPage extends CommonPage {
  xpathHeading = `//h1[normalize-space(text())="Products"]`;

  constructor(page: Page) {
    super(page);
    this.searchComponentLocator = `#keyword`;
  }

  async deleteProduct(productId: string, cookieHeader: string) {
    let request = await apiRequest.newContext();

    await request.delete(`http://localhost:3000/api/products/${productId}`, {
      headers: {
        Cookie: cookieHeader,
      },
    });
  }
}
