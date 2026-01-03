'use client';

import useGetChartData from "@/hooks/api/chart-data/useGetChartData";
import { REGION_MAP, REGION_ORDER } from "../constants/regions";

const Body = () => {
  const { data, isLoading, error } = useGetChartData(true);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  // 地域ごとにグループ化
  const groupedByRegion = data?.reduce((acc, prefecture) => {
    const region = REGION_MAP[prefecture.name] || 'その他';
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(prefecture);
    return acc;
  }, {} as { [key: string]: typeof data });

  const sortedRegions = REGION_ORDER.filter(region => groupedByRegion?.[region]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">未訪問の都道府県一覧</h1>
      {data && data.length > 0 ? (
        <div className="space-y-6">
          {sortedRegions.map((region) => (
            <div key={region}>
              <h2 className="text-xl font-semibold mb-2 text-blue-600">{region}</h2>
              <ul className="ml-4">
                {groupedByRegion?.[region].map((prefecture) => (
                  <li key={prefecture.name} className="p-2 border-b">
                    {prefecture.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>未訪問の都道府県はありません。</p>
      )}
    </div>
  );
};

export default Body;
