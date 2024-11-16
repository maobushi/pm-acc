import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const CreateNewMarket = () => {
	const [newMarketName, setNewMarketName] = useState("");
	const [selectedOracle, setSelectedOracle] = useState("");

	const handleCreateMarket = () => {
		//ここから色々処理かけるよ
		alert("hello")
		
		console.log("Creating new market:", newMarketName, selectedOracle);
	};

	return (
		<div>
			<div className="space-y-4 bg-[#1a2420] p-4 rounded-xl border border-emerald-900/50">
				<div className="flex justify-between items-center">
					<h3 className="text-lg font-medium text-emerald-300">
						Create New Market
					</h3>
				</div>
				<Input
					placeholder="Market Name"
					value={newMarketName}
					onChange={(e) => setNewMarketName(e.target.value)}
					className="w-full bg-[#243430] border-emerald-900 text-lg placeholder:text-emerald-700 focus:ring-emerald-500 focus:border-emerald-500"
				/>

				<Select value={selectedOracle} onValueChange={setSelectedOracle}>
					<SelectTrigger className="w-full bg-[#243430] border-emerald-900 focus:ring-emerald-500 focus:border-emerald-500">
						<SelectValue placeholder="Select Oracle" />
					</SelectTrigger>
					<SelectContent className="bg-[#1a2420] border-emerald-900">
						<SelectItem value="Chainlink">Chainlink</SelectItem>
						<SelectItem value="API3">API3</SelectItem>
						<SelectItem value="Band Protocol">Band Protocol</SelectItem>
					</SelectContent>
				</Select>
				<Button
					onClick={handleCreateMarket}
					className="w-full py-2 text-lg font-medium bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
				>
					Create Market
				</Button>
			</div>
		</div>
	);
};

export default CreateNewMarket;
