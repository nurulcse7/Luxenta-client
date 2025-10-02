export enum NotificationType {
	system = "system",
	deposit = "deposit",
	withdraw = "withdraw",
	salary = "salary",
	referral = "referral",
	invest = "invest",

	project_complete = "project_complete",
	daily_income = "daily_income",
	checkin_bonus = "checkin_bonus",

	MAIN_TO_LUXENTA = "MAIN_TO_LUXENTA",
	LUXENTA_TO_MAIN = "LUXENTA_TO_MAIN",
}

export interface INotification {
	id: string;
	investorId?: string;
	title: string;
	message: string;
	type: NotificationType;
	isRead: boolean;
	createdAt: Date;
}
