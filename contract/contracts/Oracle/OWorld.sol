// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OWorld {
	address public owner;
    address public worldIdOwner;
    uint256 public data = 1;

	event DataUpdated(uint256 newData, address indexed updater);

    constructor(address _owner, address _worldIdOwner) {
        owner = _owner;
        worldIdOwner = _worldIdOwner;
    }

	modifier onlyOwnerOrWorldId() {
        require(
            msg.sender == owner || msg.sender == worldIdOwner,
            "Access restricted to owner or World ID owner"
        );
        _;
    }

	function setData(uint256 _data) public onlyOwnerOrWorldId {
        data = _data;
        emit DataUpdated(_data, msg.sender);
    }

	function getResult() external view returns (uint256) {
		return data;
	}

	function changeWorldIdOwner(address newWorldIdOwner) public onlyOwnerOrWorldId {
        worldIdOwner = newWorldIdOwner;
    }
}