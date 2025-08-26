// components/Navbar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
	const [open, setOpen] = useState(false);

	return (
		<nav className="bg-white shadow-md sticky top-0 z-50">
			<div className="container mx-auto flex items-center justify-between px-4 py-3">
				{/* Logo */}
				<Link href="/" className="text-xl font-bold text-indigo-600">
					Luxenta
				</Link>

				{/* Desktop Menu */}
				<ul className="hidden md:flex space-x-6 font-medium text-gray-700">
					<li>
						<Link href="/">Home</Link>
					</li>
					<li>
						<Link href="/investment">Investment</Link>
					</li>
					<li>
						<Link href="/team">Team</Link>
					</li>
					<li>
						<Link href="/account">My Account</Link>
					</li>
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
				<ul className="md:hidden bg-white border-t shadow-lg flex flex-col space-y-4 px-6 py-4 font-medium text-gray-700">
					<li>
						<Link href="/" onClick={() => setOpen(false)}>
							Home
						</Link>
					</li>
					<li>
						<Link href="/investment" onClick={() => setOpen(false)}>
							Investment
						</Link>
					</li>
					<li>
						<Link href="/team" onClick={() => setOpen(false)}>
							Team
						</Link>
					</li>
					<li>
						<Link href="/account" onClick={() => setOpen(false)}>
							My Account
						</Link>
					</li>
				</ul>
			)}
		</nav>
	);
}
