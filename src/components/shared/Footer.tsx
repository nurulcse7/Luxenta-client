"use client";

import Link from "next/link";
import { FaFacebook, FaTwitter, FaTelegram } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function Footer() {
	const quickLinks = [
		{ name: "Home", href: "/" },
		{ name: "Investment", href: "/investment" },
		{ name: "Team", href: "/team" },
		{ name: "My Account", href: "/account" },
	];

	return (
		<footer className="bg-gray-900 text-gray-300 mt-12">
			<div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
				{/* Brand */}
				<div>
					<h2 className="text-2xl font-bold text-white">Luxenta</h2>
					<p className="mt-2 text-sm">
						Secure investment platform with trusted returns.
					</p>
				</div>

				{/* Quick Links */}
				<div>
					<h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
					<ul className="space-y-2">
						{quickLinks.map(link => (
							<li key={link.href}>
								<Link
									href={link.href}
									className="hover:text-indigo-500 transition-colors duration-200 text-sm">
									{link.name}
								</Link>
							</li>
						))}
					</ul>
				</div>

				{/* Social Links */}
				<div>
					<h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
					<div className="flex space-x-3">
						<Button
							variant="ghost"
							size="icon"
							className="text-gray-300 hover:text-blue-600 p-0"
							aria-label="Facebook">
							<FaFacebook />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="text-gray-300 hover:text-sky-400 p-0"
							aria-label="Twitter">
							<FaTwitter />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="text-gray-300 hover:text-blue-400 p-0"
							aria-label="Telegram">
							<FaTelegram />
						</Button>
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="border-t border-gray-700 text-center text-sm py-4">
				© {new Date().getFullYear()} Luxenta. All rights reserved.
			</div>
		</footer>
	);
}
