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
	const [newStartTime, setNewStartTime] = useState<number>(0);
	const [newEndTime, setNewEndTime] = useState<number>(0);
	const [selectedOracle, setSelectedOracle] = useState("");
	const [selectedCollateral, setSelectedCollateral] = useState("");

	const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const timestamp = new Date(e.target.value).getTime() / 1000; // Get Unix timestamp in seconds
		setNewStartTime(timestamp);
	};

	const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const timestamp = new Date(e.target.value).getTime() / 1000; // Get Unix timestamp in seconds
		setNewEndTime(timestamp);
	};

	const handleCreateMarket = async () => {
		if (!newMarketName || !selectedOracle || !selectedCollateral || !newStartTime || !newEndTime) {
			alert("Please fill in all the fields!");
			return;
		  }
		  const marketData = {
			name: newMarketName,
			startTime: newStartTime,
			endTime: newEndTime,
			oracle: selectedOracle,
			collateral: selectedCollateral,
		  };
		  try {
			// POSTリクエストを送信
			const response = await fetch("api/transaction/createMarket", {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
			  },
			  body: JSON.stringify(marketData),
			});
	  
			const result = await response.json();
			if (result.success) {
			  alert("Market created successfully!");
			} else {
			  alert("Failed to create market: " + result.message);
			}
		  } catch (error) {
			console.error("Error creating market:", error);
			alert("Error creating market");
		  }
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
						<SelectItem value="WorldID">WorldID</SelectItem>
					</SelectContent>
				</Select>

				<Select value={selectedCollateral} onValueChange={setSelectedCollateral}>
					<SelectTrigger className="w-full bg-[#243430] border-emerald-900 focus:ring-emerald-500 focus:border-emerald-500">
						<SelectValue placeholder="Select Collateral" />
					</SelectTrigger>
					<SelectContent className="bg-[#1a2420] border-emerald-900">
						<SelectItem value="0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238">USDC</SelectItem>
						<SelectItem value="0x3e622317f8C93f7328350cF0B56d9eD4C620C5d6">DAI</SelectItem>
					</SelectContent>
				</Select>

				<div className="grid grid-cols-2 gap-4">
					<Input
						type="datetime-local"
						placeholder="Start Time"
						onChange={handleStartTimeChange}
						className="w-full bg-[#243430] border-emerald-900 text-lg placeholder:text-emerald-700 focus:ring-emerald-500 focus:border-emerald-500"
					/>
					<Input
						type="datetime-local"
						placeholder="End Time"
						onChange={handleEndTimeChange}
						className="w-full bg-[#243430] border-emerald-900 text-lg placeholder:text-emerald-700 focus:ring-emerald-500 focus:border-emerald-500"
					/>
				</div>

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
