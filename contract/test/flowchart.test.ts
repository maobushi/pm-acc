import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Prediction Market Test.", function () {
	async function deployFixture() {
		const [deployer, other] = await ethers.getSigners();
		
		const ERC20 = await ethers.getContractFactory("Sample20");
		const erc20 = await ERC20.deploy(20000000);

		const Oracle = await ethers.getContractFactory("OFactory");
		const of = await Oracle.deploy();

		const PMFactory = await ethers.getContractFactory("PMTFactory");
		const pmf = await PMFactory.deploy();

		const OptionMarket = await ethers.getContractFactory("OptionMarket");
		const om = await OptionMarket.deploy();

		return { erc20, pmf, of, om, deployer, other };
	}

	it("Overall operation check [1].", async function () {
		const { erc20, pmf, of, om, deployer, other } = await loadFixture(deployFixture);
		
		// mint init tokens
		const erc20Addr = await erc20.getAddress();
		await erc20.mint(deployer.address, 100);
		await erc20.mint(other.address, 20);

		// setup oracle
		const worldIdSampple = "0x097fd652d5a12ff1c18e132e788af272be6e954f";
		await of.createOWorld(worldIdSampple);
		const oracleAddress = await of.getDeployedOracles();
		// // create market
		await pmf.createMarket(
			"Presidential Election Winner 2024",
			2,
			erc20Addr,
			oracleAddress[0],
			3,
			1704067200,
			1710662400,
			["Yes","No"]
		);
		const marketAddress = await pmf.getAllMarkets();
		const market = await ethers.getContractAt("PMT", marketAddress[0]);

		// add lquidity and mint options
		await erc20.approve(marketAddress[0], 100);
		await market.addInitLiqidity(100);

		// // buy option[1]
		await erc20.connect(other).approve(marketAddress[0], 20);
		await market.connect(other).depositCollateralHandler(20);
		await om.connect(other).buyOption(marketAddress[0], 1, 20)

		// // sell option[1]
		await om.connect(other).sellOption(
			await market.getAddress(),
			1, 
			await market.balanceOfUserOption(other.address, 1)
		);
		await om.connect(other).redeemCollateral(marketAddress[0]);
	});
	
})


