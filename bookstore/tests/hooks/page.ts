import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import type { Page, Browser, BrowserContext } from "playwright/test"
import { chromium } from "playwright/test"

let page: Page;
let browser: Browser;
let context: BrowserContext;

Before(async function () {
    console.log("Executing before hook", this);
    console.log("Launching browser and context");
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    console.log("Browser and context launched successfully");
})


After(async function () {
    console.log("Executing after hook", this);
    await page.close();
    await context.close();
    await browser.close();
    console.log("Browser and context closed successfully");
    console.log("After executed successfully")
});

console.log("In hooks/page.ts")

export { page };