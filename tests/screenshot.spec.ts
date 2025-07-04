import test from "@playwright/test";

test("screenshot", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await page.screenshot({ path: "screenshot.png" });
});
