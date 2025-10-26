"use client";

import { useEffect, useState, useMemo } from "react";
import { Wallet, Boxes, Layers } from "lucide-react";
import InvestProjectCard from "./investCard";
import { Button } from "@/components/ui/button";
import { TProject } from "@/types/project";
import { getProjects } from "@/services/ProjectService";
import { useUser } from "@/context/UserContext";
import {
	getSocket,
	subscribeEvent,
	unsubscribeEvent,
} from "@/lib/socketClient";
import { transferTodayEarning } from "@/services/InvestorService";
import { toast } from "sonner";

// --- Ticker Component ---
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
			<div className="ticker-inner inline-block px-4 py-3 animate-slide sm:text-xl text-[14px] ">
				{tickerText}
			</div>
		</div>
	);
};

export const Invest = () => {
	const { user } = useUser();
	const [allProjects, setAllProjects] = useState<TProject[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [loadingTransfer, setLoadingTransfer] = useState(false);

	// Filter only open projects
	const displayProjects = useMemo(() => {
		return allProjects.filter(project => project.status === "open");
	}, [allProjects]);

	useEffect(() => {
		const fetchProjects = async () => {
			setLoading(true);
			setError(null);
			try {
				const result = await getProjects();
				if (result.success) {
					setAllProjects(result.data);
				} else {
					setError(result.error || "Failed to fetch projects");
				}
			} catch (err: any) {
				setError(err.message || "Something went wrong");
			} finally {
				setLoading(false);
			}
		};

		fetchProjects();

		// Socket Setup
		getSocket();

		subscribeEvent("new-project", (project: TProject) => {
			setAllProjects(prev => [project, ...prev]);
		});

		subscribeEvent("update-project", (updatedProject: TProject) => {
			setAllProjects(prev =>
				prev.map(project =>
					project.id === updatedProject.id ? updatedProject : project
				)
			);
		});

		subscribeEvent("delete-project", (deletedProject: TProject) => {
			setAllProjects(prev =>
				prev.filter(project => project.id !== deletedProject.id)
			);
		});

		return () => {
			unsubscribeEvent("new-project");
			unsubscribeEvent("update-project");
			unsubscribeEvent("delete-project");
		};
	}, []);

	const Card = ({ children, className }: any) => {
		const baseClasses =
			"bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-2xl backdrop-blur-md shadow-lg shadow-[rgba(0,0,0,0.35)] p-4";
		return <div className={`${baseClasses} ${className}`}>{children}</div>;
	};

	// ✅ handle transfer today's earning
	const handleTransferTodayEarning = async () => {
		try {
			setLoadingTransfer(true);
			const res = await transferTodayEarning();
			if (res.success) {
				toast.success(res.message);
			} else {
				toast.error(res.message);
			}
		} catch (error: any) {
			toast.error(error.message || "Something went wrong");
		} finally {
			setLoadingTransfer(false);
		}
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
							৳ {user?.investorInfo.totalInvest || 0}
						</div>
					</div>
					<div className="card-block bg-[rgba(255,255,255,0.08)] p-4 rounded-xl border border-[rgba(255,255,255,0.18)]">
						<div className="text-xl font-bold">
							৳ {user?.investorInfo.totalEarnings || 0}
						</div>
						<div className="text-sm text-gray-300  mt-1">মোট আয়</div>
					</div>
					<div className="card-block bg-[rgba(255,255,255,0.08)] p-4 rounded-xl border border-[rgba(255,255,255,0.18)] col-span-1 sm:col-span-2">
						<div className="text-xl font-bold">
							৳ {user?.investorInfo?.todayEarning || 0}
						</div>
						<div className="text-sm text-gray-300 mt-1">আজকের আয়</div>
					</div>
				</div>
				<div className="flex flex-col items-end gap-3">
					<Button
						onClick={handleTransferTodayEarning}
						disabled={!user?.investorInfo.todayEarning || loadingTransfer}>
						{loadingTransfer ? (
							<span className="flex items-center gap-2">
								<span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
								<span>প্রসেস হচ্ছে...</span>
							</span>
						) : (
							<>
								<Wallet className="w-6 h-6" /> ব্যালেন্স স্থানান্তর করুন
							</>
						)}
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
				<Button disabled className="px-6">
					সকল
				</Button>
			</Card>

			{loading && <p className="text-center">Loading projects...</p>}
			{error && <p className="text-red-400 mb-4 text-center"> {error}</p>}

			{/* Renders only the 'open' projects */}
			<div className="grid gap-4">
				{displayProjects.length > 0
					? displayProjects.map(project => (
							<InvestProjectCard key={project.id} project={project} />
					  ))
					: !loading && (
							<p className="text-center text-gray-400 mt-8">
								এই মুহূর্তে কোনো ওপেন প্রজেক্ট নেই।
							</p>
					  )}
			</div>
		</div>
	);
};
