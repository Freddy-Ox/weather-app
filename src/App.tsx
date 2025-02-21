import { useState, useEffect, FormEvent } from "react";
import { API_KEY } from "./API/api.ts";

import HourlyForecast from "./components/HourlyForecast.tsx";
import { InfoPanels } from "./components/InfoPanels.tsx";
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
  const [city, setCity] = useState("aarhus");

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
    <div className="flex flex-col items-center justify-center min-h-screen text-center mt-6">
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          type="text"
          placeholder="search for a city..."
          name="city"
          className="border-2 border-gray-300 rounded-md px-4 py-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </form>
      <h1 className="text-2xl mt-2">Weather right now in {city}</h1>
      <div className="w-[1000px] h-[200px] max-w-[1800px] flex justify-center mt-8 mb-8">
        <InfoPanels data={weatherData} />
      </div>
      <HourlyForecast cityName={city}></HourlyForecast>
    </div>
  );
}
