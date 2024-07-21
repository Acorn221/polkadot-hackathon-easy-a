import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

// Sample Polkadot transaction data
const transactions = [
  { id: "0x1a2b3c1a2b3c1a2b3c1a2b3c1a2b3c1a2b3c", type: "Transfer", amount: "15.5 DOT", from: "15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6Sp5", to: "14Gjs1TD93gnwEBfDMHoCgsuf1s2TVKUP6Z1qKmAZnZ8cW5q" },
  { id: "0x2b3c4d2b3c4d2b3c4d2b3c4d2b3c4d3d4e5f", type: "Stake", amount: "100 DOT", from: "16ZL8yLyXv3V3L3z9ofTikrRxuBs9QhidNAunNPzZk7mFsTf", to: "Validator" },
  { id: "0x3d4e5f3d4e5f3d4e5f3d4e5f3d4e5f3d4e5f", type: "Unstake", amount: "50 DOT", from: "Validator", to: "14E5nqKAp3oAJcmzgZhUD2RcptBeUBScxKHgJKU4HPNcKVf3" },
  { id: "0x3d4e5f3d4e5f3d4e5f3d4e5f3d4e5f3d4e5f", type: "Transfer", amount: "5.2 DOT", from: "15sND1xy2556eoAx6eGV6zkURbona6U9WXpGrLPzmfWRnQUe", to: "13RDY9nrJpyTDBSUdBw12HNVFT7cEZJtMLLSMgh6a9xAJBnn" },
  { id: "0x3d4e5f3d4e5f3d4e5f3d4e5f3d4e5f3d4e5f", type: "Bond", amount: "200 DOT", from: "16WMKpXYJthPx3TS6Eo7x7YvgxjJNe6u3xe9gv7hGrDWfBqK", to: "System" },
  // Add more transactions here...
];

export const RecentTransactions = () => {
  return (
    <ScrollArea className="h-full w-full rounded-md border text-white">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Polkadot Transactions</h4>
        {transactions.map((tx) => (
          <React.Fragment key={tx.id}>
            <div className="text-sm">
              <div className="font-semibold">{tx.type}</div>
              <div>Amount: {tx.amount}</div>
              <div className="text-xs text-gray-500">
                From: {tx.from.slice(0, 10)}...
              </div>
              <div className="text-xs text-gray-500">
                To: {tx.to.slice(0, 10)}...
              </div>
              <div className="text-xs text-gray-400">ID: {tx.id}</div>
            </div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}