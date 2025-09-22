import Navbar from "@/components/shared/Navbar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className=" bg-[radial-gradient(75%_60%_at_20%_20%,#101a33_0%,#0a0f1c_35%,#060a14_100%)] text-white">
			<main>{children}</main>
			<Navbar />
		</div>
	);
};

export default DashboardLayout;
