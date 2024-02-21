// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProxyLoadBalancer {
    //owner of the contract
    address public owner;

    // Mapping to store implementation contract addresses for each function ID
    mapping(bytes4 => address) private implementations;

    // Event to log address updates
    event ImplementationUpdated(
        bytes4 indexed functionId,
        address indexed implementation
    );

    // Event to log new address addition
    event ImplementationAdded(
        bytes4 indexed functionId,
        address indexed implementation
    );

    // Event to log address removal
    event ImplementationRemoved(bytes4 indexed functionId);

    //constructor to assgin owner as the deployer of the contract
    constructor() {
        owner = msg.sender;
    }

    //modifier to give access to owner only
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    // Fallback function to delegate calls to the appropriate implementation contract
    fallback() external {
        address _impl = implementations[msg.sig];
        require(_impl != address(0), "Implementation not found");

        // Delegate call to the implementation contract
        (bool success, bytes memory data) = _impl.delegatecall(msg.data);
        require(success, "Delegatecall failed");

        assembly {
            return(add(data, 0x20), mload(data))
        }
    }

    //// Function to get the implementation contract address for a function ID
    function getImplementation(
        bytes4 functionId
    ) external view returns (address) {
        return implementations[functionId];
    }

    // Function to update the implementation contract address for a function ID
    function updateImplementation(
        bytes4 functionId,
        address newImplementation
    ) external onlyOwner {
        require(
            newImplementation != address(0),
            "Invalid implementation address"
        );
        require(
            implementations[functionId] != address(0),
            "Implementation does not exist"
        );

        implementations[functionId] = newImplementation;
        emit ImplementationUpdated(functionId, newImplementation);
    }

    // Function to add new implementation contract address for a function ID
    function addImplementation(
        bytes4 functionId,
        address implementation
    ) external onlyOwner {
        require(implementation != address(0), "Invalid implementation address");
        require(
            implementations[functionId] == address(0),
            "Implementation already exists"
        );

        implementations[functionId] = implementation;
        emit ImplementationAdded(functionId, implementation);
    }

    // Function to remove a implementation contract address for a function ID
    function removeImplementation(bytes4 functionId) external onlyOwner {
        require(
            implementations[functionId] != address(0),
            "Implementation does not exist"
        );

        delete implementations[functionId];
        emit ImplementationRemoved(functionId);
    }
}
