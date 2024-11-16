import OpenAI from "openai";

const openai = new OpenAI({
	baseURL: "https://api.red-pill.ai/v1",
	apiKey: "sk-J9zAgRQb2r3gHW0RmZMf5XBiDwJFo20iJK9Z9jrMLb7jKvkW",
});
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	console.log("request received");
	const res = await request.json();
	const completion = await openai.chat.completions.create({
		model: "gpt-4o",
		messages: [
			{ role: "system", content: res.systemMessage },
			{
				role: "user",
				content: res.userMessage,
			},
		],
	});
	console.log(completion.choices[0].message);
	return NextResponse.json({
		message: completion.choices[0].message,
	});
}