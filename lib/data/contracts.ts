/**
 * Seed-level contract data.
 * Neutral demo records used by prisma/seed.ts.
 * Replace with real contract vehicles before deploying.
 */

export const contractsSeed = [
  {
    name: "Enterprise IT Operations Support",
    contractNumber: "ENT-ITOPS-001",
    agency: "Federal Civilian Agency",
    period: "2024-2029",
    contractType: "IDIQ",
    availability: "Open to task orders",
    programManager: "Jordan Miles",
    email: "contracts@company.com",
    phone: "+1 (202) 555-0142",
    summary:
      "Managed services for secure enterprise operations and end-user support.",
    scope:
      "Infrastructure operations, ITSM, cybersecurity operations, reporting and governance.",
    isPublished: true,
    displayOrder: 1,
  },
  {
    name: "Mission Engineering Integration",
    contractNumber: "ENT-ENG-014",
    agency: "Department of Defense",
    period: "2023-2028",
    contractType: "BPA",
    availability: "Prime",
    programManager: "Avery Chen",
    email: "engagements@company.com",
    phone: "+1 (202) 555-0178",
    summary:
      "Engineering modernization services for secure mission platforms.",
    scope:
      "Systems engineering, software modernization, integration testing, and accreditation support.",
    isPublished: true,
    displayOrder: 2,
  },
  {
    name: "Global Logistics Sustainment",
    contractNumber: "ENT-LOG-032",
    agency: "Department of the Army",
    period: "2025-2030",
    contractType: "GWAC",
    availability: "Sub and prime opportunities",
    programManager: "Riley Vaughn",
    email: "logistics@company.com",
    phone: "+1 (202) 555-0133",
    summary:
      "Lifecycle logistics planning and operational sustainment support.",
    scope:
      "Supply chain management, readiness analysis, warehousing optimization, and field support.",
    isPublished: true,
    displayOrder: 3,
  },
];
