import React from "react"
import { TrendingUp } from "lucide-react"
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { metric: "Transactions", value: 186 },
  { metric: "Active Validators", value: 305 },
  { metric: "TVL (millions $)", value: 237 },
  { metric: "Parachain Auctions", value: 73 },
  { metric: "Governance Proposals", value: 209 },
  { metric: "Developer Activity", value: 214 },
]

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function PolkadotEcosystemChart() {
  return (
    <Card className="col-span-2">
      <CardHeader className="items-center pb-4">
        <CardTitle>Polkadot Ecosystem Metrics</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent indicator="line" labelKey="metric" />
              }
            />
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" />
            <Radar
              dataKey="value"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.6}
              stroke="hsl(var(--chart-1))"
            />
            <PolarRadiusAxis
              angle={90}
              stroke="hsla(var(--foreground))"
              orientation="middle"
              axisLine={false}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}