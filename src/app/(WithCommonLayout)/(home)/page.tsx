import CheckinBonus from "@/components/modules/home/checkinBonus";
import DepositWithdraw from "@/components/modules/home/depositWithdraw";
import DynamicBanner from "@/components/modules/home/dynamicBanner";
import InvestmentProjects from "@/components/modules/home/InvestmentProjects";
import InviteFriend from "@/components/modules/home/inviteFriend";
import LuxentaWallet from "@/components/modules/home/luxentaWallet";

export default function HomePage() {
	return (
		<div className="container mx-auto py-8 space-y-8">
			{/* Dynamic Banner Section */}
			<DynamicBanner />

			{/* Financial Modules Section */}
			<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<LuxentaWallet />
				<DepositWithdraw />
				<CheckinBonus />
				<InviteFriend />
			</section>

			{/* Other Investment Projects */}
			<InvestmentProjects />
		</div>
	);
}
