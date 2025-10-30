"use client";

import { useSetting } from "@/context/SettingContext";
import { useState, useEffect } from "react";
import { createDeposit } from "@/services/DepositService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import bkash from "../../../../../../public/assets/images/methods/bkash.png";
import nagad from "../../../../../../public/assets/images/methods/nagad.png";
import binance from "../../../../../../public/assets/images/methods/binance.png";

type ChannelKey = string;
type MethodKey = "bkash" | "nagad" | "binance";

interface DepositStep2Props {
	serialId: string;
	amount: number;
	channel: ChannelKey;
	goBack: () => void;
}

const methods: { id: MethodKey; label: string; img: any }[] = [
	{ id: "bkash", label: "বিকাশ", img: bkash },
	{ id: "nagad", label: "নগদ", img: nagad },
	{ id: "binance", label: "Binance", img: binance },
];

const DepositStep2 = ({
	serialId,
	amount,
	channel,
	goBack,
}: DepositStep2Props) => {
	const { settings } = useSetting();
	const router = useRouter();
	const [selectedMethod, setSelectedMethod] = useState<MethodKey | null>(null);
	const [txid, setTxid] = useState("");
	const [confirmPaid, setConfirmPaid] = useState(false);
	const [loading, setLoading] = useState(false);
	const [payMap, setPayMap] = useState<Record<MethodKey, string>>({
		bkash: "",
		nagad: "",
		binance: "",
	});

	useEffect(() => {
		// 🔹 Only proceed if settings and payment array exist
		if (settings?.payment && Array.isArray(settings.payment)) {
			// Find the correct payment channel within the array
			const found = settings.payment.find(p => p.serverId === channel);

			if (found) {
				setPayMap({
					bkash: found.bkash,
					nagad: found.nagad,
					binance: found.binance,
				});
			}
		}
	}, [settings, channel]);

	const handleSubmit = async () => {
		if (!selectedMethod) return alert("পেমেন্ট মেথড নির্বাচন করুন");
		if (!txid.trim()) return alert("ট্রানজেকশন আইডি লিখুন");
		if (txid.trim().length < 10)
			return alert("ট্রানজেকশন আইডি ন্যূনতম 10 অক্ষর হতে হবে");
		if (!confirmPaid) return alert("অর্থ প্রেরণের নিশ্চয়তা দিন");

		const payload = {
			serialId,
			amount,
			channel,
			method: selectedMethod,
			txid: txid.trim(),
			pay_to: payMap[selectedMethod],
		};

		setLoading(true);
		try {
			const result = await createDeposit(payload);

			if (result.success) {
				toast.success(result.message);
				router.push(`/deposit/success?amount=${amount}`);
			} else {
				alert(result.error || "ডিপোজিট জমা দিতে ব্যর্থ হয়েছে");
			}
		} catch (error) {
			console.error("🚀 ~ handleSubmit ~ error:", error);
			alert("কিছু একটা ভুল হয়েছে, আবার চেষ্টা করুন।");
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="grid place-items-center md:p-6 pb-20">
			<section
				className={`w-full max-w-3xl border border-white/20 rounded-2xl backdrop-blur-lg shadow-2xl md:p-6 p-2 grid gap-6 ${
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

				{selectedMethod && (
					<div
						className="relative flex justify-between items-center p-3 rounded-xl border border-cyan-400 mt-2
			bg-gradient-to-r from-cyan-400 via-purple-600 to-cyan-400 animate-gradientMove">
						<div className="text-white font-bold text-lg ml-3 animate-flashMove">
							Send Money
						</div>
						<div className="text-white text-sm mr-3 text-right">
							📢 এখন নির্দিষ্ট নম্বর/আইডিতে অর্থ পাঠান। সাবমিট করার সাথে সাথেই
							ব্যালেন্স আপডেট হবে!
						</div>
					</div>
				)}

				{/* Payment info */}
				<div className="p-3 border border-white/20 rounded-xl bg-[#00e5ff0a] text-sm grid gap-2 text-white">
					<div>পেমেন্ট তথ্য:</div>
					{selectedMethod ? (
						<div className="flex items-center gap-2 font-mono">
							<Image
								src={methods.find(m => m.id === selectedMethod)?.img as any}
								alt={
									methods.find(m => m.id === selectedMethod)?.label as string
								}
								width={100}
								height={30}
								className="w-[100px] h-[30px] object-contain rounded"
							/>
							<span>
								{`${methods.find(m => m.id === selectedMethod)?.label}: ${
									payMap[selectedMethod]
								}`}
							</span>
						</div>
					) : (
						<div className="font-mono">—পেমেন্ট পদ্ধতি নির্বাচন করুন</div>
					)}
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
					<ul className="text-white list-disc list-inside space-y-1 text-[13px]">
						<li>উল্লেখিত নম্বর/আইডি তে টাকা পাঠানোর পরই সাবমিট করুন।</li>
						<li>ট্রানজেকশন আইডি সাবমিট করুন।</li>
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
					আমি নিশ্চিত করছি যে আমি টাকা পাঠিয়েছি।
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
						disabled={loading}
						className="px-4 py-2 rounded-xl bg-gradient-to-br from-[#00e5ff] to-[#6a5cff] text-[#051018] font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed">
						{loading ? "সাবমিট হচ্ছে..." : "সাবমিট"}
					</button>
				</div>
			</section>
		</main>
	);
};

export default DepositStep2;
