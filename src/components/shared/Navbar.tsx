"use client";

import { Home, TrendingUp, Users, User, History } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Navbar() {
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
			<Link
				href={"/history"}
				className="flex flex-col items-center text-[#00e5ff] hover:text-white transition-transform hover:scale-110 cursor-pointer">
				<History className="w-5 h-5 mb-1" /> ইতিহাস
			</Link>
			<Link
				href={"/account"}
				className="flex flex-col items-center text-[#00e5ff] hover:text-white transition-transform hover:scale-110 cursor-pointer">
				<User className="w-5 h-5 mb-1" /> অ্যাকাউন্ট
			</Link>
		</nav>
	);
}
