import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // キャッシング制御ヘッダーを設定
    const headers = {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600', // 1時間キャッシュ
      'Access-Control-Allow-Origin': '*',
    };

    // 外部天気 API にリクエスト
    const weatherUrl = 'https://weather.tsukumijima.net/api/forecast/city/130010';
    const response = await fetch(weatherUrl);
    const weatherData = await response.json();

    return NextResponse.json(weatherData, { headers });
  } catch (error) {
    console.error('Error fetching weather data:', error);

    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

// OPTIONSリクエスト対応（CORS preflight）
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
