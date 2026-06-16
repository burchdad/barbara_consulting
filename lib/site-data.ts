import { prisma } from "@/lib/prisma";
import { jobsSeed } from "@/lib/data/jobsSeed";

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
  return withPublicDataFallback(() => prisma.globalSetting.findFirst(), null);
}

export async function getPublishedData() {
  return withPublicDataFallback(
    async () => {
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

      return { settings, services, partners, contracts, cases, leadership, testimonials, jobs };
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

      return { jobs: jobs.length ? jobs : jobsSeed, settings };
    },
    { jobs: jobsSeed, settings: null },
  );
}

export async function getPublicCaseStudiesPageData() {
  return withPublicDataFallback(
    async () => {
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
      const [contracts, settings] = await Promise.all([
        prisma.contract.findMany({ where: { isPublished: true }, orderBy: { displayOrder: "asc" } }),
        prisma.globalSetting.findFirst(),
      ]);

      return { contracts, settings };
    },
    { contracts: [], settings: null },
  );
}
