// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HealthCoin is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 10_000_000 * (10 ** 18); // 10 Million HC
    address public minter;
    
    // Mapping to track authorized healthcare providers
    mapping(address => bool) public authorizedProviders;
    
    // Events
    event ProviderAuthorized(address indexed provider);
    event ProviderRevoked(address indexed provider);
    event RewardDistributed(address indexed patient, uint256 amount, string reason);

    constructor() ERC20("HealthCoin", "HC") Ownable(msg.sender) {
        _mint(msg.sender, 1_000_000 * (10 ** 18)); // 1 Million HC to deployer
    }

    modifier onlyMinter() {
        require(msg.sender == minter, "Only minter can call this function");
        _;
    }

    modifier onlyAuthorizedProvider() {
        require(authorizedProviders[msg.sender] || msg.sender == owner(), "Not authorized provider");
        _;
    }

    function setMinter(address _minter) public onlyOwner {
        require(_minter != address(0), "Minter address cannot be zero");
        minter = _minter;
    }

    function authorizeProvider(address _provider) public onlyOwner {
        require(_provider != address(0), "Provider address cannot be zero");
        authorizedProviders[_provider] = true;
        emit ProviderAuthorized(_provider);
    }

    function revokeProvider(address _provider) public onlyOwner {
        authorizedProviders[_provider] = false;
        emit ProviderRevoked(_provider);
    }

    function mint(address to, uint256 amount) public onlyMinter {
        require(totalSupply() + amount <= MAX_SUPPLY, "Minting would exceed max supply");
        _mint(to, amount);
    }

    function distributeReward(address patient, uint256 amount, string memory reason) public onlyAuthorizedProvider {
        require(totalSupply() + amount <= MAX_SUPPLY, "Reward would exceed max supply");
        _mint(patient, amount);
        emit RewardDistributed(patient, amount, reason);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

    function burnFrom(address account, uint256 amount) public {
        require(allowance(account, msg.sender) >= amount, "Allowance is less than amount");
        _burn(account, amount);
        _approve(account, msg.sender, allowance(account, msg.sender) - amount);
    }

    // Function to get HC balance in USD equivalent
    function getUSDValue(uint256 hcAmount) public pure returns (uint256) {
        return (hcAmount * 10) / 100; // 1 HC = $0.10
    }
}
