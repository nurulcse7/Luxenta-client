"use client";

import { useRouter } from "next/navigation";
import { useSetting } from "@/context/SettingContext";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Mail, MessageCircle, Send, LifeBuoy, ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/ui/BackButton";

const Support = () => {
	const router = useRouter();
	const { settings } = useSetting();
	const support = settings?.support;

	if (!support)
		return (
			<div className="flex justify-center items-center h-[60vh] text-gray-400 text-lg">
				Loading support information...
			</div>
		);

	const supportItems = [
		{
			label: "Email",
			value: support.email,
			icon: <Mail className="w-5 h-5 text-primary" />,
			link: support.email ? `mailto:${support.email}` : undefined,
		},
		{
			label: "WhatsApp",
			value: support.whatsapp,
			icon: <MessageCircle className="w-5 h-5 text-green-400" />,
			link: support.whatsapp
				? `https://wa.me/${support.whatsapp.replace(/[^0-9]/g, "")}`
				: undefined,
		},
		{
			label: "Telegram",
			value: support.telegram,
			icon: <Send className="w-5 h-5 text-sky-400" />,
			link: support.telegram
				? `https://t.me/${support.telegram.replace("@", "")}`
				: undefined,
		},
	];

	return (
		<div className="max-w-5xl mx-auto py-10 px-6">
			{/* ✅ Back to Login Button */}
			<div className="mb-6">
				<BackButton />
			</div>

			<Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-700/50 shadow-2xl rounded-2xl overflow-hidden">
				<CardHeader className="flex flex-col items-center text-center bg-gradient-to-r from-primary/20 to-primary/5 border-b border-gray-700/50 py-8">
					<LifeBuoy className="w-12 h-12 text-primary mb-3" />
					<CardTitle className="text-3xl font-bold text-white tracking-tight">
						Support Center
					</CardTitle>
					<CardDescription className="text-gray-400 mt-2 text-base max-w-md">
						Need help? Reach out to us anytime through the following channels.
					</CardDescription>
				</CardHeader>

				<CardContent className="p-8">
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{supportItems.map((item, idx) => (
							<div
								key={idx}
								onClick={() =>
									item.link &&
									window.open(item.link, "_blank", "noopener,noreferrer")
								}
								className={`flex flex-col justify-center items-center gap-3 p-6 rounded-xl border border-gray-700 bg-gray-800/40 hover:bg-gray-800/70 hover:border-primary/40 transition-all duration-200 shadow-md cursor-pointer group`}>
								<div className="p-3 rounded-full bg-gray-900 group-hover:bg-primary/20 transition-colors">
									{item.icon}
								</div>
								<p className="text-gray-400 text-sm uppercase tracking-wider">
									{item.label}
								</p>
								<p className="text-white text-base font-semibold text-center break-all">
									{item.value || "Not Available"}
								</p>
							</div>
						))}
					</div>

					<Separator className="my-10 bg-gray-700/50" />

					<div className="text-center text-gray-400 text-sm">
						<p>
							For urgent issues, please contact us directly through{" "}
							<span className="text-primary font-medium">Email</span> or{" "}
							<span className="text-green-400 font-medium">Telegram</span>.
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Support;
