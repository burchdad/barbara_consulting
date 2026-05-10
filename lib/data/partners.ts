/**
 * Fallback mission partners shown when the database returns no published partners.
 * These mirror the MissionPartner Prisma model shape so they are drop-in compatible.
 */

export type FallbackPartner = {
  id: string;
  name: string;
  logoUrl: string | null;
  websiteUrl: string;
};

export const fallbackPartners: FallbackPartner[] = [
  { id: "fallback-partner-1", name: "Enterprise Partner Alpha", logoUrl: null, websiteUrl: "#" },
  { id: "fallback-partner-2", name: "Enterprise Partner Bravo", logoUrl: null, websiteUrl: "#" },
  { id: "fallback-partner-3", name: "Enterprise Partner Charlie", logoUrl: null, websiteUrl: "#" },
  { id: "fallback-partner-4", name: "Enterprise Partner Delta", logoUrl: null, websiteUrl: "#" },
  { id: "fallback-partner-5", name: "Enterprise Partner Echo", logoUrl: null, websiteUrl: "#" },
  { id: "fallback-partner-6", name: "Enterprise Partner Foxtrot", logoUrl: null, websiteUrl: "#" },
];
