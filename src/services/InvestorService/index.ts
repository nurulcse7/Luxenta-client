"use server";

import { getValidToken } from "@/lib/verifyToken";

// funds transfer
export const transferFunds = async (
	type: "wallet" | "main",
	amount: number
) => {
	const accessToken = await getValidToken();

	const apiType = type === "wallet" ? "wallet" : "main";
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/investors/wallet-transfer`,
			{
				method: "POST",
				headers: {
					Authorization: `${accessToken}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ type: apiType, amount }),
			}
		);

		const result = await res.json();

		return result;
	} catch (error: any) {
		return { success: false, message: error.message || "Something went wrong" };
	}
};

// আজকের earning → main balance এ transfer
export const transferTodayEarning = async () => {
	const accessToken = await getValidToken();

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/investors/transfer-today-earning`,
			{
				method: "POST",
				headers: {
					Authorization: `${accessToken}`,
					"Content-Type": "application/json",
				},
			}
		);

		const result = await res.json();
		return result;
	} catch (error: any) {
		return {
			success: false,
			message: error.message || "Something went wrong",
		};
	}
};
