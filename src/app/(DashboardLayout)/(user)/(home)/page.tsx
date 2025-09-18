import LandingPage from "@/components/modules/user/home/landing";

export const metadata = {
	title: "Luxenta AI Fund",
};
export default function HomePage() {
	return (
		<div className="container mx-auto  space-y-8">
			<LandingPage />
		</div>
	);
}
