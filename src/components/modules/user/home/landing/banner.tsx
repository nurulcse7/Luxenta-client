"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import { useState, useEffect } from "react";
import { getBanners } from "@/services/BannerService";

const Banner = () => {
	const [banners, setBanners] = useState<{ imageUrl: string }[]>([]);
	const [mainImageIndex, setMainImageIndex] = useState(0);

	// 🔹 Backend থেকে banners fetch
	useEffect(() => {
		const fetchBanners = async () => {
			try {
				const res = await getBanners();
				if (res.success && res.data) {
					setBanners(res.data);
				}
			} catch (err) {
				console.error("Failed to fetch banners", err);
			}
		};

		fetchBanners();
	}, []);

	// 🔹 বড় ছবি auto change
	useEffect(() => {
		if (!banners.length) return;

		const interval = setInterval(() => {
			setMainImageIndex(prev => (prev + 1) % banners.length);
		}, 3000); // 3 seconds

		return () => clearInterval(interval);
	}, [banners]);

	if (!banners.length) return null;

	return (
		<div>
			{/* Main Image */}
			<div className="flex justify-center px-6 mb-6">
				<div className="relative w-full max-w-[800px] h-[300px] md:h-[350px]  rounded-xl overflow-hidden shadow-lg">
					<Image
						src={banners[mainImageIndex].imageUrl}
						alt={`Banner ${mainImageIndex}`}
						fill
						className="object-cover transition-all duration-500"
						priority
					/>
				</div>
			</div>

			{/* Auto Scrolling Small Images */}
			<div className="overflow-hidden relative mb-8 px-6">
				<Marquee gradient={false} speed={50}>
					{banners.map((banner, i) => (
						<Image
							key={i}
							src={banner.imageUrl}
							width={140}
							height={90}
							className="w-[140px] h-[90px] mr-2 rounded-md object-cover flex-shrink-0"
							alt={`slide-${i}`}
						/>
					))}
				</Marquee>
			</div>
		</div>
	);
};

export default Banner;
