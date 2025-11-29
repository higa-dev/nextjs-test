"use client";

import useSWR from "swr";
import { EChartsData, MapData } from "../../../type/map";

const fetcher = (url: string) => fetch(url).then(res => res.json());

const useGetChartData = () => {
  // 環境変数から API ベースパスを取得
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
  const apiUrl = `${apiBaseUrl}/chart-data`;

  const { data: mapData, error, isLoading, mutate } = useSWR<MapData>(
    apiUrl,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 0, // 重複リクエスト抑制を無効化（mutateでの再取得を即座に反映）
    }
  );

  const convertMapDataToChartData = (data: MapData | undefined): EChartsData => {
    if (!data) return [];

    const ret: EChartsData = [];
    for (const prefecture in data) {
      ret.push({ name: prefecture, value: data[prefecture]['grade'], memo: data[prefecture]['memo'] });
    }
    console.log("ret", JSON.stringify(ret));
    return ret;
  };

  const data = convertMapDataToChartData(mapData);

  return { data, error, isLoading, mutate };
};

export default useGetChartData;