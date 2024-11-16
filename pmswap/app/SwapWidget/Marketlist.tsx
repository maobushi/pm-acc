import { Market } from "@/lib/interface";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface MarketListProps {
	markets: Market[];
}

const getTimeRemaining = (expiryDate: string) => {
	const now = new Date();
	const expiry = new Date(expiryDate);
	const diff = expiry.getTime() - now.getTime();

	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

	if (days > 0) {
		return `${days}d ${hours}h remaining`;
	} else if (hours > 0) {
		return `${hours}h remaining`;
	} else {
		return "Ending soon";
	}
};

export const MarketList = ({ markets }: MarketListProps) => {
	return (
		<div className="space-y-4 mt-6 animate-fade-in">
			<h2 className="text-xl font-semibold text-emerald-300">
				Available Markets
			</h2>
			{markets.map((market) => (
				<div
					key={market.id}
					className="flex items-center justify-between bg-[#1a2420]/50 p-4 rounded-xl border border-emerald-900/30 transition-all duration-300 hover:bg-[#1a2420]/70 hover:border-emerald-800/50 cursor-pointer relative"
				>
					<div className="absolute top-2 right-2 bg-emerald-900/50 px-2 py-1 rounded-full text-xs">
						<span className="text-emerald-300">
							Match: {market.matchScore?.toFixed(1) || "N/A"}%
						</span>
					</div>
					<div className="flex items-center">
						<div className="relative mr-4">
							<Avatar className="h-8 w-8 border-2 border-[#0f1613]">
								<AvatarImage
									src={`/logo/${market.exchange}.png`}
									alt={market.exchange}
								/>
							</Avatar>
							<Avatar className="h-5 w-5 absolute -bottom-1 -right-1 border border-[#0f1613]">
								<AvatarImage
									src={`/logo/${market.oracle.name}.png`}
									alt={market.oracle.name}
								/>
							</Avatar>
						</div>
					</div>
					<div className="flex-1 ml-4">
						<h3 className="font-medium text-emerald-300">{market.name}</h3>
						<div className="flex items-center gap-2 flex-wrap mt-2">
							<div className="inline-flex items-center bg-purple-900/30 px-3 py-1 rounded-full text-xs">
								<span className="text-purple-400/70 mr-1">Expires:</span>
								<span className="text-purple-300">
									{getTimeRemaining(market.expiryDate)}
								</span>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
