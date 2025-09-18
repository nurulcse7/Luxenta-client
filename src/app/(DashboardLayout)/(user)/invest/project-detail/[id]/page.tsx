import ProjectDetail from "@/components/modules/user/invest/ProjectDetail";
export const metadata = { title: "প্রজেক্ট বিস্তারিতো • Luxenta AI Fund" };

interface Props {
	params: {
		id: string;
	};
}

const ProjectDetailPage = ({ params }: Props) => {
	const { id } = params;
	console.log("🚀 ProjectDetailPage id:", id);

	return (
		<div>
			<ProjectDetail />
		</div>
	);
};

export default ProjectDetailPage;
