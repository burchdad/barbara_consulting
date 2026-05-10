import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { siteConfig } from "../lib/config/site";
import { leadershipSeed } from "../lib/data/leadership";
import { caseStudiesSeed } from "../lib/data/caseStudies";
import { contractsSeed } from "../lib/data/contracts";
import { testimonialsSeed } from "../lib/data/testimonials";
import { servicesSeed } from "../lib/data/servicesSeed";
import { partnersSeed } from "../lib/data/partnersSeed";

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
      heroHeadline: siteConfig.hero.headline,
      heroSubheadline: siteConfig.hero.subtext,
    },
  });

  await prisma.job.deleteMany();
  await prisma.job.createMany({
    data: [
      {
        title: "Senior Program Manager",
        slug: "senior-program-manager",
        department: "Program Delivery",
        location: "Washington, DC",
        jobType: "Hybrid",
        employmentType: "Full-Time",
        description: "Lead multi-site programs and oversee delivery execution across stakeholders.",
        responsibilities: ["Manage program roadmaps", "Coordinate subcontractors", "Drive executive reporting"],
        requirements: ["8+ years PM experience", "PMP preferred", "Clearance eligible"],
        benefits: ["401(k) matching", "Medical/Dental/Vision", "Annual training stipend"],
        applyUrl: "https://example.com/jobs/senior-program-manager",
        isPublished: true,
      },
      {
        title: "Cloud Security Engineer",
        slug: "cloud-security-engineer",
        department: "Engineering",
        location: "Remote - US",
        jobType: "Remote",
        employmentType: "Full-Time",
        description: "Build zero-trust cloud systems and support accreditation pathways for secure workloads.",
        responsibilities: ["Design secure architectures", "Implement IaC controls", "Support risk management frameworks"],
        requirements: ["5+ years cloud security", "AWS/Azure certifications", "Public trust eligible"],
        benefits: ["Flexible work model", "Certification reimbursement", "Performance bonuses"],
        applyUrl: "https://example.com/jobs/cloud-security-engineer",
        isPublished: true,
      },
      {
        title: "Logistics Analyst",
        slug: "logistics-analyst",
        department: "Mission Support",
        location: "San Diego, CA",
        jobType: "On-Site",
        employmentType: "Full-Time",
        description: "Support readiness metrics and supply operations for mission-critical deployment cycles.",
        responsibilities: ["Track inventory KPIs", "Coordinate vendors", "Document sustainment plans"],
        requirements: ["3+ years logistics analysis", "Operations environment familiarity", "Strong Excel and SQL"],
        benefits: ["Paid parental leave", "Medical coverage", "Professional development"],
        applyUrl: "https://example.com/jobs/logistics-analyst",
        isPublished: true,
      },
    ],
  });

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

