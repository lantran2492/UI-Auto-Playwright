import { Page } from "@playwright/test";
import { CommonPage } from "../commonPage";

export class LoginPage extends CommonPage {
  readonly username = "lan@mail.com";
  readonly password = "12345678";

  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string) {
    await this.page.goto("http://localhost:3000/admin/login");
    await this.inputTextByLabel("Email", username);
    await this.inputTextByLabel("Password", password);
    await this.page.getByRole("button", { name: "SIGN IN" }).click();
  }

  async adminLogin() {
    await this.login(this.username, this.password);
  }
}
