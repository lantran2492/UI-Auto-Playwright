import { Page, request as apiRequest } from "@playwright/test";
import { CommonPage } from "../commonPage";
import path from "path";
import { UI_PRODUCT_PATH } from "../utils/constant";

export class NewProductPage extends CommonPage {
  xpathHeading = `//h1[normalize-space(text())="Create a new product"]`;
  constructor(page: Page) {
    super(page);
  }

  async uploadProductImage(filePath: string) {
    await this.page
      .locator("#images input")
      .setInputFiles(path.join(process.cwd(), filePath));
  }

  async createProduct(body: any, cookieHeader: string) {
    let request = await apiRequest.newContext();
    return await request.post(UI_PRODUCT_PATH, {
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json",
      },
      data: body,
    });
  }
}
