/**
 * Global site configuration.
 *
 * This is the single source of truth for all static branding,
 * copy, and contact details used as fallbacks when the database
 * GlobalSetting record is not yet populated.
 *
 * HOW TO REBRAND FOR A NEW CLIENT
 * --------------------------------
 * 1. Update every field below with the client's real values.
 * 2. Run `npm run db:seed` to push the values into the database
 *    so the admin CMS reflects the new data immediately.
 * 3. Swap /public/images/logo.* with the client logo.
 * 4. Adjust the `primary` color token in globals.css if needed.
 */

export const siteConfig = {
  companyName: "Your Company",
  tagline: "Engineered for Mission Outcomes",

  hero: {
    eyebrow: "Enterprise Mission Delivery",
    headline: "Engineered for National Mission Outcomes",
    subtext:
      "Integrated professional services, engineering delivery, and mission support logistics for organizations requiring precision, speed, and accountability.",
    trustBadge:
      "Procurement-ready delivery teams trusted by mission-critical stakeholders",
    ctaPrimary: "Get in Touch",
    ctaSecondary: "Explore Capabilities",
  },

  about: {
    missionStatement:
      "Deliver trusted, secure, and high-performance services that improve mission outcomes.",
    visionStatement:
      "Be the partner known for precision execution, innovation, and operational resilience.",
    values: [
      "Integrity",
      "Stewardship",
      "Excellence",
      "Accountability",
      "Collaboration",
    ],
    paragraphs: [
      "Your Company is a mission-oriented enterprise delivering technical and operational excellence across complex environments.",
      "Our teams bring disciplined execution, transparent reporting, and measurable performance outcomes to every engagement.",
      "From acquisition support to engineering modernization and logistics readiness, we align each workstream to client mission priorities.",
      "We are built to scale responsibly with a culture rooted in accountability and stewardship.",
    ],
  },

  contact: {
    email: "info@company.com",
    phone: "+1-800-000-0000",
    address: "123 Enterprise Way, Washington, DC 20001",
  },

  social: {
    linkedin: "#",
  },

  footer: {
    statement: "Mission-grade delivery for enterprise operations.",
    ctaHeadline:
      "Connect with Your Company to align procurement-ready teams to mission-critical outcomes.",
    ctaButtonLabel: "Schedule Briefing",
  },

  globalImpact: {
    eyebrow: "Global Impact",
    headline: "Operational Reach Across High-Consequence Environments",
    body: "Our teams support operations across multi-location programs, integrating local execution with centralized controls and contract-level transparency.",
    stats: [
      { label: "Countries", value: "22" },
      { label: "Operating Sites", value: "64" },
      { label: "Mission Programs", value: "35" },
    ],
  },

  whoWeAre: {
    eyebrow: "Who We Are",
    headline: "A High-Trust Enterprise Delivery Partner",
    body: "We combine enterprise program leadership, secure engineering execution, and mission logistics capabilities into one accountable operating model. Every engagement is built around measurable outcomes, contract confidence, and mission continuity.",
    linkLabel: "Learn More About Us",
  },

  careers: {
    headline: "Careers",
    subtext:
      "Join a team that builds mission-ready systems and supports programs that matter.",
    perks: [
      "Competitive Compensation",
      "Health Benefits",
      "Growth and Certification Support",
      "Mission-Driven Work",
    ],
  },

  meta: {
    title: "Ghost Enterprise Authority Platform",
    description:
      "Enterprise-grade authority website and admin platform for mission-focused organizations.",
  },
};
