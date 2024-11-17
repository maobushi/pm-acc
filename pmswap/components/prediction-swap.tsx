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
	const [loading, setLoading] = useState(false);
	const [userBalance] = useState(500);

	const handleSwap = async () => {
		setLoading(true);
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
			console.error("Error occurred while searching markets:", error);
			setMarkets(mockMarkets);
			setShowMarkets(true);
		} finally {
			setLoading(false);
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
			return "Expired";
		}

		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

		if (days > 0) {
			return `${days}d`;
		}
		return `${hours}h`;
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

				<div className="bg-transparent backdrop-blur-xl rounded-3xl p-8 space-y-8 shadow-2xl border border-emerald-900/30 flex flex-col transition-all duration-300 hover:border-emerald-800/50">
					<div className="space-y-6">
						<div className="space-y-2">
							<div className="relative flex-1 group bg-transparent">
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
									className="rounded-2xl w-full h-24 bg-transparent border-emerald-900/50 text-lg placeholder:text-emerald-700/50 focus:ring-emerald-500/30 focus:border-emerald-500/30 pt-8 transition-all duration-300 focus:bg-transparent"
								/>
							</div>
						</div>
					</div>

					<Button
						onClick={handleSwap}
						disabled={loading || !input.trim()}
						className={`w-full py-5 text-lg font-medium rounded-2xl transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/20 ${
							!input.trim()
								? "bg-gray-600 cursor-not-allowed"
								: "bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600"
						}`}
					>
						{loading ? (
							<svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
									fill="none"
								/>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
						) : (
							<Wallet className="w-5 h-5 mr-2 animate-pulse" />
						)}
						Swap
					</Button>

					{showMarkets && (
						<div className="space-y-4 mt-6 animate-fade-in">
							{markets.length > 0 ? (
								<>
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
													onCheckedChange={() =>
														toggleMarketSelection(market.id)
													}
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
														<span className="text-blue-400/70 mr-1">
															Creator:
														</span>
														<span className="text-blue-300 flex items-center">
															{market.creator.isVerified ? (
																<>
																	{market.creator.name === "nouns dao" ? (
																		<>
																			<Avatar className="h-4 w-4 mr-1">
																				<AvatarImage
																					src="/logo/nouns.png"
																					alt="Nouns"
																				/>
																			</Avatar>
																			{market.creator.name}
																		</>
																	) : (
																		market.creator.name
																	)}
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
													<div
														className={`inline-flex items-center ${
															market.oracle.name.toLowerCase() === "worldcoin"
																? "bg-yellow-900/30"
																: "bg-green-900/30"
														} px-3 py-1 rounded-full text-xs`}
													>
														<span
															className={`${
																market.oracle.name.toLowerCase() === "worldcoin"
																	? "text-yellow-400/70"
																	: "text-green-400/70"
															} mr-1`}
														>
															Oracle:
														</span>
														<span
															className={`${
																market.oracle.name.toLowerCase() === "worldcoin"
																	? "text-yellow-300"
																	: "text-green-300"
															} flex items-center`}
														>
															{market.oracle.isVerified ? (
																<>
																	{market.oracle.name}
																	{market.oracle.name.toLowerCase() ===
																	"worldcoin" ? (
																		<svg
																			className="w-3 h-3 ml-1 text-yellow-400"
																			viewBox="0 0 24 24"
																			fill="none"
																			stroke="currentColor"
																			strokeWidth="2"
																		>
																			<path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
																		</svg>
																	) : (
																		<svg
																			className="w-3 h-3 ml-1 text-green-400"
																			viewBox="0 0 24 24"
																			fill="currentColor"
																		>
																			<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
																		</svg>
																	)}
																</>
															) : (
																market.oracle.address
															)}
														</span>
													</div>
												</div>
												{market.oracle.name.toLowerCase() === "worldcoin" && (
													<div className="mt-2 text-xs text-yellow-400/80 flex items-center">
														<svg
															className="w-3 h-3 mr-1"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															strokeWidth="2"
														>
															<path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
														</svg>
														Warning: This oracle may be subject to manipulation
													</div>
												)}
											</div>
											<div className="text-right">
												<p className="text-emerald-400">
													Win: +
													{Math.round((amount * market.odds - amount) * 100) /
														100}{" "}
													{market.token2}
												</p>
												<p className="text-red-400">
													Lose: -{Math.round(amount * 100) / 100}{" "}
													{market.token1}
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
														className="relative flex items-center select-none touch-none w-full [&_[role=slider]]:bg-green-400 [&_[role=slider]]:border-green-500 [&_[role=slider]]:hover:bg-green-300 [&_[role=slider]]:focus:ring-green-500/50 [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:transition-colors [&_.range-slider-track]:bg-green-600 [&_.range-slider-rail]:bg-green-900/50"
													/>
													<div className="flex justify-between items-center mt-2">
														<div className="text-sm text-emerald-400">
															{amount.toFixed(2)} {token}
														</div>
														<Button
															variant="outline"
															size="sm"
															onClick={() => setAmount(userBalance)}
															className="text-xs bg-transparent text-emerald-400 border-emerald-500 hover:bg-emerald-900/20 hover:text-emerald-300 hover:border-emerald-400 transition-all duration-300 font-bold mt-2"
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
								</>
							) : (
								<div className="text-center space-y-4">
									<p className="text-emerald-400/80">
										No matching markets found.
									</p>
									<Button
										onClick={() => setCreateMode(true)}
										className="px-8 py-4 text-lg font-medium bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 rounded-2xl transition-all duration-300 ease-out transform hover:scale-[1.02]"
									>
										<Plus className="w-5 h-5 mr-2" />
										Create New Market
									</Button>
								</div>
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
			</div>
		</div>
	);
}
