import { prisma } from "@/lib/prisma";

export async function ensureGlobalSettingCompatibility() {
  try {
    await prisma.$executeRaw`
      ALTER TABLE "GlobalSetting"
      ADD COLUMN IF NOT EXISTS "capabilityStatementUrl" TEXT NOT NULL DEFAULT '/capabilities/joint-capability-statement.pdf'
    `;
  } catch (error) {
    console.error("[admin/settings] Unable to verify global settings schema.", error);
  }
}
