"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function WithdrawThankYou() {
	const searchParams = useSearchParams();
	const amount = searchParams.get("amount") || "0.00";
	const [counter, setCounter] = useState(10);

	useEffect(() => {
		const timer = setInterval(() => {
			setCounter(prev => {
				if (prev <= 1) {
					clearInterval(timer);
					window.location.href = "/";
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const handleGoto = () => {
		window.location.href = "/";
	};

	return (
		<main className="grid place-items-center min-h-screen bg-[#1a0f0f] text-[#ffe6e6] relative overflow-hidden">
			{/* falling coins */}
			<div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
				{Array.from({ length: 25 }).map((_, i) => {
					const left = Math.random() * 100;
					const size = 20 + Math.random() * 20;
					const duration = 3 + Math.random() * 3;
					const delay = Math.random() * 5;

					return (
						<div
							key={i}
							className="absolute animate-fall"
							style={{
								left: `${left}vw`,
								top: "-50px",
								fontSize: `${size}px`,
								animationDuration: `${duration}s`,
								animationDelay: `${delay}s`,
							}}>
							🪙
						</div>
					);
				})}
			</div>

			<div className="w-[90%] max-w-lg bg-white/10 rounded-[18px] p-8 text-center shadow-xl backdrop-blur-lg animate-fadeIn relative z-10">
				<h1 className="text-2xl font-bold mb-4 text-[#ff6b6b]">✅ ধন্যবাদ!</h1>
				<div className="text-4xl font-bold my-4 text-[#ffd93d]">{amount} ৳</div>
				<p className="mb-2">আপনার উইথড্র রিকোয়েস্ট সফলভাবে সাবমিট হয়েছে।</p>
				<p className="mb-2">সিস্টেম এটি শীঘ্রই প্রসেস করবে।</p>
				<div className="text-xl font-bold my-4 text-[#ffd93d] animate-pulse">
					{counter}
				</div>
				<button
					onClick={handleGoto}
					className="px-5 py-3 rounded-lg font-semibold text-sm bg-gradient-to-br from-[#ff6b6b] to-[#ffcc70] text-[#1a0f0f] hover:scale-105 transition-transform shadow-md">
					অর্ডার বন্ধ করুন
				</button>
			</div>

			<style jsx>{`
				@keyframes fall {
					0% {
						transform: translateY(-100px) rotate(0deg) scale(0.5);
						opacity: 0;
					}
					10% {
						opacity: 1;
					}
					100% {
						transform: translateY(110vh) rotate(360deg) scale(1);
						opacity: 0;
					}
				}
				.animate-fall {
					animation-name: fall;
					animation-timing-function: linear;
					animation-iteration-count: infinite;
				}
				@keyframes fadeIn {
					0% {
						opacity: 0;
						transform: translateY(20px);
					}
					100% {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</main>
	);
}
