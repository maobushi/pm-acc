// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract OChainlinkPrice {
    address public owner;
    AggregatorV3Interface public dataFeed;
    uint256 public settlementTimestamp;
    int256 public settlementPrice;
    bool public isPriceSet;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    modifier onlyAfterSettlement() {
        require(block.timestamp >= settlementTimestamp, "Settlement time not reached");
        _;
    }

    event PriceSet(int256 price, uint256 timestamp);

    constructor(
        address _owner,
        address dataFeedAddress,
        uint256 _settlementTimestamp
    ) {
        owner = _owner;
        dataFeed = AggregatorV3Interface(dataFeedAddress);
        settlementTimestamp = _settlementTimestamp;
        isPriceSet = false;
    }

    function fetchSettlementPrice() public onlyOwner onlyAfterSettlement {
        require(!isPriceSet, "Price already set");

        (, int256 price, , , ) = dataFeed.latestRoundData();
        settlementPrice = price;
        isPriceSet = true;

        emit PriceSet(price, block.timestamp);
    }

    function getSettlementPrice() public view returns (int256) {
        require(isPriceSet, "Settlement price not set yet");
        return settlementPrice;
    }
}