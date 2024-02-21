// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ERC20 {
    function transfer(address to, uint256 value) external returns (bool);
}

contract Staking {
    // Mapping to store staking balances
    mapping(address => uint) public stakingBalances;

    // Function to stake tokens
    function stakeTokens(address token, uint amount) external {
        // Increase staking balance for the sender
        stakingBalances[msg.sender] += amount;

        // Transfer tokens from sender to this contract (assuming ERC20 tokens)
        // Replace this with the actual token contract and transfer logic
        // For demonstration purposes, we're assuming a transfer function exists in the token contract

        require(
            ERC20(token).transfer(address(this), amount),
            "Token staking failed"
        );
    }

    // Function to withdraw staked tokens
    function withdrawStakedTokens(address token, uint amount) external {
        require(
            stakingBalances[msg.sender] >= amount,
            "Insufficient staked balance"
        );

        // Decrease staking balance for the sender
        stakingBalances[msg.sender] -= amount;

        // Transfer tokens back to the sender (assuming ERC20 tokens)
        require(
            ERC20(token).transfer(msg.sender, amount),
            "Token withdrawal failed"
        );
    }
}
