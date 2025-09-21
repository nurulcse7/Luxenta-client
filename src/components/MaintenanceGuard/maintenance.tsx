import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";

interface MaintenanceProps {
	notice?: string;
	description?: string;
	estimate?: string;
}

const Maintenance = ({ notice, description, estimate }: MaintenanceProps) => {
	// Default messages
	const defaultNotice =
		"আমরা বর্তমানে আমাদের সিস্টেম আপডেট করছি আপনার আরও ভালো অভিজ্ঞতার জন্য।";
	const defaultDescription =
		"আমাদের ওয়েবসাইটটি কিছু সময়ের জন্য অফলাইনে থাকবে। এই সময়ে আপনি কোনো রকম সার্ভিস ব্যবহার করতে পারবেন না। কাজ সম্পন্ন হলে আবার স্বাভাবিকভাবে অ্যাক্সেস করতে পারবেন।";
	const defaultEstimate = "আগামী কয়েক ঘন্টার মধ্যে।";

	return (
		<div className="flex justify-center items-center min-h-screen bg-black px-4">
			<Card className="max-w-lg w-full text-center border border-red-500 bg-gradient-to-br from-black/90 to-red-950/40 shadow-2xl rounded-2xl">
				<CardHeader>
					<CardTitle className="text-3xl font-bold text-red-400 drop-shadow">
						🚧 Site Under Maintenance 🚧
					</CardTitle>
					<CardDescription className="text-white/80 mt-2 text-sm">
						{notice || defaultNotice}
					</CardDescription>
				</CardHeader>
				<CardContent className="text-white space-y-6">
					<p className="text-base leading-relaxed text-gray-300">
						{description || defaultDescription}
					</p>

					<p className="text-sm text-gray-400 italic">
						⏳ আনুমানিক সময়: {estimate || defaultEstimate}
					</p>

					<div className="flex justify-center">
						<Button
							variant="outline"
							className="mt-2 border-red-400 text-red-300 hover:bg-red-500 hover:text-white transition"
							onClick={() => location.reload()}>
							🔄 Refresh & Try Again
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Maintenance;
