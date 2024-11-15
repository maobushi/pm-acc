import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MarketWidget } from "@/lib/interface";
import Image from "next/image";
import React from "react";
const PredictionMarketWidget = ({ market }: { market: MarketWidget }) => {
	return (
		<div className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-xl mr-4 min-w-[300px] flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700/30">
			<div>
				<div className="flex justify-between items-center pb-4">
					<Badge
						variant="default"
						className={`text-xs font-medium px-3 py-1 rounded-full ${
							market.marketStatus === "New"
								? "bg-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/30"
								: market.marketStatus === "Active"
								? "bg-green-500/10 text-green-400 ring-1 ring-green-400/30"
								: market.marketStatus === "End Soon"
								? "bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/30"
								: "bg-red-500/10 text-red-400 ring-1 ring-red-400/30"
						}`}
					>
						{market.marketStatus}
					</Badge>
					<div
						className={`text-sm font-medium ${
							market.marketChange24h >= 0 ? "text-green-400" : "text-red-400"
						}`}
					>
						{market.marketChange24h > 0 ? "+" : ""}
						{market.marketChange24h.toLocaleString(undefined, {
							minimumFractionDigits: 1,
							maximumFractionDigits: 1,
						})}
						%
					</div>
				</div>

				<div className="mb-4">
					<p className="text-sm text-white font-semibold leading-snug">
						{market.marketName}
					</p>
				</div>

				<div className="flex gap-3 mb-6">
					<Button
						size="sm"
						className="bg-green-500/10 hover:bg-green-500/20 text-green-400 flex-1 font-medium transition-colors duration-200 ring-1 ring-green-500/30"
					>
						<span className="mr-1">Yes</span>
						<span className="font-bold">
							$
							{market.marketPrice.toLocaleString(undefined, {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</span>
					</Button>
					<Button
						size="sm"
						className="bg-red-500/10 hover:bg-red-500/20 text-red-400 flex-1 font-medium transition-colors duration-200 ring-1 ring-red-500/30"
					>
						<span className="mr-1">No</span>
						<span className="font-bold">
							$
							{Math.abs(market.marketPrice).toLocaleString(undefined, {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</span>
					</Button>
				</div>
			</div>

			<div className="space-y-3 text-sm">
				<div className="flex justify-between text-gray-300">
					<span className="flex items-center gap-1">
						<span className="text-gray-500">Market Cap:</span>$
						{(market.marketVolume * 2).toLocaleString(undefined, {
							maximumFractionDigits: 0,
						})}
					</span>
				</div>

				<div className="flex justify-between items-center py-2 border-t border-gray-700/30">
					<div className="flex items-center">
						<div className="flex -space-x-2">
							{market.marketCreators.map((creator, index) => (
								<Image
									key={`creator-${index}`}
									src={`/logo/${creator}.png`}
									alt={creator}
									width={30}
									height={30}
									className="rounded-full ring-1 ring-gray-700/50 relative"
								/>
							))}
						</div>
						<div className="w-[1px] h-3 bg-gray-700 mx-2" />
						<div className="flex -space-x-2">
							{market.marketOracle.map((oracle, index) => (
								<Image
									key={`oracle-${index}`}
									src={`/logo/${oracle}.png`}
									alt={oracle}
									width={30}
									height={30}
									className="rounded-full ring-1 ring-gray-700/50 relative"
								/>
							))}
						</div>
					</div>
					<span className="text-gray-400">
						{market.marketParticipants.toLocaleString(undefined, {
							maximumFractionDigits: 0,
						})}{" "}
						participants
					</span>
				</div>
			</div>
		</div>
	);
};

export default PredictionMarketWidget;
