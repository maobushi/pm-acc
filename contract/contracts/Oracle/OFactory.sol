// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./OWorld.sol";
import "./OChainlinkPrice.sol";

contract OracleFactory {
    address[] public deployedOracles;

    event OracleDeployed(address indexed oracleAddress, address indexed owner, address indexed worldIdOwner);

    function createOWorld(address _worldIdOwner) external returns (address) {
        OWorld newOracle = new OWorld(msg.sender, _worldIdOwner);
        deployedOracles.push(address(newOracle));
        emit OracleDeployed(address(newOracle), msg.sender, _worldIdOwner);
        return address(newOracle);
    }

	function createOChainlinkPrice(address _dataFeed, uint256 settlementTimestamp) external returns (address) {
        OChainlinkPrice newOracle = new OChainlinkPrice(msg.sender, _dataFeed, settlementTimestamp);
        deployedOracles.push(address(newOracle));
        emit OracleDeployed(address(newOracle), msg.sender, _dataFeed);
        return address(newOracle);
    }
	
    // デプロイ済みのOracleコントラクト一覧を取得
    function getDeployedOracles() public view returns (address[] memory) {
        return deployedOracles;
    }
}