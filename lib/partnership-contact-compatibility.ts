import { prisma } from "@/lib/prisma";

let hasEnsuredPartnershipContactCompatibility = false;

export async function ensurePartnershipContactCompatibility() {
  if (hasEnsuredPartnershipContactCompatibility) return;

  await prisma.$executeRawUnsafe(`
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
  `);

  hasEnsuredPartnershipContactCompatibility = true;
}
