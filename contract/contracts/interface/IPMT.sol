// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

interface IPMT is IERC1155 {
    // イベント
    event LiquidityAdded(address indexed user, uint256 amount);
    event OptionSplit(address indexed user, uint256 collateralTokenId, uint256 amount, uint256[] optionIds);
    event OptionMerged(address indexed user, uint256[] optionIds, uint256 collateralTokenId, uint256 amount);

    // 初期流動性の追加
    function addInitLiqidity(uint256 amount) external;

    function mintHandler(uint256 opt, uint256 amount) external;
    function burnHandler(uint256 opt, uint256 amount) external;
    function approveHandler(uint256 amount) external;
    function redeemHandler(uint256 dy) external;
    function depositCollateralHandler(uint256 amount) external;

    function split(uint256 collateralTokenId, uint256 amount, uint256[] calldata optionIds) external;
    function merge(uint256[] calldata optionIds, uint256 collateralTokenId, uint256 amount) external;

    function redeem() external;

    // ユーザーの選択肢の残高
    // オプショントークンプールの残高
    function balanceOfUserOption(address user, uint256 optionId) external view returns (uint256);
    function getBalanceOfOptionPool(uint256 optionId) external view returns (uint256);
    function getBalanceOfCollateralPool() external view returns (uint256);
    function getUserCollateralDeposits(address user) external view returns (uint256);
    function getUserOptionDeposits(address user, uint256 opt) external view returns (uint256);
    function getUserRedeemAmount(address user) external view returns (uint256);

    function getQuestion() external view returns (string memory);
	function getOptions() external view returns (string[] memory);
    function getCollateralToken() external view returns (address);

    function setBalanceOfOptionPool(uint256 opt, uint256 amount) external;
    function setBalanceCollateralPool(uint256 amount) external;
    function setUserTokenBalances(address user, uint256 opt, uint256 amount) external;
    function setUserCollateralDeposits(address user, uint256 amount) external;
    function setUserOptionDeposits(address user, uint256 opt, uint256 amount) external;
    function setUserRedeemAmount(address user, uint256 dy) external;
}
