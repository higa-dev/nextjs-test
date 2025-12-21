"use client";
import useGetChartData from '@/hooks/api/chart-data/useGetChartData';
import { FC } from 'react';
import ECharts from './ECharts';
import Link from 'next/link';

const Body: FC = () => {
  const { data: chartData, isLoading, error, mutate } = useGetChartData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <ECharts data={chartData} mutate={mutate}></ECharts>
      <Link href='/travel/not-visit'>未訪問の都道府県一覧</Link>
    </div>
  );
};

export default Body;