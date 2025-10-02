"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/UserContext";

// লেভেল অনুযায়ী ইমেজ mapping
const levelImages: Record<string, string> = {
	LL0: "/assets/images/levels/ll_0.png",
	LL1: "/assets/images/levels/ll_1.png",
	LL2: "/assets/images/levels/ll_2.png",
	LL3: "/assets/images/levels/ll_3.png",
	VIP: "/assets/images/levels/ll_vip.png",
};

function Avatar({
	className,
	...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
	const { user } = useUser();
	const level = user?.investorInfo?.level || "LL0";
	const imageSrc = levelImages[level] || levelImages["LL0"];

	return (
		<AvatarPrimitive.Root
			data-slot="avatar"
			className={cn(
				"relative flex size-14 shrink-0 overflow-hidden rounded-full border border-white/20 shadow-md",
				className
			)}
			{...props}>
			{/* Image */}
			<AvatarPrimitive.Image
				src={imageSrc}
				alt={level}
				className="aspect-square w-full object-contain"
			/>

			{/* Overlay text */}
			<span className="absolute bottom-0 w-full bg-black/60 text-white text-[10px] font-semibold text-center rounded-b-full">
				{/* {level} */}
			</span>

			{/* Fallback (যদি ছবি লোড না হয়) */}
			<AvatarPrimitive.Fallback className="flex size-full items-center justify-center rounded-full bg-gray-700 text-white text-xs font-bold">
				{level}
			</AvatarPrimitive.Fallback>
		</AvatarPrimitive.Root>
	);
}

export { Avatar };
