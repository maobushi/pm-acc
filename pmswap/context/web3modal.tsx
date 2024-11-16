// context/AppKit.tsx

"use client";

import { createAppKit } from "@reown/appkit/react";
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";
import { mainnet, arbitrum } from "@reown/appkit/networks";

// 1. Get projectId at https://cloud.reown.com
const projectId = "a3c9499fee406fcfa99ebde334045f68";

// 2. Create a metadata object
const metadata = {
	name: "EthGlobalBkk24",
	description: "AppKit Example",
	url: "https://reown.com/appkit", // origin must match your domain & subdomain
	icons: ["https://assets.reown.com/reown-profile-pic.png"],
};

// 3. Create the AppKit instance
createAppKit({
	adapters: [new Ethers5Adapter()],
	metadata,
	networks: [mainnet, arbitrum],
	projectId,
	features: {
		analytics: true, // Optional - defaults to your Cloud configuration
	},
});

export function AppKit({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
