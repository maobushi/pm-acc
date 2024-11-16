// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
interface AggregatorV3Interface {
  function decimals() external view returns (uint8);

  function description() external view returns (string memory);

  function version() external view returns (uint256);

  function getRoundData(
    uint80 _roundId
  ) external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);

  function latestRoundData()
    external
    view
    returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);
}

contract OChainlinkPrice {
    address public owner;
    AggregatorV3Interface public dataFeed;
    uint256 public settlementTimestamp;
    int256 public settlementPrice;
    uint256 public border;
    uint256 public data = 1;
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
        uint256 _settlementTimestamp,
        uint256 _border
    ) {
        owner = _owner;
        dataFeed = AggregatorV3Interface(dataFeedAddress);
        settlementTimestamp = _settlementTimestamp;
        border = _border;
        isPriceSet = false;
    }

    function fetchSettlementPrice() public onlyOwner onlyAfterSettlement {
        require(!isPriceSet, "Price already set");

        // latestRoundDataを取得
        (uint80 latestRoundId, , , , ) = dataFeed.latestRoundData();
        uint80 roundId = latestRoundId; // 最新のroundIdを取得

        uint256 closestDiff = type(uint256).max;
        int256 closestPrice = 0;

        while (roundId > 0) {
            try dataFeed.getRoundData(roundId) returns (
                uint80 _roundId,
                int256 _price,
                uint256 _startedAt,
                uint256 _updatedAt,
                uint80 _answeredInRound
            ) {
                uint256 diff = (_updatedAt > settlementTimestamp)
                    ? _updatedAt - settlementTimestamp
                    : settlementTimestamp - _updatedAt;

                if (diff < closestDiff) {
                    closestDiff = diff;
                    closestPrice = _price;
                }

                if (_updatedAt < settlementTimestamp) break; // SettlementTimestampを越えたら終了
            } catch {
                break; // エラー時は終了
            }
            roundId--;
        }

        settlementPrice = closestPrice;
        isPriceSet = true;

        data = (settlementPrice > int256(border)) ? 1 : 2;
        emit PriceSet(settlementPrice, block.timestamp);
}

    function getResult() external view returns (uint256) {
		return data;
	}

    function getSettlementPrice() public view returns (int256) {
        require(isPriceSet, "Settlement price not set yet");
        return settlementPrice;
    }
}