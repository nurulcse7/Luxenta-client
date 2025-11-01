import {
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
} from "react";
import { IUser } from "@/types/user";
import { getCurrentUser } from "@/services/AuthService";
import {
	getSocket,
	subscribeEvent,
	unsubscribeEvent,
} from "@/lib/socketClient";

interface IUserProviderValues {
	user: IUser | null;
	setUser: (user: IUser | null) => void;
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
	loadUser: () => Promise<void>;
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<IUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// ✅ loadUser function — can be called anywhere
	const loadUser = useCallback(async () => {
		setIsLoading(true);
		try {
			const verifiedUser = await getCurrentUser();
			setUser(verifiedUser);
		} catch (error) {
			console.error("Failed to load user:", error);
			setUser(null);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		loadUser(); // initial fetch

		const socket = getSocket();

		const sendUserId = () => {
			if (user?.id) {
				socket.emit("set-user", user.id);
			}
		};

		if (user?.id) {
			if (socket.connected) {
				sendUserId();
			}
			socket.on("connect", sendUserId);
		}

		subscribeEvent("user-data-update", updateData => {
			setUser(prevUser => {
				if (!prevUser) return null;

				const updatedInvestorInfo = {
					...prevUser.investorInfo,
					...updateData,
				};

				return {
					...prevUser,
					investorInfo: updatedInvestorInfo,
				};
			});
		});

		return () => {
			unsubscribeEvent("user-data-update");
			if (user?.id) {
				socket.off("connect", sendUserId);
			}
		};
	}, [user?.id, loadUser]);

	return (
		<UserContext.Provider
			value={{ user, setUser, isLoading, setIsLoading, loadUser }}>
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
