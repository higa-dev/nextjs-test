"use client";

import Image from "next/image";
import { useWeather } from "../../hooks/api/weather/useWeather";
import { forecast } from "../../type/weather";

const week = ["日", "月", "火", "水", "木", "金", "土"];

export const Weather = () => {
  const { weatherData, isLoading, error } = useWeather();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading weather data</div>;
  if (!weatherData) return <div>No data</div>;

  const weatherOutputData: WeatherOutput[] = weatherData.forecasts.map((forecast) => { return convert(forecast) });
  return (
    <>
      {weatherOutputData.map((data, index) => {
        return (
          <div key={index.toString()}>{data.date.toLocaleDateString()} ({week[data.date.getDay()]})
            <Image src={data.image} width={80} height={60} alt={data.telop}></Image>
            <div>{data.min} - {data.max} ℃</div>
            <div>降水確率
              {Object.entries(data.chanceOfRain).map(([k, v]) => v + ' ')}
            </div>
          </div>
        )
      })}
    </>
  );
}

const convert = function (forecast: forecast): WeatherOutput {
  return {
    date: new Date(forecast.date),
    telop: forecast.telop,
    image: forecast.image.url,
    min: forecast.temperature.min.celsius,
    max: forecast.temperature.max.celsius,
    chanceOfRain: forecast.chanceOfRain
  };
}

interface WeatherOutput {
  date: Date
  telop: string
  image: string
  min: string
  max: string
  chanceOfRain: {
    T00_06: string
    T06_12: string
    T12_18: string
    T18_24: string
  }
}
