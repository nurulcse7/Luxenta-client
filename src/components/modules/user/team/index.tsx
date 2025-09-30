"use client";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import Real from "../../../../../public/assets/images/Real.jpeg";

const Team = () => {
	const { user } = useUser();
	return (
		<div
			className="min-h-screen bg-[#0a0f1c] text-[#e6f1ff] p-4 font-[Noto_Sans_Bengali]"
			lang="bn">
			{/* Header */}
			<header className="flex justify-between items-center p-2">
				<div className="flex items-center gap-3">
					<Image
						src={Real}
						alt={user?.name as string}
						width={48}
						height={48}
						className="w-12 h-12 rounded-full border-2 border-[#00e5ff]"
					/>
					<div className="text-sm leading-6">
						ইউআইডি: <b>210226433</b>
						<br />
						অভ্যর্থনা কোড: <b>C9JTKJ</b>
					</div>
				</div>
				<div className="w-[30px] h-[30px] rounded-full border-2 border-[#00e5ff] flex items-center justify-center animate-spin">
					<span className="text-lg">🌍</span>
				</div>
			</header>

			{/* Main Card */}
			<section className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-xl p-4 mt-4 flex justify-between items-center">
				<div className="flex flex-col gap-2">
					<h3 className="text-base text-[#00e5ff]">টিমের সুবিধা</h3>
					<div className="text-2xl font-bold">৳180.00</div>
					<div className="text-sm opacity-80">আজকের আয়: ৳0.00</div>
				</div>
				<div className="flex flex-col items-center gap-1">
					<button className="bg-gradient-to-br from-[#00e5ff] to-[#6a5cff] text-[#051018] px-3 py-1.5 rounded-md text-sm font-medium">
						স্থানান্তর করা
					</button>
					<div className="text-sm mt-1">সংখ্যা: 0</div>
				</div>
			</section>

			{/* Tree Section */}
			<section className="mt-6 text-center">
				<h2 className="text-[#00e5ff] text-lg mb-2">রেজিস্ট্রেশনের সংখ্যা</h2>
				<div className="flex justify-center mb-2">
					<div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-md px-3 py-1 text-xs font-semibold">
						মোট
						<br />
						<b className="block mt-1 text-white text-sm">1</b>
					</div>
				</div>
				<div className="flex justify-center gap-4 relative mt-3 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-[rgba(255,255,255,0.18)]">
					{["A", "B", "C"].map((label, i) => (
						<div
							key={i}
							className="relative before:content-[''] before:absolute before:-top-3 before:left-1/2 before:-translate-x-1/2 before:h-3 before:border-l-2 before:border-[rgba(255,255,255,0.18)]">
							<div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-md px-3 py-1 text-xs font-semibold">
								{label}
								<br />
								<b className="block mt-1 text-white text-sm">
									{label === "A" ? "1" : "0"}
								</b>
							</div>
						</div>
					))}
				</div>
			</section>

			<section className="mt-6 text-center">
				<h2 className="text-[#00e5ff] text-lg mb-2">টিমের আকার (সুবিধা)</h2>
				<div className="flex justify-center mb-2">
					<div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-md px-3 py-1 text-xs font-semibold">
						মোট
						<br />
						<b className="block mt-1 text-white text-sm">1800</b>
					</div>
				</div>
				<div className="flex justify-center gap-4 relative mt-3 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-[rgba(255,255,255,0.18)]">
					{["A", "B", "C"].map((label, i) => (
						<div
							key={i}
							className="relative before:content-[''] before:absolute before:-top-3 before:left-1/2 before:-translate-x-1/2 before:h-3 before:border-l-2 before:border-[rgba(255,255,255,0.18)]">
							<div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-md px-3 py-1 text-xs font-semibold">
								{label}
								<br />
								<b className="block mt-1 text-white text-sm">
									{label === "A" ? "1800" : "0"}
								</b>
							</div>
						</div>
					))}
				</div>
			</section>

			<section className="mt-6 text-center">
				<h2 className="text-[#00e5ff] text-lg mb-2">কেনার সংখ্যা</h2>
				<div className="flex justify-center mb-2">
					<div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-md px-3 py-1 text-xs font-semibold">
						মোট
						<br />
						<b className="block mt-1 text-white text-sm">1</b>
					</div>
				</div>
				<div className="flex justify-center gap-4 relative mt-3 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-[rgba(255,255,255,0.18)]">
					{["A", "B", "C"].map((label, i) => (
						<div
							key={i}
							className="relative before:content-[''] before:absolute before:-top-3 before:left-1/2 before:-translate-x-1/2 before:h-3 before:border-l-2 before:border-[rgba(255,255,255,0.18)]">
							<div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-md px-3 py-1 text-xs font-semibold">
								{label}
								<br />
								<b className="block mt-1 text-white text-sm">
									{label === "A" ? "1" : "0"}
								</b>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Rules */}
			<div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-xl p-4 mt-6 text-sm leading-6 text-[#9fb3c8]">
				<h4 className="mb-2 text-white">নিয়ম কানুন</h4>
				<p>
					এখানে টিম সম্পর্কিত নিয়ম-কানুন, শর্তাবলী এবং বিস্তারিত তথ্য লেখা
					থাকবে। আপনি ইচ্ছা করলে যতখানি লেখা প্রয়োজন এখানে যোগ করতে পারবেন।
				</p>
			</div>
		</div>
	);
};

export default Team;
