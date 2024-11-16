// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./PMT.sol";

contract PMTFactory {
    address[] public allMarkets;

    event MarketCreated(address marketAddress, string question, address oracle, uint256 fee, uint256 executionDate);

    function createMarket(
        string memory _question,
        uint256 _optionCount,
        address _collateralToken,
        address _oracle,
        uint256 _fee,
        uint256 _startDate,
        uint256 _executionDate,
        string[] memory _options
    ) external {
        require(_options.length == _optionCount, "Options count mismatch");

        PMT newMarket = new PMT(
            _question,
            _oracle,
            _collateralToken,
            _fee,
            _startDate,
            _executionDate,
            _options
        );

        // PMコントラクトの所有者をmsg.sender（呼び出し元）に設定
        newMarket.transferOwnership(msg.sender);
        allMarkets.push(address(newMarket));
        emit MarketCreated(address(newMarket), _question, _oracle, _fee, _executionDate);
    }

    function getAllMarkets() external view returns (address[] memory) {
        return allMarkets;
    }

    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata data
    ) external returns (bytes4) {
        // トークン受け取り時の処理を記述
        // 正常に受け取った場合は、関数セレクタを返す
        return this.onERC1155Received.selector;
    }
}
