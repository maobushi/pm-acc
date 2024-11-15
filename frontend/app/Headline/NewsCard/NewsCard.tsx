"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { NewsWidget } from "@/lib/interface";
import Image from "next/image";
import { getTimeAgo } from "@/lib/getTimeAgo";

interface NewsCardProps {
	newsObject: NewsWidget;
}

const NewsCard = ({ newsObject }: NewsCardProps) => {
	const [baseTime, setBaseTime] = useState(Date.now());
	useEffect(() => {
		setBaseTime(Date.now());
	}, []);
	return (
		<>
			<Card className="bg-gray-900 border-none mb-6 overflow-hidden rounded-lg px-4 pt-2">
				<CardContent className="p-0">
					<Image
						src={`/news/${newsObject.newsThumbnail}.png`}
						alt={newsObject.newsTitle}
						className="w-full h-48 object-cover rounded-lg"
						width={300}
						height={100}
					/>
					<div className="p-1">
						<div className="flex items-center justify-between mb-2">
							<div className="flex items-center space-x-2">
								<Image
									src={`/logo/${newsObject.newsSource}.png`}
									alt={newsObject.newsSource}
									className="h-7"
									width={50}
									height={28}
								/>
							</div>
						</div>
						<h2 className="text-base font-semibold text-white">
							{newsObject.newsTitle}
						</h2>
						<p className="text-sm text-gray-400">
							{getTimeAgo(newsObject.newsCreatedAt, baseTime)}
						</p>
					</div>
				</CardContent>
			</Card>
		</>
	);
};

export default NewsCard;
