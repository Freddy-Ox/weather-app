import { useEffect, useState } from "react";
import { API_KEY } from "../API/api.ts";
import { HourlyForecastData } from "../types/WeatherData.ts";
import { Component } from "./DisplayHourlyForecast.tsx";
const BASE_URL = "https://pro.openweathermap.org/data/2.5/forecast/hourly";

type HourlyForecastProps = {
  cityName: string;
};

function mapHourlyForecast(data: any): HourlyForecastData {
  return {
    time: data.dt_txt,
    temperature: data.main.temp,
    feels_like: data.main.feels_like,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    wind_speed: data.wind.speed,
    wind_gust: data.wind.gust,
    wind_direction: data.wind.deg,
    cloudiness: data.clouds.all,
  };
}

function formatHourlyChartData(hourlyData: HourlyForecastData[]) {
  const chartDataHourly = hourlyData.map((elem) => {
    return {
      time: elem.time,
      temp: elem.temperature,
      feels_like: elem.feels_like,
    };
  });
  return chartDataHourly;
}

async function getHourlyForecast(cityName: string) {
  const response = await fetch(
    `${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("data fetching failed");
  }

  const jsonResponse = await response.json();
  const hourlyForecastArray = jsonResponse.list.map(mapHourlyForecast);

  return hourlyForecastArray;
}

export default function HourlyForecast({ cityName }: HourlyForecastProps) {
  const [hourlyForecastData, setHourlyForecastData] = useState([]);
  const [error, _setError] = useState()

  useEffect(() => {
    getHourlyForecast(cityName).then(setHourlyForecastData).catch(error);
  }, [cityName, error]);

  const chartDataHourly = formatHourlyChartData(hourlyForecastData);

  return <Component chartData={chartDataHourly}></Component>;
}
