import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center">
      <div className="bg-white p-12 rounded-xl shadow-lg max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Playwrightテストの世界へようこそ
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          このサイトは、Playwrightを使ったE2Eテストを実践的に学ぶためのサンドボックスです。
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            href="/form" 
            className="inline-block bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
          >
            テストを開始する
          </Link>
        </div>
      </div>
    </div>
  );
}
