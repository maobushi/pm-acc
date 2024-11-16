import { ethers } from "hardhat";
import ABI from "../artifacts/contracts/PredictionMarket/PMT.sol/PMT.json"

// コントラクトのABI
const contractABI = ABI.abi

async function main() {
  // コントラクトのデプロイ先アドレス
  const contractAddress = "0xb0fb162939445C7f5bE947Bf91C777E4cB5A96ae"; // デプロイしたコントラクトのアドレスを指定
  const usdc = "0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582";
  // amoyネットワークのウォレット情報
  const [owner] = await ethers.getSigners();
  console.log("Connected with:", owner.address);

  // コントラクトインスタンスを作成
  const contract = new ethers.Contract(contractAddress, contractABI, owner);
  console.log(await contract.getAllData());
//   await contract.addInitLiqidity(10);
  console.log(await contract.getBalanceOfCollateralPool());



  // setQuestion関数を呼び出して質問を設定
//   const tx = await contract.setQuestion();
//   console.log("Transaction hash:", tx.hash);

//   // トランザクションが完了するのを待つ
//   await tx.wait();
//   console.log("Question set successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
