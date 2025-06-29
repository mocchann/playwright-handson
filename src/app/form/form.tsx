'use client';

import { useState } from 'react';

export const Form = () => {
  const [name, setName] = useState('');
  const [shuffledName, setShuffledName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShuffledName('');
    if (!name) {
      setError('名前を入力してください。');
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api/shuffle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'APIエラーが発生しました');
      }
      const data = await res.json();
      setShuffledName(data.shuffledName);
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">名前シャッフル</h1>
        <p className="text-gray-500 mt-2">あなたの名前をシャッフルして、新しい発見を！</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            名前
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 transition
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="例：田中 太郎"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white 
                     bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                     disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all transform hover:scale-105"
        >
          {isLoading ? 'シャッフル中...' : 'シャッフル'}
        </button>
      </form>
      
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      )}

      {shuffledName && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-center text-lg font-semibold text-gray-800">シャッフル結果:</h2>
          <div className="mt-4 p-6 bg-indigo-50 rounded-lg text-center">
            <p className="text-4xl font-bold text-indigo-600 tracking-widest" data-testid="shuffled-name">
              {shuffledName}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
