import Navbar from "@/components/shared/Navbar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<main>{children}</main>
			<Navbar />
		</div>
	);
};

export default DashboardLayout;
