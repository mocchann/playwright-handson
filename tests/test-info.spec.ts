import test from "@playwright/test";

test("添付ファイルのテスト", async ({ page }, testInfo) => {
  await page.goto("http://localhost:5173/hover-test");

  const screenshot = await page.screenshot();
  await testInfo.attach("screenshot.png", {
    body: screenshot,
    contentType: "image/png",
  });

  await testInfo.attach("log.json", {
    body: JSON.stringify({ message: "hello" }),
    contentType: "application/json",
  });
});
