// types/deposit.ts

export interface IDeposit {
	id: string;
	investorId: string; // 🔹 Add this field
	serialId: string;
	amount: number;
	channel: string;
	method: "Bkash" | "Nagad" | "Binance";
	txid: string;
	pay_to: string;
	status: "pending" | "approved" | "rejected";
	createdAt: Date;
	updatedAt: Date;
	// If you need investor details
	investor?: {
		userId: string;
		// other investor fields you might need
	};
}

export interface IDepositPayload {
	serialId: string;
	amount: number;
	channel: string;
	method: "Bkash" | "Nagad" | "Binance";
	txid: string;
	pay_to: string;
	// 🔹 You will get investorId from the authenticated user on the backend,
	// so it's not needed in the frontend payload.
}
