type Investor = {};
export type TProject = {
	id: string;
	title: string;
	description: string;
	image?: string;
	roiPercent: number;
	duration: number;
	price: number;
	dailyIncome: number;
	progress: number;
	status: string;
	investors: Investor[];
};
