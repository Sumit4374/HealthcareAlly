// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./HealthCoin.sol";

contract PaymentGateway {
    HealthCoin public healthCoinToken;
    address public owner;
    uint256 public platformFeePercentage = 5; // 5% platform fee

    struct Payment {
        address payer;
        address payee;
        uint256 amount;
        uint256 timestamp;
        string serviceType;
        bool completed;
    }

    struct ServiceProvider {
        address providerAddress;
        string name;
        string serviceType;
        uint256 consultationFee;
        bool isActive;
    }

    // Mappings
    mapping(address => ServiceProvider) public serviceProviders;
    mapping(address => uint256) public providerEarnings;
    mapping(uint256 => Payment) public payments;
    mapping(address => uint256[]) public userPayments;
    
    uint256 public paymentCounter;

    // Events
    event ServiceProviderRegistered(address indexed provider, string name, string serviceType);
    event PaymentProcessed(uint256 indexed paymentId, address indexed payer, address indexed payee, uint256 amount);
    event EarningsWithdrawn(address indexed provider, uint256 amount);
    event ConsultationFeeUpdated(address indexed provider, uint256 newFee);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    modifier onlyActiveProvider() {
        require(serviceProviders[msg.sender].isActive, "Provider is not active");
        _;
    }

    constructor(address _healthCoinToken) {
        healthCoinToken = HealthCoin(_healthCoinToken);
        owner = msg.sender;
    }

    // Provider registration
    function registerServiceProvider(
        string memory name,
        string memory serviceType,
        uint256 consultationFee
    ) public {
        serviceProviders[msg.sender] = ServiceProvider({
            providerAddress: msg.sender,
            name: name,
            serviceType: serviceType,
            consultationFee: consultationFee,
            isActive: true
        });

        emit ServiceProviderRegistered(msg.sender, name, serviceType);
    }

    function updateConsultationFee(uint256 newFee) public onlyActiveProvider {
        serviceProviders[msg.sender].consultationFee = newFee;
        emit ConsultationFeeUpdated(msg.sender, newFee);
    }

    // Payment processing
    function processPayment(address provider, string memory serviceType) public {
        require(serviceProviders[provider].isActive, "Provider is not active");
        
        uint256 consultationFee = serviceProviders[provider].consultationFee;
        require(consultationFee > 0, "Consultation fee not set");
        require(healthCoinToken.balanceOf(msg.sender) >= consultationFee, "Insufficient HealthCoin balance");

        // Calculate platform fee
        uint256 platformFee = (consultationFee * platformFeePercentage) / 100;
        uint256 providerAmount = consultationFee - platformFee;

        // Transfer HealthCoins
        require(healthCoinToken.transferFrom(msg.sender, address(this), platformFee), "Platform fee transfer failed");
        require(healthCoinToken.transferFrom(msg.sender, provider, providerAmount), "Provider payment failed");

        // Record payment
        paymentCounter++;
        payments[paymentCounter] = Payment({
            payer: msg.sender,
            payee: provider,
            amount: consultationFee,
            timestamp: block.timestamp,
            serviceType: serviceType,
            completed: true
        });

        userPayments[msg.sender].push(paymentCounter);
        providerEarnings[provider] += providerAmount;

        emit PaymentProcessed(paymentCounter, msg.sender, provider, consultationFee);
    }

    // Earnings withdrawal
    function withdrawEarnings() public onlyActiveProvider {
        uint256 earnings = providerEarnings[msg.sender];
        require(earnings > 0, "No earnings to withdraw");

        providerEarnings[msg.sender] = 0;
        require(healthCoinToken.transfer(msg.sender, earnings), "Withdrawal failed");

        emit EarningsWithdrawn(msg.sender, earnings);
    }

    // View functions
    function getProviderInfo(address provider) public view returns (ServiceProvider memory) {
        return serviceProviders[provider];
    }

    function getUserPaymentHistory(address user) public view returns (uint256[] memory) {
        return userPayments[user];
    }

    function getPaymentDetails(uint256 paymentId) public view returns (Payment memory) {
        return payments[paymentId];
    }

    function getPlatformBalance() public view returns (uint256) {
        return healthCoinToken.balanceOf(address(this));
    }

    // Owner functions
    function withdrawPlatformFees() public onlyOwner {
        uint256 balance = healthCoinToken.balanceOf(address(this));
        require(balance > 0, "No platform fees to withdraw");
        require(healthCoinToken.transfer(owner, balance), "Platform fee withdrawal failed");
    }

    function updatePlatformFee(uint256 newFeePercentage) public onlyOwner {
        require(newFeePercentage <= 10, "Platform fee cannot exceed 10%");
        platformFeePercentage = newFeePercentage;
    }
}
