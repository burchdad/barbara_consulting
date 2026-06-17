/**
 * Seed-level testimonial data.
 * Neutral demo records used by prisma/seed.ts.
 * Replace with real client testimonials before deploying.
 */

export const testimonialsSeed = [
  {
    id: "seed-program-executive",
    quote:
      "The team improved delivery velocity while strengthening governance and transparency across our contracts.",
    authorName: "Program Executive",
    authorTitle: "Federal Civilian Agency",
    organization: "U.S. Government",
    isPublished: true,
    displayOrder: 1,
  },
  {
    id: "seed-acquisition-lead",
    quote:
      "Their engineering and operations team integrated quickly and performed under pressure from day one.",
    authorName: "Acquisition Lead",
    authorTitle: "DoD Program Office",
    organization: "Department of Defense",
    isPublished: true,
    displayOrder: 2,
  },
  {
    id: "seed-division-director",
    quote:
      "A mission-first partner with exceptional accountability and communication discipline.",
    authorName: "Division Director",
    authorTitle: "National Security Client",
    organization: "Federal Partner",
    isPublished: true,
    displayOrder: 3,
  },
];
