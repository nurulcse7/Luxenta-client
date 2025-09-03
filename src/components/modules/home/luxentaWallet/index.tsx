"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function LuxentaWallet() {
	return (
		<Card className="rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
			<CardHeader>
				<CardTitle className="text-lg font-semibold">Luxenta Wallet</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-gray-700 mt-2 text-sm">Balance: ৳ 0</p>
			</CardContent>
		</Card>
	);
}
