"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { transferFunds } from "@/services/InvestorService";
import { useState, useEffect } from "react";
import { toast } from "sonner";
// API কল ইম্পোর্ট করা হয়েছে

interface HistoryItem {
	type: "Main → Wallet" | "Wallet → Main";
	amt: number;
	time: string;
}

const DAILY_RATE = 0.0071;

export default function LuxentaWallet() {
	// user এবং settings ডেটা ব্যবহার করা হয়নি, কিন্তু রাখা হয়েছে।
	const { user } = useUser(); // refetchUser যুক্ত করা হলো

	// initialState হিসাবে user ডেটা ব্যবহার করা যেতে পারে
	// তবে এই উদাহরণের জন্য, আমরা state-এ ম্যানুয়ালি ডেটা রাখছি।
	// আসল অ্যাপ্লিকেশনে, এটি user.investorInfo.walletBalance এবং luxentaWallet থেকে আসা উচিত।
	const [mainBal, setMainBal] = useState(
		user?.investorInfo?.walletBalance || 15000
	);
	const [walletBal, setWalletBal] = useState(
		user?.investorInfo?.luxentaWallet || 0
	);

	// Loading state যোগ করা হয়েছে
	const [isLoading, setIsLoading] = useState(false);

	const [toWalletAmt, setToWalletAmt] = useState<number | "">("");
	const [toMainAmt, setToMainAmt] = useState<number | "">("");
	const [history, setHistory] = useState<HistoryItem[]>([]);
	const [lastCalc, setLastCalc] = useState<Date | null>(null);
	const [showHistory, setShowHistory] = useState(false);

	// User ডেটা আপডেট হলে ব্যালেন্স আপডেট
	useEffect(() => {
		if (user) {
			setMainBal(user.investorInfo.walletBalance);
			setWalletBal(user.investorInfo.luxentaWallet);
		}
	}, [user]);

	// Simulate daily compound accrual on Wallet balance
	useEffect(() => {
		const now = new Date();
		if (!lastCalc) {
			setLastCalc(now);
			return;
		}
		const msPerDay = 24 * 60 * 60 * 1000;
		const days = Math.floor((now.getTime() - lastCalc.getTime()) / msPerDay);

		// এখানে লাভ যোগের লজিকটি API-এর মাধ্যমে সার্ভারে হওয়া উচিত,
		// কিন্তু UI-তে সিমুলেশন লজিক রাখা হলো।
		if (days > 0 && walletBal > 0) {
			// Note: In a real app, this calculation should be verified
			// and often performed on the server.
			const newWalletBal = walletBal * Math.pow(1 + DAILY_RATE, days);
			setWalletBal(parseFloat(newWalletBal.toFixed(2))); // রাউন্ডিং
			setLastCalc(now);
		}
	}, [walletBal, lastCalc]);

	const fmt = (n: number) =>
		`৳ ${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

	// অ্যানিমেশন ফাংশন (অপশনাল, কিন্তু রাখা হলো)
	const animateValue = (
		start: number,
		end: number,
		setter: (val: number) => void
	) => {
		const duration = 500;
		const startTime = performance.now();
		function step(now: number) {
			const progress = Math.min((now - startTime) / duration, 1);
			setter(start + (end - start) * progress);
			if (progress < 1) requestAnimationFrame(step);
		}
		requestAnimationFrame(step);
	};

	const addHistory = (type: HistoryItem["type"], amt: number) => {
		const newItem: HistoryItem = {
			type,
			amt,
			time: new Date().toLocaleString(),
		};
		setHistory(prev => [newItem, ...prev]);
	};

	// 💰 Main → Wallet হ্যান্ডলার (API কল যুক্ত করা হয়েছে)
	const handleToWallet = async () => {
		const amt = Number(toWalletAmt);
		if (isLoading) return;

		if (!(amt > 0) || isNaN(amt)) {
			alert("সঠিক ট্রান্সফার পরিমাণ লিখুন");
			return;
		}
		if (amt > mainBal) {
			alert("মেইন ব্যালেন্সে পর্যাপ্ত টাকা নেই");
			return;
		}

		setIsLoading(true);
		try {
			// API কল
			const result = await transferFunds("wallet", amt);

			if (result.success) {
				// UI আপডেট: সার্ভার থেকে সাকসেস পেলে
				toast.success(result.message || "ট্রান্সফার সফল হয়েছে!");

				// অ্যানিমেশন চালানো
				animateValue(mainBal, mainBal - amt, setMainBal);
				animateValue(walletBal, walletBal + amt, setWalletBal);

				addHistory("Main → Wallet", amt);
				setToWalletAmt("");
			} else {
				toast.error(`ট্রান্সফার ব্যর্থ: ${result.error}`);
			}
		} catch (error: any) {
			toast.error(error.message || "নেটওয়ার্ক বা অন্য কোনো সমস্যা হয়েছে।");
		} finally {
			setIsLoading(false);
		}
	};

	// 💸 Wallet → Main হ্যান্ডলার (API কল যুক্ত করা হয়েছে)
	const handleToMain = async () => {
		const amt = Number(toMainAmt);
		if (isLoading) return;  

		if (!(amt > 0) || isNaN(amt)) {
			alert("সঠিক ট্রান্সফার পরিমাণ লিখুন");
			return;
		}
		if (amt > walletBal) {
			alert("Wallet-এ পর্যাপ্ত টাকা নেই");
			return;
		}

		setIsLoading(true);
		try {
			// API কল
			const result = await transferFunds("main", amt);

			if (result.success) {
				// UI আপডেট: সার্ভার থেকে সাকসেস পেলে
				toast.success(result.message || "ট্রান্সফার সফল হয়েছে!");

				// অ্যানিমেশন চালানো
				animateValue(walletBal, walletBal - amt, setWalletBal);
				animateValue(mainBal, mainBal + amt, setMainBal);

				addHistory("Wallet → Main", amt);
				setToMainAmt("");
			} else {
				toast.error(`ট্রান্সফার ব্যর্থ: ${result.error}`);
			}
		} catch (error: any) {
			toast.error(error.message || "নেটওয়ার্ক বা অন্য কোনো সমস্যা হয়েছে।");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className="min-h-screen p-3 flex flex-col gap-3 bg-[radial-gradient(75%_60%_at_20%_20%,#101a33_0%,#0a0f1c_35%,#060a14_100%)] text-[#e6f1ff] font-sans">
			{/* Topbar */}
			<header className="flex justify-center items-center gap-3 p-2 font-bold bg-gradient-to-b from-[#6a5cff1f] to-[#00e5ff14] border-b border-white/18 rounded-lg relative">
				<h1 className="text-lg text-center">💼 Luxenta Wallet</h1>
			</header>

			<section className="flex flex-col gap-3 max-w-[680px] w-full mx-auto flex-1">
				{/* Balance Card */}
				<div className="bg-[#0a0f1c] border border-white/18 rounded-lg p-4 backdrop-blur-sm shadow-lg">
					<h3 className="text-center text-[#00e5ff] font-bold mb-2">
						আপনার ব্যালেন্স
					</h3>
					<div className="grid grid-cols-2 gap-3">
						<div className="border border-white/18 bg-white/6 rounded-lg p-3 text-center">
							<div className="text-xs text-[#9fb3c8]">মেইন ব্যালেন্স</div>
							<div className="text-lg font-bold text-[#00e5ff]">
								{fmt(mainBal)}
							</div>
						</div>
						<div className="border border-white/18 bg-white/6 rounded-lg p-3 text-center">
							<div className="text-xs text-[#9fb3c8]">Luxenta Wallet</div>
							<div className="text-lg font-bold text-[#00e5ff]">
								{fmt(walletBal)}
							</div>
						</div>
					</div>
					<div className="flex justify-between mt-2 text-xs text-[#9fb3c8]">
						<span>দৈনিক লাভ: 0.71% (Compound)</span>
						<span>শেষ হালনাগাদ: {lastCalc?.toLocaleString() || "—"}</span>
					</div>
					<p className="text-xs text-[#9fb3c8] text-center mt-1">
						💡 Wallet-এর টাকা ব্যবহার করার আগে মেইন ব্যালেন্সে ফেরত আনতে হবে।
					</p>
				</div>

				{/* Main → Wallet */}
				<div className="bg-[#0a0f1c] border border-white/18 rounded-lg p-4 backdrop-blur-sm shadow-lg">
					<h3 className="text-center text-[#00e5ff] font-bold mb-2">
						মেইন → Wallet ট্রান্সফার
					</h3>
					<div className="flex gap-2">
						<input
							type="number"
							min={1}
							step={1}
							placeholder="ট্রান্সফার পরিমাণ (৳)"
							value={toWalletAmt}
							onChange={e =>
								setToWalletAmt(
									e.target.value === "" ? "" : parseFloat(e.target.value)
								)
							}
							className="flex-1 p-2 rounded-lg border border-white/18 bg-white/8 text-[#e6f1ff]"
							disabled={isLoading} // লোডিং অবস্থায় ডিসেবল
						/>
						<Button
							className="rounded-sm"
							onClick={handleToWallet}
							disabled={isLoading} // লোডিং অবস্থায় ডিসেবল
						>
							{isLoading ? "ট্রান্সফার হচ্ছে..." : "Wallet-এ পাঠান"}
						</Button>
					</div>
				</div>

				{/* Wallet → Main */}
				<div className="bg-[#0a0f1c] border border-white/18 rounded-lg p-4 backdrop-blur-sm shadow-lg">
					<h3 className="text-center text-[#00e5ff] font-bold mb-2">
						Wallet → মেইন ট্রান্সফার
					</h3>
					<div className="flex gap-2">
						<input
							type="number"
							min={1}
							step={1}
							placeholder="ট্রান্সফার পরিমাণ (৳)"
							value={toMainAmt}
							onChange={e =>
								setToMainAmt(
									e.target.value === "" ? "" : parseFloat(e.target.value)
								)
							}
							className="flex-1 p-2 rounded-lg border border-white/18 bg-white/8 text-[#e6f1ff]"
							disabled={isLoading} // লোডিং অবস্থায় ডিসেবল
						/>
						<Button
							variant="secondary"
							className="rounded-sm"
							onClick={handleToMain}
							disabled={isLoading} // লোডিং অবস্থায় ডিসেবল
						>
							{isLoading ? "ফিরিয়ে নেওয়া হচ্ছে..." : "মেইনে ফিরিয়ে নিন"}
						</Button>
					</div>
				</div>

				{/* History Button */}
				<button className="btn mx-auto" onClick={() => setShowHistory(true)}>
					📜 হিস্টোরি
				</button>

				{/* History Modal */}
				{showHistory && (
					<div
						className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col p-4 overflow-y-auto z-50"
						onClick={() => setShowHistory(false)}>
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-white text-lg font-bold">
								📝 ট্রান্সফার হিস্টোরি
							</h3>
							<button
								className="text-white font-bold text-xl px-2"
								onClick={() => setShowHistory(false)}>
								&times;
							</button>
						</div>
						<div className="flex flex-col gap-2">
							{history.length === 0 ? (
								<p className="text-center text-[#9fb3c8]">
									কোনও ট্রান্সফার হয়নি।
								</p>
							) : (
								history.map((item, i) => (
									<div
										key={i}
										className={`flex justify-between items-center p-2 rounded-lg border border-white/18 ${
											item.type === "Main → Wallet"
												? "bg-[#00bfff14]"
												: "bg-[#ffbf0014]"
										}`}>
										<span className="font-bold">{item.type}</span>
										<span>{fmt(item.amt)}</span>
										<span className="text-xs text-[#9fb3c8]">{item.time}</span>
									</div>
								))
							)}
						</div>
					</div>
				)}

				{/* Rules Card */}
				<div className="bg-[#0a0f1c] border border-white/18 rounded-lg p-4 backdrop-blur-sm shadow-lg">
					<h3 className="text-center text-[#00e5ff] font-bold mb-2">
						নিয়মাবলী
					</h3>
					<ul className="list-disc list-inside text-xs text-[#9fb3c8]">
						<li>লাভ হিসাব: প্রতিদিন 0.71% কম্পাউন্ড</li>
						<li>লাভ জমা হয়: Luxenta Wallet (স্বয়ংক্রিয়)</li>
						<li>ব্যবহার: এডভান্স/উইথড্রর আগে Wallet → মেইন</li>
					</ul>
					<p className="text-[10px] mt-1 text-[#9fb3c8]">
						ℹ️ এই পেজ খোলার সাথে সাথে শেষ হালনাগাদ থেকে যতদিন পেরিয়েছে, সেই
						হিসাবে Wallet ব্যালেন্সে লাভ যোগ হয়।
					</p>
				</div>
			</section>
		</main>
	);
}
