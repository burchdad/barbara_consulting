/**
 * Fallback services shown when the database returns no published service items.
 * These mirror the ServiceItem Prisma model shape so they are drop-in compatible.
 */

export type FallbackService = {
  id: string;
  category: string;
  title: string;
  description: string;
  bulletItems: string[];
};

export const fallbackServices: FallbackService[] = [
  {
    id: "fallback-service-1",
    category: "AI Strategy",
    title: "AI Readiness and Roadmaps",
    description:
      "Clear advisory support to identify where AI can improve operations, reduce friction, and create measurable value.",
    bulletItems: [
      "AI opportunity assessment",
      "Use case prioritization",
      "Adoption roadmap",
      "Responsible AI planning",
    ],
  },
  {
    id: "fallback-service-2",
    category: "Workflow Automation",
    title: "Intelligent Process Design",
    description:
      "Workflow analysis and automation planning for teams ready to save time, improve consistency, and modernize service delivery.",
    bulletItems: [
      "Process mapping",
      "Automation strategy",
      "AI assistant planning",
      "Tool selection guidance",
    ],
  },
  {
    id: "fallback-service-3",
    category: "Training & Enablement",
    title: "AI Training for Teams",
    description:
      "Practical AI education that helps leaders and staff understand, evaluate, and use AI tools responsibly.",
    bulletItems: [
      "Executive AI briefings",
      "Team workshops",
      "Prompting fundamentals",
      "Governance awareness",
    ],
  },
];
