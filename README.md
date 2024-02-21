

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy2.js
```
The project is created by the use of hardhat framework the smart contract code is written in solidity and the deployment and test scripts are written in javascript. The project contains 3 contract files by the name:
1. ProxyLoadBalancer deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3
2. TokenTransfer deployed to 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
3. Staking deployed to: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0

As per the assignment requirements the ProxyLoadBalancer contract should be able to make delegate calls to other contracts. The registry of the address to the associated implementation is maintained in a mapping called implementations. Calls to the specific implementation are made in a fallback function which we override. Other components of the ProxyLoadBalancer contract are used to update, add, remove, and get the mapping implementations. For security features, I choose a modifier named onlyOwner where only the owner(in this the deployer) can change the mapping implementations for security reasons.
I’ve written two more contracts i.e. Staking and TokenTransfer which can be called from the ProxyLoadBalancer contracts Similar contracts can be written and implemented in the ProxyLoadBalancer contract.
In the Staking contract I’ve made two functions one for depositing ERC20 tokens to stake the tokens and the other function is withdrawal which transfers ERC20 to the dedicated address.
In the TokenTransfer contract, we simply transfer Token from the contract to another address with the help of ERC20 standards.
The test scripts are written in JavaScript to test the contracts.
I’ve faced a few problems while developing this projects:
1.	First I didn’t know about delegate calls which I have learned by myself from various articles then I started developing the project.
2.	While deploying the contracts the address in the console was showing undefined which is due to the version difference then I debugged the project to get to the core of the problem but the solution was pretty simple to change the address to target.

