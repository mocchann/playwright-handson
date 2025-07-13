import test from "@playwright/test";

test("network", async ({ page }) => {
  page.on("request", (request) =>
    console.log(">>", request.method(), request.url())
  );

  page.on("response", (response) =>
    console.log("<<", response.status(), response.url())
  );

  await page.goto("https://example.com");
});

test("特定のURLリクエストを待機する場合", async ({ page }) => {
  const requestPromise = page.waitForRequest("**/api/fetch_data");
  await page.getByText("trigger request").click();
  const request = await requestPromise;
});

test("特定のURLへのGETリクエストを待機する場合", async ({ page }) => {
  const requestPromise = page.waitForRequest(
    (req) => req.url() === "**/api/fetch_data" && req.method() === "GET"
  );
  await page.getByText("trigger request").click();
  const request = await requestPromise;
});
