"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthService";
import { useRouter } from "next/navigation";
import React from "react";

export default function MyAccount() {
	const { user } = useUser();
	const router = useRouter();
	if (!user) {
		return (
			<div className="min-h-screen flex items-center justify-center text-gray-400">
				Loading user info...
			</div>
		);
	}

	// Map backend status to isActive
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
				<div className="p-4 bg-white/10 rounded-xl">
					<p className="text-gray-300 text-sm">নাম</p>
					<p className="font-semibold text-lg">{user.name}</p>
				</div>
				<div className="p-4 bg-white/10 rounded-xl">
					<p className="text-gray-300 text-sm">ইমেইল</p>
					<p className="font-semibold text-lg">{user.email}</p>
				</div>
				<div className="p-4 bg-white/10 rounded-xl">
					<p className="text-gray-300 text-sm">মোবাইল নম্বর</p>
					<p className="font-semibold text-lg">
						{user.number || "নির্ধারিত নেই"}
					</p>
				</div>
				<div className="p-4 bg-white/10 rounded-xl">
					<p className="text-gray-300 text-sm">অ্যাকাউন্ট স্ট্যাটাস</p>
					<p className="font-semibold text-lg">
						{isActive ? "সক্রিয়" : "নিষ্ক্রিয়"}
					</p>
				</div>

				{/* Investor specific info */}
				{user.role === "investor" && user.investorInfo && (
					<>
						<div className="p-4 bg-white/10 rounded-xl">
							<p className="text-gray-300 text-sm">লেভেল</p>
							<p className="font-semibold text-lg">{user.investorInfo.level}</p>
						</div>
						<div className="p-4 bg-white/10 rounded-xl">
							<p className="text-gray-300 text-sm">ওয়ালেট ব্যালেন্স</p>
							<p className="font-semibold text-lg">
								৳ {user.investorInfo.walletBalance.toLocaleString()}
							</p>
						</div>
						<div className="p-4 bg-white/10 rounded-xl">
							<p className="text-gray-300 text-sm">মোট ডিপোজিট</p>
							<p className="font-semibold text-lg">
								৳ {user.investorInfo.totalDeposit.toLocaleString()}
							</p>
						</div>
						<div className="p-4 bg-white/10 rounded-xl">
							<p className="text-gray-300 text-sm">মোট আয়</p>
							<p className="font-semibold text-lg">
								৳ {user.investorInfo.totalEarnings.toLocaleString()}
							</p>
						</div>
						<div className="p-4 bg-white/10 rounded-xl">
							<p className="text-gray-300 text-sm">মোট উত্তোলন</p>
							<p className="font-semibold text-lg">
								৳ {user.investorInfo.totalWithdraw.toLocaleString()}
							</p>
						</div>
					</>
				)}
			</div>

			{/* Role-specific info */}
			<div className="mb-6 p-4 bg-white/10 rounded-xl">
				<p className="text-gray-300 text-sm">রোল</p>
				<p className="font-semibold text-lg capitalize">{user.role}</p>

				{user.role === "superAdmin" && (
					<p className="mt-2 text-yellow-400 text-sm">
						⚡ SuperAdmin privileges enabled
					</p>
				)}
				{user.role === "admin" && (
					<p className="mt-2 text-blue-400 text-sm">
						🛠️ Admin privileges enabled
					</p>
				)}
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
