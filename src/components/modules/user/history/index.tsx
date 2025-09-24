"use client";

import { useState, useEffect } from "react";
import {
	TrendingUp,
	TrendingDown,
	Clock,
	PiggyBank,
	Briefcase,
	PlusCircle,
	MinusCircle,
	CheckCircle,
	ChevronLeft,
	ChevronRight,
	RefreshCcw,
	Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock data to demonstrate the page. Replace with your actual API call.
const mockHistoryData = [
	{
		id: "1",
		type: "deposit",
		amount: 5000,
		title: "জমা",
		description: "বিকাশ থেকে",
		createdAt: new Date(Date.now() - 3600000),
	},
	{
		id: "2",
		type: "invest",
		amount: 1000,
		title: "বিনিয়োগ",
		description: "প্রজেক্ট X-এ বিনিয়োগ",
		createdAt: new Date(Date.now() - 7200000),
	},
	{
		id: "3",
		type: "project_profit",
		amount: 250,
		title: "লাভ",
		description: "প্রজেক্ট X থেকে লাভ",
		createdAt: new Date(Date.now() - 10800000),
	},
	{
		id: "4",
		type: "withdraw",
		amount: 200,
		title: "উত্তোলন",
		description: "বিকাশে উত্তোলন",
		createdAt: new Date(Date.now() - 14400000),
	},
	{
		id: "5",
		type: "referral_bonus",
		amount: 50,
		title: "রেফারেল বোনাস",
		description: "বন্ধুকে রেফার করার জন্য",
		createdAt: new Date(Date.now() - 18000000),
	},
	{
		id: "6",
		type: "checkin_bonus",
		amount: 10,
		title: "দৈনিক বোনাস",
		description: "দৈনিক চেকিং",
		createdAt: new Date(Date.now() - 21600000),
	},
	{
		id: "7",
		type: "salary",
		amount: 10000,
		title: "বেতন",
		description: "মাসিক বেতন",
		createdAt: new Date(Date.now() - 25200000),
	},
	{
		id: "8",
		type: "deposit",
		amount: 1500,
		title: "জমা",
		description: "নগদ থেকে",
		createdAt: new Date(Date.now() - 28800000),
	},
	{
		id: "9",
		type: "invest",
		amount: 500,
		title: "বিনিয়োগ",
		description: "প্রজেক্ট Y-এ বিনিয়োগ",
		createdAt: new Date(Date.now() - 32400000),
	},
	{
		id: "10",
		type: "project_profit",
		amount: 100,
		title: "লাভ",
		description: "প্রজেক্ট Y থেকে লাভ",
		createdAt: new Date(Date.now() - 36000000),
	},
	{
		id: "11",
		type: "withdraw",
		amount: 50,
		title: "উত্তোলন",
		description: "নগদে উত্তোলন",
		createdAt: new Date(Date.now() - 39600000),
	},
];

const pageSize = 8;

const History = () => {
	const [historyData, setHistoryData] = useState([]);
	const [page, setPage] = useState(1);
	const [meta, setMeta] = useState({ total: 0, totalPage: 1 });
	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	// This function simulates an API call. Replace this with your actual fetch function.
	const fetchHistory = (pageNumber, search) => {
		setLoading(true);
		// Simulate API delay
		setTimeout(() => {
			const filteredData = mockHistoryData.filter(
				item =>
					item.title.toLowerCase().includes(search.toLowerCase()) ||
					item.description.toLowerCase().includes(search.toLowerCase())
			);
			const startIndex = (pageNumber - 1) * pageSize;
			const endIndex = startIndex + pageSize;
			const paginatedData = filteredData.slice(startIndex, endIndex);

			setHistoryData(paginatedData);
			setMeta({
				total: filteredData.length,
				totalPage: Math.ceil(filteredData.length / pageSize),
			});
			setLoading(false);
		}, 500);
	};

	// Fetch data when the page or search term state changes
	useEffect(() => {
		fetchHistory(page, searchTerm);
	}, [page, searchTerm]);

	const formatAmount = (amount, type) => {
		const sign =
			type === "deposit" ||
			type === "project_profit" ||
			type === "salary" ||
			type === "referral_bonus" ||
			type === "checkin_bonus"
				? "+"
				: "-";
		return `${sign}৳${amount.toLocaleString()}`;
	};

	const typeIcons = {
		deposit: <PiggyBank className="w-5 h-5" />,
		withdraw: <TrendingDown className="w-5 h-5" />,
		invest: <Briefcase className="w-5 h-5" />,
		project_profit: <TrendingUp className="w-5 h-5" />,
		salary: <PlusCircle className="w-5 h-5" />,
		referral_bonus: <PlusCircle className="w-5 h-5" />,
		checkin_bonus: <CheckCircle className="w-5 h-5" />,
	};

	const typeColors = {
		deposit: "text-green-500",
		withdraw: "text-red-500",
		invest: "text-blue-500",
		project_profit: "text-lime-500",
		salary: "text-yellow-500",
		referral_bonus: "text-cyan-500",
		checkin_bonus: "text-purple-500",
	};

	return (
		<div className="min-h-screen bg-[#0a0a0a] text-white p-4 font-sans">
			<div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-[18px] backdrop-blur-md p-4 mb-4 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div className="flex flex-col items-start">
					<h1 className="text-2xl font-bold mb-1">লেনদেনের ইতিহাস</h1>
					<p className="text-sm text-gray-400">আপনার সকল কার্যক্রমের তালিকা</p>
				</div>
				<div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
					<div className="relative w-full sm:w-auto flex-grow">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
						<Input
							placeholder="সার্চ করুন..."
							value={searchTerm}
							onChange={e => {
								const value = e.target.value;
								setSearchTerm(value);
								setPage(1); // Reset to page 1 on new search
							}}
							className="pl-9 pr-4 bg-gray-800 text-white placeholder-gray-400 border-gray-700 w-full"
						/>
					</div>
					<Button
						onClick={() => fetchHistory(page, searchTerm)}
						variant="outline"
						className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 w-full sm:w-auto">
						<RefreshCcw className="w-4 h-4 mr-2" /> রিফ্রেশ
					</Button>
				</div>
			</div>

			<div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-xl backdrop-blur-md p-4 mt-6">
				{loading ? (
					<div className="text-center p-10">
						<p className="text-lg text-gray-400">লোডিং...</p>
					</div>
				) : historyData.length === 0 ? (
					<div className="text-center p-10">
						<p className="text-lg text-gray-400">কোনো লেনদেন পাওয়া যায়নি।</p>
					</div>
				) : (
					<ul className="divide-y divide-gray-700">
						{historyData.map(item => (
							<li
								key={item.id}
								className="py-4 flex items-center justify-between">
								<div className="flex items-center">
									<div
										className={cn("p-2 rounded-full", typeColors[item.type])}>
										{typeIcons[item.type] || <Clock className="w-5 h-5" />}
									</div>
									<div className="ml-4">
										<p className="font-semibold text-lg">{item.title}</p>
										<p className="text-sm text-gray-400">{item.description}</p>
									</div>
								</div>
								<div className="text-right">
									<p className={cn("font-bold text-lg", typeColors[item.type])}>
										{formatAmount(item.amount, item.type)}
									</p>
									<p className="text-xs text-gray-500">
										{new Date(item.createdAt).toLocaleString()}
									</p>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>

			{/* Pagination Controls */}
			{meta.totalPage > 1 && (
				<div className="flex items-center justify-between mt-6 text-white">
					<Button
						variant="ghost"
						className="text-white"
						disabled={page === 1}
						onClick={() => setPage(prev => prev - 1)}>
						<ChevronLeft className="w-4 h-4 mr-2" /> পূর্ববর্তী
					</Button>
					<div className="flex items-center space-x-2 text-sm text-gray-400">
						<span>
							পৃষ্ঠা {page} / {meta.totalPage}
						</span>
					</div>
					<Button
						variant="ghost"
						className="text-white"
						disabled={page === meta.totalPage}
						onClick={() => setPage(prev => prev + 1)}>
						পরবর্তী <ChevronRight className="w-4 h-4 ml-2" />
					</Button>
				</div>
			)}
		</div>
	);
};

export default History;
