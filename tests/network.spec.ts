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

test("特定のURLリクエストからのレスポンスを待機する場合", async ({ page }) => {
  const responsePromise = page.waitForResponse("**/api/fetch_data");
  await page.getByText("trigger request").click();
  const response = await responsePromise;
});

test("特定のURLからの成功レスポンスを待機する場合", async ({ page }) => {
  const responsePromise = page.waitForResponse(
    (res) => res.url() === "**/api/fetch_data" && res.status() === 200
  );
  await page.getByText("trigger request").click();
  const response = await responsePromise;
});

test("apiのモック", async ({ page }) => {
  const testData = "";
  await page.route("**/api/fetch_data", (route) =>
    route.fulfill({
      status: 200,
      body: testData,
    })
  );
  await page.goto("https://example.com");
});

test("リクエストを中断", async ({ page }) => {
  await page.route("**/*.{png,jpg,jpeg}", (route) => route.abort());
});

test("リクエスト変更", async ({ page }) => {
  await page.route("**/*", (route) => {
    const headers = route.request().headers();
    delete headers["X-Secret"];
    route.continue({ headers });
  });
});

test("レスポンスを変更", async ({ page }) => {
  await page.route("**/title.html", async (route) => {
    const response = await route.fetch();
    route.fulfill({
      response,
      body: (await response.text()).replace("<title>", "<title>My prefix:"),
    });
  });
});
