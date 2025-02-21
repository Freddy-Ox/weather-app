import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { CurrentWeather } from "../types/WeatherData.tsx";
import {
  WiStrongWind,
  WiWindy,
  WiThermometer,
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

type InfoPanelsProps = {
  data: CurrentWeather;
};

export function InfoPanels({ data }: InfoPanelsProps) {
  return (
    <>
      <ResizablePanelGroup direction="horizontal" className="rounded-lg border">
        <ResizablePanel className="bg-green-300">
          <div className="flex h-full items-center justify-center p-6 flex-col">
            <WiStrongWind size={50} />
            <p className="text-2xl mb-4">
              Windspeeds of {Math.round(data.wind_speed)} m/s
            </p>
            <p className="text-lg">
              Gusts of {Math.round(data.wind_gusts)} m/s
            </p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <ResizablePanelGroup direction="horizontal" className="rounded-lg border mx-4">
        <ResizablePanel className="bg-rose-300">
          <div className="flex h-full items-center justify-center p-6 flex-col">
            <WiThermometer size={50} />
            <p className="text-2xl mb-4">
              Temperature right now: {Math.round(data.temperature * 10) / 10}°C
            </p>
            <p className="text-lg">
              Feels like {Math.round(data.feels_like * 10) / 10}°C
            </p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <ResizablePanelGroup direction="horizontal" className="rounded-lg border">
        <ResizablePanel className="bg-emerald-100">
          <div className="flex h-full items-center justify-center p-6 flex-col">
            <WiCloud size={50} />
            <p className="text-2xl mb-4">{data.description}</p>
            <p className="text-lg">with {data.cloudiness}% cloudcover </p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
