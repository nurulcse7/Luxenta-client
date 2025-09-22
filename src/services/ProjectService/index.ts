"use server";

import { getValidToken } from "@/lib/verifyToken";

// ---------------- GET ALL ----------------
export const getProjects = async () => {
	const accessToken = await getValidToken();
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/projects/all`,
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
		console.error("🚀 ~ getProjects ~ error:", error);
		return { success: false, error: error.message || "Something went wrong" };
	}
};

// ---------------- GET SINGLE ----------------
export const getProject = async (id: string) => {
	const accessToken = await getValidToken();
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
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
		console.error("🚀 ~ getProject ~ error:", error);
		return { success: false, error: error.message || "Something went wrong" };
	}
};
