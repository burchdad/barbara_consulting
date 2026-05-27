/**
 * Seed-level contract data.
 * Procurement-oriented records used by prisma/seed.ts.
 * Replace vehicle-specific numbers with final contract data when approved.
 */

export const contractsSeed = [
  {
    name: "8(a) STARS III",
    contractNumber: "47QTCB21D0291",
    agency: "GSA",
    period: "Expiration Date: 7/1/2029",
    contractType: "GWAC",
    availability: "Prime contract vehicle",
    programManager: "Barbara Gray",
    email: "Bgray@graymatterstech.com",
    phone: "202-420-1767",
    summary:
      "Governmentwide acquisition contract pathway for AI-forward federal IT modernization, cybersecurity, cloud, data, and mission operations support.",
    scope:
      "AI strategy, application modernization, systems integration, workflow automation, cybersecurity readiness, cloud services, data reporting, and enterprise support.",
    isPublished: true,
    displayOrder: 1,
  },
  {
    name: "GSA MAS Schedule",
    contractNumber: "GS-35F-290CA",
    agency: "GSA",
    period: "Active",
    contractType: "Multiple Award Schedule",
    availability: "Prime and subcontractor support",
    programManager: "Barbara A. Gray",
    email: "Bgray@graymatterstech.com",
    phone: "202-420-1767",
    summary:
      "Modernization support for software development, systems integration, ServiceNow, help desk, O&M, reporting, and secure workflow delivery.",
    scope:
      "AI-agile delivery, API integration, web application modernization, low-code automation, tiered support, transition processing, and performance reporting.",
    isPublished: true,
    displayOrder: 2,
  },
  {
    name: "FAA eFAST BPA",
    contractNumber: "693KA9-22-A-00152",
    agency: "Federal Aviation Administration",
    period: "Active",
    contractType: "BPA",
    availability: "Prime and teaming support",
    programManager: "Barbara A. Gray",
    email: "Bgray@graymatterstech.com",
    phone: "202-420-1767",
    summary:
      "Electronic Federal Aviation Administration accelerated and simplified tasks vehicle supporting technology and professional services needs.",
    scope:
      "Technology modernization, program support, systems integration, cloud, cybersecurity, data, quality assurance, and professional services support.",
    isPublished: true,
    displayOrder: 3,
  },
];
