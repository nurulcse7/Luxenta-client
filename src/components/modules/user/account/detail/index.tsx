"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthService";
import { useRouter } from "next/navigation";
import React from "react";

export default function MyAccountDetail() {
	const { user } = useUser();
	const router = useRouter();

	if (!user) {
		return (
			<div className="min-h-screen flex items-center justify-center text-gray-400">
				Loading user info...
			</div>
		);
	}

	const isActive = user.investorInfo?.isActive === "ACTIVE" && !user.is_deleted;

	const handleLogout = async () => {
		try {
			await logout();
			router.push("/login");
		} catch (err) {
			console.error("Logout failed:", err);
		}
	};

	return (
		<section className="max-w-3xl mx-auto mt-8 p-6 bg-white/5 backdrop-blur-lg rounded-2xl shadow-lg text-white">
			<h1 className="text-2xl font-bold mb-6">আমার অ্যাকাউন্ট</h1>

			{/* User Info */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
				<InfoCard label="নাম" value={user.name} />
				<InfoCard label="ইমেইল" value={user.email} />
				<InfoCard label="মোবাইল নম্বর" value={user.number || "নির্ধারিত নেই"} />
				<InfoCard
					label="অ্যাকাউন্ট স্ট্যাটাস"
					value={isActive ? "সক্রিয়" : "নিষ্ক্রিয়"}
				/>

				{user.role === "investor" && user.investorInfo && (
					<>
						<InfoCard label="লেভেল" value={user.investorInfo.level} />
						<InfoCard
							label="ওয়ালেট ব্যালেন্স"
							value={`৳ ${user.investorInfo.walletBalance.toLocaleString()}`}
						/>
						<InfoCard
							label="মোট ডিপোজিট"
							value={`৳ ${user.investorInfo.totalDeposit.toLocaleString()}`}
						/>
						<InfoCard
							label="মোট আয়"
							value={`৳ ${user.investorInfo.totalEarnings.toLocaleString()}`}
						/>
						<InfoCard
							label="মোট উত্তোলন"
							value={`৳ ${user.investorInfo.totalWithdraw.toLocaleString()}`}
						/>
					</>
				)}
			</div>

			{/* Role-specific info */}
			<div className="mb-6 p-4 bg-white/10 rounded-xl">
				<p className="text-gray-300 text-sm">রোল</p>
				<p className="font-semibold text-lg capitalize">{user.role}</p>

				{user.role === "investor" && (
					<p className="mt-2 text-green-400 text-sm">💰 Investor account</p>
				)}
			</div>

			{/* Actions */}
			<div className="flex flex-col sm:flex-row gap-4">
				<Button className="w-full">অ্যাকাউন্ট এডিট করুন</Button>
				<Button onClick={handleLogout} className="w-full" variant="destructive">
					লগআউট
				</Button>
			</div>
		</section>
	);
}

const InfoCard = ({
	label,
	value,
}: {
	label: string;
	value: React.ReactNode;
}) => (
	<div className="p-4 bg-white/10 rounded-xl">
		<p className="text-gray-300 text-sm">{label}</p>
		<p className="font-semibold text-lg">{value}</p>
	</div>
);
