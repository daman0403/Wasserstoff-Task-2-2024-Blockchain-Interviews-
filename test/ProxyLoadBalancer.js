// Import Chai assertion library
const { expect } = require("chai");

// Define a test suite for the ProxyLoadBalancer contract
describe("ProxyLoadBalancer", function () {
  let ProxyLoadBalancer;
  let owner;
  let addr1;
  let addr2;

  // Hook function to deploy the contract before each test case
  beforeEach(async function () {
    // Get the contract factory and deploy the contract
    ProxyLoadBalancer = await hre.ethers.deployContract("ProxyLoadBalancer");
    await ProxyLoadBalancer.waitForDeployment();

    // Get accounts from Hardhat node
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  // Test case to check if the contract owner is set correctly
  it("Should set the owner correctly", async function () {
    expect(await ProxyLoadBalancer.owner()).to.equal(owner.address);
  });

  // Test case to check if the owner can add an implementation
  it("Should allow the owner to add an implementation", async function () {
    const functionId = "0x12345678"; // Example function ID
    const implementation = addr1.address;

    await expect(
      ProxyLoadBalancer.addImplementation(functionId, implementation)
    )
      .to.emit(ProxyLoadBalancer, "ImplementationAdded")
      .withArgs(functionId, implementation);

    //expect(await ProxyLoadBalancer.implementation(functionId)).to.equal(
    //  implementation
    //);
  });

  // Test case to check if the owner can update an implementation
  it("Should allow the owner to update an implementation", async function () {
    const functionId = "0x12345678"; // Example function ID
    const initialImplementation = addr1.address;
    const newImplementation = addr2.address;

    await ProxyLoadBalancer.addImplementation(
      functionId,
      initialImplementation
    );

    await expect(
      ProxyLoadBalancer.updateImplementation(functionId, newImplementation)
    )
      .to.emit(ProxyLoadBalancer, "ImplementationUpdated")
      .withArgs(functionId, newImplementation);

    //expect(await ProxyLoadBalancer.implementations(functionId)).to.equal(
    //  newImplementation
    //);
  });

  // Test case to check if the owner can remove an implementation
  it("Should allow the owner to remove an implementation", async function () {
    const functionId = "0x12345678"; // Example function ID
    const implementation = addr1.address;

    await ProxyLoadBalancer.addImplementation(functionId, implementation);

    await expect(ProxyLoadBalancer.removeImplementation(functionId))
      .to.emit(ProxyLoadBalancer, "ImplementationRemoved")
      .withArgs(functionId);

    //expect(await ProxyLoadBalancer.implementations(functionId)).to.equal(
    //  ethers.constants.AddressZero
    //);
  });
});
