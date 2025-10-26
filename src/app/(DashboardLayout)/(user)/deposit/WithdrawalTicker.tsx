"use client";

import { useEffect, useState } from "react";

// --- Custom Withdrawal Notification Ticker ---
const WithdrawalTicker = () => {
	const [tickerText, setTickerText] = useState("");

	// Generate a random user ID like: 245***8791
	const randomUserId = () => {
		return (
			Math.floor(100 + Math.random() * 900) +
			"***" +
			Math.floor(1000 + Math.random() * 9000)
		);
	};

	// Generate random withdrawal amount (starting from 100)
	const randomAmount = () => {
		// Generate between 100 and 2000 (you can make this higher)
		const min = 100;
		const max = 2000 + Math.floor(Math.random() * 80000); // dynamic range
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	useEffect(() => {
		const updateTicker = () => {
			const randomMessages = [
				`ব্যবহারকারী ${randomUserId()} সফলভাবে ${randomAmount()} টাকা উত্তোলন করেছেন`,
				`ব্যবহারকারী ${randomUserId()} একটি নতুন উত্তোলন সম্পন্ন করেছেন`,
				`ব্যবহারকারী ${randomUserId()} তার ব্যালেন্স থেকে ${randomAmount()} টাকা তুলেছেন`,
				`উত্তোলন সফল! ব্যবহারকারী ${randomUserId()} পেয়েছেন ${randomAmount()} টাকা`,
			];

			const msg =
				randomMessages[Math.floor(Math.random() * randomMessages.length)];

			setTickerText(msg);
		};

		updateTicker();
		const interval = setInterval(updateTicker, 4000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="overflow-hidden whitespace-nowrap bg-gradient-to-r from-cyan-950 to-indigo-950 border border-[rgba(255,255,255,0.18)] rounded-xl mb-4">
			<div className="inline-block px-4 py-3 text-cyan-100 text-sm font-medium animate-slide">
				{tickerText}
			</div>

			{/* Animation */}
			<style jsx>{`
				@keyframes slide {
					0% {
						transform: translateX(100%);
					}
					100% {
						transform: translateX(-100%);
					}
				}
				.animate-slide {
					display: inline-block;
					animation: slide 10s linear infinite;
				}
			`}</style>
		</div>
	);
};

export default WithdrawalTicker;
