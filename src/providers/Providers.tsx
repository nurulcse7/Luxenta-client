"use client";

import MaintenanceGuard from "@/components/MaintenanceGuard";
import SettingProvider from "@/context/SettingContext";
import UserProvider from "@/context/UserContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<UserProvider>
			<SettingProvider>
				<MaintenanceGuard>{children}</MaintenanceGuard>
			</SettingProvider>
		</UserProvider>
	);
};

export default Providers;
