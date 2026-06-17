import { ensureContentSchemaCompatibility } from "@/lib/partnership-contact-compatibility";

export async function ensureGlobalSettingCompatibility() {
  try {
    await ensureContentSchemaCompatibility();
  } catch (error) {
    console.error("[admin/settings] Unable to verify global settings schema.", error);
  }
}
