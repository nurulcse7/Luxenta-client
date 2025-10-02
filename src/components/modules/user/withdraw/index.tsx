"use client";

import { useUser } from "@/context/UserContext";
import { useSetting } from "@/context/SettingContext";
import { getWithdrawMethod } from "@/services/WithdrawAccountService";
import {
	createWithdrawRequest,
	getMyWithdraws,
} from "@/services/WithdrawService";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface WithdrawRecord {
	serialId: string;
	createdAt: string;
	amount: number;
}

// ✅ Helper: Convert 24h -> AM/PM
function formatTimeToAMPM(time?: string) {
	if (!time) return "";
	const [h, m] = time.split(":").map(Number);
	const date = new Date();
	date.setHours(h, m);
	return date.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});
}

// ✅ Helper: Generate Serial
function generateSerial() {
	return Array.from({ length: 35 }, () => Math.floor(Math.random() * 10)).join(
		""
	);
}

const Withdraw = () => {
	const { user } = useUser();
	const { settings, isLoading: settingsLoading } = useSetting();
	const withdrawSettings = settings?.withdraw;
	const [amount, setAmount] = useState<number | "">("");
	const [withdrawableToday, setWithdrawableToday] = useState(0);
	const [serialCode, setSerialCode] = useState("");
	const [records, setRecords] = useState<WithdrawRecord[]>([]);
	const [loading, setLoading] = useState(true);
	const [withdrawMethodExists, setWithdrawMethodExists] = useState(false);
	const [passwordModal, setPasswordModal] = useState(false);
	const [recordsModal, setRecordsModal] = useState(false);
	const [withdrawPassword, setWithdrawPassword] = useState("");
	const [userBalance, setUserBalance] = useState<number>(0);

	const router = useRouter();

	// ✅ setUserBalance
	useEffect(() => {
		if (user?.investorInfo?.walletBalance !== undefined) {
			setUserBalance(user.investorInfo.walletBalance);
		}
	}, [user]);

	// ✅ withdraw method check
	useEffect(() => {
		(async () => {
			const res = await getWithdrawMethod();
			setWithdrawMethodExists(!!(res?.success && res?.data));
			setLoading(false);
		})();
	}, []);

	// ✅ initial serial generate
	useEffect(() => {
		setSerialCode(generateSerial());
	}, []);

	// ✅ today withdraw হিসাব
	useEffect(() => {
		const fetchRecords = async () => {
			const res = await getMyWithdraws();
			if (res.success && res.data) {
				setRecords(res.data);
				// ✅ আজকের withdraw হিসাব
				const today = new Date().toDateString();
				const todayTotal = res.data
					.filter(
						(w: WithdrawRecord) =>
							new Date(w.createdAt).toDateString() === today
					)
					.reduce((sum: number, w: WithdrawRecord) => sum + w.amount, 0);

				if (withdrawSettings) {
					const remaining = Math.max(
						0,
						Math.min(userBalance, withdrawSettings.dailyLimit - todayTotal)
					);
					setWithdrawableToday(remaining);
				}
			} else {
				toast.error(res.message);
			}
		};
		if (withdrawSettings) fetchRecords();
	}, [userBalance, withdrawSettings]);

	// ✅ calculate day + time rules
	const [isDayAllowed, setIsDayAllowed] = useState(false);
	const [isTimeAllowed, setIsTimeAllowed] = useState(false);

	useEffect(() => {
		if (withdrawSettings) {
			const today = new Date();
			const todayName = today.toLocaleDateString("en-US", { weekday: "long" });

			const dayOk = withdrawSettings.allowedDays.some(
				d => d.toLowerCase() === todayName.toLowerCase()
			);
			setIsDayAllowed(dayOk);

			const nowMinutes = today.getHours() * 60 + today.getMinutes();
			const parseTime = (t?: string) => {
				if (!t) return null;
				const [h, m] = t.split(":").map(Number);
				return h * 60 + m;
			};
			const start = parseTime(withdrawSettings.startTime) ?? 0;
			const end = parseTime(withdrawSettings.endTime) ?? 24 * 60;

			const timeOk = nowMinutes >= start && nowMinutes <= end;
			setIsTimeAllowed(timeOk);
		}
	}, [withdrawSettings]);

	// ✅ withdraw handler
	const confirmWithdraw = async () => {
		if (!withdrawSettings) return;

		const amt = Number(amount);

		if (!(amt > 0)) {
			alert("সঠিক এমাউন্ট লিখুন");
			return;
		}
		if (amt < withdrawSettings.minAmount || amt > withdrawSettings.maxAmount) {
			alert(
				`উত্তোলনের পরিমাণ হতে হবে ৳${withdrawSettings.minAmount} – ৳${withdrawSettings.maxAmount}`
			);
			return;
		}
		if (amt > withdrawableToday) {
			alert(`আজকে সর্বোচ্চ ৳${withdrawableToday} উত্তোলন করা যাবে`);
			return;
		}
		if (!withdrawPassword) {
			toast.error("Withdraw Password লিখুন");
			return;
		}
		const data = { serialId: serialCode, amount: amt, withdrawPassword };
		const res = await createWithdrawRequest(data);

		if (!res.success) {
			toast.error(res.message || "Withdraw failed");
			return;
		}

		setUserBalance(prev => prev - amt);
		const newRecord: WithdrawRecord = {
			serialId: serialCode,
			createdAt: new Date().toISOString(),
			amount: amt,
		};
		setRecords(prev => [newRecord, ...prev]);
		setAmount("");
		setSerialCode(generateSerial());
		setPasswordModal(false);
		setWithdrawPassword("");
		toast.success(res.message || "✅ Withdraw request submitted!");
		router.push(`/withdraw/success?amount=${amt}`);
	};

	// ---------------- UI ----------------
	if (loading || settingsLoading) {
		return <div className="p-5 text-center text-[#9fb3c8]">লোড হচ্ছে...</div>;
	}

	if (!withdrawSettings?.isEnabled) {
		return (
			<div className="flex flex-col items-center justify-center h-[80vh] text-center gap-4">
				<p className="text-red-400 font-semibold text-lg">
					বর্তমানে Withdraw বন্ধ আছে
				</p>
			</div>
		);
	}

	//  withdraw method নেই
	if (!withdrawMethodExists) {
		return (
			<div className="flex flex-col items-center justify-center h-[80vh] text-center gap-4">
				<p className="text-red-400 font-semibold text-lg">
					আপনি কোনো Withdraw Method সেট করেননি
				</p>
				<Button onClick={() => router.push("/account/withdraw-account")}>
					Set Withdraw Method
				</Button>
			</div>
		);
	}
	
	//  withdraw password নেই
	if (!user?.investorInfo?.withdrawPassword) {
		return (
			<div className="flex flex-col items-center justify-center h-[80vh] text-center gap-4">
				<p className="text-red-400 font-semibold text-lg">
					আপনার কোনো Withdraw Password সেট করা নেই
				</p>
				<Button onClick={() => router.push("/account/withdraw-password")}>
					Set Withdraw Password
				</Button>
			</div>
		);
	}

	return (
		<main className="flex flex-col items-center justify-center h-[90vh] text-[#e6f1ff] p-4">
			<div className="bg-gradient-to-br from-[#0a1829] to-[#1a2a40] rounded-2xl p-6 max-w-md w-full shadow-lg">
				<h2 className="text-center text-xl font-bold mb-4">Withdraw Panel</h2>

				{/* Info cards */}
				<div className="grid grid-cols-2 gap-3 mb-4">
					<div className="p-3 bg-white/5 rounded-lg text-center">
						<div className="text-xs text-[#9fb3c8]">Balance</div>
						<div className="text-lg font-bold text-[#00e5ff]">
							৳{userBalance}
						</div>
					</div>
					<div className="p-3 bg-white/5 rounded-lg text-center">
						<div className="text-xs text-[#9fb3c8]">Withdrawable Today</div>
						<div className="text-lg font-bold text-[#00e5ff]">
							৳{withdrawableToday}
						</div>
					</div>
				</div>

				{/* Serial Code */}
				<div className="p-3 bg-white/5 rounded-lg text-center mb-3">
					<div className="text-xs text-[#9fb3c8]">Serial ID</div>
					<div className="text-sm font-mono text-[#6a5cff]">{serialCode}</div>
				</div>

				{/* Amount input */}
				<input
					type="number"
					className="w-full p-3 rounded-lg border border-white/10 bg-white/10 text-white mb-3"
					placeholder="Enter withdraw amount"
					value={amount}
					onChange={e =>
						setAmount(e.target.value === "" ? "" : Number(e.target.value))
					}
					disabled={!isDayAllowed || !isTimeAllowed}
				/>

				{/* Action Buttons */}
				<div className="flex gap-2 mb-3">
					<button
						onClick={() => setPasswordModal(true)}
						className="flex-1 py-3 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#6a5cff] text-[#051018] font-bold disabled:opacity-40"
						disabled={!isDayAllowed || !isTimeAllowed}>
						Request Withdraw
					</button>
					<button
						onClick={() => setRecordsModal(true)}
						className="px-4 py-3 rounded-lg bg-white/10 text-[#00e5ff] font-semibold">
						Records
					</button>
				</div>

				{/* Rules */}
				<div className="mt-5 text-sm text-[#9fb3c8]">
					<h3 className="text-[#00e5ff] mb-2 font-semibold">
						উত্তোলনের নিয়ম:
					</h3>
					<ul className="list-disc list-inside space-y-1">
						<li>উত্তোলনের দিন: {withdrawSettings.allowedDays.join(", ")}</li>
						<li>
							সময়: {formatTimeToAMPM(withdrawSettings.startTime)} –{" "}
							{formatTimeToAMPM(withdrawSettings.endTime)}
						</li>
						<li>ফি: {withdrawSettings.withdrawFee}%</li>
						<li>
							Min: ৳{withdrawSettings.minAmount} – Max: ৳
							{withdrawSettings.maxAmount}
						</li>
						<li>Daily Limit: ৳{withdrawSettings.dailyLimit}</li>
					</ul>
				</div>
			</div>

			{/* Password Modal */}
			{passwordModal && (
				<div className="fixed inset-0 flex justify-center items-center bg-black/70 z-50">
					<div className="bg-[#0a1829] p-6 rounded-lg max-w-sm w-full">
						<h3 className="text-lg font-bold mb-3 text-center text-[#00e5ff]">
							Withdraw Password
						</h3>
						<input
							type="password"
							className="w-full p-3 rounded-lg border border-white/10 bg-white/10 text-white mb-3"
							placeholder="Enter withdraw password"
							value={withdrawPassword}
							onChange={e => setWithdrawPassword(e.target.value)}
						/>
						<div className="flex gap-2">
							<button
								onClick={confirmWithdraw}
								className="flex-1 py-2 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#6a5cff] text-[#051018] font-bold">
								Confirm
							</button>
							<button
								onClick={() => setPasswordModal(false)}
								className="flex-1 py-2 rounded-lg bg-red-600 text-white font-bold">
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Records Modal */}
			{recordsModal && (
				<div className="fixed  inset-0 bg-black/70 flex justify-center items-start pt-16 z-50">
					<div className="bg-[#0a1829] p-6 rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto">
						<h3 className="text-lg font-bold text-[#00e5ff] mb-4 text-center">
							Withdraw Records
						</h3>
						{records.length === 0 ? (
							<p className="text-center text-[#9fb3c8]">
								কোনো রেকর্ড পাওয়া যায়নি
							</p>
						) : (
							<ul className="space-y-3 ">
								{records.map((r, idx) => (
									<li
										key={idx}
										className="p-3 bg-white/5 rounded-lg flex justify-between items-center">
										<div>
											<div className="text-sm font-semibold">৳{r.amount}</div>
											<div className="text-xs text-[#9fb3c8]">
												{new Date(r.createdAt).toLocaleString()}
											</div>
										</div>
										<span className="text-xs font-mono text-[#6a5cff]">
											{r.serialId.slice(0, 8)}...
										</span>
									</li>
								))}
							</ul>
						)}
						<button
							onClick={() => setRecordsModal(false)}
							className="mt-5 w-full py-2 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#6a5cff] text-[#051018] font-bold">
							Close
						</button>
					</div>
				</div>
			)}
		</main>
	);
};

export default Withdraw;
