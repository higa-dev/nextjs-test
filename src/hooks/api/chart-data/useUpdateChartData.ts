"use client";

import useSWRMutation from "swr/mutation";

const useUpdateChartData = () => {
  // 環境変数から API ベースパスを取得
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
  const apiUrl = `${apiBaseUrl}/chart-data`;
  console.log("apiUrl in useUpdateChartData:", apiUrl);
  const { trigger, isMutating, error } = useSWRMutation(
    apiUrl,
    async (url, { arg: { prefecture, grade } }: { arg: { prefecture: string; grade: number } }) => {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prefecture, grade }),
      });

      if (!response.ok) {
        throw new Error('Failed to update chart data');
      }

      return response.json();
    }
  );

  return {
    update: (prefecture: string, grade: number) => trigger({ prefecture, grade }),
    isMutating,
    error,
  };
};

export default useUpdateChartData;