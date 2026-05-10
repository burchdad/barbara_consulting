import { prisma } from "@/lib/prisma";

export async function getGlobalSettings() {
  return prisma.globalSetting.findFirst();
}

export async function getPublishedData() {
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
}
