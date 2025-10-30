export interface MapData {
  [key: string]: MapDataPrefecture;
}

interface MapDataPrefecture {
  'grade': number;
  'memo': string;
  'pickup': number;
}

export type EChartsData = { name: string, value: number, memo: string }[];