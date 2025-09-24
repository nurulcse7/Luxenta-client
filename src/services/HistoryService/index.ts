"use server";

import { getValidToken } from "@/lib/verifyToken";

// ---------------- ইনভেস্টর - নিজের হিস্টরি দেখা ----------------
export const getHistory = async (queryParams: Record<string, any> = {}) => {
	const accessToken = await getValidToken();

	const queryString = new URLSearchParams(queryParams).toString();
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/history?${queryString}`,
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
		console.error("🚀 ~ getHistory ~ error:", error);
		return { success: false, error: error.message || "Something went wrong" };
	}
};
