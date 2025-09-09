import CheckinBonus from "@/components/modules/home/checkinBonus";
import DepositWithdraw from "@/components/modules/home/depositWithdraw";
import DynamicBanner from "@/components/modules/home/dynamicBanner";
import InvestmentProjects from "@/components/modules/home/InvestmentProjects";
import InviteFriend from "@/components/modules/home/inviteFriend";
import LuxentaWallet from "@/components/modules/home/luxentaWallet";
import AccountSummary from "@/components/modules/home/accountSummary";
import NotificationPanel from "@/components/modules/home/notificationPanel";
import TeamDashboard from "@/components/modules/home/teamDashboard";

export default function HomePage() {
	return (
		<div className="container mx-auto py-8 space-y-8">
			{/* Dynamic Banner Section */}
			<DynamicBanner />
			{/* Account & Notification Summary */}
			<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<AccountSummary /> {/* Main Balance, Total Earnings, Team Size */}
				<NotificationPanel />{" "}
				{/* Live notifications: deposit, withdraw, salary */}
			</section>
			{/* Financial Modules Section */}
			<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<LuxentaWallet /> {/* Luxenta Wallet balance & daily interest */}
				<DepositWithdraw /> {/* Deposit / Withdraw functionality */}
				<CheckinBonus /> {/* Daily check-in bonus */}
				<InviteFriend /> {/* Referral invite system */}
			</section>
			{/* Investment Projects Section */}
			<InvestmentProjects />{" "}
			{/* Project Cards with ROI, Duration, Invest button */}
			{/* Team Dashboard */}
			<TeamDashboard /> {/* Referral tree, generation-wise stats */}
		</div>
	);
}
