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
		return <Maintenance notice={settings.general.notice} />;
	}

	return <>{children}</>;
};

export default MaintenanceGuard;
