import dotenv from "dotenv";

let currentEnv = process.env.TEST_ENV;
if (currentEnv == "sit1") {
  dotenv.config({ path: "env/.env.sit1" });
} else {
  dotenv.config({ path: "env/.env.local" });
}

export const UI_HOST = process.env.UI_HOST;
export const UI_PORT = process.env.UI_PORT;
export const UI_URL = `${UI_HOST}:${UI_PORT}`;
export const UI_ADMIN_PATH = `${UI_URL}/admin/login`;
export const UI_PRODUCT_PATH = `${UI_URL}/api/products`;
export const ADMIN_USERNAME = "lan@mail.com";
export const ADMIN_PASSWORD = "12345678";
