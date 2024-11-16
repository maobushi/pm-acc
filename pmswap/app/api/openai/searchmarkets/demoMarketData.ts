export type Market = {
	id: number;
	name: string;
	token1: string;
	token2: string;
	odds: number;
	exchange: string;
	oracle: {
		name: string;
		address: string;
		isVerified: boolean;
	};
	creator: {
		name: string;
		address: string;
		isVerified: boolean;
	};
	expiryDate: string;
	isVerified: boolean;
	isRisky: boolean;
	matchScore?: number;
};

export const mockMarkets: Market[] = [
	{
		id: 1,
		name: "Trump Win 2024",
		token1: "USDC",
		token2: "USDC",
		odds: 1.5,
		exchange: "Polymarket",
		oracle: {
			name: "uma",
			address: "0x1234...5678",
			isVerified: true,
		},
		creator: {
			name: "Polymarket Official",
			address: "0x8765...4321",
			isVerified: true,
		},
		expiryDate: "2024-11-05T00:00:00Z",
		isVerified: true,
		isRisky: false,
	},
	{
		id: 2,
		name: "Bitcoin Price $100k",
		token1: "USDC",
		token2: "USDC",
		odds: 2.0,
		exchange: "Kalshi",
		oracle: {
			name: "chainlink",
			address: "0x8765...4321",
			isVerified: true,
		},
		creator: {
			name: "Kalshi Official",
			address: "0x8765...4321",
			isVerified: true,
		},
		expiryDate: "2024-12-31T00:00:00Z",
		isVerified: true,
		isRisky: false,
	},
	{
		id: 3,
		name: "Ethereum Merge Success",
		token1: "USDC",
		token2: "USDC",
		odds: 1.2,
		exchange: "Polymarket",
		oracle: {
			name: "uma",
			address: "0x9876...1234",
			isVerified: false,
		},
		creator: {
			name: "Unknown Creator",
			address: "0x9876...1234",
			isVerified: false,
		},
		expiryDate: "2024-06-30T00:00:00Z",
		isVerified: false,
		isRisky: true,
	},
];
