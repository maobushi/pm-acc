"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Plus, Wallet } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Market,
	mockMarkets,
} from "@/app/api/openai/searchmarkets/demoMarketData";
import CreateNewMarket from "@/app/CreateNewMarket/CreateNewMarket";

export function PredictionSwap() {
	const [input, setInput] = useState("");
	const [token, setToken] = useState("USDC");
	const [amount, setAmount] = useState(0);
	const [showMarkets, setShowMarkets] = useState(false);
	const [markets, setMarkets] = useState<Market[]>(mockMarkets);
	const [selectedMarkets, setSelectedMarkets] = useState<number[]>([]);
	const [createMode, setCreateMode] = useState(false);

	const handleSwap = async () => {
		try {
			const response = await fetch("/api/openai/searchmarkets", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userMessage: input }),
			});

			const data = await response.json();
			console.log("Received data:", data);

			let matches;
			if (typeof data.message.content === "string") {
				matches = JSON.parse(data.message.content).matches;
			} else {
				matches = data.message.content.matches;
			}

			console.log("Parsed matches:", matches);

			const filteredMarkets = mockMarkets.filter((market) => {
				const hasMatch = matches.some(
					(match: { marketId: number }) => match.marketId === market.id
				);
				console.log(`Market ${market.id} match: ${hasMatch}`);
				return hasMatch;
			});

			console.log("Filtered markets:", filteredMarkets);

			const marketsWithScores = filteredMarkets.map((market) => ({
				...market,
				matchScore:
					matches.find(
						(match: { marketId: number; similarity: number }) =>
							match.marketId === market.id
					)?.similarity || 0,
			}));

			setMarkets(marketsWithScores);
			setShowMarkets(true);
		} catch (error) {
			console.error("市場の検索中にエラーが発生しました:", error);
			setMarkets(mockMarkets);
			setShowMarkets(true);
		}
	};

	const toggleMarketSelection = (id: number) => {
		setSelectedMarkets((prev) =>
			prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
		);
	};

	// 期限までの残り時間を計算する関数を追加
	const getTimeRemaining = (expiryDate: string) => {
		const now = new Date();
		const expiry = new Date(expiryDate);
		const diff = expiry.getTime() - now.getTime();

		if (diff <= 0) {
			return "期限切れ";
		}

		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

		if (days > 0) {
			return `${days}日後`;
		}
		return `${hours}時間後`;
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-[#0a0f0d] to-[#0d1410] text-white flex flex-col items-center justify-center p-4 font-bold">
			<div className="w-full max-w-2xl space-y-8">
				<div className="space-y-4 text-center mb-8 animate-fade-in">
					<h1 className="text-6xl font-bold tracking-tighter bg-gradient-to-r from-emerald-300 via-green-400 to-emerald-500 bg-clip-text text-transparent transition-all duration-300 hover:scale-105">
						Predict & Swap
					</h1>
					<p className="text-emerald-400/80 text-lg font-light">
						Trade on your beliefs, anytime, anywhere.
					</p>
				</div>

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

					{showMarkets && (
						<div className="space-y-4 mt-6 animate-fade-in">
							<h2 className="text-xl font-semibold text-emerald-300">
								Available Markets
							</h2>

							{/* 既存のマーケットリスト */}
							{markets.map((market) => (
								<div
									key={market.id}
									onClick={() => toggleMarketSelection(market.id)}
									className="flex items-center justify-between bg-[#1a2420]/50 p-4 rounded-xl border border-emerald-900/30 transition-all duration-300 hover:bg-[#1a2420]/70 hover:border-emerald-800/50 cursor-pointer relative"
								>
									<div className="absolute top-2 right-2 bg-emerald-900/50 px-2 py-1 rounded-full text-xs">
										<span className="text-emerald-300">
											Match: {market.matchScore?.toFixed(1) || "N/A"}%
										</span>
									</div>
									<div className="flex items-center">
										<Checkbox
											checked={selectedMarkets.includes(market.id)}
											className="border-emerald-500 mr-4"
											onClick={(e) => e.stopPropagation()}
											onCheckedChange={() => toggleMarketSelection(market.id)}
										/>
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
										<h3 className="font-medium text-emerald-300">
											{market.name}
										</h3>
										<div className="flex items-center gap-2 flex-wrap mt-2">
											<div className="inline-flex items-center bg-purple-900/30 px-3 py-1 rounded-full text-xs">
												<span className="text-purple-400/70 mr-1">
													Expires:
												</span>
												<span className="text-purple-300">
													{getTimeRemaining(market.expiryDate)}
												</span>
											</div>
											<div className="inline-flex items-center bg-blue-900/30 px-3 py-1 rounded-full text-xs">
												<span className="text-blue-400/70 mr-1">Creator:</span>
												<span className="text-blue-300 flex items-center">
													{market.creator.isVerified ? (
														<>
															{market.creator.name}
															<svg
																className="w-3 h-3 ml-1 text-blue-400"
																viewBox="0 0 24 24"
																fill="currentColor"
															>
																<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
															</svg>
														</>
													) : (
														market.creator.address
													)}
												</span>
											</div>
											<div className="inline-flex items-center bg-green-900/30 px-3 py-1 rounded-full text-xs">
												<span className="text-green-400/70 mr-1">Oracle:</span>
												<span className="text-green-300 flex items-center">
													{market.oracle.isVerified ? (
														<>
															{market.oracle.name}
															<svg
																className="w-3 h-3 ml-1 text-green-400"
																viewBox="0 0 24 24"
																fill="currentColor"
															>
																<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
															</svg>
														</>
													) : (
														market.oracle.address
													)}
												</span>
											</div>
										</div>
									</div>
									<div className="text-right">
										<p className="text-emerald-400">
											Win: +
											{Math.round((amount * market.odds - amount) * 100) / 100}{" "}
											{market.token2}
										</p>
										<p className="text-red-400">
											Lose: -{Math.round(amount * 100) / 100} {market.token1}
										</p>
									</div>
								</div>
							))}
							<div className="space-y-4 bg-[#1a2420]/50 p-6 rounded-xl border border-emerald-900/30">
								<div className="space-y-2 flex flex-col justify-between">
									<div className="flex justify-between items-center">
										<label
											htmlFor="amount-slider"
											className="text-sm text-emerald-400/80 group-hover:text-emerald-300 transition-all duration-300"
										>
											Amount to bet
										</label>
									</div>
									<div className="flex gap-4 items-center">
										<div className="flex-1">
											<Slider
												id="amount-slider"
												min={0}
												max={1000}
												step={0.01}
												value={[amount]}
												onValueChange={([value]) => setAmount(value)}
												className="relative flex items-center select-none touch-none w-full [&_[role=slider]]:bg-emerald-400 [&_[role=slider]]:border-emerald-500 [&_[role=slider]]:hover:bg-emerald-300 [&_[role=slider]]:focus:ring-emerald-500/50 [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:transition-colors [&_.range-slider-track]:bg-emerald-600 [&_.range-slider-rail]:bg-emerald-900/50"
											/>
											<div className="flex justify-between items-center mt-2">
												<div className="text-sm text-emerald-400">
													{amount.toFixed(2)} {token}
												</div>
												<Button
													variant="outline"
													size="sm"
													className="text-xs text-gray-600 border-gray-800 hover:bg-gray-800/20 hover:text-gray-700 hover:border-gray-600 transition-all duration-300 font-bold mt-2"
												>
													Max
												</Button>
											</div>
										</div>
										<Select value={token} onValueChange={setToken}>
											<SelectTrigger className="w-32 bg-[#1a2420] rounded-full border-emerald-900 focus:ring-emerald-500 focus:border-emerald-500 flex items-center gap-2">
												<Avatar className="h-6 w-6">
													<AvatarImage src={`/logo/usdc.png`} />
												</Avatar>
												<SelectValue>USDC</SelectValue>
											</SelectTrigger>
											<SelectContent className="bg-[#1a2420] border-emerald-900">
												<SelectItem value="USDC">USDC</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</div>
							{!createMode && (
								<Button
									onClick={() => setCreateMode(true)}
									className="w-full py-4 text-emerald-400 bg-[#1a2420] hover:bg-[#243430] rounded-xl border border-dashed border-emerald-900/50 transition-colors duration-300"
								>
									<Plus className="w-5 h-5 mr-2" />
									Create New Market
								</Button>
							)}
							{createMode && <CreateNewMarket />}
							{selectedMarkets.length > 0 && (
								<Button
									onClick={() =>
										console.log("Finalizing swap for markets:", selectedMarkets)
									}
									className="w-full py-4 text-lg font-medium bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
								>
									Finalize Swap ({selectedMarkets.length} selected)
								</Button>
							)}
						</div>
					)}
				</div>

				<p className="text-center text-emerald-400/70 text-sm max-w-sm mx-auto mt-8 font-light">
					The most innovative prediction market. Create and trade on Ethereum
					and other chains.
				</p>
			</div>
		</div>
	);
}
