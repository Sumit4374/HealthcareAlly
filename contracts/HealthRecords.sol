// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthRecords {
    struct MedicationRecord {
        string medicationName;
        uint256 dosage;
        uint256 frequency;
        uint256 startDate;
        uint256 endDate;
        address prescribedBy;
        bool isActive;
    }

    struct IntakeLog {
        uint256 medicationId;
        uint256 timestamp;
        bool taken;
        string notes;
    }

    struct ConsentRecord {
        address patient;
        address provider;
        uint256 grantedAt;
        uint256 expiresAt;
        bool isActive;
    }

    // Mappings
    mapping(address => MedicationRecord[]) public patientMedications;
    mapping(address => IntakeLog[]) public intakeLogs;
    mapping(bytes32 => ConsentRecord) public consentRecords;
    mapping(address => bool) public registeredDoctors;
    mapping(address => bool) public registeredHospitals;

    // Events
    event MedicationPrescribed(address indexed patient, address indexed doctor, uint256 medicationId);
    event MedicationTaken(address indexed patient, uint256 medicationId, uint256 timestamp);
    event ConsentGranted(address indexed patient, address indexed provider, bytes32 consentId);
    event ConsentRevoked(address indexed patient, address indexed provider, bytes32 consentId);
    event DoctorRegistered(address indexed doctor);
    event HospitalRegistered(address indexed hospital);

    modifier onlyRegisteredDoctor() {
        require(registeredDoctors[msg.sender], "Only registered doctors can perform this action");
        _;
    }

    modifier onlyRegisteredHospital() {
        require(registeredHospitals[msg.sender], "Only registered hospitals can perform this action");
        _;
    }

    modifier onlyWithConsent(address patient) {
        bytes32 consentId = keccak256(abi.encodePacked(patient, msg.sender));
        ConsentRecord memory consent = consentRecords[consentId];
        require(consent.isActive && consent.expiresAt > block.timestamp, "No valid consent");
        _;
    }

    // Registration functions
    function registerDoctor() public {
        registeredDoctors[msg.sender] = true;
        emit DoctorRegistered(msg.sender);
    }

    function registerHospital() public {
        registeredHospitals[msg.sender] = true;
        emit HospitalRegistered(msg.sender);
    }

    // Consent management
    function grantConsent(address provider, uint256 duration) public {
        bytes32 consentId = keccak256(abi.encodePacked(msg.sender, provider));
        consentRecords[consentId] = ConsentRecord({
            patient: msg.sender,
            provider: provider,
            grantedAt: block.timestamp,
            expiresAt: block.timestamp + duration,
            isActive: true
        });
        emit ConsentGranted(msg.sender, provider, consentId);
    }

    function revokeConsent(address provider) public {
        bytes32 consentId = keccak256(abi.encodePacked(msg.sender, provider));
        consentRecords[consentId].isActive = false;
        emit ConsentRevoked(msg.sender, provider, consentId);
    }

    // Medication management
    function prescribeMedication(
        address patient,
        string memory medicationName,
        uint256 dosage,
        uint256 frequency,
        uint256 duration
    ) public onlyRegisteredDoctor onlyWithConsent(patient) {
        uint256 medicationId = patientMedications[patient].length;
        
        patientMedications[patient].push(MedicationRecord({
            medicationName: medicationName,
            dosage: dosage,
            frequency: frequency,
            startDate: block.timestamp,
            endDate: block.timestamp + duration,
            prescribedBy: msg.sender,
            isActive: true
        }));

        emit MedicationPrescribed(patient, msg.sender, medicationId);
    }

    function logMedicationIntake(uint256 medicationId, string memory notes) public {
        require(medicationId < patientMedications[msg.sender].length, "Invalid medication ID");
        require(patientMedications[msg.sender][medicationId].isActive, "Medication is not active");

        intakeLogs[msg.sender].push(IntakeLog({
            medicationId: medicationId,
            timestamp: block.timestamp,
            taken: true,
            notes: notes
        }));

        emit MedicationTaken(msg.sender, medicationId, block.timestamp);
    }

    // View functions
    function getPatientMedications(address patient) public view onlyWithConsent(patient) returns (MedicationRecord[] memory) {
        return patientMedications[patient];
    }

    function getIntakeLogs(address patient) public view onlyWithConsent(patient) returns (IntakeLog[] memory) {
        return intakeLogs[patient];
    }

    function getMedicationCount(address patient) public view returns (uint256) {
        return patientMedications[patient].length;
    }

    function getIntakeLogCount(address patient) public view returns (uint256) {
        return intakeLogs[patient].length;
    }
}
