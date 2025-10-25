import { z } from "zod";

export const loginSchema = z.object({
	emailOrNumber: z
		.string()
		.min(1, "ইমেইল অথবা মোবাইল নম্বর আবশ্যক")
		.refine(
			val => {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				const phoneRegex = /^01[0-9]{9}$/; // বাংলাদেশি 11 digit format
				return emailRegex.test(val) || phoneRegex.test(val);
			},
			{ message: "ইমেইল বা সঠিক মোবাইল নম্বর দিন" }
		),
	password: z
		.string()
		.min(1, "পাসওয়ার্ড দেওয়া আবশ্যক")
		.min(6, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
