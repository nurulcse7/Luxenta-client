"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { LoginFormValues, loginSchema } from "./loginValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/services/AuthService";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginForm() {
	const router = useRouter();
	const [serverMessage, setServerMessage] = useState<{
		type: "error" | "success";
		text: string;
	} | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (values: LoginFormValues) => {
		setServerMessage(null);

		try {
			const result = await loginUser(values);
			if (!result.success) {
				setServerMessage({
					type: "error",
					text: result.message || "লগইন ব্যর্থ হয়েছে",
				});
				return;
			} else {
				setServerMessage({
					type: "success",
					text: "✅ লগইন সফল হয়েছে!",
				});
				setTimeout(() => router.push("/"), 100);
			}
		} catch (err) {
			console.log("🚀 ~ onSubmit ~ err:", err)
			setServerMessage({
				type: "error",
				text: "❌ নেটওয়ার্ক সমস্যা হয়েছে। আবার চেষ্টা করুন।",
			});
		}
	};

	return (
		<main className="min-h-screen grid place-items-center bg-[radial-gradient(75%_60%_at_20%_20%,#101a33_0%,#0a0f1c_35%,#060a14_100%)] p-6">
			<section className="w-full max-w-md bg-white/6 border border-white/18 rounded-2xl backdrop-blur-lg shadow-lg p-6">
				<header className="mb-4 text-center">
					<h1 className="text-xl font-semibold text-white">Welcome Back</h1>
					<p className="text-sm text-[#9fb3c8] mt-1">
						আপনার একাউন্টে লগইন করুন
					</p>
				</header>

				<form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
					<input
						type="text"
						placeholder="ইমেইল অথবা মোবাইল নম্বর"
						className="w-full p-3 rounded-lg border border-white/18 bg-white/6 text-white outline-none"
						{...register("emailOrNumber")}
					/>
					{errors.emailOrNumber && (
						<p className="text-red-400 text-sm">
							{errors.emailOrNumber.message}
						</p>
					)}

					<input
						type="password"
						placeholder="পাসওয়ার্ড"
						className="w-full p-3 rounded-lg border border-white/18 bg-white/6 text-white outline-none"
						{...register("password")}
					/>
					{errors.password && (
						<p className="text-red-400 text-sm">{errors.password.message}</p>
					)}

					{serverMessage && (
						<div
							className={`p-3 rounded-md text-sm mt-1 ${
								serverMessage.type === "error"
									? "bg-red-700/40 text-red-100"
									: "bg-green-700/30 text-green-100"
							}`}>
							{serverMessage.text}
						</div>
					)}

					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? "লগইন হচ্ছে..." : "লগইন করুন"}
					</Button>
				</form>

				<footer className="mt-4 text-center text-sm text-[#9fb3c8]">
					একাউন্ট নেই?{" "}
					<Link href="/register" className="text-[#00e5ff] underline">
						রেজিস্টার করুন
					</Link>
				</footer>
			</section>
		</main>
	);
}
