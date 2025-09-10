// components/Investments.js
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Wallet, Boxes, Layers } from "lucide-react";
import InvestProjectCard from "./investCard";
import { Button } from "@/components/ui/button";

// Project data moved inside the component for single-file approach
const projects = [
	{
		title: "AI Trading Bot — Basic",
		price: 5000,
		daily: 50,
		lock: 30,
		progress: 38,
		img: "https://source.unsplash.com/300x300/?ai,finance",
	},
	{
		title: "Quant Signals — Starter",
		price: 8000,
		daily: 80,
		lock: 30,
		progress: 62,
		img: "https://source.unsplash.com/300x300/?robot,stock",
	},
	{
		title: "DeFi Yield — Lite",
		price: 10000,
		daily: 120,
		lock: 45,
		progress: 47,
		img: "https://source.unsplash.com/300x300/?blockchain,finance",
	},
	{
		title: "Data Center — Edge",
		price: 12000,
		daily: 150,
		lock: 60,
		progress: 20,
		img: "https://source.unsplash.com/300x300/?server,data",
	},
	{
		title: "GPU Mining — Flex",
		price: 15000,
		daily: 180,
		lock: 60,
		progress: 73,
		img: "https://source.unsplash.com/300x300/?chip,ai",
	},
	{
		title: "AI Cloud — Basic",
		price: 18000,
		daily: 210,
		lock: 75,
		progress: 34,
		img: "https://source.unsplash.com/300x300/?cloud,ai",
	},
	{
		title: "Quant Lab — Alpha",
		price: 20000,
		daily: 260,
		lock: 90,
		progress: 55,
		img: "https://source.unsplash.com/300x300/?code,quant",
	},
	{
		title: "Neural R&D — Beta",
		price: 25000,
		daily: 330,
		lock: 120,
		progress: 28,
		img: "https://source.unsplash.com/300x300/?neural,network",
	},
	{
		title: "Storage Grid — Pro",
		price: 30000,
		daily: 420,
		lock: 150,
		progress: 81,
		img: "https://source.unsplash.com/300x300/?database,server",
	},
	{
		title: "Edge IoT — Max",
		price: 40000,
		daily: 600,
		lock: 180,
		progress: 66,
		img: "https://source.unsplash.com/300x300/?satellite,tech",
	},
];

const Ticker = () => {
	const [tickerText, setTickerText] = useState("");

	const randomId = () =>
		Math.floor(100 + Math.random() * 900) +
		"****" +
		Math.floor(1000 + Math.random() * 9000);
	const randomAmount = () => {
		const options = [20, 30, 40, 50, 60, 80, 100, 120, 150, 200];
		return options[Math.floor(Math.random() * options.length)];
	};

	useEffect(() => {
		const updateTicker = () => {
			setTickerText(
				`ব্যবহারকারী ${randomId()} প্রতিদিনের আয় ${randomAmount()} টাকা`
			);
		};
		updateTicker();
		const interval = setInterval(updateTicker, 4000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="overflow-hidden whitespace-nowrap bg-gradient-to-r from-cyan-950 to-indigo-950 border border-[rgba(255,255,255,0.18)] rounded-xl mb-4">
			<div className="ticker-inner inline-block px-4 py-3 animate-slide">
				{tickerText}
			</div>
		</div>
	);
};

export const Invest = () => {
	const Card = ({ children, className }: any) => {
		const baseClasses =
			"bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-2xl backdrop-blur-md shadow-lg shadow-[rgba(0,0,0,0.35)] p-4";
		return <div className={`${baseClasses} ${className}`}>{children}</div>;
	};

	return (
		<div className="container mx-auto  p-4  text-white">
			<h1 className="h1 text-center text-2xl font-extrabold mb-4">বিনিয়োগ</h1>
			<Ticker />
			<Card className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto] items-start mb-4">
				<div className="grid text-white grid-cols-1 sm:grid-cols-2 gap-4">
					<div className="card-block bg-[rgba(255,255,255,0.08)] p-4 rounded-xl border border-[rgba(255,255,255,0.18)]">
						<div className="text-sm text-gray-300 ">মোট বিনিয়োগ মূল্য</div>
						<div className="text-4xl font-extrabold leading-tight">
							৳ 80,000
						</div>
					</div>
					<div className="card-block bg-[rgba(255,255,255,0.08)] p-4 rounded-xl border border-[rgba(255,255,255,0.18)]">
						<div className="text-xl font-bold">৳ 18,550</div>
						<div className="text-sm text-gray-300  mt-1">মোট আয়</div>
					</div>
					<div className="card-block bg-[rgba(255,255,255,0.08)] p-4 rounded-xl border border-[rgba(255,255,255,0.18)] col-span-1 sm:col-span-2">
						<div className="text-xl font-bold">৳ 740</div>
						<div className="text-sm text-gray-300 mt-1">আজকের আয়</div>
					</div>
				</div>
				<div className="flex flex-col items-end gap-3">
					<Button>
						<Wallet className="w-6 h-6 " /> ব্যালেন্স স্থানান্তর করুন
					</Button>
				</div>
			</Card>

			<Card className="flex items-center justify-between p-4 mb-3">
				<div className="flex items-center gap-2 text-white">
					<Boxes className="w-6 h-6  text-cyan-400" />
					<span>আমার পণ্য</span>
				</div>
				<div className="text-right text-sm text-cyan-300 font-semibold">
					(0 ইউনিট)
				</div>
			</Card>

			<Card className="flex items-center justify-between p-4 mb-4">
				<div className="flex items-center gap-2">
					<Layers className="w-6 h-6  text-cyan-400" />
					<span>প্রজেক্ট শ্রেণী</span>
				</div>
				<Button className="px-6">সকল</Button>
			</Card>

			<div className="grid gap-4">
				{projects.map((project, index) => (
					<InvestProjectCard key={index} project={project} />
				))}
			</div>
		</div>
	);
};
