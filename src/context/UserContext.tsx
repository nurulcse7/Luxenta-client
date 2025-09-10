import {
	createContext,
	useContext,
	useEffect,
	useState,
	Dispatch,
	SetStateAction,
} from "react";
import { IUser } from "@/types/user";
import { getCurrentUser } from "@/services/AuthService";

interface IUserProviderValues {
	user: IUser | null;
	setUser: (user: IUser | null) => void;
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<IUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchUser = async () => {
			setIsLoading(true);
			const verifiedUser = await getCurrentUser();
			setUser(verifiedUser);
			setIsLoading(false);
		};

		fetchUser();
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) throw new Error("useUser must be used within UserProvider");
	return context;
};

export default UserProvider;
