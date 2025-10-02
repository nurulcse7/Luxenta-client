"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Search,
	RefreshCcw,
	Eye,
	ChevronLeft,
	ChevronRight,
	X,
	TrendingUp,
	TrendingDown,
	PiggyBank,
	Briefcase,
	PlusCircle,
	CheckCircle,
	Clock,
	Shuffle,
} from "lucide-react";
import { getHistory } from "@/services/HistoryService";
import { IHistory } from "@/types/history";
import { cn } from "@/lib/utils";

const History = () => {
	const [historyData, setHistoryData] = useState<IHistory[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [page, setPage] = useState(1);
	const [meta, setMeta] = useState<{
		page: number;
		limit: number;
		total: number;
		totalPage: number;
	} | null>(null);
	const [selectedHistory, setSelectedHistory] = useState<IHistory | null>(null);
	const [loading, setLoading] = useState(false);

	const panelRef = useRef<HTMLDivElement>(null);

	const fetchHistory = async (
		pageNumber: number = 1,
		search: string = searchTerm
	) => {
		setLoading(true);
		try {
			const query = {
				page: pageNumber,
				searchTerm: search,
			};
			const result = await getHistory(query);

			if (result.success) {
				setHistoryData(result.data);
				setMeta(result.meta);
				setPage(pageNumber);
			} else {
				setHistoryData([]);
				setMeta(null);
			}
		} catch (error) {
			console.error("Error fetching history:", error);
			setHistoryData([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchHistory(1);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				panelRef.current &&
				!panelRef.current.contains(event.target as Node)
			) {
				setSelectedHistory(null);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [selectedHistory]);

	const typeIcons = {
		deposit: <PiggyBank className="w-5 h-5" />,
		withdraw: <TrendingDown className="w-5 h-5" />,
		invest: <Briefcase className="w-5 h-5" />,
		project_profit: <TrendingUp className="w-5 h-5" />,
		daily_income: <TrendingUp className="w-5 h-5" />,
		project_complete: <CheckCircle className="w-5 h-5" />,
		salary: <PlusCircle className="w-5 h-5" />,
		referral_bonus: <PlusCircle className="w-5 h-5" />,
		checkin_bonus: <CheckCircle className="w-5 h-5" />,
		MAIN_TO_LUXENTA: <Shuffle className="w-5 h-5 rotate-90" />,
		LUXENTA_TO_MAIN: <Shuffle className="w-5 h-5 -rotate-90" />,
	};

	const typeColors: Record<IHistory["type"], string> = {
		deposit: "text-green-500",
		withdraw: "text-red-500",
		invest: "text-blue-500",
		project_profit: "text-lime-500",
		daily_income: "text-emerald-400",
		project_complete: "text-orange-500",
		salary: "text-yellow-500",
		referral_bonus: "text-cyan-500",
		checkin_bonus: "text-purple-500",
		MAIN_TO_LUXENTA: "text-indigo-400",
		LUXENTA_TO_MAIN: "text-indigo-600",
	};

	// 🌟 অ্যামাউন্ট ফরমেটিং লজিক
	const formatAmount = (amount: number, type: IHistory["type"]) => {
		const isDeduction =
			type === "withdraw" || type === "invest" || type === "MAIN_TO_LUXENTA";
		const sign = isDeduction ? "-" : "+";
		return `${sign}৳${amount.toLocaleString()}`;
	};

	const renderPagination = () => {
		if (!meta) return null;

		return (
			<div className="flex items-center justify-between mt-6 text-white">
				<Button
					variant="ghost"
					className="text-white"
					disabled={page === 1 || loading}
					onClick={() => fetchHistory(page - 1, searchTerm)}>
					<ChevronLeft className="w-4 h-4 mr-2" /> পূর্ববর্তী
				</Button>
				<div className="flex items-center space-x-2 text-sm text-gray-400">
					<span>
						পৃষ্ঠা {meta.page} / {meta.totalPage}
					</span>
				</div>
				<Button
					variant="ghost"
					className="text-white"
					disabled={page === meta.totalPage || loading}
					onClick={() => fetchHistory(page + 1, searchTerm)}>
					পরবর্তী <ChevronRight className="w-4 h-4 ml-2" />
				</Button>
			</div>
		);
	};

	return (
		<div className="relative h-screen flex text-white">
			{/* Main Content Area */}
			<div
				className={`p-6 flex-1 transition-transform duration-300 ease-in-out ${
					selectedHistory
						? "-translate-x-1/3 opacity-50 pointer-events-none"
						: "translate-x-0"
				}`}>
				{/* Command Bar */}
				<div className="sticky top-0 z-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 mb-6 -mx-6 bg-[#0a0f1c]/90 backdrop-blur-md border-b border-gray-700">
					<h1 className="text-3xl font-bold flex-1">লেনদেনের ইতিহাস</h1>
					<div className="flex w-full sm:w-auto gap-2">
						<div className="relative w-full">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
							<Input
								placeholder="সার্চ করুন..."
								value={searchTerm}
								onChange={e => {
									const value = e.target.value;
									setSearchTerm(value);
									fetchHistory(1, value);
								}}
								className="pl-9 pr-4 bg-gray-800 text-white placeholder-gray-400 border-gray-700"
							/>
						</div>
						<Button
							onClick={() => fetchHistory(page, searchTerm)}
							variant="outline"
							className="hidden sm:inline-flex bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
							<RefreshCcw className="w-4 h-4" />
						</Button>
					</div>
					<Badge className="text-sm bg-gray-700 text-white">
						মোট লেনদেন: {meta?.total || 0}
					</Badge>
				</div>

				{/* History List */}
				{loading ? (
					<div className="text-center p-10">
						<p className="text-lg text-gray-400">লোডিং...</p>
					</div>
				) : historyData.length === 0 ? (
					<div className="text-center p-10">
						<p className="text-lg text-gray-400">কোনো লেনদেন পাওয়া যায়নি।</p>
					</div>
				) : (
					<div className="space-y-4">
						{historyData.map(item => (
							<div
								key={item.id}
								className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg shadow-sm bg-gray-900 border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
								onClick={() => setSelectedHistory(item)}>
								<div className="flex-1 space-y-1 sm:space-y-0 sm:flex sm:items-center sm:gap-6">
									<h3 className="font-semibold text-lg text-white">
										{item.title}
									</h3>
									<div className="flex items-center gap-4 text-sm text-gray-400">
										<span className="flex items-center gap-1">
											{/* Clock আইকন fallback হিসেবে ব্যবহৃত হবে */}
											{typeIcons[item.type as keyof typeof typeIcons] || (
												<Clock className="h-4 w-4" />
											)}{" "}
											{item.type}
										</span>
										<span className="flex items-center gap-1">
											{formatAmount(item.amount, item.type)}
										</span>
										<Badge
											className={cn(
												"uppercase text-white",
												typeColors[item.type as keyof typeof typeColors]
											)}>
											{item.type.replace(/_/g, " ")}
										</Badge>
									</div>
								</div>
								<div className="mt-4 sm:mt-0">
									<Button
										size="sm"
										variant="outline"
										className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
										onClick={e => {
											e.stopPropagation();
											setSelectedHistory(item);
										}}>
										<Eye className="w-4 h-4 mr-2" /> দেখুন
									</Button>
								</div>
							</div>
						))}
					</div>
				)}

				{renderPagination()}
			</div>

			{/* Right Fly-Out Panel */}
			<div
				ref={panelRef}
				className={`fixed top-0 right-0 h-full w-full sm:w-1/3 bg-gray-950 shadow-2xl transition-transform duration-300 ease-in-out z-20 overflow-y-auto ${
					selectedHistory ? "translate-x-0" : "translate-x-full"
				}`}>
				{selectedHistory && (
					<div className="p-8">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-2xl font-bold text-white">লেনদেনের বিবরণ</h2>
							<Button
								variant="ghost"
								size="sm"
								className="text-gray-400 hover:bg-gray-800"
								onClick={() => setSelectedHistory(null)}>
								<X className="h-5 w-5" />
							</Button>
						</div>

						{/* History Item Details */}
						<div className="space-y-4 p-6 border rounded-xl bg-gray-900 border-gray-800">
							<div className="flex items-center space-x-3 mb-2">
								<span
									className={cn(
										"p-2 rounded-full",
										typeColors[selectedHistory.type as keyof typeof typeColors]
									)}>
									{typeIcons[selectedHistory.type as keyof typeof typeIcons]}
								</span>
								<h3 className="text-xl font-bold text-white capitalize">
									{selectedHistory.title}
								</h3>
							</div>
							<div className="grid grid-cols-1 gap-y-3">
								<div className="flex items-center space-x-3">
									<span className="text-sm font-medium text-gray-300">
										পরিমাণ:
									</span>
									<span
										className={cn(
											"text-lg font-bold",
											typeColors[
												selectedHistory.type as keyof typeof typeColors
											]
										)}>
										{formatAmount(selectedHistory.amount, selectedHistory.type)}
									</span>
								</div>
								<div className="flex items-center space-x-3">
									<span className="text-sm font-medium text-gray-300">
										বর্ণনা:
									</span>
									<p className="text-sm font-medium text-gray-300">
										{selectedHistory.description || "নেই"}
									</p>
								</div>
								<div className="flex items-center space-x-3">
									<span className="text-sm font-medium text-gray-300">
										সময়:
									</span>
									<p className="text-sm font-medium text-gray-300">
										{new Date(selectedHistory.createdAt).toLocaleString()}
									</p>
								</div>
							</div>
						</div>

						<div className="mt-6">
							<Button
								onClick={() => setSelectedHistory(null)}
								variant="outline"
								className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 w-full">
								বন্ধ করুন
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default History;
