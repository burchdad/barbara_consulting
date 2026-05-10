/**
 * Seed-level service item data.
 * Neutral demo records used by prisma/seed.ts.
 */

export const servicesSeed = [
  {
    category: "Professional Services",
    title: "Program and Acquisition Support",
    description:
      "Strategic and execution support for enterprise programs and procurement workflows.",
    bulletItems: [
      "PMO operations",
      "Acquisition planning",
      "Performance analytics",
      "Compliance support",
    ],
    displayOrder: 1,
    isPublished: true,
  },
  {
    category: "Engineering & Technology Services",
    title: "Secure Modernization",
    description:
      "Engineering services for resilient, mission-grade digital systems.",
    bulletItems: [
      "Cloud architecture",
      "DevSecOps",
      "Cyber engineering",
      "Data platform modernization",
    ],
    displayOrder: 2,
    isPublished: true,
  },
  {
    category: "Mission Support & Logistics",
    title: "Operational Readiness",
    description:
      "End-to-end logistics and sustainment support for global operations.",
    bulletItems: [
      "Readiness planning",
      "Supply chain support",
      "Field operations",
      "Asset lifecycle management",
    ],
    displayOrder: 3,
    isPublished: true,
  },
];
