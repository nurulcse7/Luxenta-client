"use server";

import { getValidToken } from "@/lib/verifyToken";

// set withdraw  method
export const setWithdrawMethod = async (payload: {
	method: string;
	account: string;
	accountPassword: string;
}) => {
	const accessToken = await getValidToken();
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/withdraw-account`,
			{
				method: "POST",
				headers: {
					Authorization: `${accessToken}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			}
		);

		const result = await res.json();
		return result;
	} catch (error: any) {
		console.error("🚀 ~ set withdraw method ~ error:", error);
		return { success: false, message: error.message || "Something went wrong" };
	}
};

// set withdraw  method
export const getWithdrawMethod = async () => {
	const accessToken = await getValidToken();
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/withdraw-account`,
			{
				method: "GET",
				headers: {
					Authorization: `${accessToken}`,
				},
			}
		);

		const result = await res.json();
		return result;
	} catch (error: any) {
		console.error("🚀 ~   withdraw method ~ error:", error);
		return { success: false, message: error.message || "Something went wrong" };
	}
};

// set withdraw  method
export const setWithdrawPassword = async (payload: {
	oldPassword?: string;
	newPassword: string;
}) => {
	const accessToken = await getValidToken();
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/withdraw-account`,
			{
				method: "PUT",
				headers: {
					Authorization: `${accessToken}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			}
		);

		const result = await res.json();
		return result;
	} catch (error: any) {
		console.error("🚀 ~  set withdraw password  ~ error:", error);
		return { success: false, message: error.message || "Something went wrong" };
	}
};
