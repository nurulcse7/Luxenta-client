"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthService";
import { useRouter } from "next/navigation";
import React from "react";

export default function MyAccountDetail() {
	const { user, setUser } = useUser();
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
			setUser(null);
			await logout();
			router.push("/login");
		} catch (err) {
			console.error("Logout failed:", err);
		}
	};

	return (
		<section className="max-w-4xl mx-auto mt-8 p-6 bg-white/5 backdrop-blur-lg rounded-2xl shadow-lg text-white">
			<h1 className="text-2xl font-bold mb-6">আমার অ্যাকাউন্ট</h1>

			{/* 🔹 Basic Info */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
				<InfoCard label="নাম" value={user.name} />
				<InfoCard label="ইমেইল" value={user.email} />
				<InfoCard label="মোবাইল" value={user.number || "নির্ধারিত নেই"} />
				<InfoCard
					label="অ্যাকাউন্ট স্ট্যাটাস"
					value={isActive ? "সক্রিয়" : "নিষ্ক্রিয়"}
				/>
				<InfoCard label="ইউজার আইডি" value={user.id} />
				<InfoCard
					label="ভেরিফাইড"
					value={user.is_verified ? "✅ হ্যাঁ" : "❌ না"}
				/>
				<InfoCard
					label="ডিলিটেড"
					value={user.is_deleted ? "❌ হ্যাঁ" : "✅ না"}
				/>
				<InfoCard label="স্ট্যাটাস" value={user.status} />
				<InfoCard label="Created At" value={formatDate(user.createdAt)} />
				<InfoCard label="Updated At" value={formatDate(user.updatedAt)} />
			</div>

			{/* 🔹 Role Info */}
			<div className="mb-6 p-4 bg-white/10 rounded-xl">
				<p className="text-gray-300 text-sm">রোল</p>
				<p className="font-semibold text-lg capitalize">{user.role}</p>
				{user.role === "investor" && (
					<p className="mt-2 text-green-400 text-sm">💰 Investor account</p>
				)}
			</div>

			{/* 🔹 Investor Info */}
			{user.role === "investor" && user.investorInfo && (
				<>
					<h2 className="text-xl font-semibold mb-4">Investor Details</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
						<InfoCard label="লেভেল" value={user.investorInfo.level} />
						<InfoCard
							label="ওয়ালেট ব্যালেন্স"
							value={`৳ ${user.investorInfo.walletBalance.toLocaleString()}`}
						/>
						<InfoCard
							label="লাক্সেন্টা ওয়ালেট"
							value={`৳ ${user.investorInfo.luxentaWallet}`}
						/>
						<InfoCard
							label="আজকের আয়"
							value={`৳ ${user.investorInfo.todayEarning.toLocaleString()}`}
						/>{" "}
						<InfoCard
							label="মোট আয়"
							value={`৳ ${user.investorInfo.totalEarnings.toLocaleString()}`}
						/>
						<InfoCard
							label="মোট উত্তোলন"
							value={`৳ ${user.investorInfo.totalWithdraw.toLocaleString()}`}
						/>
						<InfoCard
							label="মোট ডিপোজিট"
							value={`৳ ${user.investorInfo.totalDeposit.toLocaleString()}`}
						/>
						<InfoCard
							label="মোট ইনভেস্ট"
							value={`৳ ${user.investorInfo.totalInvest.toLocaleString()}`}
						/>
						<InfoCard
							label="মোট প্রফিট"
							value={`৳ ${user.investorInfo.totalProfit.toLocaleString()}`}
						/>
						<InfoCard
							label="মোট স্যালারি"
							value={`৳ ${user.investorInfo.totalSalary.toLocaleString()}`}
						/>
						<InfoCard
							label="স্যালারি মাস"
							value={user.investorInfo.salaryMonths}
						/>
						<InfoCard label="টিম সাইজ" value={user.investorInfo.teamSize} />
						<InfoCard
							label="মোট ইনভাইট"
							value={user.investorInfo.totalInvites}
						/>
						<InfoCard
							label="রেফারেল কোড"
							value={user.investorInfo.referralCode}
						/>
					</div>
				</>
			)}

			{/* 🔹 Actions */}
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
		<p className="font-semibold text-lg break-words">{value}</p>
	</div>
);

// Date formatting helper
function formatDate(dateString?: string) {
	if (!dateString) return "N/A";
	return new Date(dateString).toLocaleString("bn-BD", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}
