import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const KeyStats = () => {
  return (
    <div className="grid grid-cols-2 gap-6 h-full">
      <StatCard title="Total Value Locked" value="$1.2B" />
      <StatCard title="24h Volume" value="$245M" />
      <StatCard title="Active Validators" value="297" />
      <StatCard title="Transactions (24h)" value="156,789" />
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <Card className="flex flex-col justify-between h-full">
      <CardTitle className="text-lg font-semibold text-gray-600 text-center w-full">{title}</CardTitle>
    <CardContent className="flex-grow flex items-center justify-center">
      <p className="text-4xl font-bold text-primary">{value}</p>
    </CardContent>
  </Card>
);

export default KeyStats;