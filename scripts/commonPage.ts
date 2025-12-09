import { test, expect, Page } from "@playwright/test";

export class CommonPage {
  page: Page;
  searchComponentLocator?: string;

  constructor(page: Page) {
    this.page = page;
  }

  async inputTextByLabel(label: string, value: string) {
    let xpath = `(//label[normalize-space(text())="${label}"]//following::input)[1]`;
    let locator = this.page.locator(xpath);
    await locator.click();
    await locator.clear();
    await locator.fill(value);
  }

  async inputTextAreaByLabel(label: string, value: string) {
    let xpath = `(//label[normalize-space(text())="${label}"]//following::textarea)[1]`;
    await this.page.locator(xpath).fill(value);
  }

  async clickMenuByLabel(label: string) {
    let xpath = `//div[contains(concat(' ',normalize-space(@class),' '),' admin-nav ')]//a[normalize-space(text())="${label}"]`;
    await this.page.locator(xpath).click();
  }

  async selectDropdownByLabel(label: string, option: string) {
    let xpath1 = `(//label[normalize-space(text())="${label}"]//following::select)[1]`;
    let xpath2 = `(//h3[normalize-space(text())="${label}"]//following::select)[1]`;
    let xpath3 = `(//td[normalize-space(text())="${label}"]//following::select)[1]`;
    await this.page
      .locator(`${xpath1} | ${xpath2} | ${xpath3}`)
      .selectOption(option);
  }

  async selectRadioByLabel(label: string, option: string) {
    let xpath = `(//label[normalize-space(text())="${label}"]/following::label[.//span[normalize-space(text())="${option}"] and .//input[@type = "radio"]])[1]`;
    await this.page.locator(xpath).click();
  }

  async clickButtonByLabel(label: string) {
    let xpath = `//button[normalize-space(.)="${label}"]`;
    await this.page.locator(xpath).click();
  }

  async verifyPopupMessage(message: string) {
    let xpath = `//div[@role="alert" and normalize-space(text())="${message}"]`;
    await expect(this.page.locator(xpath)).toBeVisible();
  }

  async searchInComponentByValue(input: string) {
    let locator = this.page.locator(this.searchComponentLocator ?? "");
    await locator.click();
    await locator.clear();
    await locator.fill(input);
    await this.page.keyboard.press("Enter");
  }

  async getInputValueByLabel(label: string) {
    let xpath = `(//label[normalize-space(text())="${label}"]//following::input)[1]`;
    let value = await this.page.locator(xpath).getAttribute("value");
    return value;
  }

  getIdFromUrl() {
    let url = this.page.url();
    let id = url.split("/").pop() ?? "";
    return id;
  }

  async getCookieHeader() {
    let cookies = await this.page.context().cookies();
    let asid = cookies.find((v) => v.name == "asid");
    let sid = cookies.find((v) => v.name == "sid");
    let cookieHeader = `asid=${asid?.value}; sid=${sid?.value}`;
    return cookieHeader;
  }
}
