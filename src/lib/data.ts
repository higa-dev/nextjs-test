"use server";

import { Datastore } from '@google-cloud/datastore'

const prefecturesHeader = ['都道府県', '評価'];
const datastore = new Datastore();
const kind = 'nextjs-test';
const name = 'travel';
const taskKey = datastore.key([kind, name]);


export const getChartDataAsync: (() => Promise<GoogleChartData>) = async function () {
  return getChartData();
}

const getChartData = (): Promise<GoogleChartData> => {
  return getMapData().then(data => {
    return convertMapDataToChartData(data);
  });
}

const getMapData = (): Promise<MapData> => {
  return datastore.get(taskKey).then(getResponse => {

    const _data = getResponse[0];
    const data: MapData = {};
    for (const key in _data) {
      data[key] = _data[key];
    }

    return data;
  });
}

const convertMapDataToChartData = function (data: MapData): GoogleChartData {
  const ret: GoogleChartData = [prefecturesHeader];

  for (const prefecture in data) {
    ret.push([prefecture,data[prefecture]['grade']]);
  }

  return ret;
}

export const updateChartData = (prefecture: string, grade: number) => {

  getMapData().then(data => {
    data[prefecture]['grade'] = grade;

    const task = {
      key: taskKey,
      data: data
    }

    datastore.save(task);
  })
}

interface MapData {
  [key: string]: MapDataPrefecture;
}

interface MapDataPrefecture {
  'grade': number;
  'memo': string;
  'pickup': number;
}

export type GoogleChartData = any[][];
