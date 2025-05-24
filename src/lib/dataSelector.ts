
import { getDataFromGcloud, putDataFromGcloud } from "./gcloudData"
import { getMockData, putMockData } from "./mockData";

export const getDataFunc = () => {
  return isProd() ? getDataFromGcloud : getMockData;
}

export const putDataFunc = () => {
  return isProd() ?  putDataFromGcloud : putMockData;
}

const isProd = () =>{
  console.log("NEXT_PUBLIC_ENV", process.env.NEXT_PUBLIC_ENV)
  return process.env.NEXT_PUBLIC_ENV=== "prod";
}