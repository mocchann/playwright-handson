import { Metadata } from "next";
import { ShuffleMemberForm } from "./form";

export const metadata: Metadata = {
  title: "入力フォーム",
  description: "Playwrightハンズオンの第2のステップ",
};

export default function Form() {
  return (
    <main>
      <h1>入力フォーム</h1>
      <ShuffleMemberForm />
      <div>
        <button>更新</button>
        <nav>
          <a href="/news">最新情報</a>
        </nav>
      </div>
      <div>
        <label htmlFor="searchbox">検索</label>
        <input
          type="search"
          name="searchword"
          id="searchbox"
          placeholder="検索ワード"
        />
      </div>
    </main>
  );
}
