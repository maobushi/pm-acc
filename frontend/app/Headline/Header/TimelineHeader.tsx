"use client";
import React, { useState } from "react";

const categories = [
	"Latest",
	"U.S.",
	"World",
	"Business",
	"Technology",
	"Entertainment",
	"Sports",
	"Science",
	"Health",
];

const TimelineHeader = () => {
	const [selectedCategory, setSelectedCategory] = useState("Latest");

	return (
		<div className="w-full border-b border-gray-700 bg-gray-900">
			<div className="flex overflow-x-auto whitespace-nowrap py-2 px-4 [&::-webkit-scrollbar]:hidden">
				{categories.map((category, index) => (
					<button
						onClick={() => setSelectedCategory(category)}
						key={index}
						className={`px-4 py-2 mr-2 transition-colors duration-200 font-semibold ${
							category === selectedCategory
								? "text-blue-400"
								: "text-gray-300 hover:text-blue-400"
						}`}
					>
						{category}
					</button>
				))}
			</div>
		</div>
	);
};

export default TimelineHeader;
