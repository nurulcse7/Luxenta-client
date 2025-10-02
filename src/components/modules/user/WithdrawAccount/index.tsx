"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Banknote, RotateCw } from "lucide-react";
import {
	setWithdrawMethod,
	getWithdrawMethod,
} from "@/services/WithdrawAccountService";
import {
	getSocket,
	subscribeEvent,
	unsubscribeEvent,
} from "@/lib/socketClient";

// The payment methods defined in your Prisma schema
enum PaymentMethod {
	bkash = "bkash",
	nagad = "nagad",
	rocket = "rocket",
	binance = "binance",
}

// Interface for the withdrawal account data
interface WithdrawAccount {
	id?: string;
	investorId: string;
	method: keyof typeof PaymentMethod;
	account: string;
	createdAt: Date;
	updateAt: Date;
}

const WithdrawAccount = () => {
	const [accountData, setAccountData] = useState<WithdrawAccount | null>(null);
	const [selectedMethod, setSelectedMethod] =
		useState<keyof typeof PaymentMethod>("bkash");
	const [accountNumber, setAccountNumber] = useState("");
	const [accountPassword, setAccountPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [fetchLoading, setFetchLoading] = useState(true);

	// Fetch withdrawal account data when the component mounts
	useEffect(() => {
		const fetchWithdrawAccount = async () => {
			setFetchLoading(true);
			const result = await getWithdrawMethod();
			if (result?.success && result?.data) {
				setAccountData(result.data);
				setSelectedMethod(result.data.method);
				setAccountNumber(result.data.account);
			}
			setFetchLoading(false);
		};

		fetchWithdrawAccount();
		getSocket();

		// 🔹 Subscribe to new notification events
		subscribeEvent("withdraw-method", withdrawMethod => {
			setAccountData(withdrawMethod);
		});

		return () => {
			unsubscribeEvent("withdraw-method");
		};
	}, []);

	const hasAccount = !!accountData;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!accountNumber || !accountPassword) {
			toast.error("অনুগ্রহ করে সব তথ্য দিন।");
			return;
		}

		setLoading(true);

		const payload = {
			method: selectedMethod,
			account: accountNumber,
			accountPassword,
		};
		const result = await setWithdrawMethod(payload);

		setLoading(false);

		if (result?.success) {
			toast.success(
				`উত্তোলনের অ্যাকাউন্ট সফলভাবে ${hasAccount ? "আপডেট" : "তৈরি"} হয়েছে!`
			);
		} else {
			setLoading(false);
			toast.error(
				result?.message || "অ্যাকাউন্ট আপডেট/তৈরি করতে ব্যর্থ হয়েছে।"
			);
		}
	};

	const getPlaceholderText = () => {
		switch (selectedMethod) {
			case "bkash":
			case "nagad":
			case "rocket":
				return "ফোন নাম্বার লিখুন";
			case "binance":
				return "ঠিকানা লিখুন";
			default:
				return "অ্যাকাউন্ট নম্বর/ঠিকানা লিখুন";
		}
	};
	// This handler function resolves the TypeScript error
	const handleMethodChange = (value: string) => {
		setSelectedMethod(value as keyof typeof PaymentMethod);
	};

	// Show a loading spinner while fetching data
	if (fetchLoading) {
		return (
			<div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center font-sans">
				<RotateCw className="w-8 h-8 animate-spin text-blue-500" />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[#0a0a0a] text-white p-4 font-sans">
			<div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-[18px] backdrop-blur-md p-4 mb-4 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div className="flex flex-col items-start">
					<h1 className="text-2xl font-bold mb-1">উত্তোলনের অ্যাকাউন্ট</h1>
					<p className="text-sm text-gray-400">
						{hasAccount
							? "আপনার উত্তোলনের অ্যাকাউন্ট আপডেট করুন।"
							: "নতুন উত্তোলনের অ্যাকাউন্ট তৈরি করুন।"}
					</p>
				</div>
			</div>

			<div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-xl backdrop-blur-md p-6 mt-6 max-w-lg mx-auto">
				<form onSubmit={handleSubmit}>
					<div className="space-y-6">
						<div>
							<label
								htmlFor="accountPassword"
								className="block text-sm font-medium text-gray-400 mb-2">
								অ্যাকাউন্ট পাসওয়ার্ড
							</label>
							<Input
								id="accountPassword"
								type="password"
								value={accountPassword}
								onChange={e => setAccountPassword(e.target.value)}
								placeholder="আপনার অ্যাকাউন্ট পাসওয়ার্ড লিখুন"
								className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
							/>
						</div>
						<div>
							<label
								htmlFor="method"
								className="block text-sm font-medium text-gray-400 mb-2">
								পেমেন্ট মেথড
							</label>
							<Select value={selectedMethod} onValueChange={handleMethodChange}>
								<SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
									<SelectValue placeholder="একটি মেথড নির্বাচন করুন" />
								</SelectTrigger>
								<SelectContent className="bg-gray-800 border-gray-700 text-white">
									{Object.keys(PaymentMethod).map(key => (
										<SelectItem
											key={key}
											value={key}
											className="hover:bg-gray-700">
											{key.charAt(0).toUpperCase() + key.slice(1)}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div>
							<label
								htmlFor="account"
								className="block text-sm font-medium text-gray-400 mb-2">
								অ্যাকাউন্ট নম্বর/ঠিকানা
							</label>
							<Input
								id="account"
								type="text"
								value={accountNumber}
								onChange={e => setAccountNumber(e.target.value)}
								placeholder={getPlaceholderText()}
								className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
							/>
						</div>

						{hasAccount && accountData && (
							<div className="text-sm text-gray-500 text-center mt-4">
								<p>
									<span className="font-semibold">তৈরির তারিখ:</span>{" "}
									{new Date(accountData.createdAt).toLocaleString()}
								</p>
								<p>
									<span className="font-semibold">শেষ আপডেট:</span>{" "}
									{new Date(accountData.updateAt).toLocaleString()}
								</p>
							</div>
						)}

						<Button className="w-full" type="submit" disabled={loading}>
							{loading ? (
								<>
									<RotateCw className="w-4 h-4 mr-2 animate-spin" />
									{hasAccount ? "আপডেট হচ্ছে..." : "তৈরি হচ্ছে..."}
								</>
							) : (
								<>
									<Banknote className="w-4 h-4 mr-2" />
									{hasAccount ? "আপডেট করুন" : "তৈরি করুন"}
								</>
							)}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default WithdrawAccount;
