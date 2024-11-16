"use client";

import * as React from "react";
import {
	Search,
	TrendingUp,
	Zap,
	Newspaper,
	Trophy,
	Film,
	Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabContent } from "./components/TabContent";
import { MarketCreationModal } from "./MarketCreationModal/MarketCreationModal";
import { SuggestionList } from "./components/SuggestionList";

interface TabItem {
	id: string;
	label: string;
	icon: React.ElementType;
	content: {
		title: string;
		subtitle?: string;
		posts?: number;
		category?: string;
		image?: string;
	}[];
}

interface Suggestion {
	title: string;
}

const fetchSuggestions = async (query: string): Promise<Suggestion[]> => {
	try {
		const response = await fetch(`/api/markets/explore?query=${query}`);
		const { data } = await response.json();

		// クエリに基づいてフィルタリング
		return data;
	} catch (error) {
		console.error("検索候補の取得に失敗:", error);
		return [];
	}
};

export default function ExplorePage() {
	const [activeTabId, setActiveTabId] = React.useState(defaultTabs[0].id);
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [searchQuery, setSearchQuery] = React.useState("");
	const [searchSuggestions, setSearchSuggestions] = React.useState<
		Suggestion[]
	>([]);

	const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchQuery(value);

		if (value.length > 2) {
			try {
				// URLエンコードしてAPIに送信
				const encodedQuery = encodeURIComponent(value);
				const suggestions = await fetchSuggestions(encodedQuery);
				setSearchSuggestions(suggestions);
			} catch (error) {
				console.error("検索候補の取得に失敗:", error);
				setSearchSuggestions([]);
			}
		} else {
			setSearchSuggestions([]);
		}
	};

	return (
		<div className="flex flex-col h-full bg-gray-900 text-gray-100">
			<div className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800 shadow-lg">
				<div className="flex items-center p-4">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
						<Input
							className="w-full pl-10 pr-4 py-2 bg-gray-800 text-gray-100 border-gray-700 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							placeholder="Explore Markets"
							type="search"
							value={searchQuery}
							onChange={handleSearch}
						/>
						{searchQuery.length > 2 && (
							<div className="absolute w-full mt-2">
								<SuggestionList suggestions={searchSuggestions} />
							</div>
						)}
					</div>
				</div>
				<div className="flex overflow-x-auto scrollbar-hide">
					{defaultTabs.map((tab) => (
						<Button
							key={tab.id}
							variant="ghost"
							className={cn(
								"flex-1 px-6 py-3 rounded-none text-gray-400 transition-all duration-200",
								activeTabId === tab.id &&
									"text-blue-500 border-b-2 border-blue-500"
							)}
							onClick={() => setActiveTabId(tab.id)}
						>
							<tab.icon className="h-5 w-5 mr-2" />
							{tab.label}
						</Button>
					))}
				</div>
			</div>
			<div className="flex-1 overflow-hidden">
				{defaultTabs.map(
					(tab) =>
						activeTabId === tab.id && (
							<TabContent key={tab.id} content={tab.content} />
						)
				)}
			</div>
			<button
				onClick={() => setIsModalOpen(true)}
				className="fixed bottom-20 right-2 p-4 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg transition-all duration-200 z-20"
			>
				<Plus className="h-6 w-6 text-white" />
			</button>

			{/* スライドアップモーダル */}
			{isModalOpen && (
				<div className="fixed inset-0 z-50">
					<div
						className="absolute inset-0 bg-black bg-opacity-50"
						onClick={() => setIsModalOpen(false)}
					/>
					<div
						className="absolute inset-x-0 bottom-0 bg-gray-900 rounded-t-xl transform transition-transform duration-300 ease-out"
						style={{
							maxHeight: "90vh",
							overflowY: "auto",
						}}
					>
						<div className="p-6">
							<MarketCreationModal />
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
const defaultTabs: TabItem[] = [
	{
		id: "for-you",
		label: "For You",
		icon: Zap,
		content: [
			{
				title: "SpaceX successfully launches Starship",
				category: "Space",
				posts: 52890,
				image: "/news/3.png",
			},
			{
				title: "New AI breakthrough in natural language processing",
				category: "Technology",
				posts: 32150,
			},
			{
				title: "Global climate summit reaches landmark agreement",
				category: "Environment",
				posts: 45670,
			},
		],
	},
	{
		id: "trending",
		label: "Trending",
		icon: TrendingUp,
		content: [
			{
				title: "Viral dance challenge takes over social media",
				subtitle: "Millions participate in the latest TikTok trend",
				posts: 128500,
				image: "/placeholder.svg?height=400&width=600",
			},
			{
				title: "Cryptocurrency market sees major fluctuations",
				category: "Finance",
				posts: 76300,
			},
			{
				title: "New superhero movie breaks box office records",
				category: "Entertainment",
				posts: 92400,
			},
		],
	},
	{
		id: "news",
		label: "News",
		icon: Newspaper,
		content: [
			{
				title: "Major political reforms announced in key election",
				category: "Politics",
				posts: 67800,
			},
			{
				title: "Breakthrough in renewable energy technology",
				subtitle: "Scientists develop highly efficient solar panels",
				posts: 54200,
				image: "/placeholder.svg?height=400&width=600",
			},
			{
				title: "Global health organization declares end of pandemic",
				category: "Health",
				posts: 88900,
			},
		],
	},
	{
		id: "sports",
		label: "Sports",
		icon: Trophy,
		content: [
			{
				title: "Underdog team wins championship in thrilling finale",
				category: "Basketball",
				posts: 103700,
				image: "/placeholder.svg?height=400&width=600",
			},
			{
				title: "Star athlete announces retirement after record-breaking career",
				category: "Tennis",
				posts: 79200,
			},
			{
				title: "New sports league launches with innovative rules",
				subtitle: "Fans excited about the future of competitive gaming",
				posts: 61500,
			},
		],
	},
	{
		id: "entertainment",
		label: "Entertainment",
		icon: Film,
		content: [
			{
				title: "Surprise album drop by top artist breaks streaming records",
				category: "Music",
				posts: 145300,
				image: "/placeholder.svg?height=400&width=600",
			},
			{
				title: "Acclaimed director announces trilogy of sci-fi epics",
				category: "Movies",
				posts: 98700,
			},
			{
				title: "Reality TV show controversy sparks social media debate",
				subtitle: "Viewers divided over contestants' behavior",
				posts: 112600,
			},
		],
	},
];
