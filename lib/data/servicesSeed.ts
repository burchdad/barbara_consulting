/**
 * Seed-level service item data.
 * Neutral demo records used by prisma/seed.ts.
 */

export const servicesSeed = [
  {
    category: "Professional Services",
    title: "AI Program and Acquisition Support",
    description:
      "Strategic advisory and execution support for AI-enabled enterprise programs and procurement workflows.",
    bulletItems: [
      "AI roadmap and PMO operations",
      "Acquisition planning for AI initiatives",
      "Performance analytics and KPI governance",
      "Compliance and responsible AI controls",
    ],
    displayOrder: 1,
    isPublished: true,
  },
  {
    category: "Engineering & Technology Services",
    title: "Secure AI Modernization",
    description:
      "Engineering services for resilient, mission-grade digital and AI systems.",
    bulletItems: [
      "Cloud AI architecture",
      "MLOps and DevSecOps",
      "Cyber engineering for AI workloads",
      "Data platform modernization",
    ],
    displayOrder: 2,
    isPublished: true,
  },
  {
    category: "Mission Support & Logistics",
    title: "AI-Driven Operational Readiness",
    description:
      "End-to-end logistics and sustainment support with AI-assisted planning for global operations.",
    bulletItems: [
      "Readiness planning and forecasting",
      "Supply chain intelligence support",
      "Field operations decision support",
      "Predictive asset lifecycle management",
    ],
    displayOrder: 3,
    isPublished: true,
  },
];
