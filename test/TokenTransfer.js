// Import Chai assertion library
const { expect } = require("chai");
const { ethers } = require("hardhat");

// Define a test suite for the TokenTransfer contract
describe("TokenTransfer", function () {
  let TokenTransfer;
  let token;
  let owner;
  let recipient;
  const amount = ethers.parseEther("100"); // Example token amount

  // Hook function to deploy contracts before each test case
  beforeEach(async function () {
    // Deploy the ERC20 token contract
    //const ERC20 = await ethers.getContractFactory("YourERC20Contract"); // Replace "YourERC20Contract" with the name of your ERC20 token contract
    //token = await ERC20.deploy();

    // Deploy the TokenTransfer contract
    TokenTransfer = await hre.ethers.deployContract("TokenTransfer");
    await TokenTransfer.waitForDeployment();

    // Get accounts from Hardhat node
    [owner, recipient] = await ethers.getSigners();
  });

  // Test case to check token transfer
  it("Should transfer tokens", async function () {
    // Mint tokens to the owner address
    //await token.mint(owner.address, amount);

    //// Approve token transfer from owner address to TokenTransfer contract
    //await token.approve(tokenTransfer.address, amount);

    // Perform token transfer using the TokenTransfer contract
    await TokenTransfer.transferTokens(token.address, recipient.target, amount);

    // Check the token balance of the recipient
    expect(await token.balanceOf(recipient.address)).to.equal(amount);
  });
});
