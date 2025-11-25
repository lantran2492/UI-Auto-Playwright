import { Page } from "@playwright/test";
import { CommonPage } from "../commonPage";

export class NewProductPage extends CommonPage {
  constructor(page: Page) {
    super(page);
  }
}
