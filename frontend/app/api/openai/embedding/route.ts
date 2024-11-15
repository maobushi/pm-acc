import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
	const textToEmbed = await req.json();
	console.log(textToEmbed);
	const embedding = await openai.embeddings.create({
		model: "text-embedding-3-small",
		input: textToEmbed,
		encoding_format: "float",
	});

	return NextResponse.json(embedding);
}
