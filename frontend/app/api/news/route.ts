import { NextResponse } from "next/server";
import { demoNewsData } from "@/app/api/news/demoNewsData";

export async function GET() {
	return NextResponse.json({ demoNewsData });
}
