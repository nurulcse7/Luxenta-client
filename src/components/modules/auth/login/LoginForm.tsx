"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<{
		type: "error" | "success";
		text: string;
	} | null>(null);

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setMessage(null);

		const form = new FormData(e.currentTarget);
		const payload = {
			emailOrNumber: form.get("emailOrNumber"),
			password: form.get("password"),
		};

		try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			const data = await res.json();
			if (!res.ok || data.error) {
				setMessage({ type: "error", text: data.error || "লগইন ব্যর্থ হয়েছে" });
			} else {
				setMessage({ type: "success", text: "✅ লগইন সফল হয়েছে!" });
				setTimeout(() => router.push("/dashboard"), 800);
			}
		} catch (err) {
			setMessage({
				type: "error",
				text: "❌ নেটওয়ার্ক সমস্যা হয়েছে। আবার চেষ্টা করুন।",
			});
		} finally {
			setLoading(false);
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

				<form onSubmit={handleLogin} className="grid gap-3">
					<input
						name="emailOrNumber"
						type="text"
						placeholder="ইমেইল অথবা মোবাইল নম্বর"
						required
						className="w-full p-3 rounded-lg border border-white/18 bg-white/6 text-white outline-none"
					/>

					<input
						name="password"
						type="password"
						placeholder="পাসওয়ার্ড"
						required
						className="w-full p-3 rounded-lg border border-white/18 bg-white/6 text-white outline-none"
					/>
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
					<button
						type="submit"
						disabled={loading}
						className="w-full px-4 py-3 rounded-xl bg-gradient-to-br from-[#00e5ff] to-[#6a5cff] text-[#051018] font-bold">
						{loading ? "লগইন হচ্ছে..." : "লগইন করুন"}
					</button>
				</form>

				<footer className="mt-4 text-center text-sm text-[#9fb3c8]">
					একাউন্ট নেই?{" "}
					<a href="/register" className="text-[#00e5ff] underline">
						রেজিস্টার করুন
					</a>
				</footer>
			</section>
		</main>
	);
}
