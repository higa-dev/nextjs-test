import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const useJapanGeoJson = () => {
  const { data: geoJson, error, isLoading } = useSWR('/api/japan', fetcher);

  return {
    geoJson,
    error,
    isLoading,
  };
};
