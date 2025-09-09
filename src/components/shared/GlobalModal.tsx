import React, { useEffect } from "react";
import { CloseIcon } from "../../../public/assets/icons/CloseIcon";

interface GlobalModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	classes?: string;
	showCloseIcon?: boolean;
}

export const GlobalModal: React.FC<GlobalModalProps> = ({
	isOpen,
	onClose,
	children,
	classes,
	showCloseIcon = true,
}) => {
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};

		if (isOpen) {
			document.body.style.overflow = "hidden";
			document.addEventListener("keydown", handleEsc);
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
			document.removeEventListener("keydown", handleEsc);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-[999] flex justify-center items-center bg-black/60 cursor-default"
			onClick={onClose} // when click outside then modal will close
		>
			<div
				className={`${classes} border border-gray-500 bg-[radial-gradient(75%_60%_at_20%_20%,#101a33_0%,#0a0f1c_35%,#060a14_100%)]  rounded-[10px]  relative`}
				onClick={e => e.stopPropagation()}>
				{showCloseIcon && (
					<div
						onClick={onClose}
						className="absolute md:hidden  right-[24px]  top-[27px] cursor-pointer z-50">
						<CloseIcon />
					</div>
				)}

				{/* Scrollable content */}
				<div>{children}</div>
			</div>
		</div>
	);
};
