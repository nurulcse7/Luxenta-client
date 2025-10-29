import ProjectDetail from "@/components/modules/user/invest/ProjectDetail";
export const metadata = { title: "প্রজেক্ট বিস্তারিতো • Luxenta Fund" };

interface Props {
	params: {
		id: string;
	};
}

const ProjectDetailPage = ({ params }: Props) => {
	const { id } = params;

	return (
		<div>
			<ProjectDetail projectId={id} />
		</div>
	);
};

export default ProjectDetailPage;
