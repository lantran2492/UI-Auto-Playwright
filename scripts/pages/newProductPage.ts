import { Page } from "@playwright/test";
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
}
