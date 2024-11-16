import { ethers, run } from "hardhat";

async function main() {
	const C = await ethers.getContractFactory("GetTime");
	const c = await C.deploy();
	console.log("contract :", await c.getAddress());
	await verifyContract(await c.getAddress(), []);
}

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
