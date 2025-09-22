"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { KeyRound, RotateCw } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { setWithdrawPassword } from "@/services/WithdrawAccountService";

const WithdrawPasswordPage = () => {
	const { user } = useUser();
	const hasPassword = !!user?.investorInfo?.withdrawPassword;

	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (newPassword !== confirmPassword) {
			toast.error("নতুন পাসওয়ার্ড এবং নিশ্চিত পাসওয়ার্ড মেলেনি।");
			return;
		}

		if (hasPassword && !oldPassword) {
			toast.error("অনুগ্রহ করে আপনার পুরোনো পাসওয়ার্ড লিখুন।");
			return;
		}

		setLoading(true);

		const payload = {
			oldPassword: hasPassword ? oldPassword : undefined,
			newPassword: newPassword,
		};

		const result = await setWithdrawPassword(payload);
		setLoading(false);

		if (result?.success) {
			toast.success(result.message);
			setOldPassword("");
			setNewPassword("");
			setConfirmPassword("");
		} else {
			toast.error(result?.message || "পাসওয়ার্ড সেট করতে ব্যর্থ হয়েছে।");
		}
	};

	return (
		<div className="min-h-screen bg-[#0a0a0a] text-white p-4 font-sans">
			<div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-[18px] backdrop-blur-md p-4 mb-4 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div className="flex flex-col items-start">
					<h1 className="text-2xl font-bold mb-1">উত্তোলনের পাসওয়ার্ড</h1>
					<p className="text-sm text-gray-400">
						{hasPassword
							? "আপনার উত্তোলনের পাসওয়ার্ড আপডেট করুন।"
							: "নতুন উত্তোলনের পাসওয়ার্ড তৈরি করুন।"}
					</p>
				</div>
			</div>

			<div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-xl backdrop-blur-md p-6 mt-6 max-w-lg mx-auto">
				<form onSubmit={handleSubmit}>
					<div className="space-y-6">
						{hasPassword && (
							<div>
								<label
									htmlFor="old-password"
									className="block text-sm font-medium text-gray-400 mb-2">
									পুরোনো পাসওয়ার্ড
								</label>
								<Input
									id="old-password"
									type="password"
									value={oldPassword}
									onChange={e => setOldPassword(e.target.value)}
									placeholder="আপনার বর্তমান পাসওয়ার্ড লিখুন"
									className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
								/>
							</div>
						)}
						<div>
							<label
								htmlFor="new-password"
								className="block text-sm font-medium text-gray-400 mb-2">
								নতুন পাসওয়ার্ড
							</label>
							<Input
								id="new-password"
								type="password"
								value={newPassword}
								onChange={e => setNewPassword(e.target.value)}
								placeholder="নতুন পাসওয়ার্ড লিখুন"
								className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
							/>
						</div>

						<div>
							<label
								htmlFor="confirm-password"
								className="block text-sm font-medium text-gray-400 mb-2">
								পাসওয়ার্ড নিশ্চিত করুন
							</label>
							<Input
								id="confirm-password"
								type="password"
								value={confirmPassword}
								onChange={e => setConfirmPassword(e.target.value)}
								placeholder="পাসওয়ার্ডটি আবার লিখুন"
								className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
							/>
						</div>

						<Button
							type="submit"
							className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow-lg transition-all duration-300 flex items-center justify-center"
							disabled={loading}>
							{loading ? (
								<>
									<RotateCw className="w-4 h-4 mr-2 animate-spin" />
									আপডেট হচ্ছে...
								</>
							) : (
								<>
									<KeyRound className="w-4 h-4 mr-2" />
									{hasPassword ? "আপডেট করুন" : "তৈরি করুন"}
								</>
							)}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default WithdrawPasswordPage;
