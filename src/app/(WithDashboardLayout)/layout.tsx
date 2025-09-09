import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<div className=" min-h-screen">{children}</div>
		</div>
	);
};

export default DashboardLayout;
