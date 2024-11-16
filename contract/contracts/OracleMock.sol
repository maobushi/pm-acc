// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OracleMock {
	uint256 public result;

	mapping(address =>  string) oracleHash;

    constructor() {}

	function setOutcome(uint256 _optionId) public {
		result = _optionId;
	}

	function getOutcome() public view returns (uint256) {
		return result;
	}
}
