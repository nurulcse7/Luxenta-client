"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./button";

interface BackButtonProps {
	label?: string;
	className?: string;
	fallback?: string;
}

const BackButton = ({
	label = "Go Back",
	className,
	fallback = "/",
}: BackButtonProps) => {
	const router = useRouter();
	const [canGoBack, setCanGoBack] = useState(false);

	useEffect(() => {
		// If user has navigation history in the browser, allow going back
		if (window.history.length > 1) {
			setCanGoBack(true);
		}
	}, []);

	const handleBack = () => {
		if (canGoBack) {
			router.back();
		} else {
			router.push(fallback);
		}
	};

	return (
		<Button
			onClick={handleBack}
			variant="outline"
			className={`flex items-center gap-2 text-gray-300 border-gray-600 hover:bg-gray-800 hover:text-white ${
				className || ""
			}`}>
			<ArrowLeft className="w-4 h-4" />
			{label}
		</Button>
	);
};

export default BackButton;
