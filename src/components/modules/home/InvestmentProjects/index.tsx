"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Project = {
	id: number;
	title: string;
	description: string;
	duration: string;
	roi: string;
	image: string;
};

const projects: Project[] = [
	{
		id: 1,
		title: "Gold Investment",
		description: "Invest in gold and earn stable returns.",
		duration: "30 days",
		roi: "5%",
		image: "/projects/gold.jpg",  
	},
	{
		id: 2,
		title: "Real Estate",
		description: "Secure real estate investment opportunity.",
		duration: "60 days",
		roi: "8%",
		image: "/projects/real-estate.jpg",
	},
	{
		id: 3,
		title: "Crypto Fund",
		description: "High growth potential crypto investments.",
		duration: "15 days",
		roi: "12%",
		image: "/projects/crypto.jpg",
	},
];

export default function InvestmentProjects() {
	return (
		<section className="space-y-6">
			<h2 className="text-2xl font-bold">Our Investment Projects</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{projects.map(project => (
					<Card
						key={project.id}
						className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
						<div className="relative h-40 w-full">
							<Image
								src={project.image}
								alt={project.title}
								fill
								className="object-cover rounded-t-2xl"
							/>
						</div>
						<CardContent className="p-4 space-y-2">
							<CardHeader className="p-0">
								<CardTitle className="text-lg font-semibold">
									{project.title}
								</CardTitle>
							</CardHeader>
							<p className="text-gray-600 text-sm">{project.description}</p>
							<div className="flex justify-between items-center mt-2 text-sm text-gray-700">
								<span>Duration: {project.duration}</span>
								<span>ROI: {project.roi}</span>
							</div>
							<Button className="w-full mt-4">Invest Now</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
}
