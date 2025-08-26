// src/app/page.tsx

 

export default function HomePage() {
	return (
		<Layout>
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

				{/* Example of other content */}
				<section>
					<h2 className="text-2xl font-bold mb-4">Our Investment Projects</h2>
					{/* This area will be populated with project cards later */}
					<div className="bg-gray-100 p-8 rounded-lg text-center text-gray-500">
						Project listings will go here.
					</div>
				</section>
			</div>
		</Layout>
	);
}
