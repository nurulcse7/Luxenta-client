"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "./loginValidation";
import { loginUser } from "@/services/AuthService";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ReInput from "@/components/ui/ReInput";

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
			}
			setServerMessage({ type: "success", text: "✅ লগইন সফল হয়েছে!" });
			setTimeout(() => router.push("/"));
		} catch (err) {
			console.log("🚀 ~ onSubmit ~ err:", err);
			setServerMessage({
				type: "error",
				text: "❌ নেটওয়ার্ক সমস্যা হয়েছে। আবার চেষ্টা করুন।",
			});
		}
	};

	// 🌌 Particle Animation (Tailwind friendly)
	useEffect(() => {
		const particles: any[] = [];
		const container = document.createElement("div");
		document.body.appendChild(container);
		Object.assign(container.style, {
			position: "absolute",
			top: "0",
			left: "0",
			width: "100%",
			height: "100%",
			overflow: "hidden",
			pointerEvents: "none",
			zIndex: "0",
		});

		function createParticle() {
			const p = document.createElement("div");
			p.className = "rounded-full absolute";
			const size = Math.random() * 8 + 4;
			const hue = Math.random() * 360;
			Object.assign(p.style, {
				width: `${size}px`,
				height: `${size}px`,
				background: `hsl(${hue},100%,60%)`,
				boxShadow: `0 0 ${size}px hsl(${hue},100%,60%), 0 0 ${
					size * 1.5
				}px hsl(${hue},100%,60%)`,
			});
			container.appendChild(p);

			particles.push({
				el: p,
				x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
				y: window.innerHeight,
				size,
				speed: Math.random() * 1 + 0.5,
				hue,
			});
		}

		for (let i = 0; i < 30; i++) createParticle();

		function animate() {
			for (let i = particles.length - 1; i >= 0; i--) {
				const p = particles[i];
				p.y -= p.speed;
				p.x += Math.sin(p.y / 50) * 0.3;
				if (p.y < -20) {
					container.removeChild(p.el);
					particles.splice(i, 1);
					continue;
				}
				p.hue += 0.5;
				const color = `hsl(${p.hue % 360},100%,60%)`;
				p.el.style.background = color;
				p.el.style.boxShadow = `0 0 ${p.size}px ${color}, 0 0 ${
					p.size * 1.5
				}px ${color}`;
				p.el.style.transform = `translate(${p.x}px, ${p.y}px)`;
			}
			requestAnimationFrame(animate);
		}
		const interval = setInterval(createParticle, 300);
		animate();

		return () => {
			clearInterval(interval);
			container.remove();
		};
	}, []);

	return (
		<main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0f1c] to-[#1a0933] text-white">
			{/* Floating Luxenta Fund background text */}
			<div className="absolute  flex items-center justify-center  select-none pointer-events-none text-[120px] font-extrabold text-cyan-400/5 -rotate-[20deg] animate-[floatLogo_6s_ease-in-out_infinite] whitespace-nowrap">
				Luxenta Fund
			</div>

			{/* Login box */}
			<section className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_20px_rgba(0,255,255,0.1)] p-6">
				<header className="text-center mb-5">
					<h2 className="text-2xl font-bold text-[#76e8ff] drop-shadow-[0_0_8px_rgba(118,232,255,0.4)]">
						Luxenta Fund
					</h2>
					<p className="text-[#85f3ff] text-base mt-1">লগইন</p>
				</header>

				<p className="text-center text-sm text-[#d1e7ff]/90 mb-2">
					স্বাগতম! আপনার Luxenta Fund একাউন্টে লগইন করুন।
				</p>
				<p className="text-center text-xs text-[#a0e5ff]/70 mb-4">
					আপনার তথ্য সম্পূর্ণ নিরাপদ এবং SSL এনক্রিপশন দ্বারা সুরক্ষিত।
				</p>

				<form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
					<div>
						<label className="block text-sm mb-1 text-[#d1e7ff]">
							মোবাইল/ইমেইল
						</label>
						<input
							type="text"
							placeholder="আপনার মোবাইল বা ইমেইল লিখুন"
							className="w-full p-3 rounded-lg bg-white/10 text-white outline-none shadow-inner shadow-cyan-500/10 focus:ring-2 focus:ring-cyan-400 placeholder:text-white/50"
							{...register("emailOrNumber")}
						/>
						{errors.emailOrNumber && (
							<p className="text-red-400 text-sm mt-1">
								{errors.emailOrNumber.message}
							</p>
						)}
					</div>

					<div>
						<ReInput
							label="পাসওয়ার্ড "
							type="password"
							placeholder="পাসওয়ার্ড লিখুন"
							{...register("password")}
							error={errors.password?.message}
						/>
					</div>
					<div>
						<Link className="border-b " href={`/forgot-password`}>
							{" "}
							forgot password?
						</Link>
					</div>

					{serverMessage && (
						<div
							className={`p-3 rounded-md text-sm ${
								serverMessage.type === "error"
									? "bg-red-700/40 text-red-100"
									: "bg-green-700/30 text-green-100"
							}`}>
							{serverMessage.text}
						</div>
					)}

					<Button
						type="submit"
						disabled={isSubmitting}
						className="w-full text-white font-bold py-3 text-lg rounded-lg bg-gradient-to-r from-cyan-400 to-fuchsia-600 shadow-[0_0_12px_rgba(0,229,255,0.4)] hover:scale-[1.03] hover:shadow-[0_0_18px_rgba(0,229,255,0.6)] transition-all duration-200">
						{isSubmitting ? "লগইন হচ্ছে..." : "লগইন"}
					</Button>
				</form>

				<footer className="text-center mt-5 text-sm">
					নতুন ব্যবহারকারী?{" "}
					<Link
						href="/register"
						className="text-[#85f3ff] font-semibold hover:drop-shadow-[0_0_8px_#85f3ff]">
						রেজিস্টার করুন
					</Link>
				</footer>
			</section>

			{/* Floating animation keyframes */}
			<style jsx global>{`
				@keyframes floatLogo {
					0%,
					100% {
						transform: translate(-50%, -50%) rotate(-20deg) translateY(0);
					}
					50% {
						transform: translate(-50%, -50%) rotate(-20deg) translateY(-15px);
					}
				}
			`}</style>
		</main>
	);
}
