"use client";

import Image from "next/image";
import banner from "../../../../assets/images/banner.webp";
export default function DynamicBanner() {
	return (
		<div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg">
			<Image src={banner} alt="Luxenta Banner" fill className="object-cover" />
			{/* Overlay */}
			<div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
				<h2 className="text-white text-3xl sm:text-4xl font-bold mb-2">
					Welcome to Luxenta
				</h2>
				<p className="text-white/80 text-sm sm:text-base max-w-xl">
					Your trusted investment platform. Deposit, invest, and earn
					seamlessly.
				</p>
			</div>
		</div>
	);
}
