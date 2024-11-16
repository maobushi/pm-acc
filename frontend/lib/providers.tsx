"use client";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<DynamicContextProvider
			theme="auto"
			settings={{
				environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID!,
				walletConnectors: [EthereumWalletConnectors],
			}}
		>
			{children}
		</DynamicContextProvider>
	);
}
