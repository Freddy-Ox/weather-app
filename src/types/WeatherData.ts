export type CurrentWeather = {
  city: string;
  temperature: number;
  feels_like: number;
  description: string;
  icon: string;
  wind_speed: number;
  wind_gusts: number;
  wind_direction: number;
  cloudiness: number;
  sunrise: number;
  sunset: number;
  time: number;
};

export type HourlyForecastData = {
  time: string;
  temperature: number;
  feels_like: number;
  description: string;
  icon: string;
  wind_speed: number;
  wind_gust: number;
  wind_direction: number;
  cloudiness: number;
};

