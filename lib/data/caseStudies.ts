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
      "Unified reporting across mission systems with secure AI-driven data exchange and measurable uptime gains.",
    iconUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a",
    highlights: [
      "99.97% platform availability",
      "Reduced reporting cycle by 61%",
      "AI-assisted anomaly detection",
      "FedRAMP-compatible controls",
    ],
    challenge:
      "The client operated disconnected reporting systems that delayed operational decisions.",
    solution:
      "Implemented a governed integration fabric with automated validation, AI-assisted anomaly triage, lineage, and role-based access.",
    results:
      "Decision makers received near real-time AI-enhanced dashboards with reduced reconciliation effort.",
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
      "Rebuilt ITSM workflows with AI triage and SLA automation to restore confidence in a high-volume support environment.",
    iconUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    highlights: [
      "42% faster ticket resolution",
      "AI-assisted issue classification",
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
      "Improved mission readiness through AI-enhanced inventory controls and partner coordination.",
    iconUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    highlights: [
      "Reduced stockout events",
      "Predictive replenishment alerts",
      "Faster mobilization cycles",
      "Audit-ready records",
    ],
    challenge:
      "Fragmented logistics visibility caused delays in critical operations.",
    solution:
      "Introduced centralized readiness dashboards, AI demand forecasting, and predictive replenishment workflows.",
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
