import { Page, request as apiRequest } from "@playwright/test";
import { CommonPage } from "../commonPage";
import path from "path";

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
    return await request.post(`http://localhost:3000/api/products`, {
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json",
      },
      data: body,
    });
  }
}
