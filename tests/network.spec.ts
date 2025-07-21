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
