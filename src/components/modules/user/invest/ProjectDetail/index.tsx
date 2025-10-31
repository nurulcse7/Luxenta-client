"use client";
import { buyProject, getProject } from "@/services/ProjectService";
import { TProject } from "@/types/project";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// স্ট্যাটাস অনুযায়ী ক্লাস এবং টেক্সট নির্ধারণের ফাংশন
const getStatusClasses = (status: string) => {
	switch (status.toLowerCase()) {
		case "open":
			return {
				text: "চলমান",
				classes: "bg-green-600/20 text-green-400 border-green-500/50",
			};
		case "closed":
			return {
				text: "সম্পন্ন",
				classes: "bg-red-600/20 text-red-400 border-red-500/50",
			};
		case "draft":
			return {
				text: "খসড়া",
				classes: "bg-gray-600/20 text-gray-400 border-gray-500/50",
			};
		default:
			return {
				text: status,
				classes: "bg-yellow-600/20 text-yellow-400 border-yellow-500/50",
			};
	}
};

export default function ProjectDetail({ projectId }: { projectId: string }) {
	const router = useRouter();
	const [project, setProject] = useState<TProject | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [loadingBuy, setLoadingBuy] = useState(false);

	useEffect(() => {
		if (!projectId) return;

		const fetchProject = async () => {
			setLoading(true);
			const result = await getProject(projectId);
			if (result.success) {
				setProject(result.data);
			} else {
				setError(result.message || "Failed to fetch project");
			}

			setLoading(false);
		};

		fetchProject();
	}, [projectId]);

	if (loading) return <div className="p-6 text-white">Loading...</div>;
	if (error) return <div className="p-6 text-red-400 text-center">{error}</div>;
	if (!project) return <div className="p-6 text-white">Project not found</div>;

	const statusData = getStatusClasses(project.status || "default");

	const handleBuy = async () => {
		setLoadingBuy(true);
		const res = await buyProject(projectId);
		if (res.success) {
			toast.success(res.message);
			setLoadingBuy(false);
		} else {
			setLoadingBuy(false);
			toast.error("❌ " + res.message);
		}
	};

	return (
		<div className="pb-[80px] max-w-3xl mx-auto p-3 bg-gradient-radial from-[#101a33] via-[#0a0f1c] to-[#060a14] min-h-screen text-[#e6f1ff] font-sans">
			{/* Back Button এবং Title সেকশন */}
			<div className="flex items-center justify-between mb-4 mt-2">
				<button
					onClick={() => router.back()} // Back function call
					className="flex items-center gap-1 text-[#00e5ff] hover:text-[#6a5cff] transition-colors duration-150 p-2 rounded-full">
					<ArrowLeft className="w-5 h-5" />
				</button>
				<h1 className="text-2xl font-extrabold text-center flex-grow">
					{project.title}
				</h1>
				<div className="w-10"></div>
			</div>

			{/* Status Display */}
			<div
				className={`text-center mb-4 text-sm font-semibold px-4 py-2 rounded-xl border ${statusData.classes}`}>
				স্ট্যাটাস: {statusData.text}
			</div>
			{project.coverImage && (
				<div className="mb-3">
					<Image
						src={project.coverImage}
						width={100}
						height={100}
						alt="Project Banner"
						className="w-full h-52 object-cover rounded-xl shadow-lg border border-[rgba(255,255,255,0.18)]"
					/>
				</div>
			)}

			<div className="grid grid-cols-3 gap-3 mb-3">
				<div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-lg backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.35)] p-3 text-center text-sm">
					<div className="text-[#9fb3c8] mb-1">বিনিয়োগ চক্র</div>
					<div className="text-lg font-bold text-white">
						{project.duration} দিন
					</div>
				</div>
				<div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-lg backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.35)] p-3 text-center text-sm">
					<div className="text-[#9fb3c8] mb-1">প্রতিদিনের হার</div>
					<div className="text-lg font-bold text-white">
						৳ {project.dailyIncome}
					</div>
				</div>
				<div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-lg backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.35)] p-3 text-center text-sm">
					<div className="text-[#9fb3c8] mb-1">প্রজেক্ট মূল্য</div>
					<div className="text-lg font-bold text-white">
						৳ {project.price.toLocaleString()}
					</div>
				</div>
			</div>

			{/* ✨ প্রজেক্ট প্রোগ্রেস বার (Progress Bar) */}
			<div className="mb-6 p-4 bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-lg backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
				<div className="flex justify-between mb-1 text-sm font-semibold text-white">
					<span>প্রগতি</span>
					<span className="text-[#00e5ff]">{project.progress}% পূর্ণ</span>
				</div>
				<div className="progress w-full h-3 rounded-full overflow-hidden bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.18)]">
					<span
						style={{ width: `${project.progress}%` }}
						className="block h-full transition-all duration-1000 ease-[cubic-bezier(.22,1,.36,1)] bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_18px_rgba(0,229,255,0.35)_inset]"></span>
				</div>
			</div>
			{/* "কিনতে পারার সংখ্যা" সেকশনটি এখানে বাদ দেওয়া হয়েছে */}

			<h2 className="text-lg font-bold mb-2 text-white">প্রজেক্ট বিস্তারিতো</h2>
			<div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-lg backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.35)] p-4 mb-4   space-y-3 text-sm">
				<p className="whitespace-pre-wrap">{project.description}</p>
			</div>

			<Button disabled={loadingBuy} onClick={handleBuy} className="w-full">
				{loadingBuy ? "ক্রয় হচ্ছে..." : "ক্রয় করুন"}
			</Button>
		</div>
	);
}
