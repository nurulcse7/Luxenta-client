"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ReInput from "@/components/ui/ReInput";
import BackButton from "@/components/ui/BackButton";

// Validation Schema
const resetPasswordSchema = z
	.object({
		oldPassword: z.string().min(6, "পুরনো পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে"),
		newPassword: z
			.string()
			.min(8, "নতুন পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে")
			.regex(/[A-Z]/, "কমপক্ষে একটি বড় হাতের অক্ষর থাকতে হবে")
			.regex(/[a-z]/, "কমপক্ষে একটি ছোট হাতের অক্ষর থাকতে হবে")
			.regex(/[0-9]/, "কমপক্ষে একটি সংখ্যা থাকতে হবে"),
		confirmPassword: z.string(),
	})
	.refine(data => data.newPassword === data.confirmPassword, {
		message: "দুইটি পাসওয়ার্ড মেলেনি",
		path: ["confirmPassword"],
	});

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<ResetPasswordValues>({
		resolver: zodResolver(resetPasswordSchema),
	});

	//  API Connect Here
	const onSubmit = async (values: ResetPasswordValues) => {
		try {
			console.log("🔐 Password Change Request:", values);
			// await api.changePassword(values);

			toast.success("পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!");
			reset();
		} catch (error) {
			console.error(error);
			toast.error("পাসওয়ার্ড পরিবর্তনে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 ">
			<BackButton />
			<div className="mt-2 bg-gray-900/60 border border-gray-700 rounded-2xl shadow-lg p-6">
				<h1 className="text-2xl font-bold text-center text-white mb-6">
					পাসওয়ার্ড পরিবর্তন করুন
				</h1>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
					{/* Old Password */}
					<ReInput
						label="পুরনো পাসওয়ার্ড"
						type="password"
						placeholder="পুরনো পাসওয়ার্ড লিখুন"
						{...register("oldPassword")}
						error={errors.oldPassword?.message}
					/>

					{/* New Password */}
					<ReInput
						label="নতুন পাসওয়ার্ড"
						type="password"
						placeholder="নতুন পাসওয়ার্ড লিখুন"
						{...register("newPassword")}
						error={errors.newPassword?.message}
					/>

					{/* Confirm Password */}
					<ReInput
						label="নিশ্চিত পাসওয়ার্ড"
						type="password"
						placeholder="আবার নতুন পাসওয়ার্ড লিখুন"
						{...register("confirmPassword")}
						error={errors.confirmPassword?.message}
					/>

					<Button
						type="submit"
						disabled={isSubmitting}
						className="w-full mt-4 font-semibold">
						{isSubmitting ? "আপডেট হচ্ছে..." : "পাসওয়ার্ড আপডেট করুন"}
					</Button>
				</form>
			</div>
		</div>
	);
};

export default ResetPassword;
