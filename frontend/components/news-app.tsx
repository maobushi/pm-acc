// "use client";

// import { useState, useRef } from "react";
// import {
// 	SearchIcon,
// 	Home,
// 	Users,
// 	User,
// 	ChevronRight,
// 	ArrowRight,
// } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import React from "react";
// const categories = [
// 	"Latest",
// 	"U.S.",
// 	"World",
// 	"Business",
// 	"Technology",
// 	"Entertainment",
// 	"Sports",
// 	"Science",
// 	"Health",
// ];

// const newsItems = [
// 	{
// 		id: 1,
// 		source: "AP",
// 		sourceName: "The Associated Press",
// 		sourceIcon: "/placeholder.svg?height=20&width=20",
// 		title:
// 			"Judge delays ruling on whether to scrap Trump's conviction in hush money case",
// 		time: "2 hours ago",
// 		image:
// 			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-11-14%20at%2014.29.54-Z5txi7sz7YvqiPnWyz3xRPVIaMy3PJ.png",
// 		predictionMarkets: [
// 			{
// 				id: "pm1",
// 				question: "Will Trump's conviction be scrapped?",
// 				yesPrice: 0.65,
// 				noPrice: 0.35,
// 				yesMarketCap: 65000,
// 				noMarketCap: 35000,
// 				status: "Active",
// 				participants: 1200,
// 				change24h: 5.2,
// 			},
// 			{
// 				id: "pm2",
// 				question: "Will the case be dismissed?",
// 				yesPrice: 0.3,
// 				noPrice: 0.7,
// 				yesMarketCap: 30000,
// 				noMarketCap: 70000,
// 				status: "Closing Soon",
// 				participants: 800,
// 				change24h: -2.1,
// 			},
// 		],
// 	},
// 	{
// 		id: 2,
// 		source: "Reuters",
// 		sourceName: "Reuters",
// 		sourceIcon: "/placeholder.svg?height=20&width=20",
// 		title: "Global markets rally as inflation fears ease",
// 		time: "1 hour ago",
// 		image: "/placeholder.svg?height=200&width=400",
// 		predictionMarkets: [
// 			{
// 				id: "pm3",
// 				question: "Will S&P 500 reach all-time high this month?",
// 				yesPrice: 0.55,
// 				noPrice: 0.45,
// 				yesMarketCap: 55000,
// 				noMarketCap: 45000,
// 				status: "Active",
// 				participants: 2500,
// 				change24h: 3.7,
// 			},
// 			{
// 				id: "pm4",
// 				question: "Will Fed pause rate hikes in next meeting?",
// 				yesPrice: 0.7,
// 				noPrice: 0.3,
// 				yesMarketCap: 70000,
// 				noMarketCap: 30000,
// 				status: "Active",
// 				participants: 1800,
// 				change24h: 1.5,
// 			},
// 		],
// 	},
// 	{
// 		id: 3,
// 		source: "BBC",
// 		sourceName: "BBC News",
// 		sourceIcon: "/placeholder.svg?height=20&width=20",
// 		title: "Breakthrough in renewable energy storage announced",
// 		time: "3 hours ago",
// 		image: "/placeholder.svg?height=200&width=400",
// 		predictionMarkets: [
// 			{
// 				id: "pm5",
// 				question: "Will this technology be commercially viable by 2025?",
// 				yesPrice: 0.4,
// 				noPrice: 0.6,
// 				yesMarketCap: 40000,
// 				noMarketCap: 60000,
// 				status: "Active",
// 				participants: 1000,
// 				change24h: 8.3,
// 			},
// 			{
// 				id: "pm6",
// 				question:
// 					"Will this lead to >10% drop in fossil fuel use within 5 years?",
// 				yesPrice: 0.25,
// 				noPrice: 0.75,
// 				yesMarketCap: 25000,
// 				noMarketCap: 75000,
// 				status: "Active",
// 				participants: 1500,
// 				change24h: -1.8,
// 			},
// 		],
// 	},
// 	{
// 		id: 4,
// 		source: "NYT",
// 		sourceName: "The New York Times",
// 		sourceIcon: "/placeholder.svg?height=20&width=20",
// 		title:
// 			"Major tech company announces significant layoffs amid AI integration",
// 		time: "5 hours ago",
// 		image: "/placeholder.svg?height=200&width=400",
// 		predictionMarkets: [
// 			{
// 				id: "pm7",
// 				question: "Will the company's stock price recover within 3 months?",
// 				yesPrice: 0.6,
// 				noPrice: 0.4,
// 				yesMarketCap: 60000,
// 				noMarketCap: 40000,
// 				status: "Active",
// 				participants: 3000,
// 				change24h: -5.5,
// 			},
// 			{
// 				id: "pm8",
// 				question:
// 					"Will other major tech companies follow with similar layoffs?",
// 				yesPrice: 0.75,
// 				noPrice: 0.25,
// 				yesMarketCap: 75000,
// 				noMarketCap: 25000,
// 				status: "Active",
// 				participants: 2200,
// 				change24h: 2.3,
// 			},
// 		],
// 	},
// 	{
// 		id: 5,
// 		source: "ESPN",
// 		sourceName: "ESPN",
// 		sourceIcon: "/placeholder.svg?height=20&width=20",
// 		title: "Underdog team makes stunning comeback in championship game",
// 		time: "30 minutes ago",
// 		image: "/placeholder.svg?height=200&width=400",
// 		predictionMarkets: [
// 			{
// 				id: "pm9",
// 				question: "Will this team win the next game?",
// 				yesPrice: 0.55,
// 				noPrice: 0.45,
// 				yesMarketCap: 55000,
// 				noMarketCap: 45000,
// 				status: "Active",
// 				participants: 5000,
// 				change24h: 15.2,
// 			},
// 			{
// 				id: "pm10",
// 				question: "Will the MVP be from this team?",
// 				yesPrice: 0.65,
// 				noPrice: 0.35,
// 				yesMarketCap: 65000,
// 				noMarketCap: 35000,
// 				status: "Active",
// 				participants: 3500,
// 				change24h: 7.8,
// 			},
// 		],
// 	},
// ];

