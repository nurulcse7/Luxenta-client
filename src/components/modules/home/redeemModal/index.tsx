"use client";

import { useState } from "react";

interface RedeemModalProps {
	user: string;
}

export default function RedeemModal({ user }: RedeemModalProps) {
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [referralCode, setReferralCode] = useState("");

	const handleRedeem = async () => {
		if (!referralCode) {
			setMessage("Please enter referral code");
			return;
		}

		setLoading(true);
		setMessage("");
		try {
			const res = await fetch("/api/redeem", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ user, referralCode }),
			});
			const data = await res.json();

			if (data.error) setMessage(data.error);
			else setMessage(`Redeem success! +${data.bonus} ৳`);
		} catch (err) {
			console.error(err);
			setMessage("Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<div
				className="bg-[radial-gradient(75%_60%_at_20%_20%,#101a33_0%,#0a0f1c_35%,#060a14_100%)] rounded-lg   relative"
				onClick={e => e.stopPropagation()}>
				<h1 className="text-2xl font-semibold text-white mb-4">Redeem Code</h1>

				<input
					type="text"
					placeholder="Enter referral code"
					value={referralCode}
					onChange={e => setReferralCode(e.target.value)}
					className="w-full px-3 py-2 rounded-md mb-4 bg-gray-700 text-white focus:outline-none"
				/>

				<button
					onClick={handleRedeem}
					disabled={loading}
					className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-2 rounded-md hover:scale-105 transition-transform">
					{loading ? "Processing..." : "Redeem Now"}
				</button>

				{message && <p className="text-sm mt-3 text-yellow-400">{message}</p>}
			</div>
		</div>
	);
}
