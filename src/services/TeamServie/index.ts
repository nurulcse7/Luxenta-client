"use server";

import { getValidToken } from "@/lib/verifyToken";

export const getTeams = async () => {
	const accessToken = await getValidToken();

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/team`, {
			method: "GET",
			headers: {
				Authorization: `${accessToken}`,
			},
			cache: "no-store",  
		});

		const result = await res.json();
		return result;  
	} catch (error) {
		console.error("🚀 ~ getTeams error:", error);
		return error;
	}
};
