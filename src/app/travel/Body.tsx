"use client";
import useGetChartData from '@/hooks/api/chart-data/useGetChartData';
import { FC } from 'react';
import ECharts from './ECharts';

const Body: FC = () => {
  const { data: chartData, isLoading, error, mutate } = useGetChartData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ECharts data={chartData} mutate={mutate}></ECharts>
  );
};

export default Body;