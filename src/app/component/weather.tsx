import { use } from "react";
import { WeatherData, forecast } from "../../type/weather";
import Image from "next/image";
import { fetchApi } from "../../lib/util";

const week = ["日", "月", "火", "水", "木", "金", "土"];
const url = 'https://weather.tsukumijima.net/api/forecast/city/130010';

export const Weather = () => {
  const weatherData: WeatherData = use(fetchApi(url));
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
