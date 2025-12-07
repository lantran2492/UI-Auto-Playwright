import { Page } from "@playwright/test";
import { CommonPage } from "../commonPage";

export class ProductPage extends CommonPage {
  xpathHeading = `//h1[normalize-space(text())="Products"]`;

  constructor(page: Page) {
    super(page);
    this.searchComponentLocator = `#keyword`;
  }
}
