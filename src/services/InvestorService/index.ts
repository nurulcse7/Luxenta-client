"use server";

import { getValidToken } from "@/lib/verifyToken";

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

		if (!res.ok) {
			return {
				success: false,
				error: result.message || `Failed to transfer fund`,
			};
		}

		return {
			success: true,
			message: result.message || "Wallet transfer successful",
		};
	} catch (error: any) {
		return { success: false, error: error.message || "Something went wrong" };
	}
};
