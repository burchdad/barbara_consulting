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
    category: "Professional Services",
    title: "Program and Acquisition Support",
    description:
      "Enterprise program oversight, acquisition planning, and performance management support for complex portfolios.",
    bulletItems: [
      "PMO governance",
      "Acquisition support",
      "Performance analytics",
      "Compliance management",
    ],
  },
  {
    id: "fallback-service-2",
    category: "Engineering & Technology Services",
    title: "Mission Engineering and Cyber",
    description:
      "Secure architecture, DevSecOps, and data modernization services aligned to mission risk and resilience requirements.",
    bulletItems: [
      "Cloud modernization",
      "DevSecOps pipelines",
      "Zero-trust security",
      "Data interoperability",
    ],
  },
  {
    id: "fallback-service-3",
    category: "Mission Support & Logistics",
    title: "Readiness and Sustainment",
    description:
      "Operational sustainment capabilities across planning, supply chain readiness, and field support operations.",
    bulletItems: [
      "Readiness analytics",
      "Supply chain support",
      "Field logistics",
      "Lifecycle sustainment",
    ],
  },
];
