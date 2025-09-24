"use server";

import { getValidToken } from "@/lib/verifyToken";

// ---------------- ইনভেস্টর - ডিপোজিট তৈরি ----------------
export const createDeposit = async (payload: any) => {
	const accessToken = await getValidToken();
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/deposit`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${accessToken}`,
			},
			body: JSON.stringify(payload),
		});

		const result = await res.json();
		return result;
	} catch (error: any) {
		console.error("🚀 ~ createDeposit ~ error:", error);
		return { success: false, error: error.message || "Something went wrong" };
	}
};

// ---------------- ইনভেস্টর - নিজের ডিপোজিটগুলো দেখা ----------------
export const getMyDeposits = async () => {
	const accessToken = await getValidToken();
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/deposit/my-deposits`,
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
		console.error("🚀 ~ getMyDeposits ~ error:", error);
		return { success: false, error: error.message || "Something went wrong" };
	}
};
