// components/Notifications.jsx
"use client";

import { useState, useEffect, useCallback } from "react"; // 💡 Added useCallback
import {
	// ... (Your Lucide Icons)
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
	PiggyBank,
	UserPlus,
	Settings, // 💡 For 'system' type
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Import the types from the separate file
import { INotification, NotificationType } from "@/types/notification"; // 💡 Renamed to TNotification for clarity
import {
	getUserNotifications,
	markNotificationAsRead,
} from "@/services/NotificationService"; // ⚠️ Ensure this import path is correct

// 🔴 MOCK DATA REMOVED

const pageSize = 10; // 💡 Assuming a default API page size of 10 or more

// Helper function to get the correct icon based on type
const getNotificationIcon = (type: NotificationType) => {
	switch (type) {
		case "system":
			return <Settings className="w-5 h-5" />;
		case "deposit":
			return <DollarSign className="w-5 h-5" />;
		case "withdraw":
			return <ArrowUpFromDot className="w-5 h-5" />;
		case "salary":
			return <PiggyBank className="w-5 h-5" />;
		case "referral":
			return <UserPlus className="w-5 h-5" />;
		case "project":
			return <FileText className="w-5 h-5" />;
		default:
			return <BellRing className="w-5 h-5" />;
	}
};

const getNotificationColor = (type: NotificationType) => {
	switch (type) {
		case "system":
			return "text-gray-500";
		case "deposit":
			return "text-green-500";
		case "withdraw":
			return "text-red-500";
		case "salary":
			return "text-yellow-500";
		case "referral":
			return "text-cyan-500";
		case "project":
			return "text-blue-500";
		default:
			return "text-gray-500";
	}
};

const Notifications = () => {
	// Use the imported Notification interface for state
	const [notifications, setNotifications] = useState<INotification[]>([]);
	const [page, setPage] = useState(1);
	// 💡 meta structure adjusted to match a typical API response
	const [meta, setMeta] = useState({ total: 0, totalPage: 1, limit: pageSize });
	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	// 🔴 CORE CHANGE: API Integration
	const fetchNotifications = useCallback(async (pageNumber, search) => {
		setLoading(true);
		try {
			const queryParams = {
				page: pageNumber,
				limit: pageSize,
				// 💡 Adjust 'search' parameter name if your API uses a different key (e.g., 'q')
				search: search,
			};

			// 💡 Call the real API service function
			const result = await getUserNotifications();

			if (result.success && Array.isArray(result.data)) {
				setNotifications(result.data);
				setMeta(result.meta || { total: 0, totalPage: 1, limit: pageSize });
			} else {
				setNotifications([]);
				setMeta({ total: 0, totalPage: 1, limit: pageSize });
				console.error(
					"Failed to fetch notifications:",
					result.error || "Invalid response data."
				);
				// Optionally show a toast notification here
			}
		} catch (error) {
			console.error("Network or fetch error:", error);
			setNotifications([]);
			setMeta({ total: 0, totalPage: 1, limit: pageSize });
			// Optionally show an error toast here
		} finally {
			setLoading(false);
		}
	}, []); // Empty dependency array means this function is created once

	useEffect(() => {
		// 💡 Fetch data whenever page or searchTerm changes
		fetchNotifications(page, searchTerm);
	}, [page, searchTerm, fetchNotifications]);

	const handleMarkAsRead = async (id: string) => {
		// 1. Optimistic UI Update (Fast visual response)
		setNotifications(prev =>
			prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
		);

		try {
			// 2. 🔴 API Call to update status on the server
			const result = await markNotificationAsRead(id);

			if (!result.success) {
				// 3. If API fails, rollback the UI change
				setNotifications(prev =>
					prev.map(n => (n.id === id ? { ...n, isRead: false } : n))
				);
				console.error("Failed to mark notification as read:", result.error);
				// Optionally show error toast
			}
		} catch (error) {
			// 4. Rollback on network error
			setNotifications(prev =>
				prev.map(n => (n.id === id ? { ...n, isRead: false } : n))
			);
			console.error("Error marking as read:", error);
		}
	};

	// 💡 This is now a simple button click that triggers a re-fetch
	const handleRefresh = () => {
		// Resetting page to 1 on refresh is often a good default
		if (page !== 1) setPage(1);
		else fetchNotifications(page, searchTerm); // Force re-fetch if already on page 1
	};

	// 💡 Pagination check
	const isFirstPage = page === 1;
	const isLastPage = page === meta.totalPage || meta.totalPage === 0;

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
								setPage(1); // Reset page to 1 on search change
							}}
							className="pl-9 pr-4 bg-gray-800 text-white placeholder-gray-400 border-gray-700 w-full"
						/>
					</div>
					<Button
						onClick={handleRefresh} // 💡 Use the new refresh handler
						variant="outline"
						disabled={loading}
						className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 w-full sm:w-auto">
						<RefreshCcw
							className={cn("w-4 h-4 mr-2", loading && "animate-spin")}
						/>{" "}
						রিফ্রেশ
					</Button>
				</div>
			</div>

			<div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-xl backdrop-blur-md p-4 mt-6">
				{loading && notifications.length === 0 ? ( // Only show full loader if no data is present
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
								// 💡 Added isRead check to the onClick to avoid redundant API calls
								onClick={() => !item.isRead && handleMarkAsRead(item.id)}
								className={cn(
									"py-4 flex items-center justify-between transition-all duration-300 px-2 rounded-lg cursor-pointer",
									!item.isRead
										? "bg-gray-800/60 hover:bg-gray-800/80"
										: "hover:bg-gray-800/20"
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
									{/* 💡 Mark as Read button removed, as we added the functionality to the li's onClick */}
									{/* <Button variant="ghost" ... /> */}
									<ReadIcon
										className={cn(
											"w-4 h-4",
											item.isRead ? "text-green-500" : "text-gray-600"
										)}
									/>
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
						className="text-white hover:bg-gray-800"
						disabled={isFirstPage || loading} // 💡 Disabled check
						onClick={() => setPage(prev => prev - 1)}>
						<ChevronLeft className="w-4 h-4 mr-2" /> পূর্ববর্তী
					</Button>
					<div className="flex items-center space-x-2 text-sm text-gray-400">
						<span>
							পৃষ্ঠা {page} / {meta.totalPage}
						</span>
						<span className="text-xs">({meta.total} মোট)</span>
					</div>
					<Button
						variant="ghost"
						className="text-white hover:bg-gray-800"
						disabled={isLastPage || loading} // 💡 Disabled check
						onClick={() => setPage(prev => prev + 1)}>
						পরবর্তী <ChevronRight className="w-4 h-4 ml-2" />
					</Button>
				</div>
			)}
		</div>
	);
};

export default Notifications;
