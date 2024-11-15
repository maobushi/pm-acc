"use client";
import React, { useState } from "react";
import { MarketWidget, NewsWidget } from "@/lib/interface";
import PredictionMarketWidget from "./PredictionMarketWidget";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReactMarkdown from "react-markdown";

const NewsCardDescription = ({
	newsObject,
	marketObject,
}: {
	newsObject: NewsWidget;
	marketObject: MarketWidget[];
}) => {
	const [isOpenMarketInfo, setIsOpenMarketInfo] = useState(false);

	const renderMarkdown = (text: string) => {
		return (
			<ReactMarkdown
				components={{
					strong: ({ children }) => (
						<span className="font-bold text-blue-400">{children}</span>
					),
				}}
			>
				{text}
			</ReactMarkdown>
		);
	};

	return (
		<div className="p-4">
			{!isOpenMarketInfo && (
				<div className="bg-gray-800/50 rounded-xl p-4 mb-4">
					<div className="flex items-center justify-between mb-2">
						<div className="text-gray-200 text-sm">
							{renderMarkdown(newsObject.newsReactions[0])}
						</div>
					</div>
				</div>
			)}
			{isOpenMarketInfo && (
				<div className="flex overflow-x-auto px-4 scrollbar-hide pb-2 mt-4">
					{marketObject.map((item: MarketWidget) => (
						<PredictionMarketWidget key={item.marketId} market={item} />
					))}
				</div>
			)}
			<Button
				onClick={() => setIsOpenMarketInfo(!isOpenMarketInfo)}
				className="w-full bg-gray-800 hover:bg-gray-700 text-gray-200 flex items-center justify-center gap-2"
			>
				{isOpenMarketInfo ? (
					<>
						<ChevronUp className="w-4 h-4" />
						Hide Market Info
					</>
				) : (
					<>
						<ChevronDown className="w-4 h-4" />
						Show Prediction Markets
					</>
				)}
			</Button>
		</div>
	);
};

export default NewsCardDescription;
