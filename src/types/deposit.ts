
export interface IDeposit {
	id: string;
	investorId: string;  
	serialId: string;
	amount: number;
	channel: string;
	method: "Bkash" | "Nagad" | "Binance";
	txid: string;
	pay_to: string;
	status: "pending" | "approved" | "rejected";
	createdAt: Date;
	updatedAt: Date;
	investor?: {
		userId: string;
	};
}

export interface IDepositPayload {
	serialId: string;
	amount: number;
	channel: string;
	method: "Bkash" | "Nagad" | "Binance";
	txid: string;
	pay_to: string;
}
