import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("ホームページのテスト", () => {
  test("ページの表示内容が正しい", async ({ page }) => {
    await page.goto(BASE_URL);

    // 1. 正しいタイトルが表示されているか
    await expect(page).toHaveTitle(/Playwright Practice/);

    // 2. メインの見出しが表示されているか
    await expect(
      page.getByRole("heading", { name: "Playwrightテストの世界へようこそ" })
    ).toBeVisible();

    // 3. "テストを開始する" ボタンが表示されているか
    await expect(
      page.getByRole("link", { name: "テストを開始する" })
    ).toBeVisible();
  });

  test("ヘッダーのナビゲーションが正しく機能する", async ({ page }) => {
    await page.goto(BASE_URL);

    // 1. ヘッダーの "Form" リンクをクリック
    await page.getByRole("link", { name: "Form" }).click();

    // 2. URLが /form に遷移したか
    await expect(page).toHaveURL(`${BASE_URL}/form`);

    // 3. フォームページの見出しが表示されているか
    await expect(
      page.getByRole("heading", { name: "名前シャッフル" })
    ).toBeVisible();
  });
});
