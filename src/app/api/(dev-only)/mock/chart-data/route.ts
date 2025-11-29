import { MapData } from '@/type/map';
import { NextResponse } from 'next/server';

// Mock data
const mockData: MapData = {
  "鳥取県": { "grade": 0, "memo": "", "pickup": 0 },
  "石川県": { "grade": 4, "memo": "", "pickup": 0 },
  "埼玉県": { "grade": 2, "memo": "", "pickup": 0 },
  "岐阜県": { "grade": 3, "memo": "", "pickup": 0 },
  "島根県": { "grade": 4, "memo": "", "pickup": 0 },
  "福島県": { "grade": 2, "memo": "", "pickup": 0 },
  "岩手県": { "grade": 0, "memo": "", "pickup": 0 },
  "栃木県": { "grade": 0, "memo": "", "pickup": 0 },
  "秋田県": { "grade": 0, "memo": "", "pickup": 0 },
  "青森県": { "grade": 0, "memo": "", "pickup": 0 },
  "北海道": { "grade": 5, "memo": "", "pickup": 0 },
  "東京都": { "grade": 5, "memo": "", "pickup": 0 },
  "群馬県": { "grade": 3, "memo": "", "pickup": 0 },
  "広島県": { "grade": 4, "memo": "", "pickup": 0 },
  "滋賀県": { "grade": 0, "memo": "", "pickup": 0 },
  "山口県": { "grade": 0, "memo": "", "pickup": 0 },
  "山形県": { "grade": 0, "memo": "", "pickup": 0 },
  "京都府": { "grade": 4, "memo": "", "pickup": 0 },
  "山梨県": { "grade": 0, "memo": "", "pickup": 0 },
  "兵庫県": { "grade": 1, "memo": "", "pickup": 0 },
  "高知県": { "grade": 3, "memo": "", "pickup": 0 },
  "神奈川県": { "grade": 2, "memo": "", "pickup": 0 },
  "沖縄県": { "grade": 3, "memo": "", "pickup": 0 },
  "新潟県": { "grade": 4, "memo": "日本酒", "pickup": 0 },
  "長崎県": { "grade": 0, "memo": "", "pickup": 0 },
  "長野県": { "grade": 3, "memo": "", "pickup": 0 },
  "愛知県": { "grade": 3, "memo": "", "pickup": 0 },
  "大阪府": { "grade": 4, "memo": "", "pickup": 0 },
  "徳島県": { "grade": 2, "memo": "", "pickup": 0 },
  "福井県": { "grade": 0, "memo": "", "pickup": 0 },
  "宮崎県": { "grade": 0, "memo": "", "pickup": 0 },
  "宮城県": { "grade": 0, "memo": "", "pickup": 0 },
  "愛媛県": { "grade": 4, "memo": "", "pickup": 0 },
  "熊本県": { "grade": 2, "memo": "", "pickup": 0 },
  "千葉県": { "grade": 2, "memo": "", "pickup": 0 },
  "奈良県": { "grade": 0, "memo": "", "pickup": 0 },
  "三重県": { "grade": 4, "memo": "", "pickup": 0 },
  "富山県": { "grade": 2, "memo": "", "pickup": 0 },
  "大分県": { "grade": 0, "memo": "", "pickup": 0 },
  "茨城県": { "grade": 1, "memo": "", "pickup": 0 },
  "香川県": { "grade": 3, "memo": "", "pickup": 0 },
  "鹿児島県": { "grade": 0, "memo": "", "pickup": 0 },
  "佐賀県": { "grade": 2, "memo": "", "pickup": 0 },
  "静岡県": { "grade": 3, "memo": "", "pickup": 0 },
  "岡山県": { "grade": 0, "memo": "", "pickup": 0 },
  "和歌山県": { "grade": 4, "memo": "", "pickup": 0 },
  "福岡県": { "grade": 3, "memo": "", "pickup": 0 }
};

/**
 * Get mock data
 */
const getMockData = async (): Promise<MapData> => {
  console.log("Returning mock data");
  return Promise.resolve(mockData);
};

/**
 * Mock データ取得エンドポイント
 * 開発環境でのみ利用
 * (dev-only) Route Group に属しているため、production では除外される
 * URL: /api/mock/chart-data
 */
export async function GET() {
  console.log("api/mock/chart-data called");
  try {
    const data = await getMockData();

    const headers = {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'Access-Control-Allow-Origin': '*',
    };

    return NextResponse.json(data, { headers });
  } catch (error) {
    console.error('Error in GET /api/mock/chart-data:', error);

    return NextResponse.json(
      { error: 'Failed to fetch mock data' },
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
