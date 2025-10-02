export type InvestorStatus = "ACTIVE" | "IN_ACTIVE";
export type LevelType = "LL0" | "LL1" | "LL2" | "LL3" | "LL4";

export interface IInvestor {
	id: string; // DB id
	userId: string;

	// Status & level
	isActive: InvestorStatus;
	level: LevelType;

	// Wallet & earning info
	walletBalance: number;
	luxentaWallet: number;
	todayEarning: number;

	// Totals
	totalEarnings: number;
	totalWithdraw: number;
	totalDeposit: number;
	totalInvest: number;
	totalProfit: number;

	// Salary info
	salaryMonths: number;
	totalSalary: number;

	// Referral & team
	referralCode: string;
	teamSize: number;
	totalInvites: number;

	// Security
	withdrawPassword?: string | null;

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
