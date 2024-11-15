import { NextResponse } from "next/server";
import { demoMarketsData } from "@/app/api/markets/demoMarketsData";

export async function GET() {
	return NextResponse.json({ demoMarketsData });
}
