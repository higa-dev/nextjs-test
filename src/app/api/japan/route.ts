import { readFileSync } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    // キャッシング制御ヘッダーを設定
    const headers = {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600', // 1時間キャッシュ
      'Access-Control-Allow-Origin': '*',
    };

    // public/japan.json を読み込み
    const filePath = join(process.cwd(), 'public', 'japan.json');
    const fileContent = readFileSync(filePath, 'utf-8');
    const geoData = JSON.parse(fileContent);

    return NextResponse.json(geoData, { headers });
  } catch (error) {
    console.error('Error reading japan.json:', error);

    return NextResponse.json(
      { error: 'Failed to fetch GeoJSON data' },
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
