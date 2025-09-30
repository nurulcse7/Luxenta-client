"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const projectsData = [
	{
		title: "Quant Signals — Starter",
		price: 8000,
		daily: 80,
		lock: 30,
		progress: 62,
		status: "active",
		img: "/assets/images/Real.jpeg",
	},
	{
		title: "Quantum Finance — Edge",
		price: 17000,
		daily: 220,
		lock: 65,
		progress: 100,
		status: "complete",
		img: "/assets/images/Real.jpeg",
	},
];

export default function MyProjects() {
	const [projects, setProjects] = useState<any>([]);

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
				{projects.map((p: any, idx: number) => (
					<div
						key={idx}
						className="relative grid grid-cols-[88px_1fr] gap-3 p-3 rounded-lg border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.06)] backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
						<Image
							src={p.img}
							alt={p.title}
							width={88}
							height={88}
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
