"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { MarketList } from "./Marketlist";
import { Market } from "@/lib/interface";
import { mockMarkets } from "../api/openai/searchmarkets/demoMarketData";

const SwapWidget = () => {
	const [input, setInput] = useState("");
	const [markets, setMarkets] = useState<Market[]>([]);
	const [showMarkets, setShowMarkets] = useState(false);

	const handleSwap = async () => {
		try {
			const response = await fetch("/api/openai/searchmarkets", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userMessage: input,
				}),
			});

			const data = await response.json();
			console.log(data);
			const matches = JSON.parse(data.message.content).matches;

			setMarkets(matches);
			setShowMarkets(true);
		} catch (error) {
			console.error("市場の検索中にエラーが発生しました:", error);
			// エラー時にはモックデータを使用
			setMarkets(mockMarkets);
			setShowMarkets(true);
		}
	};

	return (
		<div>
			<div className="bg-[#0f1613]/90 backdrop-blur-xl rounded-3xl p-8 space-y-8 shadow-2xl border border-emerald-900/30 flex flex-col transition-all duration-300 hover:border-emerald-800/50">
				<div className="space-y-6">
					<div className="space-y-2">
						<div className="relative flex-1 group">
							<label
								htmlFor="market-input"
								className="absolute top-2 left-4 text-sm text-emerald-400/80 z-10 transition-all duration-300 group-hover:text-emerald-300"
							>
								What do you want to predict?
							</label>
							<Input
								id="market-input"
								placeholder="Trump wins the election"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								className="rounded-2xl w-full h-24 bg-[#1a2420]/50 border-emerald-900/50 text-lg placeholder:text-emerald-700/50 focus:ring-emerald-500/30 focus:border-emerald-500/30 pt-8 transition-all duration-300 hover:bg-[#1a2420]/70"
							/>
						</div>
					</div>
				</div>

				<Button
					onClick={handleSwap}
					className="w-full py-5 text-lg font-medium bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 rounded-2xl transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/20"
				>
					<Wallet className="w-5 h-5 mr-2 animate-pulse" />
					Swap
				</Button>

				{showMarkets && markets.length > 0 && <MarketList markets={markets} />}
			</div>
		</div>
	);
};

export default SwapWidget;
