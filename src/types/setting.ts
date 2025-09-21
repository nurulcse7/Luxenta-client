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
	phone?: string;
	whatsapp?: string;
	telegram?: string;
	address?: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface ISettings {
	general: IGeneralSetting;
	payment: IPaymentSetting[];
	support: ISupportSetting;
}
