import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { type ChartConfig } from "@/components/ui/chart"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-5))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function BarsChart() {

  const [chartData, setChartData] = useState<[]>();


  const getChartInfo = async () => {
    const response = await fetch("https://citasmedicasdash.netlify.app/api/appointment/groupdepartment")
    const info = await response.json();
    setChartData(info);
  }

  useEffect(() => {
    getChartInfo();
  }, [])

  return (
    <Card className="w-full h-[24.05rem] xl:h-[31.5rem] 2xl:h-[24.05rem]">
      <CardHeader>
        <CardTitle>Appointments by departments</CardTitle>
        <CardDescription>Historic</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="w-full h-[18rem] xl:h-[22rem] 2xl:h-[18rem]" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend />
            <Bar
              dataKey="Quantity"
              fill="var(--color-desktop)"
              radius={[0, 0, 4, 4]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
