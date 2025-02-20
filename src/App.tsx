import { useState, useEffect, FormEvent } from "react";
import { API_KEY } from "./API/api.ts";
import DisplayWeather from "./components/CurrentWeather.tsx";
import HourlyForecast from "./components/HourlyForecast.tsx";
import { Component } from "./components/DisplayHourlyForecast.tsx";
import "./index.css";


const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

async function getWeather(city: string) {
  const response = await fetch(
    `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) {
    throw new Error("error fetching data");
  }

  const json = await response.json();

  const weatherData: WeatherData = {
    city: json.name,
    temperature: json.main.temp,
    feels_like: json.main.feels_like,
    description: json.weather[0].description,
    icon: json.weather[0].icon,
    wind_speed: json.wind.speed,
    wind_gusts: json.wind.gust,
    wind_direction: json.wind.deg,
    cloudiness: json.clouds.all,
    sunrise: json.sunrise,
    sunset: json.sunset,
    time: json.dt,
  };
  return weatherData;
}

export default function WeatherComponent() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState("randers");

  useEffect(() => {
    getWeather(city)
      .then(setWeatherData)
      .catch((err) => setError(err));
  }, [city]);

  if (error) return <p>Error: {error}</p>;
  if (!weatherData) return <p>Loading...</p>;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const cityName = formData.get("city") as string;

    setCity(cityName);
  }

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <form onSubmit={(event) => handleSubmit(event)}>
        <input type="text" name="city" className="border p-2 rounded-md" />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </form>
      <DisplayWeather weatherProps={weatherData}></DisplayWeather>
      <Component></Component>
    </div>
  );
}
