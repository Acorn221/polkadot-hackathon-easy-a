 
 
 
import React, { useEffect, useRef } from "react";
import { sendToBackground } from "@plasmohq/messaging";
import Chart from 'chart.js/auto';
import "./style.css";
import type { GetStatsRequest, GetStatsResponse } from "../background/messages/getStats";
import { Card } from "../components/ui/card";
import { SearchBar } from "../components/search-bar";
import polkadotLogo from "data-base64:../../assets/polkadot-new-dot-logo.svg"
import { RecentTransactions } from "../components/recent-transactions";
import KeyStats from "../components/key-stats";
import TransactionVolumeChart from "../components/transaction-volume";
import WalletDistributionCharts from "../components/wallet";
import SavingsGoalsDashboard from "../components/yeet";
import PolkadotEcosystemChart from "../components/radar";

const PolkadotDashboard = () => {
  const [stats, setStats] = React.useState<GetStatsResponse | null>(null);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    sendToBackground<GetStatsRequest, GetStatsResponse>({
      name: "getStats",
    })
      .then((data) => {
        console.log("Data returned", data);
        setStats(data);
      })
      .catch((e) => {
        console.error("Error getting total reaction count", e);
      });

    // Chart.js setup
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
				chartInstance.current = new Chart(ctx, {
					type: 'line',
					data: {
						labels: ['January', 'February', 'March', 'April', 'May', 'June'],
						datasets: [
							{
								label: 'Polkadot Price (USD)',
								data: [25, 28, 31, 34, 30, 33],
								borderColor: 'rgba(54, 162, 235, 1)',
								backgroundColor: 'rgba(54, 162, 235, 0.2)',
								tension: 0.4,
								yAxisID: 'y1',
							},
							{
								label: 'Polkadot Market Cap (Billion USD)',
								data: [12, 15, 14, 18, 17, 20],
								borderColor: 'rgba(255, 159, 64, 1)',
								backgroundColor: 'rgba(255, 159, 64, 0.2)',
								tension: 0.4,
								yAxisID: 'y2',
							}
						]
					},
					options: {
						responsive: true,
						plugins: {
							legend: {
								position: 'top',
								labels: {
									color: 'rgba(255, 255, 255, 0.8)'
								}
							},
							title: {
								display: true,
								text: 'Polkadot Crypto Price and Market Cap',
								color: 'rgba(255, 255, 255, 0.8)'
							}
						},
						scales: {
							x: {
								grid: {
									color: 'rgba(255, 255, 255, 0.1)'
								},
								ticks: {
									color: 'rgba(255, 255, 255, 0.8)'
								}
							},
							y1: {
								type: 'linear',
								position: 'left',
								grid: {
									color: 'rgba(255, 255, 255, 0.1)'
								},
								ticks: {
									color: 'rgba(255, 255, 255, 0.8)'
								}
							},
							y2: {
								type: 'linear',
								position: 'right',
								grid: {
									drawOnChartArea: false,
									color: 'rgba(255, 255, 255, 0.1)'
								},
								ticks: {
									color: 'rgba(255, 255, 255, 0.8)'
								}
							}
						}
					}
				});				
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="w-screen h-screen grid grid-cols-8 dark bg-gray-950 grid-rows-3 gap-4 p-4">
      <Card className="col-span-3 flex justify-center align-middle p-2">
        <canvas ref={chartRef} className="w-full h-full"></canvas>
      </Card>
      <Card className="col-span-2 flex flex-col h-full align-middle justify-center p-2">
				<img src={polkadotLogo} alt="Polkadot Logo" className="size-32 m-auto flex-1" />
				<div className="text-2xl m-auto">
					Polkadot Network Healthy ✅
				</div>
			</Card>
			<Card className="col-span-3">
			<RecentTransactions />
			</Card>
      <Card className="col-span-2"><KeyStats /></Card>
			<Card className="p-4 col-span-4">
        <SearchBar />
      </Card>
      <Card className="col-span-2"><TransactionVolumeChart /></Card>
			<WalletDistributionCharts />
			<SavingsGoalsDashboard />
			<PolkadotEcosystemChart />
    </div>
  );
};

export default PolkadotDashboard;