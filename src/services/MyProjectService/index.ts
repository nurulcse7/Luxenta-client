"use server";

import { cookies } from "next/headers";

// ---------------- GET ALL ----------------
export const getMyProjects = async () => {
	const accessToken = (await cookies()).get("accessToken")?.value;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/my-projects/all`,
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
		console.error("🚀 ~ getMyProjects ~ error:", error);
		return { success: false, message: error.message || "Something went wrong" };
	}
};

// ---------------- GET SINGLE ----------------
export const getMyProject = async (id: string) => {
	const accessToken = (await cookies()).get("accessToken")?.value;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/my-projects/${id}`,
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
		return { success: false, message: error.message || "Something went wrong" };
	}
};
 