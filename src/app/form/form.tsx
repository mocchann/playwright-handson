'use client';

import { useState } from 'react';

export const Form = () => {
  const [name, setName] = useState('');
  const [shuffledName, setShuffledName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name) {
      setError('名前を入力してください');
      return;
    }
    try {
      const res = await fetch('/api/shuffle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        throw new Error('APIエラーが発生しました');
      }
      const data = await res.json();
      setShuffledName(data.shuffledName);
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラー');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">名前シャッフル</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            名前
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
            placeholder="名前を入力"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          シャッフル
        </button>
      </form>
      {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
      {shuffledName && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h2 className="text-lg font-semibold text-gray-800">シャッフル結果:</h2>
          <p className="mt-2 text-xl text-indigo-600" data-testid="shuffled-name">
            {shuffledName}
          </p>
        </div>
      )}
    </div>
  );
};