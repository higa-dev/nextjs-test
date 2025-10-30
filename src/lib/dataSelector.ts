import { MapData } from "@/type/map";
import { getDataFromGcloud, putDataFromGcloud } from "./gcloudData";
import { getMockData, putMockData } from "./mockData";

// Define a type for the data handler
export type DataHandler = {
  getData: () => Promise<MapData>;
  putData: (data: any) => void;
};

// Handlers for different environments
const handlers: Record<string, DataHandler> = {
  prod: {
    getData: getDataFromGcloud,
    putData: putDataFromGcloud,
  },
  default: {
    getData: getMockData,
    putData: putMockData,
  },
};

// Factory function to get the appropriate handler based on the environment
export const getDataHandler = (): DataHandler => {
  const env = process.env.NEXT_PUBLIC_ENV || "default";
  return handlers[env] || handlers.default;
};