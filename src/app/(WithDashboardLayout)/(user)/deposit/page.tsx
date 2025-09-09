"use client";

import { useState } from "react";
import DepositStep1 from "@/components/modules/user/deposit/step1";
import DepositStep2 from "@/components/modules/user/deposit/step2";

// Allowed channel types
export type ChannelKey =
	| "server1"
	| "server2"
	| "server3"
	| "server4"
	| "server5";

const DepositPage = () => {
	const [step, setStep] = useState<1 | 2>(1);
	const [serialId, setSerialId] = useState<string | null>(null);
	const [amount, setAmount] = useState<number | null>(null);
	const [channel, setChannel] = useState<ChannelKey | null>(null);

	const handleStep1Submit = (sid: string, amt: number, ch: ChannelKey) => {
		setSerialId(sid);
		setAmount(amt);
		setChannel(ch);
		setStep(2);
	};

	const handleGoBack = () => {
		// Reset Step2 data if needed
		setSerialId(null);
		setAmount(null);
		setChannel(null);
		setStep(1);
	};

	return (
		<div className="min-h-screen">
			{step === 1 && <DepositStep1 onSubmit={handleStep1Submit} />}
			{step === 2 && serialId && amount && channel && (
				<DepositStep2
					serialId={serialId}
					amount={amount}
					channel={channel}
					goBack={handleGoBack}
				/>
			)}
		</div>
	);
};

export default DepositPage;
