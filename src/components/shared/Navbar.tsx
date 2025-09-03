"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
	const [open, setOpen] = useState(false);

	const menuItems = [
		{ name: "Home", href: "/" },
		{ name: "Investment", href: "/investment" },
		{ name: "Team", href: "/team" },
		{ name: "My Account", href: "/user/account" },
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
				<button
					className="md:hidden text-2xl text-gray-700"
					onClick={() => setOpen(!open)}>
					{open ? <FaTimes /> : <FaBars />}
				</button>
			</div>

			{/* Mobile Menu */}
			{open && (
				<ul className="md:hidden bg-white border-t shadow-lg flex flex-col space-y-4 px-6 py-4 font-medium text-gray-700 animate-slide-down">
					{menuItems.map(item => (
						<li key={item.name}>
							<Link href={item.href} onClick={() => setOpen(false)}>
								{item.name}
							</Link>
						</li>
					))}
				</ul>
			)}
		</nav>
	);
}
