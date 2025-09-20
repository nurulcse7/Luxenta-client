import {
	createContext,
	useContext,
	useEffect,
	useState,
	Dispatch,
	SetStateAction,
	ReactNode,
} from "react";
import { ISettings } from "@/types/setting";
import { getSettings } from "@/services/SettingService";

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

		fetchSettings();
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
