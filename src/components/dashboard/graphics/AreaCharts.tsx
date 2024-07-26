import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { type ChartConfig } from "@/components/ui/chart"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react";

const chartConfig = {
  mobile: {
    label: "count",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function AreaCharts() {

  const [chartData, setChartData] = useState<[]>();

  const getChartInfo = async () => {
    const response = await fetch("http://localhost:4321/api/appointment/groupdate")
    const info = await response.json();
    setChartData(info);
  }

  useEffect(() => {
    getChartInfo();
  }, [])

  return (
    <Card className="w-full h-[26rem]">
      <CardHeader>
        <CardTitle>Appointments by date</CardTitle>
        <CardDescription>
          Showing total appointments in the last days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="w-full h-[18rem]" config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={true}
              axisLine={false}
              tickMargin={10}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="count"
              name="Quantity"
              type="natural"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
