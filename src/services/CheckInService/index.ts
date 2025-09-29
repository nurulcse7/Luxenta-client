"use server";

import { getValidToken } from "@/lib/verifyToken";

// ---------------- CREATE CHECK-IN ----------------
export const createCheckIn = async (payload: any) => {
	const accessToken = await getValidToken();
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/checkins/create`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `${accessToken}`,
				},
				body: JSON.stringify(payload),
			}
		);

		const result = await res.json();
		return result;
	} catch (error: any) {
		console.error("🚀 ~ createCheckIn ~ error:", error);
		return { success: false, message: error.message || "Something went wrong" };
	}
};

// ---------------- GET MY CHECK-IN HISTORY ----------------
export const getMyCheckIns = async () => {
	const accessToken = await getValidToken();
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/checkins`, {
			method: "GET",
			headers: {
				Authorization: `${accessToken}`,
			},
		});

		const result = await res.json();
		return result;
	} catch (error: any) {
		console.error("🚀 ~ getMyCheckIns ~ error:", error);
		return { success: false, message: error.message || "Something went wrong" };
	}
};

// ---------------- GET LAST CHECK-IN ----------------
export const getLastCheckIn = async () => {
	const accessToken = await getValidToken();
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/checkins/last`,
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
		console.error("🚀 ~ getLastCheckIn ~ error:", error);
		return { success: false, message: error.message || "Something went wrong" };
	}
};
