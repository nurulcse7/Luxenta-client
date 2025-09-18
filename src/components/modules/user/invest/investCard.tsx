import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

const InvestProjectCard = ({ project }: any) => {
	useEffect(() => {
		const bar = document.getElementById(
			`progress-${project.title.replace(/\s+/g, "-")}`
		);
		if (bar) {
			setTimeout(() => {
				bar.style.width = `${project.progress}%`;
			}, 100);
		}
	}, [project.progress, project.title]);

	return (
		<div className="grid grid-cols-[88px_1fr] gap-4 p-3 rounded-2xl border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.08)]">
			<img
				src={project.img}
				alt="project"
				width={88}
				height={88}
				className="w-22 h-22 object-cover rounded-xl"
			/>
			<div className="flex flex-col gap-2">
				<h3 className="font-extrabold text-lg">{project.title}</h3>
				<div className="grid grid-cols-[auto_1fr_auto] gap-x-3 mt-1">
					<div className="key text-muted text-sm">পণ্যের মূল্য</div>
					<div className="val font-bold text-base col-start-3">
						৳ {project.price.toLocaleString()}
					</div>
					<div className="key text-muted text-sm">প্রতিদিনের আয়</div>
					<div className="val font-bold text-base col-start-3">
						৳ {project.daily}
					</div>
					<div className="key text-muted text-sm">লক-আপ পিরিয়ড</div>
					<div className="val font-bold text-base col-start-3">
						{project.lock} দিন
					</div>
				</div>
				<div className="mt-2">
					<div className="progress w-full h-2 rounded-full overflow-hidden bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.18)]">
						<span
							id={`progress-${project.title.replace(/\s+/g, "-")}`}
							className="block h-full transition-all duration-1000 ease-[cubic-bezier(.22,1,.36,1)] bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_18px_rgba(0,229,255,0.35)_inset] relative overflow-hidden after:content-[''] after:absolute after:top-0 after:left-0 after:w-[200%] after:h-full after:bg-[repeating-linear-gradient(-45deg,rgba(255,255,255,0.25)_0_20px,transparent_20px_40px)] after:animate-wave"
							style={{ width: "0%" }}></span>
					</div>
					<div className="text-[12px] text-muted mt-1">
						মানুষ এই প্রজেক্টটি কিনছে… {project.progress}% পূর্ণ
					</div>
				</div>
				<div className="flex gap-2 mt-2">
					<Button onClick={() => alert(`ক্রয় করা হয়েছে: ${project.title}`)}>
						ক্রয় করুন
					</Button>
					<Link href={`/invest/project-detail/${project.id}`}>
						<Button variant="outline">বিস্তারিত</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default InvestProjectCard;
