"use client";
import { useEffect, useState } from "react";

const projectsData = [
	{
		title: "Quant Signals — Starter",
		price: 8000,
		daily: 80,
		lock: 30,
		progress: 62,
		status: "active",
		img: "https://source.unsplash.com/300x300/?robot,stock",
	},
	{
		title: "Data Center — Edge",
		price: 12000,
		daily: 150,
		lock: 60,
		progress: 20,
		status: "active",
		img: "https://source.unsplash.com/300x300/?server,data",
	},
	{
		title: "AI Trading Bot — Basic",
		price: 5000,
		daily: 50,
		lock: 30,
		progress: 100,
		status: "complete",
		img: "https://source.unsplash.com/300x300/?ai,finance",
	},
	{
		title: "DeFi Yield — Lite",
		price: 10000,
		daily: 120,
		lock: 45,
		progress: 100,
		status: "complete",
		img: "https://source.unsplash.com/300x300/?blockchain,finance",
	},
	{
		title: "Crypto Signals — Pro",
		price: 15000,
		daily: 200,
		lock: 50,
		progress: 100,
		status: "complete",
		img: "https://source.unsplash.com/300x300/?crypto,finance",
	},
	{
		title: "Machine Learning Fund",
		price: 9000,
		daily: 90,
		lock: 35,
		progress: 100,
		status: "complete",
		img: "https://source.unsplash.com/300x300/?ml,ai",
	},
	{
		title: "Smart Contract Vault",
		price: 11000,
		daily: 130,
		lock: 40,
		progress: 100,
		status: "complete",
		img: "https://source.unsplash.com/300x300/?smartcontract,finance",
	},
	{
		title: "Blockchain Nodes — Advanced",
		price: 13000,
		daily: 160,
		lock: 55,
		progress: 100,
		status: "complete",
		img: "https://source.unsplash.com/300x300/?blockchain,node",
	},
	{
		title: "Yield Farming — Basic",
		price: 7000,
		daily: 70,
		lock: 25,
		progress: 100,
		status: "complete",
		img: "https://source.unsplash.com/300x300/?yield,finance",
	},
	{
		title: "Token Staking — Standard",
		price: 9500,
		daily: 95,
		lock: 30,
		progress: 100,
		status: "complete",
		img: "https://source.unsplash.com/300x300/?token,finance",
	},
	{
		title: "AI Portfolio — Lite",
		price: 8500,
		daily: 85,
		lock: 28,
		progress: 100,
		status: "complete",
		img: "https://source.unsplash.com/300x300/?ai,portfolio",
	},
	{
		title: "Crypto Vault — Secure",
		price: 10500,
		daily: 105,
		lock: 33,
		progress: 100,
		status: "complete",
		img: "https://source.unsplash.com/300x300/?crypto,vault",
	},
	{
		title: "Data Mining Hub",
		price: 12500,
		daily: 155,
		lock: 45,
		progress: 100,
		status: "complete",
		img: "https://source.unsplash.com/300x300/?data,mining",
	},
	{
		title: "Algo Trading — Plus",
		price: 11500,
		daily: 135,
		lock: 38,
		progress: 100,
		status: "complete",
		img: "https://source.unsplash.com/300x300/?algorithm,trade",
	},
	{
		title: "Smart Yield — Premium",
		price: 14000,
		daily: 175,
		lock: 50,
		progress: 100,
		status: "complete",
		img: "https://source.unsplash.com/300x300/?smart,yield",
	},
	{
		title: "Deep Learning Fund",
		price: 16000,
		daily: 210,
		lock: 60,
		progress: 100,
		status: "complete",
		img: "https://source.unsplash.com/300x300/?deep,learning",
	},
	{
		title: "Quantum Finance — Edge",
		price: 17000,
		daily: 220,
		lock: 65,
		progress: 100,
		status: "complete",
		img: "https://source.unsplash.com/300x300/?quantum,finance",
	},
];

export default function MyProjects() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		const activeProjects = projectsData.filter(p => p.status === "active");
		const completeProjects = projectsData.filter(p => p.status === "complete");
		setProjects([...activeProjects, ...completeProjects]);
	}, []);

	return (
		<div className="max-w-3xl mx-auto p-4  min-h-screen">
			<h1 className="text-center text-2xl font-extrabold my-4">
				আমার প্রজেক্ট
			</h1>
			<div className="grid gap-3">
				{projects.map((p, idx) => (
					<div
						key={idx}
						className="relative grid grid-cols-[88px_1fr] gap-3 p-3 rounded-lg border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.06)] backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
						<img
							src={p.img}
							alt={p.title}
							className="w-[88px] h-[88px] object-cover rounded-lg"
						/>
						<div className="flex flex-col gap-2">
							<h3 className="font-extrabold text-base">{p.title}</h3>
							<div className="grid grid-cols-[auto_1fr_auto] gap-x-3 gap-y-1 mt-1">
								<div className="text-[0.85rem] text-[#9fb3c8]">
									প্রজেক্ট মূল্য
								</div>
								<div></div>
								<div className="font-bold text-[0.95rem]">
									৳ {p.price.toLocaleString()}
								</div>
								<div className="text-[0.85rem] text-[#9fb3c8]">
									প্রতিদিনের আয়
								</div>
								<div></div>
								<div className="font-bold text-[0.95rem]">৳ {p.daily}</div>
								<div className="text-[0.85rem] text-[#9fb3c8]">
									লক-আপ পিরিয়ড
								</div>
								<div></div>
								<div className="font-bold text-[0.95rem]">{p.lock} দিন</div>
							</div>
							{p.status === "active" && (
								<div className="mt-2">
									<div className="w-full h-2 rounded-full overflow-hidden border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.08)]">
										<span
											className="block h-full bg-gradient-to-r from-[#00e5ff] to-[#6a5cff] shadow-inner"
											style={{ width: `${p.progress}%` }}></span>
									</div>
									<div className="text-[12px] text-[#9fb3c8] mt-1">
										মানুষ এই প্রজেক্টটি কিনছে… {p.progress}% পূর্ণ
									</div>
								</div>
							)}
						</div>
						<div
							className={`${
								p.status === "active"
									? "bg-gradient-to-br from-[#00ff99] to-[#00e5ff]"
									: "bg-gradient-to-br from-[#ff4d4d] to-[#c800ff]"
							} absolute top-2 right-2 text-[#03131c] font-bold px-2 py-1 rounded-full text-xs shadow-md`}>
							{p.status === "active" ? "Active" : "Complete"}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
