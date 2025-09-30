"use client";

import { ReactNode } from "react";
import { useSetting } from "@/context/SettingContext";
import Maintenance from "./maintenance";

interface IMaintenanceGuard {
	children: ReactNode;
}

const MaintenanceGuard = ({ children }: IMaintenanceGuard) => {
	const { settings, isLoading } = useSetting();

	if (isLoading)
		return <div className="text-center text-white p-6">Loading...</div>;

	if (settings?.general?.maintenance) {
		// Notice & Extra Info admin panel থেকে আসবে
		return (
			<Maintenance
				notice={settings.general.notice}
				estimate={settings.general.estimate}
				description={settings.general.description}
			/>
		);
	}

	return <>{children}</>;
};

export default MaintenanceGuard;
