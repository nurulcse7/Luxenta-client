import { IInvestor } from "./investor";

export interface IUser {
	id: string;
	name: string;
	email: string;
	number?: number;
	isActive?: boolean;
	is_deleted: boolean;
	investorInfo: IInvestor;
	role: "investor" | "agent";
	avatar?: string;
	iat?: number;
	exp?: number;
}
