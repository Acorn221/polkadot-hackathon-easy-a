import React, { useMemo } from "react";
import { PieChart, Pie, Label } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const walletData = {
  staked: 1000,
  unstaked: 500,
  locked: 200,
  claimedRewards: 50,
  unclaimedRewards: 30,
};

const chartData = [
  { category: "Staked", value: walletData.staked, fill: "hsl(var(--chart-1))" },
  { category: "Unstaked", value: walletData.unstaked, fill: "hsl(var(--chart-2))" },
  { category: "Locked", value: walletData.locked, fill: "hsl(var(--chart-3))" },
];

const rewardsData = [
  { category: "Claimed Rewards", value: walletData.claimedRewards, fill: "hsl(var(--chart-4))" },
  { category: "Unclaimed Rewards", value: walletData.unclaimedRewards, fill: "hsl(var(--chart-5))" },
];

const chartConfig = {
  staked: { label: "Staked", color: "hsl(var(--chart-1))" },
  unstaked: { label: "Unstaked", color: "hsl(var(--chart-2))" },
  locked: { label: "Locked", color: "hsl(var(--chart-3))" },
  claimedRewards: { label: "Claimed Rewards", color: "hsl(var(--chart-4))" },
  unclaimedRewards: { label: "Unclaimed Rewards", color: "hsl(var(--chart-5))" },
};

const WalletChart = ({ data, title, totalLabel }) => {
  const total = useMemo(() => data.reduce((acc, curr) => acc + curr.value, 0), [data]);

  return (
    <Card className="flex flex-col col-span-2">
      <CardHeader className="items-center pb-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>Current Distribution</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[200px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={data}
              dataKey="value"
              nameKey="category"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
            >
              <Label
                content={({ viewBox }) => (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-xl font-bold">
                      {total.toLocaleString()}
                    </tspan>
                    <tspan x={viewBox.cx} y={viewBox.cy + 20} className="fill-muted-foreground text-xs">
                      {totalLabel}
                    </tspan>
                  </text>
                )}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

const WalletDistributionCharts = () => {
  return (
    <>
      <WalletChart data={chartData} title="Wallet Distribution" totalLabel="Total Balance" />
      <WalletChart data={rewardsData} title="Staking Rewards" totalLabel="Total Rewards" />
    </>
  );
};

export default WalletDistributionCharts;