import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CheckinBonus() {
	return (
		<Card className="p-4 space-y-2 text-center bg-yellow-50">
			<h2 className="text-lg font-semibold">Check-in Bonus</h2>
			<p>
				Today's Bonus: <span className="font-bold">৳2</span>
			</p>
			<p>
				Consecutive Days: <span className="font-bold">3</span>
			</p>
			<p>
				Total Earned: <span className="font-bold">৳6</span>
			</p>
			<Button
				variant="default"
				className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white">
				Check-in
			</Button>
		</Card>
	);
}
