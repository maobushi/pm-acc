"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Progress } from "@/components/ui/progress";

interface Step {
	title: string;
	description: string;
}

interface Suggestion {
	title: string;
}

const steps: Step[] = [
	{ title: "基本情報", description: "マーケットのタイトルと説明を入力" },
	{ title: "オプション設定", description: "予測オプションの設定" },
	{ title: "確認", description: "最終確認と作成" },
];

export const MarketCreationModal = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

	const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);

		try {
			// OpenAIのエンベディングAPIを呼び出し
			const response = await fetch("/api/openai/embedding", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(e.target.value),
			});

			const embeddingData = await response.json();
			console.log("タイトルのエンベディング:", embeddingData);

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

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="rounded-xl bg-gray-900 p-6 max-w-2xl w-full mx-auto"
		>
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<h2 className="text-2xl font-bold text-white">新規マーケット作成</h2>
					<div className="text-sm text-gray-400">
						Step {currentStep + 1} / {steps.length}
					</div>
				</div>

				<Progress value={((currentStep + 1) / steps.length) * 100} />

				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-200 mb-2">
							マーケットタイトル
						</label>
						<input
							type="text"
							value={title}
							onChange={handleTitleChange}
							className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
							placeholder="例: Will BTC reach $100k by 2024?"
						/>
					</div>

					{suggestions.length > 0 && (
						<div className="bg-gray-800 rounded-lg p-4">
							<h3 className="text-sm font-medium text-gray-300 mb-2">
								類似のマーケット
							</h3>
							<ul className="space-y-2">
								{suggestions.map((suggestion, index) => (
									<li key={index} className="text-sm text-gray-400">
										{suggestion.title}
									</li>
								))}
							</ul>
						</div>
					)}

					<div>
						<label className="block text-sm font-medium text-gray-200 mb-2">
							説明
						</label>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white h-32"
							placeholder="マーケットの詳細な説明を入力してください"
						/>
					</div>
				</div>

				<div className="flex justify-end space-x-3">
					{currentStep > 0 && (
						<button
							onClick={() => setCurrentStep((prev) => prev - 1)}
							className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
						>
							戻る
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
						{currentStep === steps.length - 1 ? "作成" : "次へ"}
					</button>
				</div>
			</div>
		</motion.div>
	);
};

// モックAPI関数
const fetchSuggestions = async (query: string): Promise<Suggestion[]> => {
	// 実際のAPIコールをここに実装
	console.log(`Fetching suggestions for: ${query}`);
	return [{ title: "Similar market 1" }, { title: "Similar market 2" }];
};
