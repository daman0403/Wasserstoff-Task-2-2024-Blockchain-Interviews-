// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokenTransfer {
    // Function to transfer tokens
    function transferTokens(address token, address to, uint amount) external {
        // Perform token transfer using ERC20 standard transfer function
        require(ERC20(token).transfer(to, amount), "Token transfer failed");
    }
}

interface ERC20 {
    function transfer(address to, uint256 value) external returns (bool);
}
