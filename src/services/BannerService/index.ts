"use server";

import { getValidToken } from "@/lib/verifyToken";

// ---------------- GET ALL ----------------
export const getBanners = async () => {
	const accessToken = await getValidToken();

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/banners/all`, {
			method: "GET",
			headers: {
				Authorization: `${accessToken}`,
			},
		});

		const result = await res.json();
		return result;
	} catch (error: any) {
		console.error("🚀 ~ getBanners ~ error:", error);
		return { success: false, message: error.message || "Something went wrong" };
	}
};
