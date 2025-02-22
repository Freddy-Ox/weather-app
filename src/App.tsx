import { useState, useEffect, FormEvent } from "react";
import { CurrentWeather } from "./types/WeatherData.ts";
import HourlyForecast from "./components/HourlyForecast.tsx";
import { InfoPanels } from "./components/InfoPanels.tsx";
import "./index.css";
import Favourites from "./components/Favourites.tsx";
import { getWeather } from "./utils/utils.ts";



export default function WeatherComponent() {
  const [weatherData, setWeatherData] = useState<CurrentWeather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState("aarhus");
  const [favourites, setFavourites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavourites = localStorage.getItem("favourites");
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
  }, []);

  useEffect(() => {
    getWeather(city)
      .then(setWeatherData)
      .catch((err) => setError(err));
  }, [city]);

  

  function handleAddToFavourites() {
    if (city && !favourites.includes(city)) {
      const updatedFavourites = [...favourites, city];
      setFavourites(updatedFavourites);
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    }
  }

  if (error) return <p>Error: {error}</p>;
  if (!weatherData) return <p>Loading...</p>;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const cityName = formData.get("city") as string;

    setCity(cityName);
  }

  console.log(weatherData);

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

      <Favourites favourites={favourites} setCity={setCity}></Favourites>
      <h1 className="text-2xl mt-2">
        Weather right now in {city.toUpperCase()}
      </h1>
      <button
        onClick={handleAddToFavourites}
        className="ml-2 bg-transparent px-4 py-2 rounded-lg shadow-md mt-2"
      >
        Add to Favourites
      </button>
      {
        <div className="w-[1000px] h-[200px] max-w-[1800px] flex justify-center mt-8 mb-8">
          <InfoPanels data={weatherData} />
        </div>
      }
      <HourlyForecast cityName={city}></HourlyForecast>
    </div>
  );
}
