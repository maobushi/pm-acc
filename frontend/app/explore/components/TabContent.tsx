import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
interface TabContentProps {
	content: {
		title: string;
		subtitle?: string;
		posts?: number;
		category?: string;
		image?: string;
	}[];
}

export function TabContent({ content }: TabContentProps) {
	return (
		<div
			className="flex-shrink-0 h-full overflow-y-auto"
			style={{ width: "100%" }}
		>
			{content.map((item, itemIndex) => (
				<div
					key={itemIndex}
					className="p-4 border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
				>
					<div className="flex items-start">
						<div className="flex-1 min-w-0">
							{item.category && (
								<Badge
									variant="secondary"
									className="mb-2 bg-gray-700 text-gray-300"
								>
									{item.category}
								</Badge>
							)}
							<h3 className="text-lg font-bold mb-1 leading-tight">
								{item.title}
							</h3>
							{item.subtitle && (
								<p className="text-sm text-gray-400 mb-2">{item.subtitle}</p>
							)}
							{item.posts && (
								<p className="text-sm text-gray-500">
									{item.posts.toLocaleString()} posts
								</p>
							)}
						</div>
						<Button
							variant="ghost"
							size="icon"
							className="ml-2 text-gray-400 hover:text-gray-100"
						>
							<MoreHorizontal className="h-5 w-5" />
						</Button>
					</div>
					{item.image && (
						<Image
							src={item.image}
							width={100}
							height={100}
							alt=""
							className="mt-3 rounded-xl w-full h-48 object-cover"
						/>
					)}
				</div>
			))}
		</div>
	);
}
