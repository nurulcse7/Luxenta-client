"use client";

import { Button } from "@/components/ui/button";
import { getMyProjects } from "@/services/MyProjectService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function MyProjects() {
	const [projects, setProjects] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	useEffect(() => {
		const fetchMyProjects = async () => {
			try {
				const result = await getMyProjects();
				if (result.success) {
					setProjects(result.data);
				} else {
					toast.error(result.message);
				}
			} catch (error) {
				toast.error("প্রজেক্ট লোড করতে সমস্যা হয়েছে।");
			} finally {
				setLoading(false);
			}
		};
		fetchMyProjects();
	}, []);

	if (loading) {
		return <div className="text-center py-10">লোড হচ্ছে...</div>;
	}

	return (
		<div className="max-w-3xl mx-auto p-4 min-h-screen">
			<h1 className="text-center text-2xl font-extrabold my-4">
				আমার প্রজেক্ট
			</h1>

			{projects.length === 0 ? (
				<div className="text-center py-20">
					<p className="text-lg font-semibold mb-2">
						কোনো প্রজেক্ট পাওয়া যায়নি
					</p>
					<p className="text-sm text-[#9fb3c8] pb-5">
						নতুন প্রজেক্ট যোগ করতে নিচের বাটনে ক্লিক করুন
					</p>
					<Button onClick={() => router.push("/invest")}>
						নতুন প্রজেক্ট যোগ করুন
					</Button>
				</div>
			) : (
				<div className="grid gap-3">
					{projects.map((p: any, idx: number) => (
						<div
							key={idx}
							className="relative grid grid-cols-[88px_1fr] gap-3 p-3 rounded-lg border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.06)] backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
							{p.project.image && (
								<Image
									src={p.project.image}
									alt={p.project.title}
									width={88}
									height={88}
									className="w-[88px] h-[88px] object-cover rounded-lg"
								/>
							)}

							<div className="flex flex-col gap-2">
								<h3 className="font-extrabold text-base">{p.project.title}</h3>

								<div className="grid grid-cols-[auto_1fr_auto] gap-x-3 gap-y-1 mt-1">
									<div className="text-[0.85rem] text-[#9fb3c8]">
										প্রজেক্ট মূল্য
									</div>
									<div></div>
									<div className="font-bold text-[0.95rem]">৳ {p.amount}</div>

									<div className="text-[0.85rem] text-[#9fb3c8]">
										প্রতিদিনের আয়
									</div>
									<div></div>
									<div className="font-bold text-[0.95rem]">
										৳ {p.project.dailyIncome}
									</div>

									<div className="text-[0.85rem] text-[#9fb3c8]">
										লক-আপ পিরিয়ড
									</div>
									<div></div>
									<div className="font-bold text-[0.95rem]">
										{p.project.duration} দিন
									</div>
								</div>

								{p.status === "active" && (
									<div className="mt-2">
										<div className="w-full h-2 rounded-full overflow-hidden border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.08)]">
											<span
												className="block h-full bg-gradient-to-r from-[#00e5ff] to-[#6a5cff] shadow-inner"
												style={{ width: `${p.project.progress}%` }}></span>
										</div>
										<div className="text-[12px] text-[#9fb3c8] mt-1">
											মানুষ এই প্রজেক্টটি কিনছে… {p.project.progress}% পূর্ণ
										</div>
									</div>
								)}
							</div>

							<div
								className={`${
									p.status === "active"
										? "bg-gradient-to-br from-[#00ff99] to-[#00e5ff]"
										: "bg-gradient-to-br from-[#ff4d4d] to-[#c800ff]"
								} absolute top-2 right-2 text-[#03131c] font-bold px-2 py-1 rounded-full text-xs shadow-md`}>
								{p.status === "active" ? "Active" : "Complete"}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
