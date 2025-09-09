"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const servers = [
	{ name: "Bkash", number: "017XXXXXXXX" },
	{ name: "Nagad", number: "018XXXXXXXX" },
	{ name: "Rocket", number: "019XXXXXXXX" },
	{ name: "Binance", number: "binance123" },
	{ name: "Other", number: "custom" },
];

export default function DepositPage() {
	const searchParams = useSearchParams();
	const amount = searchParams.get("amount") || 0;
	const [selectedServer, setSelectedServer] = useState<string>("");

	const handleSubmit = () => {
		if (!selectedServer) return alert("Select a server first!");
		alert(`Deposit ${amount} via ${selectedServer}`);
		// API call to submit deposit request
	};

	return (
		<div className="container mx-auto py-8">
			<h1 className="text-2xl font-bold mb-6">Deposit ${amount}</h1>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				{servers.map(s => (
					<Card
						key={s.name}
						className={`p-4 cursor-pointer ${
							selectedServer === s.name ? "border-indigo-500 border-2" : ""
						}`}
						onClick={() => setSelectedServer(s.name)}>
						<h2 className="font-semibold">{s.name}</h2>
						<p className="text-sm mt-2">Send money to: {s.number}</p>
					</Card>
				))}
			</div>

			{selectedServer && (
				<div className="space-y-2 mb-4">
					<input
						type="text"
						placeholder="Transaction ID / Reference"
						className="w-full p-2 border rounded"
					/>
				</div>
			)}

			<Button
				onClick={handleSubmit}
				className="w-full"
				disabled={!selectedServer}>
				Submit Deposit
			</Button>
		</div>
	);
}
