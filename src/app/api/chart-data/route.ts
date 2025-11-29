import { NextResponse } from 'next/server';
import { getDataFromGcloud } from '../lib/dataService';

/**
 * Production チャートデータ取得エンドポイント
 * Google Cloud Datastore からデータを取得します
 */
export async function GET() {
  try {
    const data = await getDataFromGcloud();

    const headers = {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300, s-maxage=300', // 5分キャッシュ
      'Access-Control-Allow-Origin': '*',
    };

    return NextResponse.json(data, { headers });
  } catch (error) {
    console.error('Error in GET /api/chart-data:', error);

    return NextResponse.json(
      { error: 'Failed to fetch chart data' },
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
