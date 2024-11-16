import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
 
  const PMTFactory = await ethers.getContractFactory("PMTFactory");
  const pmtf = await PMTFactory.deploy();

  const ORACLE = await ethers.getContractFactory("OracleMock");
  const oracle = await ORACLE.deploy();

  const EXCHANGE = await ethers.getContractFactory("OptionMarket");
  const exchange = await EXCHANGE.deploy();

  console.log("PMTFactory	:", await pmtf.getAddress());
  console.log("ORACLE		:", await oracle.getAddress());
  console.log("EXCHANGE		:", await exchange.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
