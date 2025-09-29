"use server";

import { getValidToken } from "@/lib/verifyToken";

// create withdraw request (with password)
export const createWithdrawRequest = async (payload: {
	amount: number;
	withdrawPassword: string;
}) => {
	const accessToken = await getValidToken();
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/withdraw`, {
			method: "POST",
			headers: {
				Authorization: `${accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});

		const result = await res.json();
		return result;
	} catch (error: any) {
		return { success: false, message: error.message || "Something went wrong" };
	}
};

// get all withdraw requests (user side)
export const getWithdraws = async () => {
	const accessToken = await getValidToken();
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/withdraw`, {
			method: "GET",
			headers: {
				Authorization: `${accessToken}`,
			},
		});

		const result = await res.json();
		return result;
	} catch (error: any) {
		return { success: false, message: error.message || "Something went wrong" };
	}
};
