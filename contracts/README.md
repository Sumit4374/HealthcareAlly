# HealthPal Smart Contracts

This directory contains the smart contracts for the HealthPal decentralized healthcare ecosystem.

## Contracts Overview

### 1. HealthCoin.sol
- **ERC-20 token** for the HealthPal ecosystem
- **Total Supply**: 10 Million HC (1 Million initial mint)
- **Features**: Minting, burning, reward distribution
- **Exchange Rate**: 1 HC = $0.10 USD

### 2. HealthRecords.sol
- **Decentralized health records** management
- **Consent-based access** control
- **Medication tracking** and prescription management
- **Doctor/Hospital registration** system

### 3. PaymentGateway.sol
- **Payment processing** for healthcare services
- **HealthCoin integration** for transactions
- **Platform fee management** (5% default)
- **Provider earnings** tracking

### 4. RewardSystem.sol
- **Automated reward distribution** for healthy behaviors
- **Activity tracking** with cooldown periods
- **Configurable reward rules**
- **Streak bonuses** and incentives

## Setup Instructions

### 1. Install Dependencies
\`\`\`bash
cd contracts
npm install
\`\`\`

### 2. Configure Environment
\`\`\`bash
cp .env.example .env
# Edit .env with your configuration
\`\`\`

### 3. Compile Contracts
\`\`\`bash
npm run compile
\`\`\`

### 4. Run Tests
\`\`\`bash
npm run test
\`\`\`

### 5. Deploy to Local Network
\`\`\`bash
npm run deploy
\`\`\`

### 6. Deploy to Testnet
\`\`\`bash
npm run deploy:testnet
\`\`\`

## Contract Addresses

After deployment, contract addresses will be saved in `deployments-{network}.json` files.

## Reward System

### Default Reward Rules
- **Medication Taken**: +5 HC (1 hour cooldown)
- **Appointment Attended**: +25 HC (1 day cooldown)
- **Health Survey**: +15 HC (1 week cooldown)
- **7-Day Streak**: +50 HC (weekly bonus)

## Security Features

- **Access Control**: Role-based permissions
- **Consent Management**: Patient-controlled data access
- **Cooldown Periods**: Prevent reward farming
- **Supply Limits**: Maximum token supply protection
- **Authorized Providers**: Verified healthcare providers only

## Integration

These contracts integrate with the HealthPal frontend through:
- **Web3.js/Ethers.js** for blockchain interaction
- **MetaMask** for wallet connectivity
- **Event listening** for real-time updates
- **Transaction management** for user actions
