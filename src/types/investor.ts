export type InvestorStatus = "ACTIVE" | "IN_ACTIVE";
export type LevelType = "LL0" | "LL1" | "LL2" | "LL3" | "LL4";

export interface IInvestor {
	userId: string;
	isActive: InvestorStatus;
	walletBalance: number;
	luxentaWallet: number;
	totalEarnings: number;
	totalWithdraw: number;
	totalDeposit: number;
	todayEarning: number;
	totalInvest: number;
	totalProfit: number;
	level: LevelType;
	referralCode: string;

	// relations
	// payments?: IPayment[];
	// projects?: IMyProject[];
	// referrals?: IReferral[];
	// referralsFrom?: IReferral[];
	// checkins?: ICheckInBonus[];
	// salaries?: ISalaryHistory[];
	// notifications?: INotification[];
	// history?: IHistory[];
}
