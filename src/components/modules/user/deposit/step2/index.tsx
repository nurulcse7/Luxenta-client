"use client";

import { useState } from "react";

const PAY_MAP = {
	server1: {
		bkash: "+880 1XXX-XXXX1",
		nagad: "+880 1XXX-XXXX2",
		binance: "binance_uid_1001",
	},
	server2: {
		bkash: "+880 1XXX-XXXX3",
		nagad: "+880 1XXX-XXXX4",
		binance: "binance_uid_1002",
	},
	server3: {
		bkash: "+880 1XXX-XXXX5",
		nagad: "+880 1XXX-XXXX6",
		binance: "binance_uid_1003",
	},
	server4: {
		bkash: "+880 1XXX-XXXX7",
		nagad: "+880 1XXX-XXXX8",
		binance: "binance_uid_1004",
	},
	server5: {
		bkash: "+880 1XXX-XXXX9",
		nagad: "+880 1XXX-XXXX0",
		binance: "binance_uid_1005",
	},
};

type ChannelKey = keyof typeof PAY_MAP;
type MethodKey = keyof (typeof PAY_MAP)["server1"];

const methods: { id: MethodKey; label: string }[] = [
	{ id: "bkash", label: "বিকাশ" },
	{ id: "nagad", label: "নগদ" },
	{ id: "binance", label: "Binance" },
];

interface DepositStep2Props {
	serialId: string;
	amount: number;
	channel: ChannelKey;
	goBack: () => void;
}

const DepositStep2 = ({
	serialId,
	amount,
	channel,
	goBack,
}: DepositStep2Props) => {
	const [selectedMethod, setSelectedMethod] = useState<MethodKey | null>(null);
	const [txid, setTxid] = useState("");
	const [confirmPaid, setConfirmPaid] = useState(false);

	const handleSubmit = () => {
		if (!selectedMethod) return alert("পেমেন্ট মেথড নির্বাচন করুন");
		if (!txid.trim()) return alert("ট্রানজেকশন আইডি লিখুন");
		if (!confirmPaid) return alert("অর্থ প্রেরণের নিশ্চয়তা দিন");

		const payload = {
			serialId,
			amount,
			channel,
			method: selectedMethod,
			txid: txid.trim(),
			pay_to: PAY_MAP[channel][selectedMethod],
			submitted_at: new Date().toISOString(),
		};

		console.log("Deposit payload → send to backend API:", payload);

		// redirect success page
		window.location.href = `/deposit/success?amount=${amount}`;
	};

	return (
		<main className="min-h-screen grid place-items-center  p-6">
			<section
				className={`w-full max-w-3xl border border-white/20 rounded-2xl backdrop-blur-lg shadow-2xl p-6 grid gap-6 ${
					selectedMethod === "bkash"
						? "bg-[#E2136E]/50"
						: selectedMethod === "nagad"
						? "bg-[#FFAB31]/30"
						: selectedMethod === "binance"
						? "bg-[#000]/20"
						: "bg-white/5"
				}`}>
				{/* Header */}
				<div className="flex justify-between border-b border-gray-400 pb-1">
					<h1 className="text-lg font-semibold text-white">ডিপোজিট — ধাপ ২</h1>
					<h2 className="text-sm text-[#9fb3c8]">Luxenta • Secure Deposit</h2>
				</div>
				{/* Summary */}
				<div className="flex flex-wrap gap-2 text-sm text-[#9fb3c8]">
					<span className="px-3 py-1 rounded-full border border-white/20 bg-[#00e5ff0f] text-white text-xs">
						Serial: <span className="font-mono">{serialId}</span>
					</span>
					<span className="px-3 py-1 rounded-full border border-white/20 bg-[#00e5ff0f] text-white text-xs">
						Amount: <span className="font-mono">{amount}</span> ৳
					</span>
					<span className="px-3 py-1 rounded-full border border-white/20 bg-[#00e5ff0f] text-white text-xs">
						Channel: <span className="font-mono">{channel}</span>
					</span>
				</div>
				{/* Payment method */}
				<div className="flex gap-2 flex-wrap">
					{methods.map(m => (
						<div
							key={m.id}
							onClick={() => setSelectedMethod(m.id)}
							className={`px-4 py-2 rounded-xl border text-sm cursor-pointer select-none transition ${
								selectedMethod === m.id
									? "border-[#00e5ff] shadow-lg shadow-[#00e5ff40] text-white"
									: "border-white/30 text-[#9fb3c8]"
							}`}>
							{m.label}
						</div>
					))}
				</div>
				<div
					className="relative flex justify-between items-center rounded-xl border border-[#00e5ff] mt-3 p-3
  bg-gradient-to-r from-[#0077ff] via-[#6a5cff] to-[#00e5ff] bg-[length:200%_100%] animate-[gradient_3s_linear_infinite] text-white">
					<div className="text-lg font-bold ml-3 animate-pulse">Send Money</div>
					<div className="text-sm">
						📢 এখন নির্দিষ্ট নম্বর/আইডিতে অর্থ পাঠান। সাবমিট করার সাথে সাথেই
						ব্যালেন্স আপডেট হবে!
					</div>
				</div>

				{/* Payment info */}
				<div className="p-3 border border-white/20 rounded-xl bg-[#00e5ff0a] text-sm grid gap-2 text-white">
					<div>পেমেন্ট তথ্য:</div>
					<div className="font-mono">
						{selectedMethod
							? `${methods.find(m => m.id === selectedMethod)?.label}: ${
									PAY_MAP[channel][selectedMethod]
							  }`
							: "—"}
					</div>
				</div>
				{/* Txid input */}
				<input
					type="text"
					placeholder="ট্রানজেকশন আইডি লিখুন"
					value={txid}
					onChange={e => setTxid(e.target.value)}
					className="w-full p-3 rounded-xl border border-white/20 bg-white text-black text-sm"
				/>

				{selectedMethod ? (
					<ul className="text-white list-disc list-inside space-y-1">
						<li>উল্লেখিত নম্বর/আইডি তে টাকা পাঠানোর পরই সাবমিট করুন।</li>
						<li>ট্রানজেকশন আইডি সাবমিট করুন|</li>
						<li>ভুল এমাউন্ট/ভুল অ্যাকাউন্টে পাঠালে ডিপোজিট গৃহীত হবে না।</li>
						<li>অ্যাডমিন ভেরিফাই করার পরই ব্যালেন্স যুক্ত হবে।</li>
					</ul>
				) : (
					<div className="text-white text-center">
						পেমেন্ট মেথড নির্বাচন করুন
					</div>
				)}
				{/* Confirm */}
				<label className="flex items-center gap-2 text-sm text-[#9fb3c8]">
					<input
						type="checkbox"
						checked={confirmPaid}
						onChange={e => setConfirmPaid(e.target.checked)}
					/>
					আমি নিশ্চিত করছি যে আমি অর্থ পাঠিয়েছি।
				</label>
				{/* Actions */}
				<div className="flex justify-between items-center">
					<button
						onClick={goBack}
						className="px-4 py-2 rounded-xl border border-white/20 text-white text-sm">
						← ব্যাক
					</button>
					<button
						onClick={handleSubmit}
						className="px-4 py-2 rounded-xl bg-gradient-to-br from-[#00e5ff] to-[#6a5cff] text-[#051018] font-semibold text-sm">
						সাবমিট
					</button>
				</div>
			</section>
		</main>
	);
};

export default DepositStep2;
