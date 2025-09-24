enum HistoryType {
	deposit = "deposit",
	withdraw = "withdraw",
	invest = "invest",
	project_profit = "project_profit",
	salary = "salary",
	referral_bonus = "referral_bonus",
	checkin_bonus = "checkin_bonus",
}

export interface IHistory {
	id: string;
	investorId?: string;
	type: HistoryType;
	status: string;
	amount: number;
	title: string;
	description?: string;
	createdAt: Date;
	updatedAt: Date;
}
