"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { registerUser } from "@/services/AuthService";
import Link from "next/link";

type FormValues = {
	name: string;
	email: string;
	number: string;
	password: string;
	confirmPassword: string;
	referral?: string | null;
};

export default function RegisterForm() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const refParam = searchParams?.get("ref") ?? "";
	const [isReferralLocked, setIsReferralLocked] = useState(Boolean(refParam));

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>();

	const [message, setMessage] = useState<{
		type: "error" | "success";
		text: string;
	} | null>(null);

	useEffect(() => {
		if (refParam) {
			setValue("referral", refParam);
			setIsReferralLocked(true);
		}
	}, [refParam, setValue]);

	const onSubmit = async (data: FormValues) => {
		setMessage(null);
		if (data.password !== data.confirmPassword) {
			setMessage({ type: "error", text: "পাসওয়ার্ড মিলছে না!" });
			return;
		}

		try {
			const payload = {
				name: data.name.trim(),
				email: data.email.trim(),
				number: data.number.trim(),
				password: data.password,
				referral: data.referral?.trim() || null,
			};

			const result = await registerUser(payload);

			if (!result.success) {
				setMessage({
					type: "error",
					text: result.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে",
				});
				return;
			}

			setMessage({
				type: "success",
				text: "রেজিস্ট্রেশন সফল! অনুগ্রহ করে লগইন করুন।",
			});

			setTimeout(() => router.push("/login"), 1000);
		} catch (err) {
			console.error(err);
			setMessage({
				type: "error",
				text: "নেটওয়ার্ক ত্রুটি। আবার চেষ্টা করুন।",
			});
		}
	};

	return (
		<main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0f1c] to-[#1a0933] p-4 relative">
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-20deg] text-[120px] font-bold text-white/5 pointer-events-none select-none">
				Luxenta Fund
			</div>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-lg p-6 rounded-xl shadow-lg text-white">
				<div className="text-center mb-4">
					<h2 className="text-2xl font-bold text-[#76e8ff] text-shadow-md">
						Luxenta Fund
					</h2>
					<p className="text-[#85f3ff] mt-2 text-sm">
						একাউন্ট রেজিস্ট্রেশন করুন এবং আপনার স্মার্ট ইনভেস্টমেন্ট শুরু করুন
					</p>
				</div>

				<div className="space-y-4">
					<div className="input-group">
						<label className="text-[#d1e7ff] text-sm mb-1 block">
							পূর্ণ নাম
						</label>
						<input
							{...register("name", { required: "নাম লিখুন" })}
							type="text"
							placeholder="আপনার নাম লিখুন"
							className="w-full p-3 rounded-lg bg-white/8 border-none text-white outline-none shadow-inner"
						/>
						{errors.name && (
							<p className="text-red-400 text-sm">{errors.name.message}</p>
						)}
					</div>

					<div className="input-group">
						<label className="text-[#d1e7ff] text-sm mb-1 block">
							মোবাইল নাম্বার
						</label>
						<input
							{...register("number", {
								required: "মোবাইল নম্বর দিন",
								pattern: {
									value: /^\d{11}$/,
									message: "১১ সংখ্যার মোবাইল নম্বর দিন",
								},
							})}
							type="tel"
							placeholder="আপনার মোবাইল নাম্বার লিখুন"
							className="w-full p-3 rounded-lg bg-white/8 border-none text-white outline-none shadow-inner"
						/>
						{errors.number && (
							<p className="text-red-400 text-sm">{errors.number.message}</p>
						)}
					</div>

					<div className="input-group">
						<label className="text-[#d1e7ff] text-sm mb-1 block">ইমেইল</label>
						<input
							{...register("email", {
								required: "ইমেইল দিন",
								pattern: { value: /^\S+@\S+\.\S+$/, message: "সঠিক ইমেইল দিন" },
							})}
							type="email"
							placeholder="আপনার ইমেইল লিখুন"
							className="w-full p-3 rounded-lg bg-white/8 border-none text-white outline-none shadow-inner"
						/>
						{errors.email && (
							<p className="text-red-400 text-sm">{errors.email.message}</p>
						)}
					</div>

					<div className="input-group">
						<label className="text-[#d1e7ff] text-sm mb-1 block">
							রেফার কোড (ঐচ্ছিক)
						</label>
						<input
							{...register("referral")}
							placeholder="রেফার কোড থাকলে লিখুন"
							readOnly={isReferralLocked}
							className={`w-full p-3 rounded-lg ${
								isReferralLocked ? "bg-white/10 text-white/50" : "bg-white/8"
							} text-white outline-none shadow-inner`}
						/>
					</div>

					<div className="input-group">
						<label className="text-[#d1e7ff] text-sm mb-1 block">
							পাসওয়ার্ড
						</label>
						<input
							{...register("password", {
								required: "পাসওয়ার্ড দিন",
								minLength: { value: 6, message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষর" },
							})}
							type="password"
							placeholder="পাসওয়ার্ড দিন"
							className="w-full p-3 rounded-lg bg-white/8 border-none text-white outline-none shadow-inner"
						/>
						{errors.password && (
							<p className="text-red-400 text-sm">{errors.password.message}</p>
						)}
					</div>

					<div className="input-group">
						<label className="text-[#d1e7ff] text-sm mb-1 block">
							পাসওয়ার্ড নিশ্চিত করুন
						</label>
						<input
							{...register("confirmPassword", {
								required: "পাসওয়ার্ড পুনরায় দিন",
								validate: value =>
									value === watch("password") || "পাসওয়ার্ড মিলছে না",
							})}
							type="password"
							placeholder="পুনরায় পাসওয়ার্ড দিন"
							className="w-full p-3 rounded-lg bg-white/8 border-none text-white outline-none shadow-inner"
						/>
						{errors.confirmPassword && (
							<p className="text-red-400 text-sm">
								{errors.confirmPassword.message}
							</p>
						)}
					</div>

					{message && (
						<p
							className={`p-2 rounded text-sm ${
								message.type === "error" ? "bg-red-700/40" : "bg-green-700/30"
							}`}>
							{message.text}
						</p>
					)}

					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full p-3 rounded-lg font-bold bg-gradient-to-r from-[#00e5ff] to-[#a100ff] hover:from-[#00e5ff] hover:to-[#ff00d4] transition-all text-white shadow-md">
						{isSubmitting ? "প্রসেস হচ্ছে..." : "রেজিস্টার করুন"}
					</button>
				</div>

				<p className="text-center text-[#85f3ff] mt-4 text-sm">
					ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
					<Link
						href="/login"
						className="font-bold underline text-[#85f3ff] hover:text-[#00e5ff]">
						লগইন করুন
					</Link>
				</p>
			</form>
		</main>
	);
}
