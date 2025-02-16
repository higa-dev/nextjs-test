
import { getDataFromGcloud, putDataFromGcloud } from "./gcloudData"
import { getMockData, putMockData } from "./mockData";

export const getDataFunc = () => {
  return isProd() ? getDataFromGcloud : getMockData;
}

export const putDataFunc = () => {
  return isProd() ?  putDataFromGcloud : putMockData;
}

const isProd = () =>{
  return process.env.NEXT_PUBLIC_ENV=== "prod";
}