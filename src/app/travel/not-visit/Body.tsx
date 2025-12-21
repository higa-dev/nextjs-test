'use client';

import useGetChartData from "@/hooks/api/chart-data/useGetChartData";

const Body = () => {
  const { data, isLoading, error } = useGetChartData(true);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">未訪問の都道府県一覧</h1>
      {data && data.length > 0 ? (
        <ul>
          {data.map((prefecture) => (
            <li key={prefecture.name} className="p-2 border-b">
              {prefecture.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>未訪問の都道府県はありません。</p>
      )}
    </div>
  );
};

export default Body;
