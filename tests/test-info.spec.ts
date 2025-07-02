import test from "@playwright/test";
import { writeFile } from "fs/promises";
import { waitForDebugger } from "inspector";

test("添付ファイルのテスト", async ({ page }, testInfo) => {
  await page.goto("http://localhost:5173/hover-test");

  // 画像添付
  const screenshot = await page.screenshot();
  await testInfo.attach("screenshot.png", {
    body: screenshot,
    contentType: "image/png",
  });

  // テキストを添付
  await testInfo.attach("log.json", {
    body: JSON.stringify({ message: "hello" }),
    contentType: "application/json",
  });

  // ダウンロードしたファイルを添付
  const res = await fetch("http://localhost:5173/src/assets/main.css");
  const blob = await res.blob();
  const buffer = Buffer.from(await blob.arrayBuffer());
  await testInfo.attach("main.css", { body: buffer, contentType: blob.type });

  // ろーかる　に出力したファイルを添付
  const path = testInfo.outputPath("output.txt");
  await writeFile(path, "ログデータ¥n", "utf-8");
  await testInfo.attach("local-file.log", { path, contentType: "text/plain" });
});
