"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Progress } from "@/components/ui/progress";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface Step {
	title: string;
	description: string;
}

interface Suggestion {
	title: string;
}

interface Oracle {
	id: string;
	name: string;
	icon: keyof typeof Icons;
}

const steps: Step[] = [
	{ title: "Basic Info", description: "Enter market title and description" },
	{ title: "Options", description: "Set prediction options" },
	{ title: "Review", description: "Final review and creation" },
];

// 利用可能なオラクルの定義を追加
const oracles: Oracle[] = [
	{ id: "binance", name: "Binance", icon: "binance" },
	{ id: "coinbase", name: "Coinbase", icon: "coinbase" },
	{ id: "chainlink", name: "Chainlink", icon: "chainlink" },
];

export const MarketCreationModal = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
	const [selectedOracle, setSelectedOracle] = useState<string>(oracles[0].id);
	const [matchRate, setMatchRate] = useState<number>(0);

	const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);

		try {
			const fetchSupabaseDB = async () => {
				const response = await fetch("/api/markets/explore");
				const data = await response.json();
				console.log("Supabase DB:", data);
			};
			fetchSupabaseDB();
			// OpenAIのエンベディングAPIを呼び出し
			// const response = await fetch("/api/openai/embedding", {
			// 	method: "POST",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// 	body: JSON.stringify(e.target.value),
			// });

			// const embeddingData = await response.json();
			// console.log("タイトルのエンベディング:", embeddingData);

			// 既存の類似マーケット取得処理
			const mockSuggestions = await fetchSuggestions(e.target.value);
			setSuggestions(mockSuggestions);
		} catch (error) {
			console.error("エンベディングの取得に失敗:", error);
		}
	};

	const handleCreate = () => {
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 },
		});
	};

	const renderStepContent = () => {
		switch (currentStep) {
			case 0:
				return (
					<div className="space-y-4">
						{renderMainInput()}
						{renderSuggestions()}
					</div>
				);
			case 1:
				return (
					<div className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-200 mb-2">
								詳細説明
							</label>
							<textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className="w-full px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white h-32"
								placeholder="マーケットの詳細な説明を入力してください"
							/>
						</div>
					</div>
				);
			// ... 他のステップも同様に実装 ...
		}
	};

	// メインの入力エリアを更新
	const renderMainInput = () => (
		<div className="flex items-center gap-2 p-4 bg-gray-800/50 rounded-lg">
			<input
				type="text"
				value={title}
				onChange={handleTitleChange}
				className="flex-1 bg-transparent border-none focus:ring-0 text-white"
				placeholder="マーケットを検索または作成"
			/>
			<Select value={selectedOracle} onValueChange={setSelectedOracle}>
				<SelectTrigger className="w-[180px]">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{oracles.map((oracle) => (
						<SelectItem key={oracle.id} value={oracle.id}>
							<div className="flex items-center gap-2">
								<Icons[oracle.icon] className="w-4 h-4" />
								<span>{oracle.name}</span>
							</div>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);

	// サジェスチョン表示部分を更新
	const renderSuggestions = () => (
		<div className="mt-4">
			{matchRate < 70 ? (
				<div className="p-4 bg-gray-800/50 rounded-lg">
					<h3 className="text-sm font-medium text-gray-300 mb-3">
						新しいマーケットを作成
					</h3>
					<Button
						onClick={() => setCurrentStep(1)}
						className="w-full justify-start text-left"
					>
						{title || "マーケットタイトルを入力してください"}
					</Button>
				</div>
			) : (
				<div className="space-y-2">
					{suggestions.map((suggestion, index) => (
						<div
							key={index}
							className="p-4 bg-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-700/50"
						>
							{suggestion.title}
						</div>
					))}
				</div>
			)}
		</div>
	);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="rounded-xl bg-gray-900/90 backdrop-blur-md p-6 max-w-2xl w-full mx-auto border border-gray-800"
		>
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<h2 className="text-2xl font-bold text-white">Create New Market</h2>
					<div className="text-sm text-gray-400">
						Step {currentStep + 1} / {steps.length}
					</div>
				</div>

				<Progress value={((currentStep + 1) / steps.length) * 100} />

				<AnimatePresence mode="wait">
					<motion.div
						key={currentStep}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						className="space-y-6"
					>
						{renderStepContent()}
					</motion.div>
				</AnimatePresence>

				<div className="flex justify-end space-x-3">
					{currentStep > 0 && (
						<button
							onClick={() => setCurrentStep((prev) => prev - 1)}
							className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
						>
							Back
						</button>
					)}
					<button
						onClick={() => {
							if (currentStep === steps.length - 1) {
								handleCreate();
							} else {
								setCurrentStep((prev) => prev + 1);
							}
						}}
						className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
					>
						{currentStep === steps.length - 1 ? "Create" : "Next"}
					</button>
				</div>
			</div>
		</motion.div>
	);
};

// モックAPIの更新
const fetchSuggestions = async (query: string): Promise<Suggestion[]> => {
	await new Promise(resolve => setTimeout(resolve, 500)); // 遅延を追加してローディング効果を確認
	return [
		{ title: "BTCは2024年末までに8万ドルを超える？" },
		{ title: "BTCは2024年Q2に7万ドルを達成する？" },
		{ title: "2024年にBTCは史上最高値を更新する？" },
		{ title: "2024年のBTC最安値は3万ドルを下回る？" }
	];
};
