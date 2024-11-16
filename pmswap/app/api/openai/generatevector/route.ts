import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
	const res = await request.json();
	const completion = await openai.chat.completions.create({
		model: "gpt-4",
		messages: [
			{
				role: "system",
				content: `あなたは予測市場の専門家です。複数の関連する市場をまとめて、最適な重み付けを持つVector Market（バンドル）を生成してください。結果は以下のJSON形式で返してください：
{
  "vectorMarket": {
    "id": string,
    "name": string,
    "description": string,
    "markets": [
      {
        "id": number,
        "weight": number,  // 0-1の数値（合計が1になるように）
        "matchScore": number  // 0-100の数値
      }
    ],
    "totalMatchScore": number  // 0-100の数値
  }
}`,
			},
			{
				role: "user",
				content: `選択された市場データ:
${JSON.stringify(res.selectedMarkets, null, 2)}

ユーザーの入力:
${res.userMessage}`,
			},
		],
	});

	return NextResponse.json({
		message: completion.choices[0].message,
	});
}
