"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const handleDeposit = () => {
	alert("Deposit clicked!");
};
export default function DepositWithdraw() {
	return (
		<Card className="rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
			<CardHeader>
				<CardTitle className="text-lg font-semibold">
					Deposit & Withdraw
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col sm:flex-row gap-4 mt-4">
				<Button
					onClick={handleDeposit}
					className="flex-1 py-3 text-sm font-medium"
					variant="default">
					Deposit
				</Button>
				<Button className="flex-1 py-3 text-sm font-medium" variant="secondary">
					Withdraw
				</Button>
			</CardContent>
		</Card>
	);
}
