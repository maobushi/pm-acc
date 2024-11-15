export const dynamic = "force-dynamic";

import React from "react";
import TimelineHeader from "./Header/TimelineHeader";
import NewsCard from "./NewsCard/NewsCard";
import { NewsWidget } from "@/lib/interface";
import NewsCardDescription from "./NewsCard/NewsCardDescription";

const Headline = async () => {
	try {
		const { demoNewsData: newsObjects } = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/news`,
			{ cache: 'no-store' }
		).then((res) => {
			if (!res.ok) throw new Error(`News API error: ${res.status}`);
			return res.json();
		});

		const { demoMarketsData: marketsData } = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/markets`,
			{ cache: 'no-store' }
		).then((res) => {
			if (!res.ok) throw new Error(`Markets API error: ${res.status}`);
			return res.json();
		});

		return (
			<div>
				<TimelineHeader />
				{newsObjects.map((item: NewsWidget) => (
					<React.Fragment key={item.newsId}>
						<NewsCard newsObject={item} />
						<NewsCardDescription newsObject={item} marketObject={marketsData} />
					</React.Fragment>
				))}
			</div>
			
		);
	} catch (error) {
		console.error('Fetch error:', error);
		return <div>データの読み込みに失敗しました。</div>;
	}
};

export default Headline;
