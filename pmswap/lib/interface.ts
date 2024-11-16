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

export type VectorMarket = {
	id: string;
	name: string;
	description: string;
	markets: { id: number; weight: number; matchScore: number }[];
	totalMatchScore: number;
};

export type MarketPrediction = {
	expiryDate: string;
	recommendedOracle: string;
	confidence: number;
};
