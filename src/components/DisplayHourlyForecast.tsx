"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  /* CardFooter, */
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const chartConfig = {
  temp: {
    label: "Temperature",
    color: "hsl(var(--chart-1))",
  },
  feels_like: {
    label: "Feels like",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type ChartData = {
  time: string;
  temp: number;
  feels_like: number;
};

type ChartProps = {
  chartData: ChartData[];
};

export function Component({ chartData }: ChartProps) {
  const maxVal = Math.round(
    Math.max(...chartData.map((chartData) => chartData.temp)) * 1.1
  );
  const minVal =
    Math.round(
      Math.min(...chartData.map((chartData) => chartData.feels_like))
    ) > 0
      ? 0
      : Math.floor(
          Math.min(...chartData.map((chartData) => chartData.feels_like)) - 0.5
        );

  return (
    <Card className="bg-transparent p-4 rounded-lg shadow-md">
      <CardHeader>
        <CardTitle>4-Day Hourly Temperature Forecast</CardTitle>
        <CardDescription>
          Showing predicted temperature as well as 'feels like' temperature
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-[1000px]">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={true}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(10, 16)}
            />
            <YAxis domain={[minVal, maxVal]}></YAxis>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="temp"
              type="monotone"
              stroke="var(--color-temp)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="feels_like"
              type="monotone"
              stroke="var(--color-feels_like)"
              strokeWidth={2}
              dot={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/*       <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  );
}
