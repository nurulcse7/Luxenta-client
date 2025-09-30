"use server";

import { getValidToken } from "@/lib/verifyToken";

export const getUserNotifications = async (
	queryParams: Record<string, any> = {}
) => {
	const accessToken = await getValidToken();
	const queryString = new URLSearchParams(queryParams).toString();
	console.log("🚀 ~ getUserNotifications ~ queryString:", queryString)

	const url = `${process.env.NEXT_PUBLIC_BASE_API}/notifications`;

	try {
		const res = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `${accessToken}`,
			},
			cache: "no-store",
		});

		const result = await res.json();

		if (!res.ok) {
			return {
				success: false,
				error: result.message || `API Error: ${res.status}`,
			};
		}

		return { success: true, data: result.data || [], meta: result.meta };
	} catch (error: any) {
		console.error("🚀 ~ getUserNotifications ~ error:", error);
		return {
			success: false,
			message: error.message || "Failed to fetch user notifications",
		};
	}
};

export const markNotificationAsRead = async (notificationId: string) => {
	const accessToken = await getValidToken();

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/notifications/${notificationId}/read`,
			{
				method: "PUT",
				headers: {
					Authorization: `${accessToken}`,
					"Content-Type": "application/json",
				},
			}
		);

		const result = await res.json();

		if (!res.ok) {
			return {
				success: false,
				error: result.message || `Failed to mark as read: ${res.status}`,
			};
		}

		return {
			success: true,
			message: result.message || "Notification marked as read",
		};
	} catch (error: any) {
		return { success: false, message: error.message || "Something went wrong" };
	}
};
