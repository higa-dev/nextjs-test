"use client";

import { getDataHandler } from "../lib/dataSelector";
import { MapData } from "../type/map";

const handler = getDataHandler();

const useUpdateChartData = async (prefecture: string, grade: number) => {
  const getMapData = async (): Promise<MapData> => {
    return handler.getData();
  };

  const mapData = await getMapData();
  mapData[prefecture]['grade'] = grade;
  await handler.putData(mapData);
};

export default useUpdateChartData;