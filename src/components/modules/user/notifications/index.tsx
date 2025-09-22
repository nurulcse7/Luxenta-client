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
	BellRing,
	CheckCircle as ReadIcon,
	RotateCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define the notification types
enum NotificationType {
	deposit,
	withdraw,
	salary,
	referral,
	project,
}

// Model for the notification data
interface Notification {
	id: string;
	title: string;
	message: string;
	type: keyof typeof NotificationType;
	isRead: boolean;
	createdAt: Date;
}

// Mock data to demonstrate the page. Replace with your actual API call.
const mockNotificationsData: Notification[] = [
	{
		id: "1",
		title: "নতুন ডিপোজিট!",
		message: "আপনার অ্যাকাউন্টে ৳5000 জমা হয়েছে।",
		type: "deposit",
		isRead: false,
		createdAt: new Date(Date.now() - 60000),
	},
	{
		id: "2",
		title: "বিনিয়োগের লাভ",
		message: "প্রজেক্ট X থেকে ৳250 লাভ পেয়েছেন।",
		type: "project",
		isRead: false,
		createdAt: new Date(Date.now() - 3600000),
	},
	{
		id: "3",
		title: "উত্তোলন সম্পন্ন",
		message: "আপনার ৳200 উত্তোলন সফল হয়েছে।",
		type: "withdraw",
		isRead: true,
		createdAt: new Date(Date.now() - 7200000),
	},
	{
		id: "4",
		title: "রেফারেল বোনাস",
		message: "নতুন রেফারেলের জন্য ৳50 বোনাস পেয়েছেন।",
		type: "referral",
		isRead: false,
		createdAt: new Date(Date.now() - 10800000),
	},
	{
		id: "5",
		title: "বেতন জমা হয়েছে!",
		message: "আপনার মাসিক বেতন ৳10000 জমা হয়েছে।",
		type: "salary",
		isRead: true,
		createdAt: new Date(Date.now() - 14400000),
	},
	{
		id: "6",
		title: "নতুন প্রজেক্ট",
		message: "একটি নতুন বিনিয়োগ প্রজেক্ট চালু হয়েছে।",
		type: "project",
		isRead: false,
		createdAt: new Date(Date.now() - 18000000),
	},
	{
		id: "7",
		title: "সতর্কতা",
		message: "আপনার পাসওয়ার্ড পরিবর্তনের অনুরোধ করা হয়েছে।",
		type: "withdraw",
		isRead: true,
		createdAt: new Date(Date.now() - 21600000),
	},
	{
		id: "8",
		title: "নতুন ডিপোজিট",
		message: "আপনার অ্যাকাউন্টে ৳1500 জমা হয়েছে।",
		type: "deposit",
		isRead: true,
		createdAt: new Date(Date.now() - 25200000),
	},
	{
		id: "9",
		title: "লাভের আপডেট",
		message: "প্রজেক্ট Y থেকে ৳100 লাভ পেয়েছেন।",
		type: "project",
		isRead: false,
		createdAt: new Date(Date.now() - 28800000),
	},
];

const pageSize = 5;

const Notifications = () => {
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [page, setPage] = useState(1);
	const [meta, setMeta] = useState({ total: 0, totalPage: 1 });
	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const fetchNotifications = (pageNumber: number, search: string) => {
		setLoading(true);
		setTimeout(() => {
			const filteredData = mockNotificationsData.filter(
				item =>
					item.title.toLowerCase().includes(search.toLowerCase()) ||
					item.message.toLowerCase().includes(search.toLowerCase())
			);
			const startIndex = (pageNumber - 1) * pageSize;
			const endIndex = startIndex + pageSize;
			const paginatedData = filteredData.slice(startIndex, endIndex);

			setNotifications(paginatedData);
			setMeta({
				total: filteredData.length,
				totalPage: Math.ceil(filteredData.length / pageSize),
			});
			setLoading(false);
		}, 500);
	};

	useEffect(() => {
		fetchNotifications(page, searchTerm);
	}, [page, searchTerm]);

	const handleMarkAsRead = (id: string) => {
		setNotifications(prev =>
			prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
		);
	};

	const typeIcons = {
		deposit: <PiggyBank className="w-5 h-5" />,
		withdraw: <TrendingDown className="w-5 h-5" />,
		project: <Briefcase className="w-5 h-5" />,
		salary: <PlusCircle className="w-5 h-5" />,
		referral: <CheckCircle className="w-5 h-5" />,
	};

	const typeColors = {
		deposit: "text-green-500",
		withdraw: "text-red-500",
		project: "text-blue-500",
		salary: "text-yellow-500",
		referral: "text-cyan-500",
	};

	return (
		<div className="min-h-screen bg-[#0a0a0a] text-white p-4 font-sans">
			<div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-[18px] backdrop-blur-md p-4 mb-4 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div className="flex flex-col items-start">
					<h1 className="text-2xl font-bold mb-1">নোটিফিকেশন</h1>
					<p className="text-sm text-gray-400">আপনার সকল নোটিফিকেশনের তালিকা</p>
				</div>
				<div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
					<div className="relative w-full sm:w-auto flex-grow">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
						<Input
							placeholder="সার্চ করুন..."
							value={searchTerm}
							onChange={e => {
								setSearchTerm(e.target.value);
								setPage(1);
							}}
							className="pl-9 pr-4 bg-gray-800 text-white placeholder-gray-400 border-gray-700 w-full"
						/>
					</div>
					<Button
						onClick={() => fetchNotifications(page, searchTerm)}
						variant="outline"
						className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 w-full sm:w-auto">
						<RefreshCcw className="w-4 h-4 mr-2" /> রিফ্রেশ
					</Button>
				</div>
			</div>

			<div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-xl backdrop-blur-md p-4 mt-6">
				{loading ? (
					<div className="flex items-center justify-center p-10 text-gray-400">
						<RotateCw className="w-5 h-5 mr-2 animate-spin" />
						<p className="text-lg">লোডিং...</p>
					</div>
				) : notifications.length === 0 ? (
					<div className="text-center p-10">
						<p className="text-lg text-gray-400">
							কোনো নোটিফিকেশন পাওয়া যায়নি।
						</p>
					</div>
				) : (
					<ul className="divide-y divide-gray-700">
						{notifications.map(item => (
							<li
								key={item.id}
								className={cn(
									"py-4 flex items-center justify-between transition-all duration-300",
									!item.isRead && "bg-gray-800/40"
								)}>
								<div
									className="flex items-center"
									onClick={() => handleMarkAsRead(item.id)}>
									<div
										className={cn("p-2 rounded-full", typeColors[item.type])}>
										{typeIcons[item.type] || <BellRing className="w-5 h-5" />}
									</div>
									<div className="ml-4">
										<p className="font-semibold text-lg">{item.title}</p>
										<p className="text-sm text-gray-400">{item.message}</p>
										<p className="text-xs text-gray-500 mt-1">
											{new Date(item.createdAt).toLocaleString()}
										</p>
									</div>
								</div>
								<div className="text-right flex items-center gap-2">
									<span
										className={cn(
											"inline-block w-2 h-2 rounded-full",
											item.isRead ? "bg-transparent" : "bg-red-500"
										)}
									/>
									<Button
										variant="ghost"
										size="icon"
										onClick={() => handleMarkAsRead(item.id)}
										className={cn(
											"transition-colors duration-200",
											item.isRead
												? "text-gray-500 hover:text-green-500"
												: "text-green-500 hover:text-green-400"
										)}>
										<ReadIcon className="w-4 h-4" />
									</Button>
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

export default Notifications;
