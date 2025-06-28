import { NextResponse } from 'next/server';

// 文字列をシャッフルする関数
const shuffleString = (str: string): string => {
  const array = str.split('');
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // ES6の分割代入で要素を交換
  }
  return array.join('');
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { error: '名前が無効です' },
        { status: 400 }
      );
    }

    const shuffledName = shuffleString(name);

    return NextResponse.json({ shuffledName });
  } catch (error) {
    return NextResponse.json(
      { error: 'リクエストの処理中にエラーが発生しました' },
      { status: 500 }
    );
  }
}