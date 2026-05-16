/**
 * Seed-level service item data.
 * Neutral demo records used by prisma/seed.ts.
 */

export const servicesSeed = [
  {
    category: "AI Strategy",
    title: "AI Readiness and Roadmaps",
    description:
      "Strategic advisory support to identify practical AI use cases, prioritize value, and create a clear adoption roadmap.",
    bulletItems: [
      "AI opportunity assessment",
      "Use case prioritization",
      "Responsible AI governance",
      "Executive roadmap development",
    ],
    displayOrder: 1,
    isPublished: true,
  },
  {
    category: "Workflow Automation",
    title: "Intelligent Process Design",
    description:
      "Workflow modernization and automation planning for teams ready to reduce manual work and improve consistency.",
    bulletItems: [
      "Process mapping and redesign",
      "AI assistant strategy",
      "Automation tool selection",
      "Implementation planning",
    ],
    displayOrder: 2,
    isPublished: true,
  },
  {
    category: "Training & Enablement",
    title: "AI Training for Teams",
    description:
      "Practical AI education for leaders and staff who need to understand, evaluate, and use AI responsibly.",
    bulletItems: [
      "Executive AI briefings",
      "Team workshops",
      "Prompting and productivity training",
      "Responsible use guidance",
    ],
    displayOrder: 3,
    isPublished: true,
  },
];
