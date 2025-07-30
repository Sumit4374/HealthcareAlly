const hre = require("hardhat")

async function main() {
  console.log("Deploying HealthPal Smart Contracts...")

  // Deploy HealthCoin token
  const HealthCoin = await hre.ethers.getContractFactory("HealthCoin")
  const healthCoin = await HealthCoin.deploy()
  await healthCoin.waitForDeployment()
  console.log("HealthCoin deployed to:", await healthCoin.getAddress())

  // Deploy HealthRecords
  const HealthRecords = await hre.ethers.getContractFactory("HealthRecords")
  const healthRecords = await HealthRecords.deploy()
  await healthRecords.waitForDeployment()
  console.log("HealthRecords deployed to:", await healthRecords.getAddress())

  // Deploy PaymentGateway
  const PaymentGateway = await hre.ethers.getContractFactory("PaymentGateway")
  const paymentGateway = await PaymentGateway.deploy(await healthCoin.getAddress())
  await paymentGateway.waitForDeployment()
  console.log("PaymentGateway deployed to:", await paymentGateway.getAddress())

  // Deploy RewardSystem
  const RewardSystem = await hre.ethers.getContractFactory("RewardSystem")
  const rewardSystem = await RewardSystem.deploy(await healthCoin.getAddress())
  await rewardSystem.waitForDeployment()
  console.log("RewardSystem deployed to:", await rewardSystem.getAddress())

  // Authorize RewardSystem to distribute rewards
  await healthCoin.authorizeProvider(await rewardSystem.getAddress())
  console.log("RewardSystem authorized as provider")

  console.log("\n=== Deployment Summary ===")
  console.log("HealthCoin:", await healthCoin.getAddress())
  console.log("HealthRecords:", await healthRecords.getAddress())
  console.log("PaymentGateway:", await paymentGateway.getAddress())
  console.log("RewardSystem:", await rewardSystem.getAddress())

  // Save deployment addresses
  const fs = require("fs")
  const deploymentInfo = {
    network: hre.network.name,
    contracts: {
      HealthCoin: await healthCoin.getAddress(),
      HealthRecords: await healthRecords.getAddress(),
      PaymentGateway: await paymentGateway.getAddress(),
      RewardSystem: await rewardSystem.getAddress(),
    },
    timestamp: new Date().toISOString(),
  }

  fs.writeFileSync(`deployments-${hre.network.name}.json`, JSON.stringify(deploymentInfo, null, 2))
  console.log(`\nDeployment info saved to deployments-${hre.network.name}.json`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
