"use server";

import { getDataFunc, putDataFunc } from "./dataSelector";

const prefecturesHeader = ['都道府県', '評価'];

export const getChartDataAsync: (() => Promise<GoogleChartData>) = async function () {
  return getChartData();
}

const getChartData = (): Promise<GoogleChartData> => {
  return getMapData().then(data => {
    return convertMapDataToChartData(data);
  });
}

const getMapData = (): Promise<MapData> => {
  return getDataFunc()(); 
}

const convertMapDataToChartData = function (data: MapData): GoogleChartData {
  const ret: GoogleChartData = [prefecturesHeader];

  for (const prefecture in data) {
    ret.push([prefecture, data[prefecture]['grade']]);
  }

  return ret;
}

export const updateChartData = (prefecture: string, grade: number) => {

  getMapData().then(data => {
    data[prefecture]['grade'] = grade;
    putDataFunc()(data);
  })
}

export interface MapData {
  [key: string]: MapDataPrefecture;
}

interface MapDataPrefecture {
  'grade': number;
  'memo': string;
  'pickup': number;
}

export type GoogleChartData = any[][];
