# Insurance Management System

This document describes the newly added Insurance functionality for the Healthcare Ally application, covering Patient, Doctor, and Hospital insurance features.

## Overview

The Insurance Management System provides comprehensive insurance-related functionality for all three user types in the Healthcare Ally ecosystem:

1. **Patient Insurance Management** - Personal insurance policies and claims
2. **Doctor Insurance Management** - Provider relationships and patient coverage
3. **Hospital Insurance Management** - Partnerships and hospital schemes

## Features Added

### 📋 Patient Insurance (`/patient/insurances`)

**Key Features:**
- View all personal insurance policies
- Track policy status (active, expired, pending)
- Monitor coverage details and limits
- View claims history with status tracking
- Contact insurance providers directly
- Quick stats dashboard with coverage overview

**Data Included:**
- Policy information (number, provider, plan name)
- Coverage amounts, deductibles, and co-pays
- Claims tracking with approval status
- Provider contact information
- Validity periods and renewals

### 👨‍⚕️ Doctor Insurance (`/doctor/insurances`)

**Key Features:**
- Manage insurance provider relationships
- View patient insurance information
- Track reimbursement rates and processing times
- Monitor monthly revenue from insurance claims
- Analyze provider performance metrics

**Two Main Tabs:**
1. **Insurance Providers** - Manage relationships with insurance companies
2. **Patient Insurance** - View patient coverage and claim status

**Analytics Include:**
- Approval/denial rates
- Average claim processing time
- Monthly reimbursement amounts
- Patient coverage verification

### 🏥 Hospital Insurance (`/hospital/insurances`)

**Key Features:**
- Manage insurance partnerships and contracts
- Offer hospital-specific insurance schemes
- Track partnership performance and revenue
- Monitor claim volumes and settlement ratios

**Two Main Sections:**
1. **Insurance Partnerships** - Manage relationships with insurance providers
2. **Hospital Schemes** - Create and manage hospital-specific insurance plans

**Partnership Management:**
- Contract terms and reimbursement rates
- Service coverage and limitations
- Performance analytics and metrics
- Contact management for representatives

## Navigation Updates

All three user types now have an "Insurances" option in their sidebar navigation:
- 🛡️ **Patient Sidebar**: Insurance Schemes
- 🛡️ **Doctor Sidebar**: Insurance Management
- 🛡️ **Hospital Sidebar**: Insurance Management

## Technical Implementation

### File Structure
```
app/
├── patient/
│   └── insurances/
│       └── page.tsx
├── doctor/
│   └── insurances/
│       └── page.tsx
└── hospital/
    └── insurances/
        └── page.tsx

components/
├── patient-sidebar.tsx (updated)
├── doctor-sidebar.tsx (updated)
└── hospital-sidebar.tsx (updated)
```

### Technologies Used
- **React 18** with TypeScript
- **Next.js 14** App Router
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Radix UI** components (Dialog, Tabs, Cards, etc.)

### Key Components Used
- Cards for information display
- Dialogs for detailed views and forms
- Tabs for organizing different sections
- Badges for status indicators
- Charts for analytics display

## Data Models

### Insurance Scheme (Patient)
```typescript
interface InsuranceScheme {
  id: string
  provider: string
  policyNumber: string
  planName: string
  coverageAmount: number
  premium: number
  deductible: number
  copay: number
  startDate: string
  endDate: string
  status: "active" | "expired" | "pending"
  coverage: string[]
  providerContact: ContactInfo
  claims: Claim[]
}
```

### Insurance Provider (Doctor)
```typescript
interface InsuranceProvider {
  id: string
  name: string
  contactInfo: ContactInfo
  acceptedPlans: string[]
  reimbursementRate: number
  claimProcessingTime: string
  status: "active" | "pending" | "suspended"
  totalPatients: number
  monthlyReimbursement: number
}
```

### Insurance Partnership (Hospital)
```typescript
interface InsurancePartnership {
  id: string
  providerName: string
  partnershipType: "preferred" | "standard" | "limited"
  contractStartDate: string
  contractEndDate: string
  reimbursementRate: number
  status: "active" | "pending" | "suspended" | "expired"
  performanceMetrics: PerformanceMetrics
}
```

## Future Enhancements

1. **Integration with Blockchain** - Link with HealthCoin for premium payments
2. **AI-Powered Claims** - Automated claim processing and approval
3. **Real-time Notifications** - Policy renewals and claim updates
4. **Mobile App Integration** - QR code scanning for quick policy access
5. **Analytics Dashboard** - Advanced reporting and insights

## Usage Instructions

1. **For Patients**: Navigate to "Insurances" in the sidebar to view and manage your insurance policies
2. **For Doctors**: Use the Insurance section to manage provider relationships and verify patient coverage
3. **For Hospitals**: Access Insurance management to handle partnerships and create hospital schemes

## Support

For technical support or questions about the insurance features, please refer to the main Healthcare Ally documentation or contact the development team.
