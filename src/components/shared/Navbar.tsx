"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
	const [open, setOpen] = useState(false);

	const menuItems = [
		{ name: "Home", href: "/" },
		{ name: "Investment", href: "/investment" },
		{ name: "Team", href: "/team" },
		{ name: "My Account", href: "/account" },
	];

	return (
		<nav className="bg-white shadow-md sticky top-0 z-50">
			<div className="container mx-auto flex items-center justify-between px-4 py-3">
				{/* Logo */}
				<Link href="/" className="text-2xl font-bold text-indigo-600">
					Luxenta
				</Link>

				{/* Desktop Menu */}
				<ul className="hidden md:flex space-x-6 font-medium text-gray-700">
					{menuItems.map(item => (
						<li key={item.name}>
							<Link
								href={item.href}
								className="hover:text-indigo-600 transition-colors duration-200">
								{item.name}
							</Link>
						</li>
					))}
				</ul>

				{/* Mobile Toggle */}
				<div className="md:hidden flex items-center gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="p-2">
								<FaBars size={22} />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-40 bg-white shadow-lg rounded-md p-2">
							{menuItems.map(item => (
								<DropdownMenuItem key={item.name}>
									<Link href={item.href}>{item.name}</Link>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</nav>
	);
}
