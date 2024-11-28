// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interface/IPMTStateManager.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";

contract PMTImpl {
	function getOptionIndex(address target, string[] memory positions) public view returns (uint256[] memory) {
		IPMTStateManager t = IPMTStateManager(target);
        uint256[] memory ids = new uint256[](t.getMarketInfo().options.length);
        uint256 count = 0;

        for (uint256 i = 0; i < t.getMarketInfo().options.length; i++) {
            for (uint256 ii = 0; ii < positions.length; ii++) {
                if (keccak256(bytes(t.getMarketInfo().options[i])) == keccak256(bytes(positions[ii]))) {
                    ids[count] = i;
                    count++;
                    break;
                }
            }
        }
        return ids;
    }

	function addInitLiqidity(address target, uint256 amount) external {
		IPMTStateManager t = IPMTStateManager(target);
        require(!t.getInitLiquidityFlag(), "Initial liquidity already added.");
        require(amount >= 10, "Amount for each option must be greater than zero.");

		uint256[] memory ids = new uint256[](t.getMarketInfo().options.length);
		uint256[] memory vals = new uint256[](t.getMarketInfo().options.length);
		for (uint256 i = 0; i < t.getMarketInfo().options.length; i++) {
            t.setBalanceOfOptionPool(i + 1, amount);
            t.setUserTokenBalances(msg.sender, i + 1, amount);
            ids[i] = i + 1;
			vals[i] = amount;
        }
        t.setCollateralPoolBalance(amount);
        t.mintOptions(ids, vals, true);

        require(
            IERC20(t.getMarketInfo().addrRefs[1])
                .transferFrom(msg.sender, address(this), t.getCollateralPoolBalance()),
            "Collateral token transfer failed"
        );
        t.setInitLiquidityFlag(true);
    }

	// k =　x(yes) * y(no)
    function cpmmCalculator(uint amount, uint x, uint y, bool mode, bytes1 flag) public pure returns (uint) {
        uint k = x * y;
		uint newSupply;
	
		if (mode == true) {
        	return newSupply = (flag == 0x00) ? (y - (k / (x + amount))) : (x - (k / (y + amount)));
		} else {
			return newSupply = (flag == 0x00) ? (y - (k / (x - amount))) : (x - (k / (y - amount)));
		} 
    }

	function splitPosition(address target, string[] memory positions, uint256 amount) external {
		IPMTStateManager t = IPMTStateManager(target);
        uint256[] memory ids = getOptionIndex(target, positions);
        uint256[] memory values = new uint256[](positions.length);

        for (uint i = 0; i < positions.length; i++) {
            if (ids[i] % 2 == 1) {
                values[i] = cpmmCalculator(
					amount,
					t.getBalanceOfOptionPool(ids[i]),
					t.getBalanceOfOptionPool(ids[i] - 1),
					true,
					0x00
				);
            } else {
                values[i] = cpmmCalculator(
					amount,
					t.getBalanceOfOptionPool(ids[i] - 1),
					t.getBalanceOfOptionPool(ids[i]),
					true,
					0x01
				);
            }
        }

        t.mintOptions(ids, values, false);
    }

    function mergePosition(address target, string[] memory positions, uint[] memory amounts) external {
        IPMTStateManager t = IPMTStateManager(target);
        uint256[] memory ids = getOptionIndex(target, positions);
        uint256[] memory values = new uint256[](positions.length);

		for (uint i = 0; i < positions.length; i++) {
			if (ids[i] % 2 == 1) {
				values[i] = cpmmCalculator(
					amounts[i],
					t.getBalanceOfOptionPool(ids[i]),
					t.getBalanceOfOptionPool(ids[i] - 1), 
					false,
					0x00
				);
			} else {
				values[i] = cpmmCalculator(
					amounts[i],
					t.getBalanceOfOptionPool(ids[i] - 1),
					t.getBalanceOfOptionPool(ids[i]),
					false,
					0x01
				);
            }
        }
        t.burnOptions(ids, values, false);
    }

	function redeemPositions(address target, string[] memory positions, uint[] memory amounts) external {

	}
}
