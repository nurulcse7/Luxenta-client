import Navbar from "@/components/shared/Navbar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<main>{children}</main>
			<Navbar />
		</>
	);
};

export default UserLayout;
