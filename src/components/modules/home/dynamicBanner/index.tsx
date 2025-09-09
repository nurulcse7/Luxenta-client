interface Banner {
	id: string;
	imageUrl: string;
}

const banners: Banner[] = [
	{ id: "1", imageUrl: "/assets/images/Crypto.jpeg" },
	{ id: "2", imageUrl: "/assets/images/gold.jpeg" },
	{ id: "3", imageUrl: "/assets/images/Real.jpeg" },
];

export default function DynamicBanner() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			{banners.map(banner => (
				<img
					key={banner.id}
					src={banner.imageUrl}
					alt={`Banner ${banner.id}`}
					className="w-full h-full object-cover"
				/>
			))}
		</div>
	);
}
