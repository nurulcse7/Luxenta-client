"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/services/AuthService";

export default function RegisterForm() {
	const searchParams = useSearchParams();
	const router = useRouter();

	// read optional ref param
	const refParam = searchParams?.get("ref") ?? "";

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [number, setNumber] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [referral, setReferral] = useState(refParam); // prefill from query
	const [isReferralLocked, setIsReferralLocked] = useState(Boolean(refParam)); // lock when param present

	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<{
		type: "error" | "success";
		text: string;
	} | null>(null);

	// If the query param changes while component mounted, update local state
	useEffect(() => {
		setReferral(refParam);
		setIsReferralLocked(Boolean(refParam));
	}, [refParam]);

	const validate = () => {
		if (!name.trim()) return "নাম লিখুন";
		if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) return "সঠিক ইমেইল দিন";
		if (!number.trim() || !/^\+?\d{8,15}$/.test(number))
			return "সঠিক মোবাইল নম্বর দিন (country code optional)";
		if (password.length < 6) return "পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হওয়া প্রয়োজন";
		if (password !== confirmPassword) return "পাসওয়ার্ড ম্যাচ করে না";
		return null;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setMessage(null);

		const v = validate();
		if (v) {
			setMessage({ type: "error", text: v });
			return;
		}

		setLoading(true);

		try {
			const payload = {
				name: name.trim(),
				email: email.trim(),
				number: number.trim(),
				password,
				referral: referral?.trim() || null,
			};

			// ✅ AuthService থেকে register করা
			const result = await registerUser(payload);

			if (!result.success) {
				setMessage({
					type: "error",
					text: result.error || "রেজিস্ট্রেশন ব্যর্থ হয়েছে",
				});
				setLoading(false);
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
		} finally {
			setLoading(false);
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

				<form onSubmit={handleSubmit} className="grid gap-3">
					<input
						name="name"
						value={name}
						onChange={e => setName(e.target.value)}
						placeholder="পুরো নাম"
						className="w-full p-3 rounded-lg border border-white/18 bg-white/6 text-white outline-none"
						required
					/>

					<input
						name="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						placeholder="ইমেইল"
						type="email"
						className="w-full p-3 rounded-lg border border-white/18 bg-white/6 text-white outline-none"
						required
					/>

					<input
						name="number"
						value={number}
						onChange={e => setNumber(e.target.value)}
						placeholder="মোবাইল নম্বর (ex: +8801XXXXXXXXX)"
						inputMode="tel"
						className="w-full p-3 rounded-lg border border-white/18 bg-white/6 text-white outline-none"
						required
					/>

					<input
						name="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						placeholder="পাসওয়ার্ড"
						type="password"
						className="w-full p-3 rounded-lg border border-white/18 bg-white/6 text-white outline-none"
						required
					/>

					<input
						name="confirmPassword"
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
						placeholder="কনফার্ম পাসওয়ার্ড"
						type="password"
						className="w-full p-3 rounded-lg border border-white/18 bg-white/6 text-white outline-none"
						required
					/>

					<div>
						<label className="text-sm text-[#9fb3c8]">
							রেফারাল কোড (ঐচ্ছিক)
						</label>
						<div className="mt-2 flex gap-2">
							<input
								value={referral}
								onChange={e => setReferral(e.target.value)}
								placeholder="আপনার রেফারাল কোড থাকলে দিন"
								readOnly={isReferralLocked}
								className={`flex-1 p-3 rounded-lg border ${
									isReferralLocked
										? "border-white/30 bg-white/8 text-white/70"
										: "border-white/18 bg-white/6 text-white"
								} outline-none`}
							/>
							{/* Optional: Clear button if prefilling is locked but user should be allowed to remove:
                  <button
                    type="button"
                    onClick={() => { setReferral(""); setIsReferralLocked(false); }}
                    className="px-3 rounded bg-white/10 text-white"
                  >
                    পরিবর্তন
                  </button>
              */}
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
					<Button type="submit" disabled={loading}>
						{loading ? "প্রসেস হচ্ছে..." : "রেজিস্টার করুন"}
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
