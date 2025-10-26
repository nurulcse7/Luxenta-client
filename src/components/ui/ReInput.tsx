"use client";

import { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils"; // You can replace with your own className joiner if not available

interface ReInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
}

const ReInput = forwardRef<HTMLInputElement, ReInputProps>(
	({ label, type = "text", error, className, ...props }, ref) => {
		const [showPassword, setShowPassword] = useState(false);
		const isPassword = type === "password";

		return (
			<div className="w-full space-y-1">
				{/* Label */}
				{label && (
					<label className="text-sm font-medium text-gray-300 block mb-1">
						{label}
					</label>
				)}

				{/* Input Container */}
				<div className="relative">
					<input
						ref={ref}
						type={isPassword && showPassword ? "text" : type}
						className={cn(
							"w-full rounded-lg border border-gray-700 bg-gray-800 text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all",
							error ? "border-red-500 focus:ring-red-400" : "",
							className
						)}
						{...props}
					/>

					{/* Password Toggle */}
					{isPassword && (
						<button
							type="button"
							onClick={() => setShowPassword(prev => !prev)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
							tabIndex={-1}>
							{showPassword ? (
								<EyeOff className="w-4 h-4" />
							) : (
								<Eye className="w-4 h-4" />
							)}
						</button>
					)}
				</div>

				{/* Error Text */}
				{error && (
					<p className="text-xs text-red-400 font-medium mt-1">{error}</p>
				)}
			</div>
		);
	}
);

ReInput.displayName = "ReInput";

export default ReInput;
