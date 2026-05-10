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
  tagline: "AI Systems for Mission Outcomes",

  hero: {
    eyebrow: "AI-Enabled Mission Delivery",
    headline: "Operational AI for Critical Programs",
    subtext:
      "We design, deploy, and operate secure AI-enabled systems that accelerate decisions, improve resilience, and deliver measurable outcomes across complex government and enterprise missions.",
    trustBadge:
      "Procurement-ready AI delivery teams trusted by mission-critical stakeholders",
    ctaPrimary: "Get in Touch",
    ctaSecondary: "Explore Capabilities",
  },

  about: {
    missionStatement:
      "Deliver secure, responsible, and high-performance AI services that improve mission outcomes.",
    visionStatement:
      "Be the trusted partner for AI-enabled transformation, precision execution, and operational resilience.",
    values: [
      "Integrity",
      "Stewardship",
      "Excellence",
      "Accountability",
      "Collaboration",
    ],
    paragraphs: [
      "Your Company is a mission-oriented enterprise delivering AI, data, and engineering excellence across complex environments.",
      "Our teams combine machine intelligence with disciplined program execution, transparent reporting, and measurable performance outcomes.",
      "From acquisition support and engineering modernization to logistics readiness, we embed AI where it creates clear operational value.",
      "We scale responsibly through accountable governance, human oversight, and security-first delivery practices.",
    ],
  },

  contact: {
    email: "info@company.com",
    phone: "+1-800-000-0000",
    address: "123 Enterprise Way, Washington, DC 20001",
  },

  media: {
    aboutHeroImageUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1800&q=80",
    caseStudiesHeroImageUrl:
      "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1800&q=80",
    caseStudyDetailFallbackImageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1800&q=80",
    careersHeroImageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=80",
    contactHeroImageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=80",
    contractsHeroImageUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1800&q=80",
    privacyHeroImageUrl:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1800&q=80",
  },

  social: {
    linkedin: "#",
  },

  footer: {
    statement: "AI-enabled delivery for mission-critical operations.",
    ctaHeadline:
      "Connect with Your Company to align procurement-ready AI teams to mission-critical outcomes.",
    ctaButtonLabel: "Schedule Briefing",
  },

  globalImpact: {
    eyebrow: "AI Impact",
    headline: "Operational Intelligence Across High-Consequence Environments",
    body: "Our teams deliver AI-powered operations across distributed programs, combining local execution with centralized intelligence, governance, and contract-level transparency.",
    stats: [
      { label: "Countries", value: "22" },
      { label: "Operating Sites", value: "64" },
      { label: "Mission Programs", value: "35" },
    ],
  },

  whoWeAre: {
    eyebrow: "Who We Are",
    headline: "A High-Trust AI Delivery Partner",
    body: "We combine enterprise program leadership, secure AI engineering, and mission logistics into one accountable operating model. Every engagement is built around measurable outcomes, contract confidence, and mission continuity.",
    linkLabel: "Learn More About Us",
  },

  careers: {
    headline: "Careers",
    subtext:
      "Join a team building secure AI systems and mission-ready operations that matter.",
    perks: [
      "Competitive Compensation",
      "Health Benefits",
      "Growth and Certification Support",
      "Mission-Driven Work",
    ],
  },

  meta: {
    title: "Ghost AI Mission Platform",
    description:
      "AI-forward authority website and admin platform for mission-focused organizations.",
  },
};
