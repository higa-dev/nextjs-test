"use client";
import useGetChartData from '@/hooks/useGetChartData';
import { FC, useEffect } from 'react';
import ECharts from './ECharts';

const Body: FC = () => {
  const { data: chartData, getChartData } = useGetChartData();
  useEffect(() => {
    getChartData();
  }, [getChartData]);

  return (
    <ECharts data={chartData}></ECharts>
  );
};

export default Body;