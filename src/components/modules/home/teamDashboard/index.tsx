import { Card } from "@/components/ui/card";

export default function TeamDashboard() {
	return (
		<Card className="p-4 space-y-2">
			<h2 className="text-lg font-semibold">Team Dashboard</h2>
			<p>
				Total Members: <span className="font-bold">23</span>
			</p>
			<p>Level-wise Earnings:</p>
			<ul className="list-disc pl-6">
				<li>LL1: ৳1,000</li>
				<li>LL2: ৳3,000</li>
				<li>LL3: ৳5,000</li>
				<li>VIP: ৳20,000</li>
			</ul>
		</Card>
	);
}
