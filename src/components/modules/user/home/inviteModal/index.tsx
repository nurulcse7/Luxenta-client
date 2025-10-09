"use client";
import { useState } from "react";
import { Copy } from "lucide-react";
import { useUser } from "@/context/UserContext";

export default function InviteModal() {
	const { user } = useUser();
	const [copied, setCopied] = useState(false);
	const referralLink = `https://luxenta.com/signup?ref=${user?.investorInfo?.referralCode}`;

	const handleCopy = (text: string) => {
		navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	return (
		<main>
			<div className="pb-6 text-center">
				<h1 className="text-[24px] font-semibold text-[#00e5ff] mb-4">
					আপনার রেফারেল লিংক
				</h1>

				{/* Referral URL */}
				<div className="flex items-center justify-between bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-lg px-3 py-2 text-sm text-[#e6f1ff] mb-4">
					<span className="truncate">{referralLink}</span>
					<button
						onClick={() => handleCopy(referralLink)}
						className="ml-2 text-[#00e5ff] hover:text-white transition"
						title="Copy link">
						<Copy className="w-4 h-4" />
					</button>
				</div>

				{/* Referral Code */}
				<div>
					<p className="text-sm text-[#9fb3c8] mb-1">আপনার কোড:</p>
					<div className="flex items-center justify-between text-[#e6f1ff] bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] rounded-lg px-3 py-2 font-mono text-lg">
						<span>{user?.investorInfo?.referralCode}</span>
						<button
							onClick={() =>
								handleCopy(user?.investorInfo?.referralCode as string)
							}
							className="ml-2 text-[#00e5ff] hover:text-white transition"
							title="Copy code">
							<Copy className="w-4 h-4" />
						</button>
					</div>
				</div>

				{/* Copied Toast */}
				{copied && (
					<div className="mt-4 text-green-400 font-medium text-sm">Copied!</div>
				)}
			</div>
		</main>
	);
}
