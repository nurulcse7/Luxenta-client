"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CheckinBonus() {
	return (
		<Card className="rounded-2xl shadow">
			<CardHeader>
				<CardTitle>Check-in Bonus</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="mb-2 text-gray-600">Claim your daily bonus.</p>
				<Button className="w-full">Check-in</Button>
			</CardContent>
		</Card>
	);
}
