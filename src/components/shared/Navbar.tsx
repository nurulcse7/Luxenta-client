"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
	Home,
	TrendingUp,
	Users,
	User,
	Bell,
	DollarSign,
	ArrowUpFromDot,
	Clock,
	UserPlus,
	FileText,
	Settings,
	Shuffle,
} from "lucide-react";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

import { INotification, NotificationType } from "@/types/notification";
import {
	getUserNotifications,
	markNotificationAsRead,
} from "@/services/NotificationService";
import {
	getSocket,
	subscribeEvent,
	unsubscribeEvent,
} from "@/lib/socketClient";
import { useUser } from "@/context/UserContext";

const getNotificationIcon = (type: NotificationType) => {
	switch (type) {
		case "system":
			return <Settings className="w-4 h-4 text-gray-400" />;
		case "deposit":
			return <DollarSign className="w-4 h-4 text-green-500" />;
		case "withdraw":
			return <ArrowUpFromDot className="w-4 h-4 text-red-500" />;
		case "salary":
			return <Clock className="w-4 h-4 text-blue-500" />;
		case "referral":
			return <UserPlus className="w-4 h-4 text-yellow-500" />;
		case "project":
			return <FileText className="w-4 h-4 text-purple-500" />;
		case "MAIN_TO_LUXENTA":
		case "LUXENTA_TO_MAIN":
			return <Shuffle className="w-4 h-4 text-indigo-400" />;
		default:
			return <Bell className="w-4 h-4 text-white" />;
	}
};

export default function Navbar() {
	const [open, setOpen] = useState(false);
	const [notifications, setNotifications] = useState<INotification[]>([]);
	const { user } = useUser();

	useEffect(() => {
		// --- 1. Initial Data Fetch ---
		const fetchNotifications = async () => {
			try {
				// 💡 সার্ভিসে queryParams থাকলে এখানে তা পাস করুন
				const result: any = await getUserNotifications({ page: 1, limit: 10 });
				if (result.success && Array.isArray(result.data)) {
					// সাধারণত Navbar-এর জন্য শুধু নতুন নোটিফিকেশনগুলোই লোড করা হয়
					setNotifications(result.data);
				} else {
					setNotifications([]);
				}
			} catch (error) {
				console.error("Error fetching notifications:", error);
				setNotifications([]);
			}
		};

		fetchNotifications();

		// --- 2. Socket Setup for Real-Time Updates ---
		const socket = getSocket();

		const sendUserId = () => {
			if (user?.id) {
				socket.emit("set-user", user?.id);
			}
		};

		if (user?.id) {
			if (socket.connected) {
				sendUserId();
			}

			socket.on("connect", sendUserId);
		}

		// 🔹 Subscribe to new notification events
		subscribeEvent("new-notification", (newNotification: INotification) => {
			setNotifications(prev => [newNotification, ...prev]);
		});

		// --- 3. Cleanup Function ---
		return () => {
			unsubscribeEvent("new-notification");

			if (user?.id) {
				socket.off("connect", sendUserId);
			}
		};
	}, [user?.id]);

	const handleMarkAsRead = async (notificationId: string) => {
		// 1. Optimistic UI Update
		setNotifications(prevNotifications =>
			prevNotifications.map(n =>
				n.id === notificationId ? { ...n, isRead: true } : n
			)
		);

		try {
			// 2. API Call (Error handling omitted for brevity, but should be present)
			await markNotificationAsRead(notificationId);
		} catch (error) {
			// 3. If API fails, rollback (Rollback logic should be added here for production)
			console.error("Error marking notification as read:", error);
		}
	};

	const newNotifications = notifications.filter(n => !n.isRead);
	// displayedNotifications এখন আর দরকার নেই, ScrollArea পুরো নতুন তালিকা দেখাবে।
	// const displayedNotifications = newNotifications.slice(0, 5);

	return (
		<nav className="fixed bottom-0 left-0 right-0 bg-[rgba(255,255,255,0.08)] backdrop-blur-md border-t pb-5 border-[rgba(255,255,255,0.18)] flex justify-around py-2 text-xs z-50">
			<Link
				href={"/"}
				className="flex flex-col items-center text-[#00e5ff] hover:text-white transition-transform hover:scale-110 cursor-pointer">
				<Home className="w-5 h-5 mb-1" /> হোম
			</Link>
			<Link
				href={"/invest"}
				className="flex flex-col items-center text-[#00e5ff] hover:text-white transition-transform hover:scale-110 cursor-pointer">
				<TrendingUp className="w-5 h-5 mb-1" /> বিনিয়োগ
			</Link>
			<Link
				href={"/team"}
				className="flex flex-col items-center text-[#00e5ff] hover:text-white transition-transform hover:scale-110 cursor-pointer">
				<Users className="w-5 h-5 mb-1" /> দল
			</Link>

			{/* Notification Dropdown using Popover */}
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<button className="flex flex-col items-center text-[#00e5ff] hover:text-white transition-transform hover:scale-110 cursor-pointer relative">
						<Bell className="w-5 h-5 mb-1" />
						{newNotifications.length > 0 && (
							<span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center">
								{newNotifications.length > 9 ? "9+" : newNotifications.length}
							</span>
						)}
						নোটিফিকেশন
					</button>
				</PopoverTrigger>
				<PopoverContent className="w-72 p-0 rounded-lg shadow-lg bg-gray-900 border-gray-700 text-white">
					<div className="p-4 border-b border-gray-700">
						<h4 className="font-bold text-sm">
							{" "}
							নোটিফিকেশন ({newNotifications.length})
						</h4>
					</div>
					{newNotifications.length > 0 ? (
						<ScrollArea className="h-48">
							<ul className="divide-y divide-gray-700">
								{newNotifications.map(notification => (
									<li
										key={notification.id}
										onClick={() => handleMarkAsRead(notification.id)}
										className="p-4 flex items-start gap-3 hover:bg-gray-800 cursor-pointer transition-colors">
										<div className="pt-1">
											{/* ✅ updated getNotificationIcon ব্যবহার করা হলো */}
											{getNotificationIcon(notification.type)}
										</div>
										<div className="flex-1">
											<p className="text-sm font-semibold text-white">
												{notification.title}
											</p>
											<p className="text-xs text-gray-400 mt-1">
												{notification.message}
											</p>
										</div>
									</li>
								))}
							</ul>
						</ScrollArea>
					) : (
						<p className="p-4 text-center text-gray-500 text-sm">
							কোনো নতুন নোটিফিকেশন নেই।
						</p>
					)}
					<div className="p-2 border-t border-gray-700 text-center">
						<Link href="/notifications">
							<Button
								variant="ghost"
								className="w-full text-blue-400 hover:bg-gray-800">
								সব নোটিফিকেশন দেখুন
							</Button>
						</Link>
					</div>
				</PopoverContent>
			</Popover>

			<Link
				href={"/account"}
				className="flex flex-col items-center text-[#00e5ff] hover:text-white transition-transform hover:scale-110 cursor-pointer">
				<User className="w-5 h-5 mb-1" /> অ্যাকাউন্ট
			</Link>
		</nav>
	);
}
