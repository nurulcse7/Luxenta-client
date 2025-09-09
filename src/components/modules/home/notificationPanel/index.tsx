import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Notification {
	id: string;
	message: string;
	type: string;
	isRead: boolean;
}

const demoNotifications: Notification[] = [
	{
		id: "1",
		message: "User XJ38K29L just deposited.",
		type: "deposit",
		isRead: false,
	},
	{
		id: "2",
		message: "Salary credited for LL1 level.",
		type: "salary",
		isRead: false,
	},
];

export default function NotificationPanel() {
	return (
		<Card className="p-4 space-y-2">
			<h2 className="text-lg font-semibold">Notifications</h2>
			<ul className="space-y-2">
				{demoNotifications.map(n => (
					<li
						key={n.id}
						className="flex justify-between items-center p-2 rounded hover:bg-gray-50">
						<span>{n.message}</span>
						{!n.isRead && <Badge variant="secondary">New</Badge>}
					</li>
				))}
			</ul>
		</Card>
	);
}
