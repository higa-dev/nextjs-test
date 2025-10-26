"use client";

import { getDataFunc, putDataFunc } from "./dataSelector";

export const getChartDataAsync: (() => Promise<EChartsData>) = async function () {
  console.log("getChartDataAsync called");
  return getChartData();
}

const getChartData = (): Promise<EChartsData> => {
  return getMapData().then(data => {
    return convertMapDataToChartData(data);
  });
}

const getMapData = (): Promise<MapData> => {
  return getDataFunc()();
}

const convertMapDataToChartData = function (data: MapData): EChartsData {
  //const ret: EChartsData = [prefecturesHeader];
  const ret: EChartsData = [];

  for (const prefecture in data) {
    ret.push({ name: prefecture, value: data[prefecture]['grade'], memo: data[prefecture]['memo'] });
    //    ret.push([prefecture, data[prefecture]['grade']]);
  }
  console.log("ret", JSON.stringify(ret));
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

export type EChartsData = { name: string, value: number, memo: string }[];
