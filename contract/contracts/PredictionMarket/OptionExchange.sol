// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "../interface/IPMTStateManager.sol";
import "../interface/IOracle.sol";
import "hardhat/console.sol";

interface IOA {
	function getResult() external view returns (uint256);
}

contract OptionExchange {
	uint256 constant SCALE = 10**18;
	mapping(address => bool) public isTransactionActive;
	mapping(address => mapping(address => uint256)) public safeRedeem;

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
	// CPMMを使用して動的価格を算出
	function calculateOptionChange(
		address target, 
		uint256 opt, 
		uint256 dx, 
		bool isBuy
	) public view returns (uint256 dy, uint256 newCollateralBalance, uint256 newOptionBalance) {
		IPMTStateManager t = IPMTStateManager(target);
		(, , , , , , , string[] memory options, ) = t.getAllData();
		require(opt < options.length, "Invalid option selected");
		require(dx > 0, "Deposit amount must be greater than zero");

		uint256 collateralBalanceBefore = t.getBalanceOfCollateralPool();
		uint256 optionBalanceBefore = t.getBalanceOfOptionPool(opt);
		
		uint256 k = collateralBalanceBefore * optionBalanceBefore;
		uint256 collateralAfter;
		uint256 optionBalanceAfter;

		if (isBuy) {
			collateralAfter = collateralBalanceBefore + dx;
			optionBalanceAfter = k / collateralAfter;
			dy = optionBalanceBefore - optionBalanceAfter;
		} else {
			require(dx <= optionBalanceBefore, "Insufficient options in pool");

			optionBalanceAfter = optionBalanceBefore + dx;
			
			uint256 temp = k / optionBalanceAfter;
			uint256 remainder = k % optionBalanceAfter;
			uint256 roundValue = (2 * remainder >= optionBalanceAfter) ? (temp + 1) : temp;
			collateralAfter = roundValue;

			dy = collateralBalanceBefore - collateralAfter;
		}
		return (dy, collateralAfter, optionBalanceAfter);
	}

	function buyOption(address target, uint256 opt, uint256 dx) public returns (uint256 acquiredOptions, uint256 dy) {
		require(isTransactionActive[msg.sender] == false, "Now transaction active.");
        IPMTStateManager t = IPMTStateManager(target);
		(, , , , , , , string[] memory options, bool initLiquidityFlag) = t.getAllData();
		require(initLiquidityFlag == true, "This market is not open.");
		require(opt < options.length, "Invalid option selected");
		require(dx > 0, "Deposit amount must be greater than zero");

		uint256 collateralBalanceBefore = t.getBalanceOfCollateralPool();
		uint256 optionBalanceBefore = t.getBalanceOfOptionPool(opt);
		
		uint256 k = collateralBalanceBefore * optionBalanceBefore;

		require(t.getUserCollateralDeposits(msg.sender) == dx, "Deposit amount does not match.");

		uint256 collateralAfter = collateralBalanceBefore + dx;
		uint256 optionBalanceAfter = k / collateralAfter;
		dy = optionBalanceBefore - optionBalanceAfter;

		// t.depositHandler(dx);
		t.setBalanceCollateralPool(collateralAfter);
		t.setBalanceOfOptionPool(opt, optionBalanceAfter);
		t.setUserTokenBalances(msg.sender, opt, dy);
		t.setUserCollateralDeposits(msg.sender, 0);
		isTransactionActive[msg.sender] = false;
		return (acquiredOptions, dy);
    }

	struct SellSupportParams {
		address target;
		uint256 opt;
		uint256 collateralAfter;
		uint256 optionBalanceAfter;
		uint256 dy;
		uint256 dx;
	}

	function _toRound(uint256 k, uint256 optionBalanceAfter) internal pure returns (uint256) {
		uint256 temp = k / optionBalanceAfter;
		uint256 remainder = k % optionBalanceAfter;
		uint256 roundValue = (2 * remainder >= optionBalanceAfter) ? (temp + 1) : temp;  // 四捨五入
		return roundValue;
	}
	function _sellAfterResults(address target, address oracle, uint256 opt) internal {
		// TODO: check oracle result
		IOracle o = IOracle(oracle);
		require(o.getResult() == opt, "The price of this option is 0.");
		IPMTStateManager t = IPMTStateManager(target);
		uint256 collateralBalanceBefore = t.getBalanceOfCollateralPool();
		uint256 optionBalanceBefore = t.getBalanceOfOptionPool(opt);
		uint256 userOptionBalance = t.balanceOfUserOption(msg.sender, opt);

		safeRedeem[target][msg.sender] = userOptionBalance;

		t.setBalanceCollateralPool(collateralBalanceBefore - userOptionBalance);
		t.setBalanceOfOptionPool(opt, optionBalanceBefore + userOptionBalance);
		t.setUserTokenBalances(msg.sender, opt, 0);
		isTransactionActive[msg.sender] = true;
	}
	function _changeState(address target, uint256 opt, uint256 dy, uint256 dx, uint256 collateralAfter, uint256 optionBalanceAfter) internal {
		IPMTStateManager t = IPMTStateManager(target);
		t.setBalanceCollateralPool(collateralAfter);
		t.setBalanceOfOptionPool(opt, optionBalanceAfter);
		t.setUserTokenBalances(msg.sender, opt, dx);
		t.setUserRedeemAmount(msg.sender, dy);
		safeRedeem[target][msg.sender] = dy;
		isTransactionActive[msg.sender] = true;
	}
    function sellOption(address target, uint256 opt, uint256 dx) public returns (uint256 dy) {
		require(isTransactionActive[msg.sender] == false, "Now transaction active.");
        IPMTStateManager t = IPMTStateManager(target);
		(, address oracleAddress, , , , , uint256 executionDate, string[] memory options, bool initLiquidityFlag) = t.getAllData();
		require(initLiquidityFlag == true, "This market is not open.");
		require(opt < options.length, "Invalid option selected");
		require(dx > 0, "Deposit amount must be greater than zero");

		// 期日が過ぎているのであればoracleを参照する
		if (executionDate < block.timestamp) {
			_sellAfterResults(target, oracleAddress, opt);
			return 0;
		}
		uint256 collateralBalanceBefore = t.getBalanceOfCollateralPool();
		uint256 optionBalanceBefore = t.getBalanceOfOptionPool(opt);
		
		uint256 k = collateralBalanceBefore * optionBalanceBefore;

		require(dx <= optionBalanceBefore, "Insufficient options in pool");

		uint256 optionBalanceAfter = optionBalanceBefore + dx;
		uint256 collateralAfter = _toRound(k, optionBalanceAfter);
		dy = collateralBalanceBefore - collateralAfter;
		_changeState(target, opt, dy, dx, collateralAfter, optionBalanceAfter);
		return dy;
	}

	function approveRedeem(address target) external {
		require(isTransactionActive[msg.sender] == true, "Now transaction not active.");
		IPMTStateManager t = IPMTStateManager(target);
		(, , address collateralToken, , , , , , ) = t.getAllData();
		require(
            // IERC20(t.getCollateralToken()).approve(target, safeRedeem[target][msg.sender]),
			IERC20(collateralToken).approve(address(this), safeRedeem[target][msg.sender]),
            "Collateral token transfer failed"
		);
	}
	// 引き出しの実行
	function redeemCollateral(address target) external {
		require(isTransactionActive[msg.sender] == true, "Now transaction not active.");
		require(safeRedeem[target][msg.sender] > 0, "Not deposited.");
		IPMTStateManager t = IPMTStateManager(target);
		t.redeemHandler(msg.sender, safeRedeem[target][msg.sender]);
		safeRedeem[target][msg.sender] = 0;
		isTransactionActive[msg.sender] = false;
	}
}
