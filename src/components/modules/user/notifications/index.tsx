// components/Notifications.jsx
"use client";

import { useState, useEffect } from "react";
import {
	TrendingDown,
	PiggyBank,
	Briefcase,
	PlusCircle,
	UserPlus,
	CheckCircle,
	ChevronLeft,
	ChevronRight,
	RefreshCcw,
	Search,
	BellRing,
	CheckCircle as ReadIcon,
	RotateCw,
	DollarSign,
	ArrowUpFromDot,
	FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Import the types from the separate file
import { Notification, NotificationType } from "@/types/notification";

// Mock data, now using the imported Notification type
const mockNotificationsData: Notification[] = [
	{
		id: "1",
		investorId: "user123",
		title: "নতুন ডিপোজিট!",
		message: "আপনার অ্যাকাউন্টে ৳5000 জমা হয়েছে।",
		type: NotificationType.deposit,
		isRead: false,
		createdAt: new Date(Date.now() - 60000),
	},
	{
		id: "2",
		investorId: "user123",
		title: "বিনিয়োগের লাভ",
		message: "প্রজেক্ট X থেকে ৳250 লাভ পেয়েছেন।",
		type: NotificationType.project,
		isRead: false,
		createdAt: new Date(Date.now() - 3600000),
	},
	{
		id: "3",
		investorId: "user123",
		title: "উত্তোলন সম্পন্ন",
		message: "আপনার ৳200 উত্তোলন সফল হয়েছে।",
		type: NotificationType.withdraw,
		isRead: true,
		createdAt: new Date(Date.now() - 7200000),
	},
	{
		id: "4",
		investorId: "user123",
		title: "রেফারেল বোনাস",
		message: "নতুন রেফারেলের জন্য ৳50 বোনাস পেয়েছেন।",
		type: NotificationType.referral,
		isRead: false,
		createdAt: new Date(Date.now() - 10800000),
	},
	{
		id: "5",
		investorId: "user123",
		title: "বেতন জমা হয়েছে!",
		message: "আপনার মাসিক বেতন ৳10000 জমা হয়েছে।",
		type: NotificationType.salary,
		isRead: true,
		createdAt: new Date(Date.now() - 14400000),
	},
	{
		id: "6",
		investorId: "user123",
		title: "নতুন প্রজেক্ট",
		message: "একটি নতুন বিনিয়োগ প্রজেক্ট চালু হয়েছে।",
		type: NotificationType.project,
		isRead: false,
		createdAt: new Date(Date.now() - 18000000),
	},
	{
		id: "7",
		investorId: "user123",
		title: "সতর্কতা",
		message: "আপনার পাসওয়ার্ড পরিবর্তনের অনুরোধ করা হয়েছে।",
		type: NotificationType.withdraw,
		isRead: true,
		createdAt: new Date(Date.now() - 21600000),
	},
	{
		id: "8",
		investorId: "user123",
		title: "নতুন ডিপোজিট",
		message: "আপনার অ্যাকাউন্টে ৳1500 জমা হয়েছে।",
		type: NotificationType.deposit,
		isRead: true,
		createdAt: new Date(Date.now() - 25200000),
	},
	{
		id: "9",
		investorId: "user123",
		title: "লাভের আপডেট",
		message: "প্রজেক্ট Y থেকে ৳100 লাভ পেয়েছেন।",
		type: NotificationType.project,
		isRead: false,
		createdAt: new Date(Date.now() - 28800000),
	},
];

const pageSize = 5;

// Helper function to get the correct icon based on type
const getNotificationIcon = (type: NotificationType) => {
	switch (type) {
		case NotificationType.deposit:
			return <DollarSign className="w-5 h-5" />;
		case NotificationType.withdraw:
			return <ArrowUpFromDot className="w-5 h-5" />;
		case NotificationType.salary:
			return <PiggyBank className="w-5 h-5" />;
		case NotificationType.referral:
			return <UserPlus className="w-5 h-5" />;
		case NotificationType.project:
			return <FileText className="w-5 h-5" />;
		default:
			return <BellRing className="w-5 h-5" />;
	}
};

const getNotificationColor = (type: NotificationType) => {
	switch (type) {
		case NotificationType.deposit:
			return "text-green-500";
		case NotificationType.withdraw:
			return "text-red-500";
		case NotificationType.salary:
			return "text-yellow-500";
		case NotificationType.referral:
			return "text-cyan-500";
		case NotificationType.project:
			return "text-blue-500";
		default:
			return "text-gray-500";
	}
};

const Notifications = () => {
	// Use the imported Notification interface for state
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [page, setPage] = useState(1);
	const [meta, setMeta] = useState({ total: 0, totalPage: 1 });
	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const fetchNotifications = (pageNumber: number, search: string) => {
		setLoading(true);
		// Simulate API call delay
		setTimeout(() => {
			const filteredData = mockNotificationsData.filter(
				item =>
					item.title.toLowerCase().includes(search.toLowerCase()) ||
					item.message.toLowerCase().includes(search.toLowerCase())
			);
			const startIndex = (pageNumber - 1) * pageSize;
			const paginatedData = filteredData.slice(
				startIndex,
				startIndex + pageSize
			);

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
								<div className="flex items-center">
									<div
										className={cn(
											"p-2 rounded-full",
											getNotificationColor(item.type)
										)}>
										{getNotificationIcon(item.type)}
									</div>
									<div className="ml-4">
										<p className="font-semibold text-lg">{item.title}</p>
										<p className="text-sm text-gray-400">{item.message}</p>
										<p className="text-xs text-gray-500 mt-1">
											{new Date(item.createdAt).toLocaleString("bn-BD", {
												year: "numeric",
												month: "long",
												day: "numeric",
												hour: "2-digit",
												minute: "2-digit",
											})}
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
