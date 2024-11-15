import { NextResponse } from "next/server";
import { demoMarketsData } from "../demoMarketsData";

export async function GET() {
	return NextResponse.json({ demoMarketsData });
}
