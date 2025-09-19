"use server";

import { cookies } from "next/headers";

// ---------------- GET ALL ----------------
export const getMyProjects = async () => {
	const accessToken = (await cookies()).get("accessToken")?.value;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/my-project/all`,
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
export const getMyProject = async (id: string) => {
	const accessToken = (await cookies()).get("accessToken")?.value;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/my-project/${id}`,
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

// ---------------- GET SINGLE ----------------
export const buyProject = async (projectId: string) => {
	const accessToken = (await cookies()).get("accessToken")?.value;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/my-project/buy`,
			{
				method: "GET",
				headers: {
					Authorization: `${accessToken}`,
				},
				body: JSON.stringify(projectId),
			}
		);

		const result = await res.json();
		return result;
	} catch (error: any) {
		console.error("🚀 ~ getProject ~ error:", error);
		return { success: false, error: error.message || "Something went wrong" };
	}
};