// function PredictionMarketWidget({ market }) {
// 	return (
// 		<div className="bg-gray-800 p-4 rounded-lg mr-4 min-w-[280px] flex flex-col justify-between">
// 			<div>
// 				<p className="text-sm text-white mb-3 font-medium">{market.question}</p>
// 				<div className="flex justify-between items-center mb-3">
// 					<Button size="sm" className="bg-green-500 hover:bg-green-600 w-[48%]">
// 						Yes ${market.yesPrice.toFixed(2)}
// 					</Button>
// 					<Button size="sm" className="bg-red-500 hover:bg-red-600 w-[48%]">
// 						No ${market.noPrice.toFixed(2)}
// 					</Button>
// 				</div>
// 			</div>
// 			<div className="text-xs text-gray-300 space-y-1">
// 				<div className="flex justify-between">
// 					<span>Yes Cap: ${market.yesMarketCap.toLocaleString()}</span>
// 					<span>No Cap: ${market.noMarketCap.toLocaleString()}</span>
// 				</div>
// 				<div className="flex justify-between items-center">
// 					<Badge
// 						variant={market.status === "Active" ? "default" : "secondary"}
// 						className="text-xs"
// 					>
// 						{market.status}
// 					</Badge>
// 					<span>{market.participants.toLocaleString()} participants</span>
// 				</div>
// 				<div
// 					className={`text-right ${
// 						market.change24h >= 0 ? "text-green-400" : "text-red-400"
// 					}`}
// 				>
// 					24h: {market.change24h > 0 ? "+" : ""}
// 					{market.change24h.toFixed(1)}%
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// function NewsCard({ item, onSearch }) {
// 	const scrollRef = useRef(null);

// 	const handleScroll = () => {
// 		if (scrollRef.current) {
// 			const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
// 			const scrollEnd = scrollWidth - clientWidth;
// 			if (scrollLeft >= scrollEnd - 10) {
// 				scrollRef.current.querySelector(".search-button").style.opacity = "1";
// 			} else {
// 				scrollRef.current.querySelector(".search-button").style.opacity = "0";
// 			}
// 		}
// 	};

