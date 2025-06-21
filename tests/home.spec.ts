import { test, expect } from "@playwright/test";

test("ページの表示テスト", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page).toHaveTitle(/最初のページ/);
  await expect(page.getByRole("heading")).toHaveText(/Playwrightのハンズオン/);
  await expect(page.getByRole("button", { name: /操作ボタン/ })).toBeVisible();
});

test("フォーム画面への遷移テスト", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "入力フォーム" }).click();
  await expect(
    page.getByRole("heading", { name: "入力フォーム" })
  ).toBeVisible();
  await expect(page).toHaveURL("http://localhost:3000/form");
});

test("フォーム操作のテスト", async ({ page }) => {
  await page.goto("http://localhost:3000/form");
  await page.getByRole("textbox", { name: /1人目/ }).fill("頂羽");
  await page.getByRole("textbox", { name: /2人目/ }).fill("劉邦");
  await page.getByRole("button", { name: /シャッフル/ }).click();
  await expect(page.getByRole("status", { name: /結果/ })).toHaveText(
    /(頂羽→劉邦)|(劉邦→頂羽)/
  );
});

test("フォーム操作のテスト(サーバーモック)", async ({ page }) => {
  await page.route("**/api/shuffle", async (route) => {
    await route.fulfill({
      status: 200,
      json: { members: ["張飛", "関羽", "劉備"] },
    });
  });

  await page.goto("http://localhost:3000/form");
  await page.getByRole("textbox", { name: /1人目/ }).fill("劉備");
  await page.getByRole("textbox", { name: /2人目/ }).fill("関羽");
  await page.getByRole("textbox", { name: /3人目/ }).fill("張飛");
  await page.getByRole("button", { name: /シャッフル/ }).click();
  await expect(page.getByRole("status", { name: /結果/ })).toHaveText(
    /張飛→関羽→劉備/
  );
});

test("ロール名で要素取得", async ({ page }) => {
  await page.goto("http://localhost:3000/form");
  await expect(page.getByRole("link", { name: /最新情報/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /更新/ })).toBeVisible();
});

test("ラベル名で要素取得", async ({ page }) => {
  await page.goto("http://localhost:3000/form");
  await expect(page.getByLabel(/検索/)).toBeVisible();
});
