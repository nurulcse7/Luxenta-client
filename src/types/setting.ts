// General Settings
export interface IGeneralSetting {
	id: string;
	maintenance: boolean;
	notice?: string;
	description?: string;
	estimate?: string;
	createdAt: Date;
	updatedAt: Date;
}

// Payment Settings
export interface IPaymentSetting {
	id: string;
	serverId: string;
	label: string;
	sub: string;
	bkash: string;
	nagad: string;
	binance: string;
	createdAt: Date;
	updatedAt: Date;
}

// Support Settings
export interface ISupportSetting {
	id: string;
	email?: string;
	whatsapp?: string;
	telegram?: string;
	createdAt: Date;
	updatedAt: Date;
}

// Withdraw Settings
export interface IWithdrawSetting {
	id: string;
	isEnabled: boolean;
	minAmount: number;
	maxAmount: number;
	dailyLimit: number;
	withdrawFee: number;
	allowedDays: string[];
	startTime?: string; // "09:00"
	endTime?: string; // "18:00"
	processTime?: string;
	createdAt: Date;
	updatedAt: Date;
}

// Extend ISettings to include withdraw
export interface ISettings {
	general: IGeneralSetting;
	payment: IPaymentSetting[];
	support: ISupportSetting;
	withdraw: IWithdrawSetting;
}
