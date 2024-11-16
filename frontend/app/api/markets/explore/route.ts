import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
	// URLから検索クエリを取得
	const { searchParams } = new URL(request.url);
	const query = searchParams.get("query");

	// デモデータ（実際のプロダクションではSupabaseクエリを使用）
	const demoData = [
		{ title: "ビットコインは2024年に10万ドルを超えるか？" },
		{ title: "ビットコインのマイニング難易度の上昇傾向" },
		{ title: "ビットコインETFの市場への影響" },
		{ title: "ビットコインのライトニングネットワークの採用率" },
	];

	// クエリがある場合はフィルタリング、ない場合は全データを返す
	// const filteredData = query
	// 	? demoData.filter(item =>
	// 		item.title.toLowerCase().includes(query.toLowerCase())
	// 	  )
	// 	: demoData;

	return NextResponse.json({ data: demoData });
}
