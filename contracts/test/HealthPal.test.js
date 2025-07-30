const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("HealthPal Contracts", () => {
  let healthCoin, healthRecords, paymentGateway, rewardSystem
  let owner, patient, doctor, hospital

  beforeEach(async () => {
    ;[owner, patient, doctor, hospital] = await ethers.getSigners()

    // Deploy HealthCoin
    const HealthCoin = await ethers.getContractFactory("HealthCoin")
    healthCoin = await HealthCoin.deploy()
    await healthCoin.waitForDeployment()

    // Deploy HealthRecords
    const HealthRecords = await ethers.getContractFactory("HealthRecords")
    healthRecords = await HealthRecords.deploy()
    await healthRecords.waitForDeployment()

    // Deploy PaymentGateway
    const PaymentGateway = await ethers.getContractFactory("PaymentGateway")
    paymentGateway = await PaymentGateway.deploy(await healthCoin.getAddress())
    await paymentGateway.waitForDeployment()

    // Deploy RewardSystem
    const RewardSystem = await ethers.getContractFactory("RewardSystem")
    rewardSystem = await RewardSystem.deploy(await healthCoin.getAddress())
    await rewardSystem.waitForDeployment()

    // Authorize RewardSystem
    await healthCoin.authorizeProvider(await rewardSystem.getAddress())
  })

  describe("HealthCoin", () => {
    it("Should have correct name and symbol", async () => {
      expect(await healthCoin.name()).to.equal("HealthCoin")
      expect(await healthCoin.symbol()).to.equal("HC")
    })

    it("Should mint initial supply to owner", async () => {
      const ownerBalance = await healthCoin.balanceOf(owner.address)
      expect(ownerBalance).to.equal(ethers.parseEther("1000000"))
    })

    it("Should distribute rewards correctly", async () => {
      const rewardAmount = ethers.parseEther("5")
      await healthCoin.authorizeProvider(owner.address)

      await healthCoin.distributeReward(patient.address, rewardAmount, "Test reward")

      const patientBalance = await healthCoin.balanceOf(patient.address)
      expect(patientBalance).to.equal(rewardAmount)
    })
  })

  describe("RewardSystem", () => {
    it("Should log medication activity and distribute reward", async () => {
      const initialBalance = await healthCoin.balanceOf(patient.address)

      await rewardSystem.logMedicationTaken(patient.address)

      const finalBalance = await healthCoin.balanceOf(patient.address)
      expect(finalBalance).to.be.gt(initialBalance)
    })

    it("Should respect cooldown periods", async () => {
      await rewardSystem.logMedicationTaken(patient.address)

      // Try to log again immediately (should fail due to cooldown)
      await expect(rewardSystem.logMedicationTaken(patient.address)).to.be.revertedWith("Cooldown period not met")
    })
  })

  describe("HealthRecords", () => {
    it("Should register doctors and hospitals", async () => {
      await healthRecords.connect(doctor).registerDoctor()
      await healthRecords.connect(hospital).registerHospital()

      expect(await healthRecords.registeredDoctors(doctor.address)).to.be.true
      expect(await healthRecords.registeredHospitals(hospital.address)).to.be.true
    })

    it("Should manage consent properly", async () => {
      const duration = 86400 // 1 day
      await healthRecords.connect(patient).grantConsent(doctor.address, duration)

      const consentId = ethers.keccak256(
        ethers.solidityPacked(["address", "address"], [patient.address, doctor.address]),
      )
      const consent = await healthRecords.consentRecords(consentId)
      expect(consent.isActive).to.be.true
    })
  })
})
