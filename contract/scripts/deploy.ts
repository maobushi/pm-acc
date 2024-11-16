import { ethers, run } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  
  const PMTFactory = await ethers.getContractFactory("PMTFactory");
  const pmtf = await PMTFactory.deploy();

  const ORACLE = await ethers.getContractFactory("OFactory");
  const oracle = await ORACLE.deploy();

  const EXCHANGE = await ethers.getContractFactory("OptionMarket");
  const exchange = await EXCHANGE.deploy();

  console.log("PMTFactory :", await pmtf.getAddress());
  console.log("ORACLE     :", await oracle.getAddress());
  console.log("EXCHANGE   :", await exchange.getAddress());
  // ここで全てのアドレスが取得されるまで待機、2分待っても無理ならreject
  console.log("Synchronization deviation correction: wait 20s...")
  await new Promise((resolve) => setTimeout(resolve, 20000));
  await verifyContract(await pmtf.getAddress(), []);
  await verifyContract(await oracle.getAddress(), []);
  await verifyContract(await exchange.getAddress(), []);
}

// コントラクト検証関数
async function verifyContract(contractAddress: string, args: any[]) {
  console.log(`Verifying contract at ${contractAddress}...`);
  await run("verify:verify", {
    address: contractAddress,
    constructorArguments: args,
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
