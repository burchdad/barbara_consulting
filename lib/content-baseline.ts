import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/config/site";
import { backgroundConfig } from "@/lib/config/background";
import { caseStudiesSeed } from "@/lib/data/caseStudies";
import { contractsSeed } from "@/lib/data/contracts";
import { jobsSeed } from "@/lib/data/jobsSeed";
import { leadershipSeed } from "@/lib/data/leadership";
import { partnersSeed } from "@/lib/data/partnersSeed";
import { partnershipContactSeed } from "@/lib/data/partnership-ecosystem";
import { servicesSeed } from "@/lib/data/servicesSeed";
import { testimonialsSeed } from "@/lib/data/testimonials";
import { ensurePartnershipContactCompatibility } from "@/lib/partnership-contact-compatibility";

let baselinePromise: Promise<void> | null = null;

export async function ensureContentBaseline() {
  if (baselinePromise) {
    await baselinePromise;
    return;
  }

  baselinePromise = (async () => {
    try {
      await ensurePartnershipContactCompatibility();

      const [
        settingsCount,
        jobsCount,
        caseStudiesCount,
        contractsCount,
        leadershipCount,
        testimonialsCount,
        servicesCount,
        partnersCount,
        partnershipContactsCount,
      ] = await Promise.all([
        prisma.globalSetting.count(),
        prisma.job.count(),
        prisma.caseStudy.count(),
        prisma.contract.count(),
        prisma.leadershipMember.count(),
        prisma.testimonial.count(),
        prisma.serviceItem.count(),
        prisma.missionPartner.count(),
        prisma.partnershipContact.count(),
      ]);

      const totalContentCount =
        jobsCount +
        caseStudiesCount +
        contractsCount +
        leadershipCount +
        testimonialsCount +
        servicesCount +
        partnersCount +
        partnershipContactsCount;

      if (totalContentCount > 0) {
        return;
      }

      if (settingsCount === 0) {
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
      }

      await Promise.all([
        jobsSeed.length ? prisma.job.createMany({ data: jobsSeed.map(({ id, ...job }) => job), skipDuplicates: true }) : Promise.resolve(),
        caseStudiesSeed.length ? prisma.caseStudy.createMany({ data: caseStudiesSeed, skipDuplicates: true }) : Promise.resolve(),
        contractsSeed.length ? prisma.contract.createMany({ data: contractsSeed, skipDuplicates: true }) : Promise.resolve(),
        leadershipSeed.length ? prisma.leadershipMember.createMany({ data: leadershipSeed, skipDuplicates: true }) : Promise.resolve(),
        testimonialsSeed.length ? prisma.testimonial.createMany({ data: testimonialsSeed, skipDuplicates: true }) : Promise.resolve(),
        servicesSeed.length ? prisma.serviceItem.createMany({ data: servicesSeed, skipDuplicates: true }) : Promise.resolve(),
        partnersSeed.length ? prisma.missionPartner.createMany({ data: partnersSeed, skipDuplicates: true }) : Promise.resolve(),
        partnershipContactSeed.length ? prisma.partnershipContact.createMany({ data: partnershipContactSeed, skipDuplicates: true }) : Promise.resolve(),
      ]);
    } catch (error) {
      console.error("[content-baseline] Unable to initialize site content.", error);
    } finally {
      baselinePromise = null;
    }
  })();

  await baselinePromise;
}
