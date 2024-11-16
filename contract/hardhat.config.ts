import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.27",
	defaultNetwork: "hardhat",
	gasReporter: {
		currency: 'USD', // 任意: ガスのコストを表示する通貨
	},
	networks: {
		hardhat: {
			blockGasLimit: 10000000,
		},
		sepolia: {
			url: `${process.env.ETH_TEST || ""}`,
			accounts: [`0x${process.env.ACCOUNT_SEACRET || ""}`],
		},
		amoy: {
			url: `${process.env.POLYGON_TEST || ""}`,
			accounts: [`0x${process.env.ACCOUNT_SEACRET || ""}`],
		},
	},
	etherscan: {
		// apiKey: process.env.ETHERSCAN || "",
		// apiKey: process.env.POLYGONSCAN || "",
		apiKey: {
			'sepolia': 'empty'
		},
		customChains: [
            {
                network: "sepolia",
                chainId: 11155111, // SepoliaのチェーンID
                urls: {
					apiURL: "https://eth-sepolia.blockscout.com/api",
					browserURL: "https://eth-sepolia.blockscout.com"
                }
            }
        ]
	},
	sourcify: {
		enabled: false,
	},
};

export default config;
