import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

interface SearchRequest {
	inputVector: number[];
}

function calculateCosineSimilarity(vec1: number[], vec2: number[]): number {
	if (vec1.length !== vec2.length) {
		throw new Error("ベクトルの次元が一致しません");
	}

	const dotProduct = vec1.reduce((acc, val, i) => acc + val * vec2[i], 0);
	const norm1 = Math.sqrt(vec1.reduce((acc, val) => acc + val * val, 0));
	const norm2 = Math.sqrt(vec2.reduce((acc, val) => acc + val * val, 0));

	return dotProduct / (norm1 * norm2);
}

export async function POST(request: Request) {
	try {
		const { inputVector }: SearchRequest = await request.json();
		console.log("受け取ったinputVector:", inputVector);

		const supabase = createClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
		);

		const { data: markets, error } = await supabase
			.from("Market")
			.select("market_id, market_vector")
			.order("market_vector <-> $1", { ascending: true })
			.limit(1)
			.eq("market_vector", inputVector);

		console.log("Supabaseから取得したデータ:", markets);
		if (error) {
			console.error("Supabaseエラー:", error);
			throw error;
		}

		if (!markets || markets.length === 0) {
			console.log("マッチする市場が見つかりませんでした");
			return NextResponse.json({
				success: true,
				result: {
					marketId: null,
					similarity: 0,
				},
			});
		}

		const similarity = calculateCosineSimilarity(
			inputVector,
			markets[0].market_vector
		);
		console.log("類似度計算結果:", {
			marketId: markets[0].market_id,
			similarity: similarity,
		});

		return NextResponse.json({
			success: true,
			result: {
				marketId: markets[0].market_id,
				similarity: similarity,
			},
		});
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				error:
					error instanceof Error ? error.message : "不明なエラーが発生しました",
			},
			{ status: 500 }
		);
	}
}
