import { CurrentWeather } from "../types/WeatherData.ts";

type WeatherProps = {
  weatherProps: CurrentWeather;
};

export default function DisplayWeather({ weatherProps }: WeatherProps) {
  const date = new Date(weatherProps.time * 1000);

  return (
    <>
      <h2 className="text-2xl font-bold mt-4">{weatherProps.city}</h2>
      <p>{date.toLocaleDateString() + " " + date.toLocaleTimeString()}</p>
      <p>{weatherProps.description}</p>
      <p className="text-lg font-semibold">
        🌡️ {Math.round(weatherProps.temperature)}°C
      </p>{" "}
      <p>Feels like {Math.round(weatherProps.feels_like)}°C</p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherProps.icon}@2x.png`}
        alt={weatherProps.description}
        className="w-24 h-24 mt-4"
      />
    </>
  );
}
