"use server"

import { MapData } from './data';

const mockData: MapData = [];

export const getMockData = (): Promise<MapData> => {
  console.log("mock-get");

  return Promise.resolve().then(()=>{return mockData})
};

export const putDataFromGcloud = ( data:MapData) => {
  console.log("mock-put");
}

