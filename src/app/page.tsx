export default function Home() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        ようこそ！
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        このサイトはPlaywrightのテスト練習用に作成されたものです。
      </p>
      <p className="text-gray-600">
        上部のナビゲーションから「Form」ページに移動して、インタラクティブなフォーム操作を試すことができます。
      </p>
    </div>
  );
}