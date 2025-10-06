"use server";

import { getValidToken } from "@/lib/verifyToken";

export const getTeams = async () => {
	const accessToken = await getValidToken();

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/team`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			cache: "no-store", // always fetch fresh data
		});

		const result = await res.json();
		return result.data; // { hierarchy, totalCount }
	} catch (error: any) {
		console.error("🚀 ~ getTeams error:", error);
		return { hierarchy: [], totalCount: 0 };
	}
};
