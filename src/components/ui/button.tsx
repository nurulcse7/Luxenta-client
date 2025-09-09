"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold text-sm transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00e5ff]/50",
	{
		variants: {
			variant: {
				default:
					"bg-gradient-to-br from-[#00e5ff] to-[#6a5cff] text-[#051018] shadow-md hover:brightness-105",
				destructive: "bg-red-600 text-white shadow-md hover:bg-red-700",
				outline:
					"border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50",
				secondary: "bg-gray-100 text-gray-800 shadow-sm hover:bg-gray-200",
				ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
				link: "text-[#00e5ff] underline hover:text-[#6a5cff]",
			},
			size: {
				default: "h-11 px-6",
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
