import { Page } from "@playwright/test";
import { inputTextByLabel } from "../common";

export class LoginPage {
  page: Page;
  readonly username = "lan@mail.com";
  readonly password = "12345678";

  constructor(page: Page) {
    this.page = page;
  }

  async login(username: string, password: string) {
    await this.page.goto("http://localhost:3000/admin/login");
    await inputTextByLabel(this.page, "Email", username);
    await inputTextByLabel(this.page, "Password", password);
    await this.page.getByRole("button", { name: "SIGN IN" }).click();
  }

  async adminLogin() {
    await this.login(this.username, this.password);
  }
}
