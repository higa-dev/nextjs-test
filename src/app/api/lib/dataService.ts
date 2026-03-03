"use server";

import { MapData } from "@/type/map";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.VERCEL_POSTGRES_URL,
});

// 取得: 都道府県名をキーにした MapData を生成
export const getDataFromPostgres = async (): Promise<MapData> => {
  const res = await pool.query(`
    SELECT pm.name AS prefecture,
           cd.grade,
           cd.memo,
           cd.pickup
    FROM chart_data cd
    JOIN prefecture_master pm
      ON pm.id = cd.prefecture_id
  `);

  const result: MapData = {};
  res.rows.forEach(({ prefecture, grade, memo, pickup }) => {
    result[prefecture] = {
      grade,
      memo,
      pickup: pickup ? 1 : 0,
    };
  });
  return result;
};

// 更新: MapData を受け取り、チャートデータを upsert
export const putDataToPostgres = async (data: MapData): Promise<void> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    for (const [pref, value] of Object.entries(data)) {
      // prefecture_master から ID を取得
      const prefRes = await client.query(
        `SELECT id FROM prefecture_master WHERE name = $1`,
        [pref]
      );
      if (prefRes.rowCount === 0) {
        console.warn(`Prefecture not found in master: ${pref}`);
        continue;
      }
      const prefId = prefRes.rows[0].id;

      await client.query(
        `INSERT INTO chart_data
           (prefecture_id, grade, memo, pickup, updated_at)
         VALUES ($1, $2, $3, $4, NOW())
         ON CONFLICT (prefecture_id) DO UPDATE SET
           grade = EXCLUDED.grade,
           memo = EXCLUDED.memo,
           pickup = EXCLUDED.pickup,
           updated_at = NOW()`,
        [prefId, value.grade, value.memo, value.pickup === 1]
      );
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};
