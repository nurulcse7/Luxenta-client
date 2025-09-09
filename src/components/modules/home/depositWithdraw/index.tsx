"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const withdrawMethods = ["Bkash", "Nagad", "Rocket"];

export default function DepositWithdraw({
	userBalance=3,
}: {
	userBalance: number;
}) {
	const router = useRouter();
	const [action, setAction] = useState<"deposit" | "withdraw">("deposit");
	const [amount, setAmount] = useState<number | "">("");
	const [method, setMethod] = useState("");
	const [number, setNumber] = useState("");

	const handleActionClick = (type: "deposit" | "withdraw") => {
		setAction(type);
		setMethod("");
		setNumber("");
	};

	const handleDeposit = () => {
		if (!amount || typeof amount !== "number" || amount <= 0) {
			return alert("Please enter deposit amount");
		}
		router.push(`/deposit?amount=${amount}`);
	};

	const handleWithdraw = () => {
		if (!amount || typeof amount !== "number" || amount <= 0) {
			return alert("Enter amount to withdraw");
		}
		if (!method) {
			return alert("Select a payment method");
		}
		if (!number) {
			return alert("Enter your number for withdrawal");
		}
		alert(`Withdraw ${amount} via ${method} (${number})`);
		// API call here
	};

	return (
		<Card className="p-6 space-y-4">
			<h2 className="text-lg font-semibold">Deposit / Withdraw</h2>

			{/* Action Tabs */}
			<div className="flex gap-2">
				<Button
					variant={action === "deposit" ? "default" : "outline"}
					className="flex-1"
					onClick={() => handleActionClick("deposit")}>
					Deposit
				</Button>
				<Button
					variant={action === "withdraw" ? "default" : "outline"}
					className="flex-1"
					onClick={() => handleActionClick("withdraw")}
					disabled={userBalance <= 0}>
					Withdraw
				</Button>
			</div>

			{/* Amount Input */}
			<input
				type="number"
				placeholder="Enter amount"
				value={amount}
				onChange={e =>
					setAmount(e.target.value ? parseFloat(e.target.value) : "")
				}
				className="w-full p-2 border rounded"
			/>

			{/* Withdraw Payment Method + Number */}
			{action === "withdraw" &&
				typeof amount === "number" &&
				amount > 0 &&
				userBalance > 0 && (
					<div className="space-y-2 mt-2">
						<div className="flex gap-2">
							{withdrawMethods.map(m => (
								<Button
									key={m}
									variant={method === m ? "default" : "outline"}
									className="flex-1"
									onClick={() => setMethod(m)}>
									{m}
								</Button>
							))}
						</div>

						{method && (
							<input
								type="text"
								placeholder={`Enter your ${method} number`}
								value={number}
								onChange={e => setNumber(e.target.value)}
								className="w-full p-2 border rounded"
							/>
						)}
					</div>
				)}

			{/* Submit Button */}
			{action === "deposit" ? (
				<Button onClick={handleDeposit} className="w-full">
					Go to Deposit Page
				</Button>
			) : (
				<Button
					onClick={handleWithdraw}
					className="w-full"
					disabled={userBalance <= 0}>
					Withdraw
				</Button>
			)}
		</Card>
	);
}
