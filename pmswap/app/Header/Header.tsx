import React from "react";

const Header = () => {
	return (
		<div>
			<div className="w-full max-w-2xl space-y-8">
				<div className="space-y-4 text-center mb-8 animate-fade-in">
					<h1 className="text-6xl font-bold tracking-tighter bg-gradient-to-r from-emerald-300 via-green-400 to-emerald-500 bg-clip-text text-transparent transition-all duration-300 hover:scale-105">
						Predict & Swap
					</h1>
					<p className="text-emerald-400/80 text-lg font-light">
						Trade on your beliefs, anytime, anywhere.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Header;
