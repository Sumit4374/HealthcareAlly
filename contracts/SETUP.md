# HealthPal Smart Contracts - Local Setup Guide

## Quick Start (Local Development)

### 1. Install Dependencies
\`\`\`bash
cd contracts
npm install
\`\`\`

### 2. Create Environment File (Optional for local development)
\`\`\`bash
# On Windows PowerShell
Copy-Item .env.example .env

# On Mac/Linux
cp .env.example .env
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
# Start local Hardhat network (in one terminal)
npm run node

# Deploy contracts (in another terminal)
npm run deploy
\`\`\`

## Troubleshooting

### Issue: "Cannot find module 'dotenv'"
**Solution**: Install missing dependency
\`\`\`bash
npm install dotenv
\`\`\`

### Issue: ".env.example does not exist"
**Solution**: The file should be created automatically. If not, create it manually:
\`\`\`bash
# Create empty .env file for local development
echo "# Local development - no environment variables needed" > .env
\`\`\`

### Issue: "cp command not found" (Windows)
**Solution**: Use PowerShell Copy-Item command:
```powershell
Copy-Item .env.example .env
