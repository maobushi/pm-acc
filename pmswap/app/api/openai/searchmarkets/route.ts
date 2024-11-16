import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});
import { NextResponse } from "next/server";
import { mockMarkets } from "./demoMarketData";

export async function POST(request: Request) {
	console.log("request received");
	const res = await request.json();
	const completion = await openai.chat.completions.create({
		model: "gpt-4",
		messages: [
			{
				role: "system",
				content: `あなたは予測市場の専門家です。与えられた市場の説明と既存の市場データを比較し、最も類似している市場を特定してください。類似度は0-100のパーセンテージで表してください。結果が高い順番から、50%以上の類似度の市場を返してください。複数ある場合も構いません。存在しなかった場合は空のJSONだけを返してください。結果は以下のJSON形式で返してください。絶対にjson形式以外は返さないでください。:
{
  "matches": [{ "marketId": number,"similarity": number(// 0-100の数値)}]
}`,
			},
			{
				role: "user",
				content: `既存の市場データ:
${JSON.stringify(mockMarkets, null, 2)}

分析対象の市場説明:
${res.userMessage}
これに対する類似度が50%を超えているマーケットをJSON形式で返してください。JSON形式以外では絶対に返さないでください`,
			},
		],
	});
	console.log(completion.choices[0].message);
	return NextResponse.json({
		message: completion.choices[0].message,
	});
}
