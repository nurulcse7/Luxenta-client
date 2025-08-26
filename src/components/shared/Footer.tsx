// components/Footer.tsx
import Link from "next/link";
import { FaFacebook, FaTwitter, FaTelegram } from "react-icons/fa";

export default function Footer() {
	return (
		<footer className="bg-gray-900 text-gray-300 mt-10">
			<div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
				{/* Brand Info */}
				<div>
					<h2 className="text-xl font-bold text-white">Luxenta</h2>
					<p className="mt-2 text-sm">
						Secure investment platform with trusted returns.
					</p>
				</div>

				{/* Quick Links */}
				<div>
					<h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
					<ul className="space-y-2 text-sm">
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
				</div>

				{/* Socials */}
				<div>
					<h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
					<div className="flex space-x-4 text-xl">
						<a href="#">
							<FaFacebook />
						</a>
						<a href="#">
							<FaTwitter />
						</a>
						<a href="#">
							<FaTelegram />
						</a>
					</div>
				</div>
			</div>

			<div className="border-t border-gray-700 text-center text-sm py-4">
				© {new Date().getFullYear()} Luxenta. All rights reserved.
			</div>
		</footer>
	);
}
