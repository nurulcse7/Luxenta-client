export type TProject = {
	id: string;
	title: string;
	description: string;
	image?: string;
	coverImage?:string
	roiPercent: number;
	duration: number;
	price: number;
	dailyIncome: number;
	progress: number;
	status: string;
};
