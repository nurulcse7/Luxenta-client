"use client";

import { useUser } from "@/context/UserContext";
import { getWithdrawMethod } from "@/services/WithdrawAccountService";
import { createWithdrawRequest } from "@/services/WithdrawService";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface WithdrawRecord {
	serialId: string;
	date: string;
	amount: number;
}

const DAILY_LIMIT = 8000;

const Withdraw = () => {
	const { user } = useUser(); // user.investorInfo.withdrawPassword
	const [userBalance, setUserBalance] = useState(15000);
	const [amount, setAmount] = useState<number | "">("");
	const [withdrawableToday, setWithdrawableToday] = useState(0);
	const [serialCode, setSerialCode] = useState("");
	const [records, setRecords] = useState<WithdrawRecord[]>([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [withdrawMethodExists, setWithdrawMethodExists] = useState(false);

	const router = useRouter();

	// check withdraw method from API
	useEffect(() => {
		(async () => {
			const res = await getWithdrawMethod();
			if (res?.success && res?.data) {
				setWithdrawMethodExists(true);
			} else {
				setWithdrawMethodExists(false);
			}
			setLoading(false);
		})();
	}, []);

	// generate serial
	useEffect(() => {
		const code = Array.from({ length: 35 }, () =>
			Math.floor(Math.random() * 10)
		).join("");
		setSerialCode(code);
	}, []);

	// recalc withdrawable
	useEffect(() => {
		setWithdrawableToday(Math.min(userBalance, DAILY_LIMIT));
	}, [userBalance]);

	const handleWithdraw = async () => {
		const amt = Number(amount);

		if (!(amt > 0)) {
			alert("সঠিক এমাউন্ট লিখুন");
			return;
		}
		if (amt > withdrawableToday) {
			alert(`আজকে সর্বোচ্চ ৳${withdrawableToday} উত্তোলন করা যাবে`);
			return;
		}
		if (!user?.investorInfo?.withdrawPassword) {
			alert("❌ প্রথমে একটি Withdraw Password সেট করুন");
			return;
		}
		if (!withdrawMethodExists) {
			alert("❌ আপনার কোনো Withdraw Account সেট করা নেই");
			return;
		}

		// create withdraw API call
		const res = await createWithdrawRequest({
			amount: amt,
			withdrawPassword: user.investorInfo.withdrawPassword,
		});

		if (!res.success) {
			alert(res.message || "Withdraw failed");
			return;
		}

		// update balance + record
		setUserBalance(prev => prev - amt);
		const newRecord: WithdrawRecord = {
			serialId: serialCode,
			date: new Date().toLocaleString(),
			amount: amt,
		};
		setRecords(prev => [newRecord, ...prev]);
		setAmount("");
		setSerialCode("");
		setModalOpen(true);
	};

	if (loading) {
		return <div className="p-5 text-center text-[#9fb3c8]">লোড হচ্ছে...</div>;
	}

	// no password set
	if (!user?.investorInfo?.withdrawPassword) {
		return (
			<div className="flex flex-col items-center justify-center h-[80vh] text-center gap-4">
				<p className="text-red-400 font-semibold text-lg">
					❌ আপনার কোনো Withdraw Password সেট করা নেই
				</p>
				<button
					onClick={() => router.push("/set-withdraw-password")}
					className="px-4 py-2 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#6a5cff] text-[#051018] font-bold">
					Set Withdraw Password
				</button>
			</div>
		);
	}

	// no withdraw method set
	if (!withdrawMethodExists) {
		return (
			<div className="flex flex-col items-center justify-center h-[80vh] text-center gap-4">
				<p className="text-red-400 font-semibold text-lg">
					❌ আপনি কোনো Withdraw Method সেট করেননি
				</p>
				<button
					onClick={() => router.push("/set-withdraw-method")}
					className="px-4 py-2 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#6a5cff] text-[#051018] font-bold">
					Set Withdraw Method
				</button>
			</div>
		);
	}

	return (
		<main className="max-h-[90vh] flex flex-col gap-3 p-3 text-[#e6f1ff]">
			{/* Topbar */}
			<header className="flex justify-center items-center gap-3 p-2 font-bold bg-gradient-to-b from-[#6a5cff1f] to-[#00e5ff14] border-b border-white/18 rounded-lg relative">
				<h1 className="flex-1 text-center text-lg">উত্তোলন</h1>
				<button
					className="absolute right-3 px-2 py-1 rounded-md bg-white/10 text-[#00e5ff] text-xs font-bold"
					onClick={() => setModalOpen(true)}>
					রেকর্ড
				</button>
			</header>

			{/* Form */}
			<section className="flex flex-col gap-3 max-w-md w-full mx-auto flex-1">
				<div className="bg-white/6 border border-white/18 rounded-lg p-2 text-center">
					<div className="text-xs text-[#9fb3c8]">সিরিয়াল নম্বর</div>
					<div className="font-mono text-gray-300 text-lg">{serialCode}</div>
				</div>

				<div className="bg-white/6 border border-white/18 rounded-lg p-3">
					<div className="text-xs text-[#9fb3c8] mb-1 text-center">
						উত্তোলন এমাউন্ট
					</div>
					<input
						type="number"
						min={1}
						step={1}
						placeholder="এখানে এমাউন্ট লিখুন (৳)"
						value={amount}
						onChange={e =>
							setAmount(e.target.value === "" ? "" : parseFloat(e.target.value))
						}
						className="w-full p-2 rounded-lg border border-white/18 bg-white/8 text-[#e6f1ff]"
					/>
					<div className="text-[10px] text-[#9fb3c8] text-center mt-1">
						আজকের সীমা: ৳{DAILY_LIMIT}
					</div>

					<div className="grid grid-cols-2 gap-2 mt-2">
						<div className="border border-white/18 rounded-lg p-2 text-center bg-white/5">
							<div className="text-lg font-bold text-[#00e5ff]">
								৳ {userBalance}
							</div>
							<div className="text-[10px] text-[#9fb3c8] mt-1">
								আপনার একাউন্টে এছাড়াও রয়েছে
							</div>
						</div>
						<div className="border border-white/18 rounded-lg p-2 text-center bg-white/5">
							<div className="text-lg font-bold text-[#00e5ff]">
								৳ {withdrawableToday}
							</div>
							<div className="text-[10px] text-[#9fb3c8] mt-1">
								উত্তোলন করা যাবে
							</div>
						</div>
					</div>
				</div>

				{/* Rules */}
				<div className="bg-white/6 border border-white/18 rounded-lg p-3 text-center text-sm text-[#e6f1ff]">
					<h3 className="text-[#00e5ff] mb-1">উত্তোলনের নিয়ম:</h3>
					<ul className="list-disc list-inside text-xs">
						<li>উত্তোলনের সময়: সোমবার–শুক্রবার সকাল ৯টা থেকে সন্ধ্যা ৬টা।</li>
						<li>উত্তোলনের ফি: ৬%</li>
						<li>উত্তোলনের পরিমাণের পরিসীমা: ৮০০০–৮০০০০</li>
						<li>উত্তোলনের অর্থ ২–৭২ ঘন্টার মধ্যে জমা হবে।</li>
						<li>ব্যবহারকারীর অবস্থানের স্তর অনুসারে সীমা সমন্বয় হতে পারে।</li>
					</ul>
				</div>

				<div className="mt-auto">
					<button
						onClick={handleWithdraw}
						className="w-full p-3 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#6a5cff] font-bold text-[#051018]">
						উত্তোলনের জন্য আবেদন করুন
					</button>
				</div>
			</section>

			{/* Modal */}
			{modalOpen && (
				<div
					className="fixed inset-0 flex justify-center items-center bg-black/60 z-50"
					onClick={() => setModalOpen(false)}>
					<div
						className="bg-gradient-to-br from-[#041f2e] to-[#0a0f1c] rounded-lg p-4 max-w-sm w-[90%] max-h-[80%] overflow-y-auto"
						onClick={e => e.stopPropagation()}>
						<div className="flex justify-center items-center relative mb-2">
							<h3 className="text-[#00e5ff]">উত্তোলনের রেকর্ড</h3>
							<span
								className="absolute right-0 cursor-pointer font-bold"
								onClick={() => setModalOpen(false)}>
								&times;
							</span>
						</div>
						<div className="flex flex-col gap-2">
							{records.length === 0 ? (
								<p className="text-[#9fb3c8] text-center">কোনো রেকর্ড নেই</p>
							) : (
								records.map((r, i) => (
									<div
										key={i}
										className="flex justify-between bg-[#00e5ff14] border-l-4 border-[#00e5ff] p-2 rounded-md">
										<span className="text-xs font-bold">
											{r.serialId.split("").join(" ")}
										</span>
										<span className="text-xs">
											৳{r.amount} - {r.date}
										</span>
									</div>
								))
							)}
						</div>
					</div>
				</div>
			)}
		</main>
	);
};

export default Withdraw;
