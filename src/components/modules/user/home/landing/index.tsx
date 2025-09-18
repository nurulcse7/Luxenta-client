"use client";

import { GlobalModal } from "@/components/shared/GlobalModal";
import { Globe } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InviteModal from "../inviteModal";
import RedeemModal from "../redeemModal";
import Marquee from "react-fast-marquee";

export default function LandingPage() {
	const router = useRouter();
	const [isOpenRedeemModal, setIsOpenRedeemModal] = useState(false);
	const [isOpenInviteModal, setIsOpenInviteModal] = useState(false);

	// Handle action clicks
	const handleAction = (label: string) => {
		switch (label) {
			case "চেক-ইন":
				router.push("/daily-check");
				break;

			case "রিডিম কোড":
				// modal খুলবে
				setIsOpenRedeemModal(true);
				break;

			case "আমার পণ্য":
				router.push("/my-projects");
				break;

			case "বন্ধুকে আমন্ত্রণ":
				setIsOpenInviteModal(true);
				break;

			default:
				break;
		}
	};

	const items = ["চেক-ইন", "রিডিম কোড", "আমার পণ্য", "বন্ধুকে আমন্ত্রণ"];

	const images = [
		"/assets/images/Real.jpeg",
		"/assets/images/Crypto.jpeg",
		"/assets/images/gold.jpeg",
		"/assets/images/Real.jpeg",
		"/assets/images/Crypto.jpeg",
		"/assets/images/gold.jpeg",
		"/assets/images/Real.jpeg",
		"/assets/images/gold.jpeg",
		"/assets/images/Crypto.jpeg",
		"/assets/images/gold.jpeg",
	];

	return (
		<main>
			<div className="relative min-h-screen pb-20 text-[#e6f1ff]  font-sans">
				{/* Top-right location */}
				<div className="absolute top-4 right-4 flex flex-col items-center text-xs text-[#9fb3c8]">
					<Globe className="w-5 h-5 text-[#e6f1ff]" />
					<span className="mt-1">বাংলাদেশ</span>
				</div>
				{/* Header */}
				<header className="text-center py-6">
					<h1 className="text-3xl font-bold text-[#00e5ff] drop-shadow-[0_0_8px_#00e5ff]">
						Luxenta AI Fund
					</h1>
					<p className="mt-2 text-[#9fb3c8]">AI-চালিত রোবট বিনিয়োগ সিস্টেম</p>
				</header>
				{/* Main Image */}
				<div className="flex justify-center px-6 mb-6">
					<img
						src="/assets/images/Real.jpeg"
						alt="AI Robot"
						className="rounded-xl w-full max-w-[600px] h-[200px] object-cover"
					/>
				</div>
				{/* Auto Scrolling Small Images */}
				<div className="overflow-hidden relative mb-8 px-6">
					<Marquee gradient={false} speed={50}>
						{images.map((src, i) => (
							<img
								key={i}
								src={src}
								className="w-[140px] h-[90px] mr-2 rounded-md object-cover flex-shrink-0"
								alt={`slide-${i}`}
							/>
						))}
					</Marquee>
				</div>
				{/* Deposit & Withdraw */}
				<main className="flex flex-col sm:flex-row gap-4 px-6 mb-8 text-center text-sm">
					{/* Deposit Card */}
					<Link
						href="/deposit"
						className="flex-1 bg-gradient-to-tr from-[#00e5ff] to-[#6a5cff] text-white font-bold py-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
						<h2 className="text-lg mb-1">ডিপোজিট</h2>
						<p className="opacity-80">আপনার ওয়ালেটে টাকা যোগ করুন</p>
					</Link>

					{/* Wallet Card */}
					<Link
						href="/wallet"
						className="flex-1 bg-gradient-to-tr from-[#ffc14d] to-[#cc00ff] text-white font-bold py-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
						<h2 className="text-lg mb-1">ওয়ালেট</h2>
						<p className="opacity-80">আপনার ওয়ালেটের ব্যালেন্স দেখুন</p>
					</Link>

					{/* Withdraw Card */}
					<Link
						href="/withdraw"
						className="flex-1 bg-gradient-to-tr from-[#ff5c7a] to-[#ff9f43] text-white font-bold py-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
						<h2 className="text-lg mb-1">উত্তোলন</h2>
						<p className="opacity-80">টাকা উত্তোলন করুন</p>
					</Link>
				</main>
				{/* Secondary buttons */}
				<section className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-6 text-center text-sm mb-12">
					{items.map((label, i) => (
						<button
							key={i}
							onClick={() => handleAction(label)}
							className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-md p-4 font-medium backdrop-blur hover:scale-95 transition-transform">
							{label}
						</button>
					))}
				</section>
				{/* Bottom Navigation */}
				{/* Keyframes for slider */}
				<style jsx>{`
					@keyframes scrollImages {
						0% {
							transform: translateX(0);
						}
						100% {
							transform: translateX(-50%);
						}
					}
				`}</style>
			</div>

			{/* redeem modal  */}
			{isOpenRedeemModal && (
				<GlobalModal
					isOpen={isOpenRedeemModal}
					onClose={() => setIsOpenRedeemModal(false)}
					classes="md:w-[400px] w-[375px]  p-[30px]">
					<RedeemModal user="1" />
				</GlobalModal>
			)}

			{/* invite modal  */}
			{isOpenInviteModal && (
				<GlobalModal
					isOpen={isOpenInviteModal}
					onClose={() => setIsOpenInviteModal(false)}
					classes="md:w-[400px] w-[375px]  p-[30px]">
					<InviteModal />
				</GlobalModal>
			)}
		</main>
	);
}
