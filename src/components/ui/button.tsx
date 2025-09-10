"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"btn cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-bold transition-all active:scale-95 bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-900 shadow-lg shadow-cyan-400/25 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00e5ff]/50 hover:scale-105 hover:shadow-xl hover:shadow-purple-400/30",
	{
		variants: {
			variant: {
				default: "",
				destructive:
					"bg-red-500 text-white shadow-md hover:bg-red-600 active:scale-95",
				outline:
					"border border-[#00e5ff]/50 text-[#00e5ff] bg-transparent hover:bg-[#00e5ff]/10 active:scale-95",
				secondary:
					"bg-slate-200 text-slate-900 shadow-sm hover:bg-slate-300 active:scale-95",
				ghost:
					"bg-transparent text-slate-200 hover:bg-white/10 active:scale-95",
				link: "text-[#00e5ff] underline hover:text-[#6a5cff] active:opacity-80",
			},
			size: {
				default: "p-3",
				sm: "h-9 px-4",
				lg: "h-12 px-8",
				icon: "h-10 w-10 p-2",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "button";
	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
