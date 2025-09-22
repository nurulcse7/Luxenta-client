"use client";
import { getProject } from "@/services/ProjectService";
import { TProject } from "@/types/project";
import { useEffect, useState } from "react";

export default function ProjectDetail({ projectId }: { projectId: string }) {
	const [project, setProject] = useState<TProject | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!projectId) return;

		const fetchProject = async () => {
			setLoading(true);
			const result = await getProject(projectId);
			if (result.success) {
				setProject(result.data);
			} else {
				setError(result.error || "Failed to fetch project");
			}
			setLoading(false);
		};

		fetchProject();
	}, [projectId]);

	if (loading) return <div className="p-6 text-white">Loading...</div>;
	if (error) return <div className="p-6 text-red-400">{error}</div>;
	if (!project) return <div className="p-6 text-white">Project not found</div>;

	return (
		<div className="max-w-3xl mx-auto p-3 bg-gradient-radial from-[#101a33] via-[#0a0f1c] to-[#060a14] min-h-screen text-[#e6f1ff] font-sans">
			<h1 className="text-center text-2xl font-extrabold my-4">
				{project.title}
			</h1>
			<div className="mb-3">
				<img
					src={project.image}
					alt="Project Banner"
					className="w-full h-52 object-cover rounded-xl shadow-lg border border-[rgba(255,255,255,0.18)]"
				/>
			</div>

			<div className="grid grid-cols-3 gap-3 mb-3">
				<div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-lg backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.35)] p-3 text-center text-sm">
					<div className="text-[#9fb3c8] mb-1">বিনিয়োগ চক্র</div>
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

			<div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-lg backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.35)] p-3 mb-3 text-center font-semibold text-lg">
				কিনতে পারার সংখ্যা :{" "}
				<span className="text-white font-bold">
					{project?.investors?.length || 0}
				</span>
			</div>

			<h2 className="text-lg font-bold mb-2 text-white">প্রজেক্ট বিস্তারিতো</h2>
			<div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-lg backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.35)] p-4 mb-4 leading-relaxed space-y-3 text-sm">
				{/* {project.description.map((para, i) => (
					<p key={i}>{para}</p>
				))} */}
				<p>{project.description}</p>
			</div>

			<button className="w-full text-center text-black font-bold text-base px-4 py-3 rounded-xl bg-gradient-to-br from-[#00e5ff] to-[#6a5cff] shadow-[0_8px_24px_rgba(0,229,255,.25)] active:scale-95 transition-transform duration-150">
				ক্রয় করুন
			</button>
		</div>
	);
}
