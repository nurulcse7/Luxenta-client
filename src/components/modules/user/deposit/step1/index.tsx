"use client";

import { ChannelKey } from "@/app/(WithDashboardLayout)/(user)/deposit/page";
import { useEffect, useState } from "react";

interface DepositStep1Props {
	onSubmit: (serialId: string, amount: number, channel: ChannelKey) => void;
}

const channels: { id: ChannelKey; label: string; sub: string }[] = [
	{ id: "server1", label: "সার্ভার (১)", sub: "Low Fee" },
	{ id: "server2", label: "সার্ভার (২)", sub: "Fast" },
	{ id: "server3", label: "সার্ভার (৩)", sub: "Standard" },
	{ id: "server4", label: "সার্ভার (৪)", sub: "Backup" },
	{ id: "server5", label: "সার্ভার (৫)", sub: "24/7" },
];

const DepositStep1 = ({ onSubmit }: DepositStep1Props) => {
	const [serialCode, setSerialCode] = useState("");
	const [amount, setAmount] = useState<number | "">("");
	const [selectedChannel, setSelectedChannel] = useState<ChannelKey | null>(
		null
	);

	useEffect(() => {
		// Generate unique serialId of 35 digits
		const code = Array.from({ length: 35 }, () =>
			Math.floor(Math.random() * 10)
		).join("");
		setSerialCode(code);
	}, []);

	const handleNext = () => {
		if (!(amount && amount > 0)) {
			alert("সঠিক এমাউন্ট লিখুন");
			return;
		}
		if (!selectedChannel) {
			alert("একটি সার্ভার নির্বাচন করুন");
			return;
		}

		onSubmit(serialCode, Number(amount), selectedChannel);
	};

	return (
		<main className="min-h-screen grid place-items-center bg-[radial-gradient(75%_60%_at_20%_20%,#101a33_0%,#0a0f1c_35%,#060a14_100%)] text-[#e6f1ff] p-4">
			<section className="w-full max-w-md bg-white/6 border border-white/18 rounded-[14px] backdrop-blur-lg shadow-lg">
				{/* Header */}
				<div className="flex justify-between items-center p-4 border-b border-white/18 text-sm">
					<div className="flex items-center gap-2 font-semibold">
						<div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#00e5ff] to-[#6a5cff]" />
						<h1 className="text-sm m-0">ডিপোজিট</h1>
					</div>
					<div className="opacity-80">Luxenta</div>
				</div>

				{/* Content */}
				<div className="p-4 grid gap-3">
					<div className="flex justify-between items-center p-2.5 rounded-lg bg-white/5 border border-white/15 text-[11px]">
						<div>সিরিয়াল নম্বর:</div>
						<div className="font-mono text-[12px] text-[#00e5ff] break-words">
							{serialCode}
						</div>
					</div>

					<div className="grid gap-2">
						<label htmlFor="amount" className="text-[11px] text-[#9fb3c8]">
							এমাউন্ট (৳)
						</label>
						<input
							id="amount"
							type="number"
							min={1}
							step={1}
							placeholder="পরিমাণ লিখুন"
							value={amount}
							onChange={e =>
								setAmount(
									e.target.value === "" ? "" : parseFloat(e.target.value)
								)
							}
							className="p-2.5 rounded-lg border border-white/18 bg-white/8 text-[#e6f1ff] text-[13px]"
						/>
					</div>

					<div className="grid gap-2">
						<div className="text-[12px] text-[#9fb3c8]">
							চ্যানেল নির্বাচন করুন
						</div>
						<div className="grid grid-cols-2 gap-2">
							{channels.map(ch => (
								<div
									key={ch.id}
									onClick={() => setSelectedChannel(ch.id)}
									className={`p-2.5 rounded-lg border text-center text-[12px] bg-white/5 cursor-pointer ${
										selectedChannel === ch.id
											? "border-[#00e5ff] bg-[#00e5ff]/8"
											: "border-white/18"
									}`}>
									{ch.label}
									<small className="block text-[10px] text-[#9fb3c8]">
										{ch.sub}
									</small>
								</div>
							))}
						</div>
					</div>

					<div className="flex justify-end">
						<button
							onClick={handleNext}
							className="px-3 py-2.5 rounded-lg font-semibold text-[13px] bg-gradient-to-br from-[#00e5ff] to-[#6a5cff] text-[#051018]">
							কন্টিনিউ →
						</button>
					</div>
				</div>

				{/* Footer */}
				<div className="p-2.5 border-t border-white/18 text-[10px] text-[#9fb3c8] text-center">
					© Luxenta • নিরাপদ ডিপোজিট
				</div>
			</section>
		</main>
	);
};

export default DepositStep1;
