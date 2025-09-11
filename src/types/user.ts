export interface IUser {
	id: string;
	name: string;
	email: string;
	number?: number;
	isActive?: boolean;
	is_deleted: boolean;
	investorInfo: any;
	role: "investor" | "admin" | "superAdmin";
	iat?: number;
	exp?: number;
}
