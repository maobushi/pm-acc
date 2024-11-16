// import { task } from "hardhat/config";
// import { types } from "hardhat/config";

// // `deployAndVerify`タスクを定義
// task("deployAndVerify", "Deploys and verifies a contract on Etherscan")
//   .addParam("contract", "The contract name to deploy")
//   .addOptionalParam("args", "Constructor arguments (comma separated)", "", types.string)
//   .setAction(async (taskArgs, hre) => {
//     const { contract, args } = taskArgs;

//     // 引数をパース
//     const constructorArgs = args ? args.split(",") : [];

//     // デプロイするためのサイン者を取得
//     const [deployer] = await hre.ethers.getSigners();
//     console.log(`Deploying contract with the account: ${deployer.address}`);

//     // コントラクトファクトリを取得し、デプロイ
//     const ContractFactory = await hre.ethers.getContractFactory(contract);
//     const contractInstance = await ContractFactory.deploy(...constructorArgs);

//     // コントラクトがデプロイされるのを待つ
//     await contractInstance.deployed();
//     console.log(`${contract} deployed to: ${contractInstance.address}`);

//     // Etherscanでコントラクトの検証を実行
//     try {
//       console.log("Verifying contract on Etherscan...");
//       await hre.run("verify:verify", {
//         address: contractInstance.address,
//         constructorArguments: constructorArgs,
//       });
//       console.log(`Verification complete for ${contractInstance.address}`);
//     } catch (error) {
//       console.error("Verification failed:", error);
//     }
//   });
