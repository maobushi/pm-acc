// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "hardhat/console.sol";


contract PMTStateManager is ERC1155, Ownable {
    struct MarketInfo {
        string question;
        address[4] addrRefs;
        uint256[2] marketPeriod;
        string[] options;
        uint256 fee;
    }

    MarketInfo public marketInfo;
    bool public initLiquidityFlag;
    uint256 public collateralPoolBalance;

    // トークンのユーザーおよびプールの保有量を管理するマッピング
    mapping(address => mapping(uint256 => uint256)) public userTokenBalances;
    mapping(uint256 => uint256) public optionPoolBalances;
    mapping(address => uint256) public userDepositsCollateralObserver;
    mapping(address => mapping(uint256 => uint256)) public userDepositsOptionObserver;

    constructor(
        string memory _question,
        address _oracleAddress,
        address _collateralToken,
        uint256 _fee,
        uint256 _startDate,
        uint256 _executionDate,
        string[] memory _options
    )
      ERC1155("https://example.com/metadata/{id}.json")
      Ownable(msg.sender)
    {
        marketInfo = MarketInfo({
            question: _question,
            addrRefs: [_oracleAddress, _collateralToken, address(0), address(0)],
            marketPeriod: [_startDate, _executionDate],
            options: _options,
            fee: _fee
        });

        // tokenID 0 = LPtoken
        // _options[] = aaa:y, aaa:n, bbb:y, bbb:n ~~~ xxx:y, xxx:n
        // for (uint256 i = 0; i < _options.length; i++) {
        //     _mint(msg.sender, i + 1, 0, "");
        // }
    }

    modifier isStarted() {
        require(initLiquidityFlag == true, "This market is not started.");
        _;
    }
    modifier onlyAllowedContract() {
        // require(msg.sender == allowedContract, "Not allowed contract");
        _;
    }

    /* <<=== TOKEN MANAGER ===>> */
    function mintOptions(uint256[] memory ids, uint256[] memory values, bool flag) external {
        if (flag == true) {
            _mintBatch(address(this), ids, values, "");
        } else {
            _mintBatch(msg.sender, ids, values, "");
        }
    }

    function burnOptions(uint256[] memory ids, uint256[] memory values, bool flag) external {
        if (flag == true) {
            _burnBatch(address(this), ids, values);
        } else {
            _burnBatch(msg.sender, ids, values);
        }
    }

    // /* <<=== TRADING MANAGER ===>> */
    // function depositCollateralHandler(uint256 amount) external onlyAllowedContract {
    //     require(
    //         IERC20(marketInfo.addrRefs[1]).transferFrom(msg.sender, address(this), amount),
    //         "Collateral token transfer failed"
    //     );
    //     userDepositsCollateralObserver[msg.sender] += amount;
    // }

    // function depositOptionHandler(uint256 opt, uint256 amount) external onlyAllowedContract {
    //     userDepositsOptionObserver[msg.sender][opt] += amount;
    // }

    // function redeemHandler(address to, uint256 dy) external onlyAllowedContract {
    //     require(
    //         IERC20(marketInfo.addrRefs[1]).transfer(to, dy),
    //         "Collateral token transfer failed"
    //     );
    // }

    /* <<===  GETTER FUNCTIONS  ===>> */
    function getMarketInfo() external view returns (MarketInfo memory) {
        return marketInfo;
    }

    function getCollateralPoolBalance() external view returns (uint256) {
        return collateralPoolBalance;
    }

    function getInitLiquidityFlag() external view returns (bool) {
        return initLiquidityFlag;
    }

    function balanceOfUserOption(address user, uint256 optionId) external view returns (uint256) {
        return userTokenBalances[user][optionId];
    }

    function getBalanceOfOptionPool(uint256 optionId) external view returns (uint256) {
        return optionPoolBalances[optionId];
    }

    function getBalanceOfCollateralPool() external view returns (uint256) {
        return collateralPoolBalance;
    }

    function getUserCollateralDeposits(address user) external view returns (uint256) {
        return userDepositsCollateralObserver[user];
    }

    function getUserOptionDeposits(address user, uint256 opt) external view returns (uint256) {
        return userDepositsOptionObserver[user][opt];
    }

    /* <<===  SETTER FUNCTIONS  ===>> */
    function setMarketInfo(MarketInfo memory _marketInfo) external onlyOwner {
        marketInfo = _marketInfo;
    }

    function setInitLiquidityFlag(bool f) external onlyOwner {
        initLiquidityFlag = f;
    }

    function setCollateralPoolBalance(uint256 amount) external onlyOwner {
        collateralPoolBalance = amount;
    }

    function setBalanceOfOptionPool(uint256 opt, uint256 amount) external onlyOwner {
        optionPoolBalances[opt] = amount;
    }

    function setUserTokenBalances(address user, uint256 opt, uint256 amount) external onlyOwner {
        userTokenBalances[user][opt] = amount;
    }

    function setUserCollateralDeposits(address user, uint256 amount) external onlyOwner {
        userDepositsCollateralObserver[user] = amount;
    }

    function setUserOptionDeposits(address user, uint256 opt, uint256 amount) external onlyOwner {
        userDepositsOptionObserver[user][opt] = amount;
    }

    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata data
    ) external returns (bytes4) {
        // Handle the token transfer
        return this.onERC1155Received.selector;
    }
}
