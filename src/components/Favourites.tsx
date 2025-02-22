import { useState, useEffect } from "react";
import { getWeather } from "../utils/utils.ts";
import { CurrentWeather } from "../types/WeatherData.ts";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

type ButtonProps = {
  favourites: string[];
  setCity: React.Dispatch<React.SetStateAction<string>>;
};

type FavCityWeather = {
  city: string;
  temp: number;
  desc: string;
  icon: string;
};

async function getWeatherFavourites(favourites: string[]) {
  const favWeatherArray = await Promise.all(
    favourites.map(async (favCity) => {
      const weatherData: CurrentWeather = await getWeather(favCity);
      return {
        city: favCity,
        temp: weatherData.temperature,
        desc: weatherData.description,
        icon: weatherData.icon,
      };
    })
  );
  return favWeatherArray;
}

export default function Favourites({ favourites, setCity }: ButtonProps) {
  const [favCityWeather, setFavCityWeather] = useState<FavCityWeather[]>([]);

  useEffect(() => {
    async function fetchFavWeather() {
        if (favourites.length === 0) return; 

        const favWeather = await getWeatherFavourites(favourites)
        setFavCityWeather(favWeather)
    }

    fetchFavWeather()
  }, [favourites]);

  return (
    <Table className="w-[400px]">
      <TableCaption>A list of your favourite cities.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px] text-center">City</TableHead>
          <TableHead className="w-[50px] text-center">Temperature</TableHead>
          <TableHead className="w-[50px] text-center">Skies</TableHead>
          <TableHead className="w-[75px] text-center"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {favCityWeather.map((fav) => (
          <TableRow key={fav.city} onClick={() => setCity(fav.city)}>
            <TableCell className="font-medium">
              {fav.city}
            </TableCell>
            <TableCell>{Math.round(fav.temp*10)/10}°C</TableCell>
              <TableCell>{fav.desc}</TableCell>
              <TableCell className="text-right">
              <img
              src={`https://openweathermap.org/img/wn/${fav.icon}@2x.png`}
              alt={fav.desc}
              className="w-16 h-16 -mt-4"
            />
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          {/* <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell> */}
        </TableRow>
      </TableFooter>
    </Table>
  );
}

/* export default function Favourites({ favourites, setCity }: ButtonProps) {
  return (
    <ul className="flex space-x-4">
      {" "}
      
      {favourites.map((fav) => (
        <li key={fav}>
          <button
            onClick={() => setCity(fav)}
            className="bg-transparent rounded-lg border shadow-md py-2 px-4"
          >
            {fav}
          </button>
        </li>
      ))}
    </ul>
  );
} */
