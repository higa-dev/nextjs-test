import { MapData } from '@/type/map';
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromGcloud, putDataFromGcloud } from '../lib/dataService';

/**
 * Production チャートデータ取得エンドポイント
 * Google Cloud Datastore からデータを取得します
 */
export async function GET() {
  try {
    const data = await getDataFromGcloud();

    const headers = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
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

/**
 * チャートデータ更新エンドポイント
 * 指定された都道府県のグレードを更新します
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { prefecture, grade } = body;

    if (!prefecture || grade === undefined) {
      return NextResponse.json(
        { error: 'Missing prefecture or grade' },
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const mapData: MapData = await getDataFromGcloud();
    mapData[prefecture]['grade'] = grade;
    await putDataFromGcloud(mapData);

    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };

    return NextResponse.json(mapData, { headers });
  } catch (error) {
    console.error('Error in PUT /api/chart-data:', error);

    return NextResponse.json(
      { error: 'Failed to update chart data' },
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
        'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
