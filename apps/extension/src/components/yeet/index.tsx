import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { RadialBar, RadialBarChart } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const savingsGoalsData = [
  { goal: "Emergency Fund", current: 8000, target: 10000, fill: "hsl(var(--chart-1))" },
  { goal: "Vacation", current: 2500, target: 5000, fill: "hsl(var(--chart-2))" },
  { goal: "New Car", current: 15000, target: 30000, fill: "hsl(var(--chart-3))" },
  { goal: "Home Down Payment", current: 40000, target: 60000, fill: "hsl(var(--chart-4))" },
  { goal: "Retirement", current: 100000, target: 500000, fill: "hsl(var(--chart-5))" },
];

const chartConfig = {
  current: { label: "Current Savings" },
  "Emergency Fund": { label: "Emergency Fund", color: "hsl(var(--chart-1))" },
  "Vacation": { label: "Vacation", color: "hsl(var(--chart-2))" },
  "New Car": { label: "New Car", color: "hsl(var(--chart-3))" },
  "Home Down Payment": { label: "Home Down Payment", color: "hsl(var(--chart-4))" },
  "Retirement": { label: "Retirement", color: "hsl(var(--chart-5))" },
};

export function SavingsGoalsDashboard() {
  const totalSavings = savingsGoalsData.reduce((acc, curr) => acc + curr.current, 0);
  const totalTarget = savingsGoalsData.reduce((acc, curr) => acc + curr.target, 0);
  const overallProgress = (totalSavings / totalTarget) * 100;

  const chartData = savingsGoalsData.map(goal => ({
    ...goal,
    percentage: (goal.current / goal.target) * 100,
  }));

  return (
    <Card className="col-span-2 flex flex-col h-[300px]">
      <CardHeader className="items-center pb-2">
        <CardTitle >Savings Goals</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 pt-0">
        <ChartContainer
          config={chartConfig}
          className="h-full w-full"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={-270}
            innerRadius="20%"
            outerRadius="80%"
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <RadialBar
              background
              dataKey="percentage"
              angleAxisId={0}
              data={chartData}
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-sm pt-0">
        <div className="font-medium">
          Overall: {overallProgress.toFixed(1)}%
        </div>
        <div className="flex items-center gap-1">
          ${totalSavings.toLocaleString()} / ${totalTarget.toLocaleString()}
          {overallProgress > 50 ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

export default SavingsGoalsDashboard;