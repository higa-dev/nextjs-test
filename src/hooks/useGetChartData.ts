"use client";

import { useCallback, useState } from "react";
import { getDataHandler } from "../lib/dataSelector";
import { EChartsData, MapData } from "../type/map";

const handler = getDataHandler();

const useGetChartData = () => {
  const [data, setData] = useState<EChartsData>([]);

  const getMapData = async (): Promise<MapData> => {
    const mapData = await handler.getData();
    return mapData;
  };

  const convertMapDataToChartData = (data: MapData): EChartsData => {
    const ret: EChartsData = [];

    for (const prefecture in data) {
      ret.push({ name: prefecture, value: data[prefecture]['grade'], memo: data[prefecture]['memo'] });
    }
    console.log("ret", JSON.stringify(ret));
    return ret;
  };

  // ✅ useCallback でメモ化して参照の安定性を保つ
  const getChartData = useCallback(async () => {
    const mapData = await getMapData();
    const chartData = convertMapDataToChartData(mapData);
    setData(chartData);
  }, []);

  return { getChartData, data };
};

export default useGetChartData;