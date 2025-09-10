export interface IUser {
	userId: string;
	name: string;
	email: string;
	number?: number;
	isActive?: boolean;
	role: "investor" | "admin" | "superAdmin";
	iat?: number;
	exp?: number;
}
