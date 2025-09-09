import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LuxentaWallet() {
	return (
		<Card className="p-4 text-center space-y-2 bg-green-50">
			<h2 className="text-lg font-semibold">Luxenta Wallet</h2>
			<p>
				Balance: <span className="font-bold">৳10,500</span>
			</p>
			<p>
				Daily Interest: <span className="font-bold">0.71%</span>
			</p>
			<Button
				variant="default"
				className="mt-2 bg-green-500 hover:bg-green-600 text-white">
				Transfer to Main Balance
			</Button>
		</Card>
	);
}
