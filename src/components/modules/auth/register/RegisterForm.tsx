"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { registerUser } from "@/services/AuthService";

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

	// read optional ref param
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

	// sync referral from query param
	useEffect(() => {
		if (refParam) {
			setValue("referral", refParam);
			setIsReferralLocked(true);
		}
	}, [refParam, setValue]);

	const onSubmit = async (data: FormValues) => {
		setMessage(null);
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
		<main className="min-h-screen grid place-items-center bg-[radial-gradient(75%_60%_at_20%_20%,#101a33_0%,#0a0f1c_35%,#060a14_100%)] p-6">
			<section className="w-full max-w-md bg-white/6 border border-white/18 rounded-2xl backdrop-blur-lg shadow-lg p-6">
				<header className="mb-4 text-center">
					<h1 className="text-xl font-semibold text-white">রেজিস্টার করুন</h1>
					<p className="text-sm text-[#9fb3c8] mt-1">
						Luxenta এ স্বাগতম — কিছু তথ্য দিন
					</p>
				</header>

				<form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
					<input
						placeholder="পুরো নাম"
						className="w-full p-3 rounded-lg border border-white/18 bg-white/6 text-white outline-none"
						{...register("name", { required: "নাম লিখুন" })}
					/>
					{errors.name && (
						<p className="text-red-400 text-sm">{errors.name.message}</p>
					)}

					<input
						placeholder="ইমেইল"
						type="email"
						className="w-full p-3 rounded-lg border border-white/18 bg-white/6 text-white outline-none"
						{...register("email", {
							required: "সঠিক ইমেইল দিন",
							pattern: { value: /^\S+@\S+\.\S+$/, message: "সঠিক ইমেইল দিন" },
						})}
					/>
					{errors.email && (
						<p className="text-red-400 text-sm">{errors.email.message}</p>
					)}

					<input
						placeholder="মোবাইল নম্বর (ex: +8801XXXXXXXXX)"
						inputMode="tel"
						className="w-full p-3 rounded-lg border border-white/18 bg-white/6 text-white outline-none"
						{...register("number", {
							required: "সঠিক মোবাইল নম্বর দিন",
							pattern: {
								value: /^\+?\d{8,15}$/,
								message: "সঠিক মোবাইল নম্বর দিন",
							},
						})}
					/>
					{errors.number && (
						<p className="text-red-400 text-sm">{errors.number.message}</p>
					)}

					<input
						placeholder="পাসওয়ার্ড"
						type="password"
						className="w-full p-3 rounded-lg border border-white/18 bg-white/6 text-white outline-none"
						{...register("password", {
							required: "পাসওয়ার্ড দিন",
							minLength: {
								value: 6,
								message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হওয়া প্রয়োজন",
							},
						})}
					/>
					{errors.password && (
						<p className="text-red-400 text-sm">{errors.password.message}</p>
					)}

					<input
						placeholder="কনফার্ম পাসওয়ার্ড"
						type="password"
						className="w-full p-3 rounded-lg border border-white/18 bg-white/6 text-white outline-none"
						{...register("confirmPassword", {
							validate: value =>
								value === watch("password") || "পাসওয়ার্ড ম্যাচ করে না",
						})}
					/>
					{errors.confirmPassword && (
						<p className="text-red-400 text-sm">
							{errors.confirmPassword.message}
						</p>
					)}

					<div>
						<label className="text-sm text-[#9fb3c8]">
							রেফারাল কোড (ঐচ্ছিক)
						</label>
						<div className="mt-2 flex gap-2">
							<input
								placeholder="আপনার রেফারাল কোড থাকলে দিন"
								readOnly={isReferralLocked}
								className={`flex-1 p-3 rounded-lg border ${
									isReferralLocked
										? "border-white/30 bg-white/8 text-white/70"
										: "border-white/18 bg-white/6 text-white"
								} outline-none`}
								{...register("referral")}
							/>
						</div>
					</div>

					{message && (
						<div
							className={`p-3 rounded-md text-sm mt-1 ${
								message.type === "error"
									? "bg-red-700/40 text-red-100"
									: "bg-green-700/30 text-green-100"
							}`}>
							{message.text}
						</div>
					)}

					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? "প্রসেস হচ্ছে..." : "রেজিস্টার করুন"}
					</Button>
				</form>

				<footer className="mt-4 text-center text-sm text-[#9fb3c8]">
					Already have account?{" "}
					<a href="/login" className="text-[#00e5ff] underline">
						লগইন করুন
					</a>
				</footer>
			</section>
		</main>
	);
}
