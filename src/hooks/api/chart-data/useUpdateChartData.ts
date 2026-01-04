"use client";

import useSWRMutation from "swr/mutation";

const useUpdateChartData = () => {
  // SWRグローバルキャッシュを取得

  // 環境変数から API ベースパスを取得
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
  const apiUrl = `${apiBaseUrl}/chart-data`;
  console.log("apiUrl in useUpdateChartData:", apiUrl);
  const { trigger, isMutating, error } = useSWRMutation(
    apiUrl,
    async (url, { arg: { prefecture, grade, memo } }: { arg: { prefecture: string; grade: number; memo?: string } }) => {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prefecture, grade, memo }),
      });

      if (!response.ok) {
        throw new Error('Failed to update chart data');
      }

      return response.json();
    }
  );

  return {
    update: async (prefecture: string, grade: number, memo?: string) => {
      await trigger({ prefecture, grade, memo });
      // 更新後に、キャッシュキーを指定して再取得
    },
    isMutating,
    error,
  };
};

export default useUpdateChartData;