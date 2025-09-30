import { IInvestor } from "./investor";
export type UserStatus =
	| "in_progress"
	| "blocked"
	| "banned"
	| "suspend"
	| "deactivated";

export interface IUser {
	id: string;
	name: string;
	email: string;
	number?: number;
	status: UserStatus;
	isActive?: boolean;
	is_deleted: boolean;
	investorInfo: IInvestor;
	role: "investor" | "agent";
	iat?: number;
	exp?: number;
}
