// app/api/createMarket/route.ts
import { NextResponse } from "next/server";
import { ethers } from "ethers";
import ABI from "@/abis/pm/PMTFactory.json"
import { sepolia } from "@reown/appkit/networks";

export async function POST(request: Request) {
  try {
    const { name, startTime, endTime, oracle, collateral } = await request.json();
    console.log("Received data:", name, startTime, endTime, oracle, collateral);

    // プライベートキーで署名を使用する場合（開発環境のみ推奨）
    const privateKey = process.env.WPK || ""; // Provide a default value if privateKey is undefined

    // プライベートキーが空の場合はエラーを返す
    if (!privateKey) {
      throw new Error("Private key is missing in environment variables.");
    }
	const provider = new ethers.AlchemyProvider("sepolia", "RUhD_kE_n-J5Dz6U7__Bx-5Ufzliuwkx")
    // const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/edb581f18cb9409e92aed119ff361c9b");
    try {
		const network = await provider.getNetwork();
		console.log("Connected to network:", network);
	  } catch (err) {
		console.error("Error fetching network:", err);
	}
	const signer = new ethers.Wallet(privateKey, provider);

    // コントラクトのインターフェースとアドレスを設定
    const contractAddress = "0xc241C3c8D0C77F45650b9646b7072754aC3284C9";
    const contractABI = ABI.abi;

    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // `createMarket` 関数の引数を確認
	console.log("Market name:", name);
    const tx = await contract.createMarket(
      name,
      2,
      collateral,
      "0x30efF68c9d4FfEA623185291bF04B79F1b2a11b3",
      3, // 固定値
      startTime,
      endTime,
      ["YES", "NO"]
    );

    // トランザクションの完了を待つ
    await tx.wait();
    console.log("Transaction sent:", tx);
	const etherscanUrl = `https://sepolia.etherscan.io/tx/${tx.hash}`;

    // トランザクションハッシュをレスポンスとして返す
    return NextResponse.json({ success: true, transactionHash: tx.hash });
  } catch (error) {
    console.error("Error creating market:", error);

    // エラーがErrorオブジェクトの場合、エラーメッセージを明確に
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message: errorMessage });
  }
}
