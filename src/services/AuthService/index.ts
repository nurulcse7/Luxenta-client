"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
export const registerUser = async (userData: any) => {
	console.log(
		"🚀 ~ registerUser ~ API_BASE_URL:",
		process.env.NEXT_PUBLIC_BASE_API
	);
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/users/register/investor`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			}
		);

		const result = await res.json();
		console.log("🚀 ~ registerUser ~ result:", result);

		// if (result.success) {
		// 	(await cookies()).set("accessToken", result.data.accessToken);
		// 	(await cookies()).set("refreshToken", result.data.refreshToken);
		// }

		return result;
	} catch (error: any) {
		console.error("🚀 ~ registerUser ~ error:", error);
		return { success: false, error: error.message || "Something went wrong" };
	}
};

export const loginUser = async (userData: FieldValues) => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		const result = await res.json();

		if (result?.success) {
			(await cookies()).set("accessToken", result?.data?.accessToken);
			(await cookies()).set("refreshToken", result?.data?.refreshToken);
		}

		return result;
	} catch (error: any) {
		return Error(error);
	}
};

export const getCurrentUser = async () => {
	const accessToken = (await cookies()).get("accessToken")?.value;
	let decodedData = null;

	if (accessToken) {
		decodedData = await jwtDecode(accessToken);
		return decodedData;
	} else {
		return null;
	}
};

// export const getCurrentUser = async () => {
// 	const accessToken = (await cookies()).get("accessToken")?.value;
// 	if (!accessToken) return null;

// 	try {
// 		const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!);
// 		// DB থেকে verified user fetch করা
// 		const res = await fetch(
// 			`${process.env.NEXT_PUBLIC_BASE_API}/user/${decoded.userId}`
// 		);
// 		const user = await res.json();
// 		return user;
// 	} catch (err) {
// 		return null;
// 	}
// };

export const reCaptchaTokenVerification = async (token: string) => {
	try {
		const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				secret: process.env.NEXT_PUBLIC_RECAPTCHA_SERVER_KEY!,
				response: token,
			}),
		});

		return res.json();
	} catch (err: any) {
		return Error(err);
	}
};

export const logout = async () => {
	(await cookies()).delete("accessToken");
};

export const getNewToken = async () => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: (await cookies()).get("refreshToken")!.value,
				},
			}
		);

		return res.json();
	} catch (error: any) {
		return Error(error);
	}
};
