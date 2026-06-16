import { prisma } from "@/lib/prisma";

let hasEnsuredContentSchemaCompatibility = false;

const contentSchemaStatements = [
  `
    DO $$
    BEGIN
      CREATE TYPE "SubmissionStatus" AS ENUM ('unread', 'read');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `,
  `
    DO $$
    BEGIN
      CREATE TYPE "SceneType" AS ENUM ('earth', 'grid', 'cityscape', 'mesh');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `,
  `
    DO $$
    BEGIN
      CREATE TYPE "SceneGlow" AS ENUM ('red', 'blue', 'green', 'gold');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `,
  `
    CREATE TABLE IF NOT EXISTS "Job" (
      "id" TEXT NOT NULL,
      "title" TEXT NOT NULL,
      "slug" TEXT NOT NULL,
      "department" TEXT NOT NULL,
      "location" TEXT NOT NULL,
      "jobType" TEXT NOT NULL,
      "employmentType" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "responsibilities" JSONB NOT NULL,
      "requirements" JSONB NOT NULL,
      "benefits" JSONB NOT NULL,
      "applyUrl" TEXT,
      "isPublished" BOOLEAN NOT NULL DEFAULT false,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "Job_pkey" PRIMARY KEY ("id"),
      CONSTRAINT "Job_slug_key" UNIQUE ("slug")
    )
  `,
  `
    CREATE TABLE IF NOT EXISTS "CaseStudy" (
      "id" TEXT NOT NULL,
      "title" TEXT NOT NULL,
      "slug" TEXT NOT NULL,
      "summary" TEXT NOT NULL,
      "iconUrl" TEXT,
      "imageUrl" TEXT,
      "highlights" JSONB NOT NULL,
      "challenge" TEXT NOT NULL,
      "solution" TEXT NOT NULL,
      "results" TEXT NOT NULL,
      "metrics" JSONB NOT NULL,
      "isFeatured" BOOLEAN NOT NULL DEFAULT false,
      "isPublished" BOOLEAN NOT NULL DEFAULT false,
      "displayOrder" INTEGER NOT NULL DEFAULT 0,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "CaseStudy_pkey" PRIMARY KEY ("id"),
      CONSTRAINT "CaseStudy_slug_key" UNIQUE ("slug")
    )
  `,
  `
    CREATE TABLE IF NOT EXISTS "Contract" (
      "id" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "contractNumber" TEXT NOT NULL,
      "agency" TEXT NOT NULL,
      "period" TEXT NOT NULL,
      "contractType" TEXT NOT NULL,
      "availability" TEXT NOT NULL,
      "programManager" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "phone" TEXT NOT NULL,
      "summary" TEXT NOT NULL,
      "scope" TEXT NOT NULL,
      "isPublished" BOOLEAN NOT NULL DEFAULT true,
      "displayOrder" INTEGER NOT NULL DEFAULT 0,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
    )
  `,
  `
    CREATE TABLE IF NOT EXISTS "LeadershipMember" (
      "id" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "title" TEXT NOT NULL,
      "photoUrl" TEXT,
      "shortBio" TEXT NOT NULL,
      "fullBio" TEXT NOT NULL,
      "linkedInUrl" TEXT,
      "displayOrder" INTEGER NOT NULL DEFAULT 0,
      "isPublished" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "LeadershipMember_pkey" PRIMARY KEY ("id")
    )
  `,
  `
    CREATE TABLE IF NOT EXISTS "Testimonial" (
      "id" TEXT NOT NULL,
      "quote" TEXT NOT NULL,
      "authorName" TEXT NOT NULL,
      "authorTitle" TEXT NOT NULL,
      "organization" TEXT NOT NULL,
      "isPublished" BOOLEAN NOT NULL DEFAULT true,
      "displayOrder" INTEGER NOT NULL DEFAULT 0,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
    )
  `,
  `
    CREATE TABLE IF NOT EXISTS "ServiceItem" (
      "id" TEXT NOT NULL,
      "category" TEXT NOT NULL,
      "title" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "bulletItems" JSONB NOT NULL,
      "displayOrder" INTEGER NOT NULL DEFAULT 0,
      "isPublished" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "ServiceItem_pkey" PRIMARY KEY ("id")
    )
  `,
  `
    CREATE TABLE IF NOT EXISTS "MissionPartner" (
      "id" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "logoUrl" TEXT,
      "websiteUrl" TEXT,
      "displayOrder" INTEGER NOT NULL DEFAULT 0,
      "isPublished" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "MissionPartner_pkey" PRIMARY KEY ("id")
    )
  `,
  `
    CREATE TABLE IF NOT EXISTS "PartnershipContact" (
      "id" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "organization" TEXT NOT NULL,
      "category" TEXT NOT NULL,
      "displayOrder" INTEGER NOT NULL DEFAULT 0,
      "isPublished" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "PartnershipContact_pkey" PRIMARY KEY ("id")
    )
  `,
  `
    CREATE TABLE IF NOT EXISTS "ContactSubmission" (
      "id" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "phone" TEXT,
      "message" TEXT NOT NULL,
      "status" "SubmissionStatus" NOT NULL DEFAULT 'unread',
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("id")
    )
  `,
  `
    CREATE TABLE IF NOT EXISTS "SupportTicket" (
      "id" TEXT NOT NULL,
      "clientName" TEXT NOT NULL,
      "requesterName" TEXT NOT NULL,
      "requesterEmail" TEXT NOT NULL,
      "pageUrl" TEXT NOT NULL,
      "requestType" TEXT NOT NULL,
      "priority" TEXT NOT NULL,
      "summary" TEXT NOT NULL,
      "details" TEXT NOT NULL,
      "attachments" JSONB NOT NULL,
      "status" TEXT NOT NULL DEFAULT 'pending',
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "SupportTicket_pkey" PRIMARY KEY ("id")
    )
  `,
  `
    CREATE TABLE IF NOT EXISTS "GlobalSetting" (
      "id" TEXT NOT NULL,
      "companyName" TEXT NOT NULL,
      "tagline" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "phone" TEXT NOT NULL,
      "address" TEXT NOT NULL,
      "linkedInUrl" TEXT,
      "footerStatement" TEXT NOT NULL,
      "heroEyebrow" TEXT NOT NULL,
      "heroHeadline" TEXT NOT NULL,
      "heroTrustBadge" TEXT NOT NULL,
      "heroSubheadline" TEXT NOT NULL,
      "aboutHeroImageUrl" TEXT,
      "caseStudiesHeroImageUrl" TEXT,
      "caseStudyDetailFallbackImageUrl" TEXT,
      "careersHeroImageUrl" TEXT,
      "contactHeroImageUrl" TEXT,
      "contractsHeroImageUrl" TEXT,
      "privacyHeroImageUrl" TEXT,
      "capabilityStatementUrl" TEXT NOT NULL DEFAULT '/capabilities/joint-capability-statement.pdf',
      "homepageSceneType" "SceneType" NOT NULL DEFAULT 'grid',
      "homepageSceneGlow" "SceneGlow" NOT NULL DEFAULT 'blue',
      "homepageSceneParticles" BOOLEAN NOT NULL DEFAULT true,
      "homepageSceneParallax" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "GlobalSetting_pkey" PRIMARY KEY ("id")
    )
  `,
  `
    ALTER TABLE "GlobalSetting"
    ADD COLUMN IF NOT EXISTS "capabilityStatementUrl" TEXT NOT NULL DEFAULT '/capabilities/joint-capability-statement.pdf'
  `,
  `
    ALTER TABLE "GlobalSetting"
    ADD COLUMN IF NOT EXISTS "homepageSceneType" "SceneType" NOT NULL DEFAULT 'grid'
  `,
  `
    ALTER TABLE "GlobalSetting"
    ADD COLUMN IF NOT EXISTS "homepageSceneGlow" "SceneGlow" NOT NULL DEFAULT 'blue'
  `,
  `
    ALTER TABLE "GlobalSetting"
    ADD COLUMN IF NOT EXISTS "homepageSceneParticles" BOOLEAN NOT NULL DEFAULT true
  `,
  `
    ALTER TABLE "GlobalSetting"
    ADD COLUMN IF NOT EXISTS "homepageSceneParallax" BOOLEAN NOT NULL DEFAULT true
  `,
];

export async function ensureContentSchemaCompatibility() {
  if (hasEnsuredContentSchemaCompatibility) return;

  for (const statement of contentSchemaStatements) {
    await prisma.$executeRawUnsafe(statement);
  }

  hasEnsuredContentSchemaCompatibility = true;
}

export async function ensurePartnershipContactCompatibility() {
  await ensureContentSchemaCompatibility();
}
