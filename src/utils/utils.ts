
import { CurrentWeather } from "../types/WeatherData.ts";

import { API_KEY } from "../API/api.ts";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function getWeather(city: string) {
    const response = await fetch(
      `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error("error fetching data");
    }
  
    const json = await response.json();
  
    const weatherData: CurrentWeather = {
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