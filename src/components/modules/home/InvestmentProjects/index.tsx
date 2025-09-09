import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Project {
	id: string;
	title: string;
	roi: string;
	duration: string;
	price: number;
}

const demoProjects: Project[] = [
	{ id: "1", title: "Project A", roi: "15%", duration: "30 days", price: 1000 },
	{ id: "2", title: "Project B", roi: "10%", duration: "15 days", price: 500 },
];

export default function InvestmentProjects() {
	return (
		<div className="space-y-4">
			<h2 className="text-xl font-semibold">Investment Projects</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{demoProjects.map(project => (
					<Card key={project.id} className="p-4 space-y-2">
						<h3 className="font-bold">{project.title}</h3>
						<p>ROI: {project.roi}</p>
						<p>Duration: {project.duration}</p>
						<p>Price: ৳{project.price}</p>
						<Button className="w-full bg-green-500 hover:bg-green-600 text-white">
							Invest
						</Button>
					</Card>
				))}
			</div>
		</div>
	);
}
