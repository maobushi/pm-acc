import { NewsWidget } from "@/lib/interface";

export const demoNewsData: NewsWidget[] = [
	{
		newsId: 1,
		newsTitle:
			"Polymarket founder awakes to find Feds raiding his New York home",
		newsDescription:
			"Polymarket founder awakes to find Feds raiding his New York home—his company blasts it as 'obvious political retribution' for predicting Trump win",
		newsThumbnail: "0",
		newsReactions: [
			"Market sentiment shows **78%** user concern over Mercari's seller policies, with **$3.2M** daily volume affected. Trust metrics declined **15%** as sellers report inadequate protection and slow dispute resolution.",
		],
		newsCreatedAt: 1731896220000,
		newsCategory: [
			"Latest",
			"World",
			"Business",
			"Technology",
			"Consumer Protection",
		],
		newsSource: "Fortune",
		topBettingReply: {
			position: "Long",
			amount: "$5,420",
			comment:
				"This regulatory action could significantly impact prediction markets. Going long on increased oversight.",
		},
	},
	{
		newsId: 2,
		newsTitle: "What Trump could do on day one in the White House",
		newsDescription:
			"The former president has a long list of potential actions he could take to reverse the progress of the Biden administration.",
		newsThumbnail: "1",
		newsReactions: [
			"Political betting markets show **67%** confidence in major policy shifts, with **$5.4M** 24-hour trading volume. Market sentiment indicates **82%** likelihood of executive order changes.",
		],
		newsCreatedAt: 1731806220000,
		newsCategory: [
			"Latest",
			"World",
			"Politics",
			"Election",
			"Policy Analysis",
		],
		newsSource: "Bbc",
		topBettingReply: {
			position: "Long",
			amount: "$8,750",
			comment:
				"Historical patterns suggest strong market movements post-election. Betting on policy implementation timeline.",
		},
	},
	{
		newsId: 3,
		newsTitle: "New prediction market platform launches on mainnet",
		newsDescription:
			"A new prediction market platform has officially launched on the mainnet. It recorded over $100,000 in trading volume on its first day.",
		newsThumbnail: "2",
		newsReactions: [
			"Platform debut achieves **$127,500** first-day volume with **89%** positive feedback. **2,300** active traders and **$1.2M** initial liquidity demonstrate strong market confidence.",
		],
		newsCreatedAt: 1678752000000,
		newsCategory: ["Latest", "Crypto", "DeFi", "Trading", "Technology"],
		newsSource: "Cointelegraph",
		topBettingReply: {
			position: "Long",
			amount: "$3,200",
			comment:
				"New platform shows promise. Taking position on user adoption metrics for Q1.",
		},
	},
];
