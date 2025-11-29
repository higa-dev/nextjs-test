"use client";

import useSWR from "swr";
import { WeatherData } from "../../../type/weather";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const useWeather = () => {
  const apiUrl = `/api/weather`;
  const { data: weatherData, error, isLoading } = useSWR<WeatherData>(apiUrl, fetcher);

  return {
    weatherData,
    error,
    isLoading,
  };
};
