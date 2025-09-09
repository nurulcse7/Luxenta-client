"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function InviteFriend() {
	const [inviteCode] = useState("LXNT12345");

	return (
		<Card className="p-4 text-center space-y-2 bg-purple-50">
			<h2 className="text-lg font-semibold">Invite Friend</h2>
			<p>Your Invite Code:</p>
			<p className="font-bold text-lg">{inviteCode}</p>
			<Button
				onClick={() => navigator.clipboard.writeText(inviteCode)}
				className="mt-2 bg-purple-500 hover:bg-purple-600 text-white">
				Copy Code
			</Button>
		</Card>
	);
}
