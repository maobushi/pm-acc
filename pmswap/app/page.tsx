import React from "react";
import Header from "@/app/Header/Header";
import SwapWidget from "@/app/SwapWidget/SwapWidget";

export default function Home() {
	return (
		<>
			<div className="min-h-screen bg-gradient-to-b from-[#0a0f0d] to-[#0d1410] text-white flex flex-col items-center justify-center p-4 font-bold">
				<Header />
				<SwapWidget />
				{/* <PredictionSwap /> */}
			</div>
		</>
	);
}
