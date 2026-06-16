import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { siteConfig } from "../lib/config/site";
import { backgroundConfig } from "../lib/config/background";
import { leadershipSeed } from "../lib/data/leadership";
import { caseStudiesSeed } from "../lib/data/caseStudies";
import { contractsSeed } from "../lib/data/contracts";
import { testimonialsSeed } from "../lib/data/testimonials";
import { servicesSeed } from "../lib/data/servicesSeed";
import { partnersSeed } from "../lib/data/partnersSeed";
import { partnershipContactSeed } from "../lib/data/partnership-ecosystem";
import { jobsSeed } from "../lib/data/jobsSeed";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@company.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      email: adminEmail,
      name: "Platform Admin",
      passwordHash,
    },
  });

  await prisma.globalSetting.deleteMany();
  await prisma.globalSetting.create({
    data: {
      companyName: siteConfig.companyName,
      tagline: siteConfig.tagline,
      email: siteConfig.contact.email,
      phone: siteConfig.contact.phone,
      address: siteConfig.contact.address,
      linkedInUrl: siteConfig.social.linkedin,
      footerStatement: siteConfig.footer.statement,
      heroEyebrow: siteConfig.hero.eyebrow,
      heroHeadline: siteConfig.hero.headline,
      heroTrustBadge: siteConfig.hero.trustBadge,
      heroSubheadline: siteConfig.hero.subtext,
      aboutHeroImageUrl: siteConfig.media.aboutHeroImageUrl,
      caseStudiesHeroImageUrl: siteConfig.media.caseStudiesHeroImageUrl,
      caseStudyDetailFallbackImageUrl: siteConfig.media.caseStudyDetailFallbackImageUrl,
      careersHeroImageUrl: siteConfig.media.careersHeroImageUrl,
      contactHeroImageUrl: siteConfig.media.contactHeroImageUrl,
      contractsHeroImageUrl: siteConfig.media.contractsHeroImageUrl,
      privacyHeroImageUrl: siteConfig.media.privacyHeroImageUrl,
      capabilityStatementUrl: siteConfig.media.capabilityStatementUrl,
      homepageSceneType: backgroundConfig.type,
      homepageSceneGlow: backgroundConfig.glow,
      homepageSceneParticles: backgroundConfig.particles,
      homepageSceneParallax: backgroundConfig.parallax,
    },
  });

  await prisma.job.deleteMany();
  await prisma.job.createMany({ data: jobsSeed.map(({ id, ...job }) => job) });

  await prisma.caseStudy.deleteMany();
  await prisma.caseStudy.createMany({ data: caseStudiesSeed });

  await prisma.contract.deleteMany();
  await prisma.contract.createMany({ data: contractsSeed });

  await prisma.leadershipMember.deleteMany();
  await prisma.leadershipMember.createMany({ data: leadershipSeed });

  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({ data: testimonialsSeed });

  await prisma.serviceItem.deleteMany();
  await prisma.serviceItem.createMany({ data: servicesSeed });

  await prisma.missionPartner.deleteMany();
  await prisma.missionPartner.createMany({ data: partnersSeed });

  await prisma.partnershipContact.deleteMany();
  await prisma.partnershipContact.createMany({ data: partnershipContactSeed });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

