// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "hardhat/console.sol";

contract PMT is ERC1155, Ownable {
    string public question;
    address public oracleAddress;
    address public collateralToken;
    uint256 public collateralPoolBalance;
    uint256 public fee;
    uint256 public startDate;
    uint256 public executionDate;
    string[] public options;
    address public allowedContract;
    bool initLiquidityFlag = false;

    // トークンのユーザーおよびプールの保有量を管理するマッピング
    mapping(address => mapping(uint256 => uint256)) public userTokenBalances;
    mapping(uint256 => uint256) public optionPoolBalances;  // オプショントークンのプール

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
        question = _question;
        oracleAddress = _oracleAddress;
        collateralToken = _collateralToken;
        fee = _fee;
        startDate = _startDate;
        executionDate = _executionDate;

        // tokenID 0 = LPtoken
        for (uint256 i = 0; i < _options.length; i++) {
            options.push(_options[i]);
            _mint(msg.sender, i + 1, 0, "");
        }
    }

    modifier isStarted() {
        require(initLiquidityFlag == true, "This market is not started.");
        _;
    }
    modifier onlyAllowedContract() {
        // require(msg.sender == allowedContract, "Not allowed contract");
        _;
    }

    /* <<=== LIQUIDITY MANAGER ===>> */
    function addInitLiqidity(uint256 amount) external {
        require(!initLiquidityFlag, "Initial liquidity already added.");
        require(amount >= 10, "Amount for each option must be greater than zero.");

        collateralPoolBalance = amount;
        for (uint256 i = 0; i < options.length; i++) {
            optionPoolBalances[i + 1] += amount;
            userTokenBalances[msg.sender][i + 1] += amount;
            _mint(address(this), i + 1, amount, "");  // Mint initial liquidity for each option
        }

        require(
            IERC20(collateralToken).transferFrom(msg.sender, address(this), collateralPoolBalance),
            "Collateral token transfer failed"
        );
        initLiquidityFlag = true;
    }

    /* <<=== TRADING MANAGER ===>> */
    function mintHandler(uint256 opt, uint256 amount) external onlyAllowedContract {
        require(opt > 0, "Invalid option ID");
        _mint(address(this), opt, amount, "");
        optionPoolBalances[opt] += amount; 
    }
 
    function burnHandler(uint256 opt, uint256 amount) external onlyAllowedContract {
        require(opt > 0, "Invalid option ID");
        _burn(address(this), opt, amount);
        optionPoolBalances[opt] -= amount; 
    }

    function redeemHandler(uint256 dy) external onlyAllowedContract {
        require(opt > 0, "Invalid option ID");
        _burn(address(this), opt, amount);
        optionPoolBalances[opt] -= amount; 
    }

    /* <<===  SETTER FUNCTIONS  ===>> */
    function setBalanceOfOptionPool(uint256 opt, uint256 amount) external onlyAllowedContract {
        optionPoolBalances[opt] = amount;
    }

    function setBalanceCollateralPool(uint256 amount) external onlyAllowedContract {
        collateralPoolBalance = amount;
    }

   function setUserTokenBalances(address user, uint256 opt, uint256 amount) external onlyAllowedContract {
        userTokenBalances[user][opt] = amount;
   }

    /* <<===  GETTER FUNCTIONS  ===>> */
    function balanceOfUserOption(address user, uint256 optionId) external view returns (uint256) {
        return userTokenBalances[user][optionId];
    }

    function getBalanceOfOptionPool(uint256 optionId) external view returns (uint256) {
        return optionPoolBalances[optionId];
    }

    function getBalanceOfCollateralPool() external view returns (uint256) {
        return collateralPoolBalance;
    }

    function getQuestion() external view returns (string memory) {
        return question;
    }

    function getOptions() external view returns (string[] memory) {
        return options;
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
