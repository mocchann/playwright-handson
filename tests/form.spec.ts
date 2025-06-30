import { test, expect } from '@playwright/test';

const FORM_URL = 'http://localhost:3000/form';
const USER_NAME = 'Taro Yamada';

test.describe('フォームページのテスト', () => {
  test('正常系: 名前のシャッフルが成功する', async ({ page }) => {
    await page.goto(FORM_URL);

    // 1. フォームに名前を入力
    await page.getByLabel('名前').fill(USER_NAME);

    // 2. シャッフルボタンをクリック
    await page.getByRole('button', { name: 'シャッフル' }).click();

    // 3. 結果が表示されるのを待つ
    const result = page.getByTestId('shuffled-name');
    await expect(result).toBeVisible({ timeout: 10000 }); // APIの応答を待つためにタイムアウトを延長

    // 4. 結果を検証する
    const shuffledName = await result.textContent();
    expect(shuffledName).not.toBeNull();
    // 文字数が同じであること
    expect(shuffledName?.length).toBe(USER_NAME.length);
    // 元の名前とは異なること（ごく稀に同じになる可能性は考慮）
    if (shuffledName !== USER_NAME) {
      // 元の文字がすべて含まれていること
      const originalChars = USER_NAME.split('').sort().join('');
      const shuffledChars = (shuffledName || '').split('').sort().join('');
      expect(shuffledChars).toBe(originalChars);
    }
  });

  test('異常系: 名前が未入力の場合にエラーメッセージが表示される', async ({ page }) => {
    await page.goto(FORM_URL);

    // 1. 名前を入力せずにシャッフルボタンをクリック
    await page.getByRole('button', { name: 'シャッフル' }).click();

    // 2. エラーメッセージが表示されることを確認
    const errorMessage = page.getByText('名前を入力してください。');
    await expect(errorMessage).toBeVisible();

    // 3. シャッフル結果が表示されていないことを確認
    await expect(page.getByTestId('shuffled-name')).not.toBeVisible();
  });
});
