import React from "react";

// ダミーデータの型定義
interface Leader {
	id: number;
	name: string;
	title: string;
	score: number;
	avatar: string;
	profitLoss: number;
	winRate: number;
	totalBets: number;
}

interface Bet {
	id: number;
	user: string;
	prediction: string;
	amount: number;
	date: string;
	confidence: number;
	category: string;
}

const page = () => {
	// Updated leaders data with more stats
	const leaders: Leader[] = [
		{
			id: 1,
			name: "Vitalik Buterin",
			title: "Ethereum Founder",
			score: 2850,
			avatar: "/people/logo/vitalik.jpg",
			profitLoss: 12500,
			winRate: 78,
			totalBets: 145,
		},
		{
			id: 2,
			name: "Naval Ravikant",
			title: "AngelList Founder",
			score: 2720,
			avatar: "/people/logo/naval.png",
			profitLoss: 8000,
			winRate: 65,
			totalBets: 120,
		},
		{
			id: 3,
			name: "Paul Graham",
			title: "Y Combinator Co-founder",
			score: 2680,
			avatar: "/people/logo/paul.png",
			profitLoss: 10000,
			winRate: 70,
			totalBets: 130,
		},
	];

	// 友達の賭けのダミーデータ
	const recentBets: Bet[] = [
		{
			id: 1,
			user: "Alice",
			prediction: "2024年末までにBitcoinは10万ドルを超える",
			amount: 100,
			date: "2024-03-20",
			confidence: 85,
			category: "Crypto",
		},
		{
			id: 2,
			user: "Bob",
			prediction: "OpenAIは2024年中にGPT-5をリリースする",
			amount: 50,
			date: "2024-03-19",
			confidence: 90,
			category: "AI",
		},
	];

	return (
		<div className="p-6 max-w-5xl mx-auto text-white">
			{/* Leaderboard with enhanced stats */}
			<div className="mb-12">
				<h2 className="text-2xl font-semibold mb-6 text-gray-200">
					Top Predictors
				</h2>
				<div className="space-y-6">
					{leaders.map((leader) => (
						<div
							key={leader.id}
							className="p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300"
						>
							<div className="flex items-start">
								<img
									src={leader.avatar}
									alt={leader.name}
									className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
								/>
								<div className="ml-4 flex-grow">
									<div className="flex justify-between items-center mb-2">
										<div>
											<h3 className="font-semibold text-lg text-gray-100">
												{leader.name}
											</h3>
											<p className="text-gray-400">{leader.title}</p>
										</div>
										<div className="text-right">
											<div
												className={`text-2xl font-bold ${
													leader.profitLoss >= 0
														? "text-green-400"
														: "text-red-400"
												}`}
											>
												{leader.profitLoss >= 0 ? "+" : ""}
												{leader.profitLoss}
											</div>
											<div className="text-sm text-gray-400">Profit/Loss</div>
										</div>
									</div>

									{/* Stats Grid */}
									<div className="grid grid-cols-3 gap-4 mt-4">
										{/* Profit/Loss */}
										<div className="bg-gray-700/30 rounded-lg p-3">
											<div
												className={`text-lg font-bold ${
													leader.profitLoss >= 0
														? "text-green-400"
														: "text-red-400"
												}`}
											>
												{leader.profitLoss >= 0 ? "+" : ""}
												{leader.profitLoss}
											</div>
											<div className="text-xs text-gray-400">Profit/Loss</div>
										</div>

										{/* Win Rate */}
										<div className="bg-gray-700/30 rounded-lg p-3">
											<div className="flex items-center">
												<div className="h-2 w-full bg-gray-600 rounded-full">
													<div
														className="h-2 bg-blue-500 rounded-full"
														style={{ width: `${leader.winRate}%` }}
													/>
												</div>
												<span className="ml-2 text-blue-400">
													{leader.winRate}%
												</span>
											</div>
											<div className="text-xs text-gray-400 mt-1">Win Rate</div>
										</div>

										{/* Total Bets */}
										<div className="bg-gray-700/30 rounded-lg p-3">
											<div className="text-lg font-bold text-purple-400">
												{leader.totalBets}
											</div>
											<div className="text-xs text-gray-400">
												Total Predictions
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Recent Predictions with enhanced visuals */}
			<div>
				<h2 className="text-2xl font-semibold mb-6 text-gray-200">
					Recent Market Predictions
				</h2>
				<div className="space-y-4">
					{recentBets.map((bet) => (
						<div
							key={bet.id}
							className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300"
						>
							<div className="flex justify-between items-center mb-3">
								<span className="font-semibold text-gray-100">{bet.user}</span>
								<span className="text-sm px-3 py-1 bg-blue-500/20 rounded-full text-blue-400">
									{bet.category}
								</span>
								<span className="text-gray-400">{bet.date}</span>
							</div>
							<p className="mb-4 text-gray-200">{bet.prediction}</p>
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<div className="text-blue-400 font-medium">
										{bet.amount} credits wagered
									</div>
								</div>
								<div className="flex items-center">
									<div className="w-24 h-2 bg-gray-700 rounded-full">
										<div
											className="h-2 bg-green-500 rounded-full"
											style={{ width: `${bet.confidence}%` }}
										/>
									</div>
									<span className="ml-2 text-sm text-gray-400">
										{bet.confidence}% confident
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default page;
