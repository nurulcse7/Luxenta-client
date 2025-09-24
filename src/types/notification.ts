// types/notifications.

export enum NotificationType {
	deposit = "deposit",
	withdraw = "withdraw",
	salary = "salary",
	referral = "referral",
	project = "project",
}

export interface Notification {
	id: string;
	investorId?: string;
	title: string;
	message: string;
	type: NotificationType;
	isRead: boolean;
	createdAt: Date;
}
