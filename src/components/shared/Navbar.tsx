// components/Navbar.js
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
} from "lucide-react";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Notification, NotificationType } from "@/types/notification";

// A helper function to get the appropriate icon based on the notification type
const getNotificationIcon = (type: NotificationType) => {
	switch (type) {
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
		default:
			return <Bell className="w-4 h-4 text-gray-500" />;
	}
};

export default function Navbar() {
	const [open, setOpen] = useState(false);
	const [notifications, setNotifications] = useState<Notification[]>([]);

	// Fetch notifications from the backend
	useEffect(() => {
		const fetchNotifications = async () => {
			try {
				// Replace with your actual API endpoint
				const response = await fetch("/api/notifications");
				if (!response.ok) {
					throw new Error("Failed to fetch notifications");
				}
				const data = await response.json();
				setNotifications(data);
			} catch (error) {
				console.error("Error fetching notifications:", error);
			}
		};

		fetchNotifications();
	}, []);

	const handleMarkAsRead = async (notificationId: string) => {
		try {
			// Replace with your actual API endpoint to mark a notification as read
			await fetch(`/api/notifications/${notificationId}/read`, {
				method: "PUT",
			});

			// Update the state to reflect the change immediately
			setNotifications(prevNotifications =>
				prevNotifications.map(n =>
					n.id === notificationId ? { ...n, isRead: true } : n
				)
			);
		} catch (error) {
			console.error("Error marking notification as read:", error);
		}
	};

	const newNotifications = notifications.filter(n => !n.isRead);
	const displayedNotifications = newNotifications.slice(0, 5);

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
			<Popover  open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<button className="flex flex-col items-center text-[#00e5ff] hover:text-white transition-transform hover:scale-110 cursor-pointer relative">
						<Bell className="w-5 h-5 mb-1" />
						{newNotifications.length > 0 && (
							<span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center">
								{newNotifications.length}
							</span>
						)}
						নোটিফিকেশন
					</button>
				</PopoverTrigger>
				<PopoverContent className="w-72 p-0 rounded-lg shadow-lg">
					<div className="p-4 border-b">
						<h4 className="font-bold text-sm"> নোটিফিকেশন</h4>
					</div>
					{displayedNotifications.length > 0 ? (
						<ScrollArea className="h-48">
							<ul className="divide-y divide-gray-200">
								{displayedNotifications.map(notification => (
									<li
										key={notification.id}
										onClick={() => handleMarkAsRead(notification.id)}
										className="p-4 flex items-start gap-3 hover:bg-gray-50 cursor-pointer transition-colors">
										<div className="pt-1">
											{getNotificationIcon(notification.type)}
										</div>
										<div className="flex-1">
											<p
												className={`text-sm ${
													!notification.isRead
														? "font-semibold text-gray-900"
														: "text-gray-600"
												}`}>
												{notification.title}
											</p>
											<p className="text-xs text-gray-500 mt-1">
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
					<div className="p-2 border-t text-center">
						<Link href="/notifications">
							<Button variant="ghost" className="w-full text-blue-600">
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
