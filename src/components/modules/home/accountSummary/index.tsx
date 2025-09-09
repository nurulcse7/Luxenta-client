import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AccountSummary() {
	return (
		<Card className="p-4 space-y-2 text-center">
			<h2 className="text-lg font-semibold">Account Summary</h2>
			<p>
				Main Balance: <span className="font-bold">৳50,000</span>
			</p>
			<p>
				Luxenta Wallet: <span className="font-bold">৳10,500</span>
			</p>
			<p>
				Total Earnings: <span className="font-bold">৳7,200</span>
			</p>
			<p>
				Team Size: <span className="font-bold">23</span>
			</p>
			<Button className="mt-2">View Details</Button>
		</Card>
	);
}
