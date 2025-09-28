"use client";

import { useUser } from "@/context/UserContext";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
	createCheckIn,
	getMyCheckIns,
	getLastCheckIn,
} from "@/services/CheckInService";

function yyyyMMdd(d: Date) {
	return (
		d.getFullYear() +
		"-" +
		String(d.getMonth() + 1).padStart(2, "0") +
		"-" +
		String(d.getDate()).padStart(2, "0")
	);
}
function dateTimeFmt(d: Date) {
	return d.toLocaleString("bn-BD", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
}
function toISOWeek(date: Date) {
	const d = new Date(
		Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
	);
	const dayNum = d.getUTCDay() || 7;
	d.setUTCDate(d.getUTCDate() + 4 - dayNum);
	const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	const weekNo = Math.ceil(
		((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
	);
	return { year: d.getUTCFullYear(), week: weekNo };
}

interface CheckInHistory {
	date: string;
	dateTime: string;
	bonus: number;
	isoWeek: { year: number; week: number };
}

const DailyCheckin = () => {
	const { user } = useUser();
	const [mainBalance, setMainBalance] = useState(
		user?.investorInfo?.walletBalance || 0
	);
	const [todayBonusAmount, setTodayBonusAmount] = useState(1);
	const [history, setHistory] = useState<CheckInHistory[]>([]);
	const [lastCheckinDate, setLastCheckinDate] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isGlow, setIsGlow] = useState(false);
	const [viewDate, setViewDate] = useState(new Date());

	// 🔹 Load history + last check-in from API
	useEffect(() => {
		const fetchData = async () => {
			const histRes = await getMyCheckIns();
			if (histRes?.success) {
				setHistory(
					histRes.data.map((h: any) => ({
						date: h.date,
						dateTime: h.dateTime,
						bonus: h.bonus,
						isoWeek: { year: h.isoWeekYear, week: h.isoWeekNo },
					}))
				);
			}

			const lastRes = await getLastCheckIn();
			if (lastRes?.success && lastRes.data) {
				setLastCheckinDate(lastRes.data.date);
			}

			// main balance update from user
			if (user?.investorInfo?.walletBalance) {
				setMainBalance(user.investorInfo.walletBalance);
			}
		};

		fetchData();
	}, [user]);

	// 🔹 Bonus calculation
	useEffect(() => {
		const last = history[0];
		const today = new Date();
		const lastDate = last ? new Date(last.date) : null;
		let newBonus = 1;
		if (
			lastDate &&
			Math.floor((today.getTime() - lastDate.getTime()) / 86400000) === 1
		) {
			newBonus = last.bonus < 7 ? last.bonus + 1 : 1;
		}
		setTodayBonusAmount(newBonus);
	}, [history]);

	// 🔹 Handle check-in action
	const handleCheckin = async () => {
		const today = new Date();
		const dateStr = yyyyMMdd(today);
		const alreadyChecked =
			lastCheckinDate === dateStr || history.some(h => h.date === dateStr);
		if (alreadyChecked) {
			toast.error("আজকের চেক-ইন সম্পন্ন হয়েছে ✅");
			return;
		}

		setIsGlow(true);
		setTimeout(() => setIsGlow(false), 600);

		const iso = toISOWeek(today);
		const dtStr = dateTimeFmt(today);

		const payload = {
			bonus: todayBonusAmount,
			isoWeekYear: iso.year,
			isoWeekNo: iso.week,
			date: dateStr,
			dateTime: today.toISOString(),
		};

		const res = await createCheckIn(payload);
		if (res?.success) {
			setMainBalance(prev => prev + todayBonusAmount);
			setHistory(prev => [
				{
					date: dateStr,
					dateTime: dtStr,
					bonus: todayBonusAmount,
					isoWeek: iso,
				},
				...prev,
			]);
			setLastCheckinDate(dateStr);
			toast.success(`চেক-ইন সম্পন্ন! +৳${todayBonusAmount}`);
		} else {
			toast.error("চেক-ইন ব্যর্থ হয়েছে ❌");
		}
	};

	// 🔹 Render calendar
	const renderCalendar = () => {
		const startOfMonth = new Date(
			viewDate.getFullYear(),
			viewDate.getMonth(),
			1
		);
		const endOfMonth = new Date(
			viewDate.getFullYear(),
			viewDate.getMonth() + 1,
			0
		);
		const leadingBlanks = (startOfMonth.getDay() || 7) - 1;
		const daysInMonth = endOfMonth.getDate();
		const monthStr = String(viewDate.getMonth() + 1).padStart(2, "0");
		const calendarDays = [];

		for (let i = 0; i < leadingBlanks; i++) {
			calendarDays.push(
				<div
					key={`blank-${i}`}
					className="min-h-14 flex flex-col justify-center gap-1 p-2 text-center rounded-xl border border-dashed border-white/10"></div>
			);
		}

		for (let day = 1; day <= daysInMonth; day++) {
			const dateStr = `${viewDate.getFullYear()}-${monthStr}-${String(
				day
			).padStart(2, "0")}`;
			const hit = history.find(h => h.date === dateStr);
			const isChecked = !!hit;
			const chip = isChecked
				? `<span class="inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-green-500/20 border border-green-500/40 text-green-300 mx-auto">+৳${hit.bonus}</span>`
				: "";

			calendarDays.push(
				<div
					key={`day-${day}`}
					className={`min-h-14 flex flex-col justify-center gap-1 p-2 text-center rounded-xl border border-dashed border-white/10 ${
						isChecked
							? "border-solid border-white/30 bg-gradient-to-b from-cyan-500/20 via-fuchsia-500/20 to-fuchsia-500/20"
							: ""
					}`}>
					<div className="opacity-85">{day}</div>
					<div dangerouslySetInnerHTML={{ __html: chip }} />
				</div>
			);
		}
		return calendarDays;
	};

	// 🔹 Render history table
	const renderHistoryTable = () => {
		if (history.length === 0) {
			return (
				<tr>
					<td colSpan={3} className="p-2 text-center text-gray-400">
						কোনও চেক-ইন হয়নি
					</td>
				</tr>
			);
		}
		return history.map((h, index) => (
			<tr key={index}>
				<td className="p-2 border-b border-white/10">{h.dateTime || h.date}</td>
				<td className="p-2 border-b border-white/10">
					{h.isoWeek.year}-W{String(h.isoWeek.week).padStart(2, "0")}
				</td>
				<td className="p-2 border-b border-white/10 font-bold">৳ {h.bonus}</td>
			</tr>
		));
	};

	return (
		<main className="min-h-dvh flex flex-col gap-3 p-3 bg-gradient-radial from-[#152449] from-20% via-[#0d182e] via-45% to-[#0b1222] to-100% text-gray-100">
			<header className="flex items-center justify-center gap-2 p-3 rounded-2xl border border-white/10 bg-gradient-to-t from-fuchsia-500/10 via-cyan-500/10 to-cyan-500/10 shadow-xl">
				<h1 className="m-0 text-xl font-extrabold tracking-tight">
					✅ Luxenta • Daily Check-in
				</h1>
			</header>
			<section className="max-w-3xl w-full mx-auto flex flex-col gap-3 flex-1">
				{/* Balances Card */}
				<div className="relative p-4 bg-white/5 border border-white/10 rounded-2xl shadow-xl backdrop-blur-sm">
					<h3 className="mb-3 text-base text-cyan-400 font-black text-center">
						আপনার ব্যালেন্স
						<button
							onClick={() => setIsModalOpen(true)}
							className="absolute top-3 right-3 px-2.5 py-1 text-xs text-gray-200 bg-transparent border border-gray-300/40 rounded-lg">
							রেকড
						</button>
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						<div className="p-3 text-center rounded-xl border border-white/10 bg-white/5">
							<div className="text-sm text-gray-400 mb-1.5">মেইন ব্যালেন্স</div>
							<div className="text-2xl font-black text-cyan-400">
								৳ {mainBalance}
							</div>
						</div>
						<div className="p-3 text-center rounded-xl border border-white/10 bg-white/5">
							<div className="text-sm text-gray-400 mb-1.5">
								আজকের সম্ভাব্য বোনাস
							</div>
							<div className="text-2xl font-black text-cyan-400">
								৳ {todayBonusAmount}
							</div>
						</div>
					</div>
					<div className="flex gap-2 flex-wrap justify-between mt-2 text-xs text-gray-400 leading-tight">
						<div>ডেইলি রুল: প্রতিদিন +৳1, ৭ দিনে রিসেট</div>
						<div>সাপ্তাহিক রিসেট: সপ্তাহ শেষ হলে আবার ১ টাকা থেকে শুরু</div>
					</div>
				</div>
				{/* Check-in Card */}
				<div className="relative p-4 bg-white/5 border border-white/10 rounded-2xl shadow-xl backdrop-blur-sm">
					<h3 className="mb-3 text-base text-cyan-400 font-black text-center">
						আজকের চেক-ইন
					</h3>
					<div className="flex justify-center">
						<button
							onClick={handleCheckin}
							className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl cursor-pointer select-none border border-white/10 bg-gradient-to-br from-cyan-500 to-fuchsia-500 text-gray-900 font-black shadow-[0_12px_28px_rgba(0,229,255,0.15)] transition-all active:translate-y-px active:shadow-[0_8px_20px_rgba(0,229,255,0.12)] relative overflow-hidden ${
								isGlow ? "glow" : ""
							}`}>
							🎁 Check-in করুন
						</button>
					</div>
					<p className="text-center text-gray-400 mt-2 text-sm">
						চেক-ইন করলে বোনাস সরাসরি মেইন ব্যালেন্সে যুক্ত হবে।
					</p>
				</div>
				{/* Calendar Card */}
				<div className="relative p-4 bg-white/5 border border-white/10 rounded-2xl shadow-xl backdrop-blur-sm">
					<h3 className="mb-3 text-base text-cyan-400 font-black text-center">
						ক্যালেন্ডার ভিউ
					</h3>
					<div className="grid gap-2">
						<div className="flex items-center justify-between gap-2 p-2.5 rounded-xl border border-white/10 bg-white/5">
							<button
								onClick={() =>
									setViewDate(
										new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1)
									)
								}
								className="px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5">
								‹
							</button>
							<div className="font-black">
								{viewDate.toLocaleString("bn-BD", {
									month: "long",
									year: "numeric",
								})}
							</div>
							<button
								onClick={() =>
									setViewDate(
										new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1)
									)
								}
								className="px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5">
								›
							</button>
						</div>
						<div className="grid grid-cols-7 gap-1.5">
							{["সোম", "মঙ্গল", "বুধ", "বৃহস্পতি", "শুক্র", "শনি", "রবি"].map(
								dow => (
									<div
										key={dow}
										className="text-center p-2 rounded-xl border border-dashed border-white/10 text-xs text-gray-400 font-bold bg-white/10">
										{dow}
									</div>
								)
							)}
						</div>
						<div className="grid grid-cols-7 gap-1.5">{renderCalendar()}</div>
					</div>
				</div>
			</section>

			{/* Record Modal */}
			{isModalOpen && (
				<div
					onClick={e => e.target === e.currentTarget && setIsModalOpen(false)}
					className="fixed inset-0 flex flex-col items-center p-5 bg-black/95 z-50 overflow-auto">
					<div className="flex justify-center items-center mb-3 relative w-full">
						<h3 className="text-white">চেক-ইন রেকড</h3>
						<button
							onClick={() => setIsModalOpen(false)}
							className="absolute top-0 right-0 p-2 text-white font-black text-lg">
							✖
						</button>
					</div>
					<div className="w-full max-w-lg overflow-auto border border-white/10 rounded-xl">
						<table className="w-full text-sm border-collapse">
							<thead>
								<tr>
									<th className="sticky top-0 p-2 bg-white/10 backdrop-blur-sm">
										তারিখ ও সময়
									</th>
									<th className="sticky top-0 p-2 bg-white/10 backdrop-blur-sm">
										সপ্তাহ (ISO)
									</th>
									<th className="sticky top-0 p-2 bg-white/10 backdrop-blur-sm">
										বোনাস
									</th>
								</tr>
							</thead>
							<tbody>{renderHistoryTable()}</tbody>
						</table>
					</div>
				</div>
			)}
		</main>
	);
};

export default DailyCheckin;
