/**
 * Seed-level case study data.
 * Neutral demo records used by prisma/seed.ts.
 * Replace with real client case studies before deploying.
 */

export const caseStudiesSeed = [
  {
    title: "Modernizing Cross-Agency Data Pipelines",
    slug: "cross-agency-data-modernization",
    summary:
      "Unified reporting across multiple mission systems with secure data exchange and measurable uptime gains.",
    iconUrl: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    highlights: [
      "99.97% platform availability",
      "Reduced reporting cycle by 61%",
      "FedRAMP-compatible controls",
    ],
    challenge:
      "The client operated disconnected reporting systems that delayed operational decisions.",
    solution:
      "Implemented a governed integration fabric with automated validation, lineage, and role-based access.",
    results:
      "Decision makers received near real-time dashboards with reduced reconciliation effort.",
    metrics: [
      "61% faster reporting",
      "$4.3M annualized cost avoidance",
      "12 programs integrated",
    ],
    isFeatured: true,
    isPublished: true,
    displayOrder: 1,
  },
  {
    title: "Enterprise Service Desk Stabilization",
    slug: "service-desk-stabilization",
    summary:
      "Rebuilt ITSM workflows and SLAs to restore confidence for a high-volume enterprise support environment.",
    iconUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    imageUrl: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc",
    highlights: [
      "42% faster ticket resolution",
      "Increased first-call resolution",
      "Improved end-user satisfaction",
    ],
    challenge: "Ticket backlogs and outdated runbooks created operational risk.",
    solution:
      "Established tiered triage, AI-assisted routing, and standardized knowledge workflows.",
    results:
      "Teams regained predictable service operations with better responsiveness.",
    metrics: ["42% faster MTTR", "27% higher FCR", "99.5% SLA adherence"],
    isFeatured: true,
    isPublished: true,
    displayOrder: 2,
  },
  {
    title: "Rapid Logistics Readiness Program",
    slug: "rapid-logistics-readiness",
    summary:
      "Improved mission readiness through smarter inventory controls and partner coordination.",
    iconUrl: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef",
    imageUrl: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8",
    highlights: [
      "Reduced stockout events",
      "Faster mobilization cycles",
      "Audit-ready records",
    ],
    challenge:
      "Fragmented logistics visibility caused delays in critical operations.",
    solution:
      "Introduced centralized readiness dashboards and predictive replenishment workflows.",
    results:
      "Program improved readiness confidence and decreased emergency procurement events.",
    metrics: [
      "33% fewer stockouts",
      "22% faster deployment prep",
      "100% audit traceability",
    ],
    isFeatured: true,
    isPublished: true,
    displayOrder: 3,
  },
];
