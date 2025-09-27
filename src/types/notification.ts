// types/notifications.

export enum NotificationType {
	system = "system",
	deposit = "deposit",
	withdraw = "withdraw",
	salary = "salary",
	referral = "referral",
	project = "project",
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
