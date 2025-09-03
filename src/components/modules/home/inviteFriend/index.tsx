"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function InviteFriend() {
	return (
		<Card className="rounded-2xl shadow">
			<CardHeader>
				<CardTitle>Invite a Friend</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="mb-2 text-gray-600">
					Share your referral link to earn rewards.
				</p>
				<Button className="w-full">Copy Invite Link</Button>
			</CardContent>
		</Card>
	);
}
