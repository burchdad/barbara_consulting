import { prisma } from "@/lib/prisma";
import { ensureContentBaseline } from "@/lib/content-baseline";
import { ensurePartnershipContactCompatibility } from "@/lib/partnership-contact-compatibility";

let hasWarnedPublicDataFallback = false;

function logPublicDataFallback(error: unknown) {
  if (hasWarnedPublicDataFallback) return;
  hasWarnedPublicDataFallback = true;

  console.warn("[site-data] Falling back to static public content because database queries failed.", error);
}

async function withPublicDataFallback<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await query();
  } catch (error) {
    logPublicDataFallback(error);
    return fallback;
  }
}

export async function getGlobalSettings() {
  return withPublicDataFallback(async () => {
    await ensureContentBaseline();
    return prisma.globalSetting.findFirst();
  }, null);
}

export async function getPublishedData() {
  return withPublicDataFallback(
    async () => {
      await ensureContentBaseline();
      const [settings, services, partners, contracts, cases, leadership, testimonials, jobs] = await Promise.all([
        prisma.globalSetting.findFirst(),
        prisma.serviceItem.findMany({ where: { isPublished: true }, orderBy: { displayOrder: "asc" } }),
        prisma.missionPartner.findMany({ where: { isPublished: true }, orderBy: { displayOrder: "asc" } }),
        prisma.contract.findMany({ where: { isPublished: true }, orderBy: { displayOrder: "asc" } }),
        prisma.caseStudy.findMany({ where: { isPublished: true }, orderBy: { displayOrder: "asc" } }),
        prisma.leadershipMember.findMany({ where: { isPublished: true }, orderBy: { displayOrder: "asc" } }),
        prisma.testimonial.findMany({ where: { isPublished: true }, orderBy: { displayOrder: "asc" } }),
        prisma.job.findMany({ where: { isPublished: true }, orderBy: { createdAt: "desc" } }),
      ]);

      return {
        settings,
        services,
        partners,
        contracts,
        cases,
        leadership,
        testimonials,
        jobs,
      };
    },
    {
      settings: null,
      services: [],
      partners: [],
      contracts: [],
      cases: [],
      leadership: [],
      testimonials: [],
      jobs: [],
    },
  );
}

export async function getPublicCareersPageData() {
  return withPublicDataFallback(
    async () => {
      await ensureContentBaseline();
      const [jobs, settings] = await Promise.all([
        prisma.job.findMany({
          where: { isPublished: true },
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            title: true,
            location: true,
            jobType: true,
            employmentType: true,
            applyUrl: true,
            description: true,
          },
        }),
        prisma.globalSetting.findFirst(),
      ]);

      return { jobs, settings };
    },
    { jobs: [], settings: null },
  );
}

export async function getPublicCaseStudiesPageData() {
  return withPublicDataFallback(
    async () => {
      await ensureContentBaseline();
      const [studies, settings] = await Promise.all([
        prisma.caseStudy.findMany({
          where: { isPublished: true },
          orderBy: { displayOrder: "asc" },
        }),
        prisma.globalSetting.findFirst(),
      ]);

      return { studies, settings };
    },
    { studies: [], settings: null },
  );
}

export async function getPublicCaseStudyDetailData(slug: string) {
  return withPublicDataFallback(
    async () => {
      await ensureContentBaseline();
      const [study, settings] = await Promise.all([
        prisma.caseStudy.findUnique({ where: { slug } }),
        prisma.globalSetting.findFirst(),
      ]);

      return { study, settings };
    },
    { study: null, settings: null },
  );
}

export async function getPublicContractsPageData() {
  return withPublicDataFallback(
    async () => {
      await ensureContentBaseline();
      const [contracts, settings] = await Promise.all([
        prisma.contract.findMany({ where: { isPublished: true }, orderBy: { displayOrder: "asc" } }),
        prisma.globalSetting.findFirst(),
      ]);

      return { contracts, settings };
    },
    { contracts: [], settings: null },
  );
}

export async function getPublicPartnershipsPageData() {
  return withPublicDataFallback(
    async () => {
      await ensureContentBaseline();
      await ensurePartnershipContactCompatibility();

      const [partners, contacts] = await Promise.all([
        prisma.missionPartner.findMany({ where: { isPublished: true }, orderBy: { displayOrder: "asc" } }),
        prisma.partnershipContact.findMany({ where: { isPublished: true }, orderBy: [{ category: "asc" }, { displayOrder: "asc" }] }),
      ]);

      return { partners, contacts };
    },
    { partners: [], contacts: [] },
  );
}
