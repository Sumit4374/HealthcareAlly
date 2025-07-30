// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./HealthCoin.sol";

contract RewardSystem {
    HealthCoin public healthCoinToken;
    address public owner;

    struct RewardRule {
        string activityType;
        uint256 rewardAmount;
        uint256 cooldownPeriod;
        bool isActive;
    }

    struct UserActivity {
        address user;
        string activityType;
        uint256 timestamp;
        uint256 rewardEarned;
    }

    // Mappings
    mapping(string => RewardRule) public rewardRules;
    mapping(address => mapping(string => uint256)) public lastActivityTime;
    mapping(address => uint256) public totalRewardsEarned;
    mapping(address => UserActivity[]) public userActivities;

    // Events
    event RewardRuleCreated(string activityType, uint256 rewardAmount);
    event RewardDistributed(address indexed user, string activityType, uint256 amount);
    event ActivityLogged(address indexed user, string activityType, uint256 timestamp);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor(address _healthCoinToken) {
        healthCoinToken = HealthCoin(_healthCoinToken);
        owner = msg.sender;
        
        // Initialize default reward rules
        _createRewardRule("MEDICATION_TAKEN", 5 * 10**18, 1 hours); // 5 HC per medication, 1 hour cooldown
        _createRewardRule("APPOINTMENT_ATTENDED", 25 * 10**18, 1 days); // 25 HC per appointment, 1 day cooldown
        _createRewardRule("HEALTH_SURVEY", 15 * 10**18, 7 days); // 15 HC per survey, 1 week cooldown
        _createRewardRule("STREAK_BONUS", 50 * 10**18, 7 days); // 50 HC for 7-day streak, weekly
    }

    function _createRewardRule(string memory activityType, uint256 rewardAmount, uint256 cooldownPeriod) internal {
        rewardRules[activityType] = RewardRule({
            activityType: activityType,
            rewardAmount: rewardAmount,
            cooldownPeriod: cooldownPeriod,
            isActive: true
        });
        emit RewardRuleCreated(activityType, rewardAmount);
    }

    function createRewardRule(
        string memory activityType,
        uint256 rewardAmount,
        uint256 cooldownPeriod
    ) public onlyOwner {
        _createRewardRule(activityType, rewardAmount, cooldownPeriod);
    }

    function updateRewardRule(
        string memory activityType,
        uint256 newRewardAmount,
        uint256 newCooldownPeriod,
        bool isActive
    ) public onlyOwner {
        RewardRule storage rule = rewardRules[activityType];
        rule.rewardAmount = newRewardAmount;
        rule.cooldownPeriod = newCooldownPeriod;
        rule.isActive = isActive;
    }

    function logActivity(address user, string memory activityType) public {
        RewardRule memory rule = rewardRules[activityType];
        require(rule.isActive, "Reward rule is not active");

        // Check cooldown period
        uint256 lastActivity = lastActivityTime[user][activityType];
        require(block.timestamp >= lastActivity + rule.cooldownPeriod, "Cooldown period not met");

        // Update last activity time
        lastActivityTime[user][activityType] = block.timestamp;

        // Log activity
        userActivities[user].push(UserActivity({
            user: user,
            activityType: activityType,
            timestamp: block.timestamp,
            rewardEarned: rule.rewardAmount
        }));

        // Distribute reward
        healthCoinToken.distributeReward(user, rule.rewardAmount, activityType);
        totalRewardsEarned[user] += rule.rewardAmount;

        emit ActivityLogged(user, activityType, block.timestamp);
        emit RewardDistributed(user, activityType, rule.rewardAmount);
    }

    function logMedicationTaken(address user) public {
        logActivity(user, "MEDICATION_TAKEN");
    }

    function logAppointmentAttended(address user) public {
        logActivity(user, "APPOINTMENT_ATTENDED");
    }

    function logHealthSurvey(address user) public {
        logActivity(user, "HEALTH_SURVEY");
    }

    function logStreakBonus(address user) public {
        logActivity(user, "STREAK_BONUS");
    }

    // View functions
    function getRewardRule(string memory activityType) public view returns (RewardRule memory) {
        return rewardRules[activityType];
    }

    function getUserActivities(address user) public view returns (UserActivity[] memory) {
        return userActivities[user];
    }

    function getUserTotalRewards(address user) public view returns (uint256) {
        return totalRewardsEarned[user];
    }

    function canEarnReward(address user, string memory activityType) public view returns (bool) {
        RewardRule memory rule = rewardRules[activityType];
        if (!rule.isActive) return false;

        uint256 lastActivity = lastActivityTime[user][activityType];
        return block.timestamp >= lastActivity + rule.cooldownPeriod;
    }

    function getTimeUntilNextReward(address user, string memory activityType) public view returns (uint256) {
        RewardRule memory rule = rewardRules[activityType];
        uint256 lastActivity = lastActivityTime[user][activityType];
        uint256 nextAvailable = lastActivity + rule.cooldownPeriod;
        
        if (block.timestamp >= nextAvailable) {
            return 0;
        }
        return nextAvailable - block.timestamp;
    }
}