// 	return (
// 		<Card className="bg-gray-900 border-none mb-6 overflow-hidden">
// 			<CardContent className="p-0">
// 				<img
// 					src={item.image}
// 					alt={item.title}
// 					className="w-full h-48 object-cover"
// 				/>
// 				<div className="p-4">
// 					<div className="flex items-center justify-between mb-2">
// 						<div className="flex items-center space-x-2">
// 							<img
// 								src={item.sourceIcon}
// 								alt={item.source}
// 								className="w-5 h-5"
// 							/>
// 							<span className="text-xs font-bold bg-red-600 px-1 py-0.5 rounded">
// 								{item.source}
// 							</span>
// 							<span className="text-xs text-white">{item.sourceName}</span>
// 						</div>
// 					</div>
// 					<h2 className="text-base font-semibold mb-2 text-white">
// 						{item.title}
// 					</h2>
// 					<p className="text-xs text-gray-400">{item.time}</p>
// 				</div>
// 				<div className="relative">
// 					<ScrollArea
// 						className="w-full"
// 						onScroll={handleScroll}
// 						ref={scrollRef}
// 					>
// 						<div className="flex p-4 w-max">
// 							{item.predictionMarkets.map((market) => (
// 								<PredictionMarketWidget key={market.id} market={market} />
// 							))}
// 							<Button
// 								className="search-button ml-4 bg-blue-500 hover:bg-blue-600 opacity-0 transition-opacity duration-300"
// 								onClick={() => onSearch(item.title)}
// 							>
// 								<SearchIcon className="w-4 h-4 mr-2" />
// 								Search
// 							</Button>
// 						</div>
// 						<ScrollBar orientation="horizontal" />
// 					</ScrollArea>
// 				</div>
// 			</CardContent>
// 		</Card>
// 	);
// }

// function HeadlinesScreen({ onSearch }) {
// 	return (
// 		<ScrollArea className="flex-grow h-[calc(100vh-8rem)]">
// 			<div className="p-4">
// 				<ScrollArea className="w-full whitespace-nowrap mb-4">
// 					<div className="flex space-x-4">
// 						{categories.map((category, index) => (
// 							<Button
// 								key={category}
// 								variant={index === 0 ? "default" : "ghost"}
// 								className="px-4 py-2 text-sm text-white"
// 							>
// 								{category}
// 							</Button>
// 						))}
// 					</div>
// 					<ScrollBar orientation="horizontal" />
// 				</ScrollArea>
// 				{newsItems.map((item) => (
// 					<NewsCard key={item.id} item={item} onSearch={onSearch} />
// 				))}
// 			</div>
// 		</ScrollArea>
// 	);
// }

// function SearchScreen({ searchQuery }) {
// 	return (
// 		<ScrollArea className="flex-grow">
// 			<div className="p-4">
// 				<Input
// 					type="search"
// 					placeholder="Search news..."
// 					className="mb-4"
// 					defaultValue={searchQuery}
// 				/>
// 				<p className="text-white">
// 					Search results for "{searchQuery}" will appear here.
// 				</p>
// 			</div>
// 		</ScrollArea>
// 	);
// }

// function FollowingScreen() {
// 	return (
// 		<ScrollArea className="flex-grow">
// 			<div className="p-4">
// 				<h2 className="text-xl font-semibold mb-4 text-white">Following</h2>
// 				<p className="text-white">
// 					Your followed topics and sources will appear here.
// 				</p>
// 			</div>
// 		</ScrollArea>
// 	);
// }

// function MyPageScreen() {
// 	return (
// 		<ScrollArea className="flex-grow">
// 			<div className="p-4">
// 				<h2 className="text-xl font-semibold mb-4 text-white">My Page</h2>
// 				<div className="flex items-center space-x-4 mb-4">
// 					<Avatar className="w-16 h-16">
// 						<AvatarImage src="/placeholder.svg?height=64&width=64" />
// 						<AvatarFallback>CN</AvatarFallback>
// 					</Avatar>
// 					<div>
// 						<p className="text-white font-semibold">User Name</p>
// 						<p className="text-gray-400">user@example.com</p>
// 					</div>
// 				</div>
// 				<Button className="w-full mb-2">Edit Profile</Button>
// 				<Button className="w-full" variant="outline">
// 					Settings
// 				</Button>
// 			</div>
// 		</ScrollArea>
// 	);
// }

// export function NewsApp() {
// 	const [activeScreen, setActiveScreen] = useState("Headlines");
// 	const [searchQuery, setSearchQuery] = useState("");

// 	const handleSearch = (query) => {
// 		setSearchQuery(query);
// 		setActiveScreen("Search");
// 	};

// 	return (
// 		<div className="flex flex-col h-screen bg-black text-white">
// 			<main className="flex-grow">
// 				{activeScreen === "Headlines" && (
// 					<HeadlinesScreen onSearch={handleSearch} />
// 				)}
// 				{activeScreen === "Search" && (
// 					<SearchScreen searchQuery={searchQuery} />
// 				)}
// 				{activeScreen === "Following" && <FollowingScreen />}
// 				{activeScreen === "Mypage" && <MyPageScreen />}
// 			</main>
// 		</div>
// 	);
// }
