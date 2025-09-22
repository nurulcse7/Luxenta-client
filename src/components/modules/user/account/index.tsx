"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthService";

const Dashboard: React.FC = () => {
	const { user } = useUser();
	const router = useRouter();

	if (!user) return null;

	const investor = user.role === "investor" ? user.investorInfo : null;
	const handleLogout = async () => {
		try {
			await logout();
			router.push("/login");
		} catch (err) {
			console.error("Logout failed:", err);
		}
	};
	return (
		<div className="min-h-screen    font-sans p-3 ">
			{/* Header */}
			<div className="flex items-center gap-3 bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-[18px] shadow-[0_10px_30px_rgba(0,0,0,.35),0_1px_0_rgba(255,255,255,.04)_inset] backdrop-blur-md p-4 mb-4 transition">
				<img
					src={user?.avatar || "https://via.placeholder.com/60"}
					alt={user?.name}
					width={48}
					height={48}
					className="w-12 h-12 rounded-full border-2 border-[#00e5ff]"
				/>
				<div>
					<h2 className="font-bold text-lg">{user.name}</h2>
					<p className="text-sm text-[#9fb3c8]">
						ইউজারআইডি: <span className="font-semibold">{user.id || "N/A"}</span>
					</p>
				</div>
			</div>

			{/* Account Card */}
			<div className="bg-black rounded-2xl p-6 text-center relative shadow-[0_0_15px_3px_#bfa66a] m-4">
				<p className="uppercase tracking-wide font-semibold">
					অ্যাকাউন্ট ফান্ড (৳)
				</p>
				<h1 className="text-4xl font-bold">
					৳{investor ? investor.walletBalance.toLocaleString() : "0.00"}
				</h1>

				{/* Metrics */}
				<div className="flex gap-3 justify-center mt-4">
					<Metric
						title="মোট ডিপোজিট"
						value={investor?.totalDeposit ?? 0}
						isCurrency
					/>
					<Metric
						title="মোট আয়"
						value={investor?.totalEarnings ?? 0}
						isCurrency
					/>
					<Metric
						title="মোট উত্তোলন"
						value={investor?.totalWithdraw ?? 0}
						isCurrency
					/>
					<Metric title="টিম সাইজ" value={investor?.teamSize ?? 0} />
				</div>

				{/* Account Detail Button */}
				<button
					onClick={() => router.push("/account/detail")}
					className="mt-4 px-6 py-2 rounded-full font-bold bg-gradient-to-br from-[#00e5ff] to-[#6a5cff] border border-[#00e5ff] text-[#051018] hover:shadow-[0_6px_18px_rgba(0,229,255,.3)] transition">
					অ্যাকাউন্ট বিস্তারিত
				</button>
			</div>

			{/* Menu */}
			<div className="mt-4">
				{[
					{
						label: "ইতিহাস",
						icon: HistoryIcon,
						action: () => router.push("/history"),
					},
					{
						label: "নোটিফিকেশন",
						icon: BellIcon,
						action: () => router.push("/notifications"),
					},
					{
						label: "আমার সাহায্য",
						icon: HelpIcon,
						action: () => router.push("/support"),
					},
					{
						label: "লগইন পাসওয়ার্ড",
						icon: LockIcon,
						action: () => router.push("/account/password"),
					},
					{
						label: "উত্তোলন পাসওয়ার্ড",
						icon: ArrowLeftIcon,
						action: () => router.push("/account/withdraw-password"),
					},
					{
						label: "উত্তোলন অ্যাকাউন্ট",
						icon: MenuIcon,
						action: () => router.push("/account/withdraw-account"),
					},
					{
						label: "সাইন আউট",
						icon: SignOutIcon,
						danger: true,
						action: () => handleLogout(),
					},
				].map((item, i) => (
					<div
						key={i}
						onClick={item.action}
						className={`flex justify-between items-center p-4 rounded-xl m-2 cursor-pointer transition ${
							item.danger
								? "text-[#ff5c7a] border border-[#ff5c7a] bg-[rgba(255,255,255,0.06)]"
								: "bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)]"
						}`}>
						<div
							className={`flex items-center gap-3 ${
								item.danger ? "text-[#ff5c7a]" : "text-white"
							}`}>
							<item.icon />
							<span>{item.label}</span>
						</div>
						<span
							className={`text-lg ${
								item.danger ? "text-[#ff5c7a]" : "text-white"
							}`}>
							›
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

const Metric = ({
	title,
	value,
	isCurrency = false,
}: {
	title: string;
	value: number;
	isCurrency?: boolean;
}) => (
	<div className="flex-1 bg-[rgba(255,255,255,0.06)] p-4 rounded-xl text-center border border-[rgba(255,255,255,0.18)]">
		<p className="text-xs text-white opacity-80">{title}</p>
		<p className="text-lg font-bold text-white mt-1">
			{isCurrency ? `৳ ${value.toLocaleString()}` : value.toLocaleString()}
		</p>
	</div>
);

/* SVG ICONS */
const HelpIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="w-5 h-5"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M8 10h.01M12 14h.01M16 10h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
		/>
	</svg>
);
const LockIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="w-5 h-5"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M12 15c.828 0 1.5-.672 1.5-1.5S12.828 12 12 12s-1.5.672-1.5 1.5S11.172 15 12 15z"
		/>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M17 8V6a5 5 0 00-10 0v2M5 8h14v12H5V8z"
		/>
	</svg>
);
const ArrowLeftIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="w-5 h-5"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M10 17l5-5m0 0l-5-5m5 5H3"
		/>
	</svg>
);
const MenuIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="w-5 h-5"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M3 7h18M3 12h18M3 17h18"
		/>
	</svg>
);
const SignOutIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="w-5 h-5"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M17 16l4-4m0 0l-4-4m4 4H7"
		/>
	</svg>
);
const HistoryIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="w-5 h-5"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
		/>
	</svg>
);
const BellIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="w-5 h-5"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.288V13a6 6 0 00-6-6H9a6 6 0 00-6 6v1.288A2.032 2.032 0 014.405 15.595L3 17h5m0 0a2 2 0 100 4 2 2 0 000-4z"
		/>
	</svg>
);

export default Dashboard;
