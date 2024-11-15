export interface PredictionMarket {
	marketId: number;
	marketTitle: string;
	marketDescription: string;
	marketThumbnail: string;
	marketCreatedAt: number;
	marketEndTime: number;
	marketStatus: string;
	marketMarketCap: number;
	marketParticipants: number;
	marketYesPrice: number;
	marketNoPrice: number;
	marketNftHolderAddress: string[];
	marketOracleAddress: string[];
	marketOption: PredictionMarketOption[];
}
export interface PredictionMarketOption {
	optionId: number;
	optionAddress: string;
	optionTitle: string;
	optionYesPrice: number;
	optionNoPrice: number;
	optionMarketCap: number;
	optionParticipants: number;
	optionPriceHistory: {
		timestamp: number;
		yesPrice: number;
		noPrice: number;
	}[];
}

// Market Interface
export interface MarketWidget {
	newsId: number;
	marketId: number;
	marketName: string;
	marketPrice: number;
	marketChange24h: number;
	marketVolume: number;
	marketParticipants: number;
	marketStatus: string;
	marketCreators: string[];
	marketOracle: string[];
	marketCategory: string[];
}

export interface NewsWidget {
	newsId: number;
	newsTitle: string;
	newsDescription: string;
	newsReactions: string[];
	newsThumbnail: string;
	newsCreatedAt: number;
	newsCategory: string[];
	newsSource: string;
	topBettingReply: {
		position: string;
		amount: string;
		comment: string;
	};
}
