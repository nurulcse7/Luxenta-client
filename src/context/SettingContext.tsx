import {
	createContext,
	useContext,
	useEffect,
	useState,
	Dispatch,
	SetStateAction,
	ReactNode,
} from "react";
import {
	ISettings,
	IGeneralSetting,
	ISupportSetting,
	IPaymentSetting,
} from "@/types/setting"; // Ensure these types are correctly imported
import { getSettings } from "@/services/SettingService";

import {
	getSocket,
	subscribeEvent,
	unsubscribeEvent,
} from "@/lib/socketClient";

interface ISettingProviderValues {
	settings: ISettings | null;
	setSettings: (settings: ISettings | null) => void;
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const SettingContext = createContext<ISettingProviderValues | undefined>(
	undefined
);

const SettingProvider = ({ children }: { children: ReactNode }) => {
	const [settings, setSettings] = useState<ISettings | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Function to fetch all settings
		const fetchSettings = async () => {
			setIsLoading(true);
			try {
				const data = await getSettings();
				setSettings(data?.data);
			} catch (error) {
				console.error("Failed to fetch settings:", error);
			} finally {
				setIsLoading(false);
			}
		};

		// ---------------- Socket Setup for Real-time Updates ----------------
		const setupSocketListeners = () => {
			getSocket();

			// Handle General Setting updates
			subscribeEvent(
				"general-setting-updated",
				(updatedSetting: IGeneralSetting) => {
					setSettings(prev =>
						prev ? { ...prev, general: updatedSetting } : null
					);
				}
			);

			// Handle Supporting Setting updates
			subscribeEvent(
				"supporting-setting-updated",
				(updatedSetting: ISupportSetting) => {
					setSettings(prev =>
						prev ? { ...prev, support: updatedSetting } : null
					);
				}
			);

			// Handle new Payment Setting creation
			subscribeEvent(
				"payment-setting-created",
				(newSetting: IPaymentSetting) => {
					setSettings(prev =>
						prev ? { ...prev, payment: [...prev.payment, newSetting] } : null
					);
				}
			);

			// Handle Payment Setting updates
			subscribeEvent(
				"payment-setting-updated",
				(updatedSetting: IPaymentSetting) => {
					setSettings(prev =>
						prev
							? {
									...prev,
									payment: prev.payment.map(p =>
										p.id === updatedSetting.id ? updatedSetting : p
									),
							  }
							: null
					);
				}
			);

			// Handle Payment Setting deletions
			subscribeEvent(
				"payment-setting-deleted",
				(deletedSetting: IPaymentSetting) => {
					setSettings(prev =>
						prev
							? {
									...prev,
									payment: prev.payment.filter(p => p.id !== deletedSetting.id),
							  }
							: null
					);
				}
			);
		};

		// Initial data fetch and socket listener setup
		fetchSettings();
		setupSocketListeners();

		// Cleanup function to unsubscribe from all socket events
		return () => {
			unsubscribeEvent("general-setting-updated");
			unsubscribeEvent("supporting-setting-updated");
			unsubscribeEvent("payment-setting-created");
			unsubscribeEvent("payment-setting-updated");
			unsubscribeEvent("payment-setting-deleted");
		};
	}, []);

	return (
		<SettingContext.Provider
			value={{ settings, setSettings, isLoading, setIsLoading }}>
			{children}
		</SettingContext.Provider>
	);
};

export const useSetting = () => {
	const context = useContext(SettingContext);
	if (!context)
		throw new Error("useSetting must be used within SettingProvider");
	return context;
};

export default SettingProvider;
