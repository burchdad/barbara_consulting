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
    title: "AI Readiness, Governance, and Roadmaps",
    description:
      "Advisory support to identify practical AI use cases, establish responsible governance, and create adoption roadmaps tied to mission outcomes.",
    bulletItems: [
      "AI opportunity assessment",
      "Use case prioritization",
      "Adoption roadmap",
      "Responsible AI planning",
    ],
  },
  {
    id: "fallback-service-2",
    category: "AI-Agile Software Development",
    title: "Application Modernization",
    description:
      "AI-assisted agile development, modernization, and integration support for web applications, enterprise systems, and mission platforms.",
    bulletItems: [
      "AI-assisted development",
      "Systems integration",
      "API and data exchange",
      "Application sustainment",
    ],
  },
  {
    id: "fallback-service-3",
    category: "Workflow Automation",
    title: "Low-Code and Process Automation",
    description:
      "Power Platform, SharePoint, Appian, and low-code modernization support to replace fragmented tools and streamline work.",
    bulletItems: [
      "Power Apps and Power Automate",
      "SharePoint automation",
      "Appian forms and workflows",
      "Process redesign",
    ],
  },
  {
    id: "fallback-service-4",
    category: "Cloud & Infrastructure",
    title: "Cloud Solutions and Enterprise Support",
    description:
      "Cloud, infrastructure, help desk, and operations support for organizations modernizing secure service delivery.",
    bulletItems: [
      "AWS cloud services",
      "SaaS and IaaS support",
      "Tier 2 and Tier 3 help desk",
      "ServiceNow operations",
    ],
  },
  {
    id: "fallback-service-5",
    category: "Cybersecurity & Compliance",
    title: "Cyber Readiness and ATO Support",
    description:
      "Cybersecurity, risk assessment, compliance, and authority-to-operate support for regulated mission environments.",
    bulletItems: [
      "Risk assessments",
      "ATO readiness",
      "Security testing support",
      "Compliance documentation",
    ],
  },
  {
    id: "fallback-service-6",
    category: "Data Intelligence",
    title: "Reporting, Analytics, and Data Operations",
    description:
      "Data analysis, reporting, performance management, and dashboard support for teams that need better operational visibility.",
    bulletItems: [
      "Power BI and SSRS",
      "Database analysis",
      "Performance reporting",
      "Decision support dashboards",
    ],
  },
  {
    id: "fallback-service-7",
    category: "Mission Support",
    title: "Logistics and Program Operations",
    description:
      "Operational support across logistics, performance management, staffing, and mission program execution.",
    bulletItems: [
      "Logistics support",
      "Program management",
      "Staff augmentation",
      "Operational sustainment",
    ],
  },
  {
    id: "fallback-service-8",
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
