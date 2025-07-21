import test from "@playwright/test";

test("screenshot", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await page
    .getByRole("heading", { name: "Playwright enables reliable" })
    .screenshot({ path: "screenshot-element.png" });
});
