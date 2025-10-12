"use client";

import { useEffect, useState } from "react";
import LandingPage from "@/components/modules/user/home/landing";
import { getProjects } from "@/services/ProjectService";
import { useUser } from "@/context/UserContext";
import { GlobalModal } from "@/components/shared/GlobalModal";
import { useRouter } from "next/navigation";

export default function HomePage() {
	const { user } = useUser();
	const router = useRouter();
	const [showModal, setShowModal] = useState(false);
	const [newProject, setNewProject] = useState<any>(null);

	useEffect(() => {
		if (user) {
			const seenKey = `seenProjectModal_${user.id}`;
			const alreadySeen = sessionStorage.getItem(seenKey);

			if (!alreadySeen) {
				const fetchProject = async () => {
					try {
						const res = await getProjects();

						if (res.success && res.data.length > 0) {
							setNewProject(res.data[0]);
							setShowModal(true);
						}
					} catch (err) {
						console.error("Failed to fetch project", err);
					}
				};

				fetchProject();
				sessionStorage.setItem(seenKey, "true");
			}
		}
	}, [user]);

	const handleProjectClick = (id: string) => {
		router.push(`/invest/project-detail/${id}`);
		setShowModal(false);
	};

	return (
		<div className="container mx-auto space-y-8">
			<LandingPage />

			{showModal && newProject && (
				<GlobalModal isOpen={showModal} onClose={() => setShowModal(false)}>
					<div
						className="p-6 space-y-4 cursor-pointer"
						onClick={() => handleProjectClick(newProject.id)}>
						<h2 className="text-2xl font-bold text-white">
							{newProject.title}
						</h2>
						<p className="text-gray-300">{newProject.description}</p>

						{newProject.image && (
							<img
								src={newProject.image}
								alt={newProject.title}
								className="w-full h-60 object-cover rounded-md"
							/>
						)}

						<p className="text-sm text-gray-400 mt-2">
							Click to view project details →
						</p>
					</div>
				</GlobalModal>
			)}
		</div>
	);
}
