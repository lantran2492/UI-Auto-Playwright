import { Page } from "@playwright/test";
import { CommonPage } from "../commonPage";
import {
  UI_ADMIN_PATH,
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
} from "../utils/constant";
export class LoginPage extends CommonPage {
  readonly username = ADMIN_USERNAME;
  readonly password = ADMIN_PASSWORD;

  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string) {
    await this.page.goto(UI_ADMIN_PATH);
    await this.inputTextByLabel("Email", username);
    await this.inputTextByLabel("Password", password);
    await this.page.getByRole("button", { name: "SIGN IN" }).click();
  }

  async adminLogin() {
    await this.login(this.username, this.password);
  }
}
