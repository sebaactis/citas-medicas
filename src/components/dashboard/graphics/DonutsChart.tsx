import { Cell, Label, Pie, PieChart } from "recharts"
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"


const chartConfig = {
  
} satisfies ChartConfig

const COLORS = ["#D6DB00", "#DB2E2A", "#5CDB2A", "#DB2ACB", "#598646"];


export default function DonutsChart() {

  const [chartData, setChartData] = useState<[]>();


  const getChartInfo = async () => {
    const response = await fetch("https://citasmedicasdash.netlify.app/api/doctor/countdoctors")
    const info = await response.json();
    setChartData(info);
  }

  useEffect(() => {
    getChartInfo();
  }, [])
  
  return (
    <Card className="flex flex-col w-full h-[26rem] justify-center items-center">
      <CardHeader className="items-center pb-0">
        <CardTitle>Appointments by doctors</CardTitle>
        <CardDescription>Historic</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 justify-center items-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[15rem] 2xl:h-[18.75rem]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="doctorName"
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          Doctors
                        </tspan>
                        
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
