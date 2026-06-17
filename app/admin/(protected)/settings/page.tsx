import {
  AdminActionRow,
  AdminAssetUploadField,
  AdminCard,
  AdminField,
  AdminSectionHeader,
  AdminSubmitButton,
  AdminTextArea,
} from "@/components/admin/admin-form";
import { ModuleHeader } from "@/components/admin/module-header";
import { ensureGlobalSettingCompatibility } from "@/lib/admin-settings";
import { updateGlobalSettingsAction } from "@/lib/actions";
import { siteConfig } from "@/lib/config/site";
import { prisma } from "@/lib/prisma";

export default async function AdminSettingsPage() {
  await ensureGlobalSettingCompatibility();
  const settings = await prisma.globalSetting.findFirst().catch((error: unknown) => {
    console.error("[admin/settings] Unable to load global settings.", error);
    return null;
  });
  const companyName = settings?.companyName ?? siteConfig.companyName;
  const tagline = settings?.tagline ?? siteConfig.tagline;
  const email = settings?.email ?? siteConfig.contact.email;
  const phone = settings?.phone ?? siteConfig.contact.phone;
  const address = settings?.address ?? siteConfig.contact.address;
  const linkedInUrl = settings?.linkedInUrl ?? siteConfig.social.linkedin;
  const footerStatement = settings?.footerStatement ?? siteConfig.footer.statement;
  const heroHeadline = settings?.heroHeadline ?? siteConfig.hero.headline;
  const heroSubheadline = settings?.heroSubheadline ?? siteConfig.hero.subtext;

  return (
    <div className="space-y-6">
      <ModuleHeader title="Global Settings" subtitle="Manage company-level public content and contact data." />
      <AdminCard>
        <AdminSectionHeader title="Company Identity" description="These values feed the homepage, footer, contact areas, and global page metadata." />
        <form action={updateGlobalSettingsAction} encType="multipart/form-data" className="mt-5 grid gap-4 md:grid-cols-2">
          <AdminField label="Company Name" name="companyName" defaultValue={companyName} required />
          <AdminField label="Tagline" name="tagline" defaultValue={tagline} required />
          <AdminField label="Email" name="email" type="email" defaultValue={email} required />
          <AdminField label="Phone" name="phone" defaultValue={phone} />
          <div className="md:col-span-2"><AdminField label="Address" name="address" defaultValue={address} required /></div>
          <AdminField label="LinkedIn URL" name="linkedInUrl" defaultValue={linkedInUrl} />
          <div className="md:col-span-2"><AdminTextArea label="Hero Eyebrow" name="heroEyebrow" defaultValue={settings?.heroEyebrow ?? siteConfig.hero.eyebrow} required rows={2} /></div>
          <div className="md:col-span-2"><AdminTextArea label="Footer Statement" name="footerStatement" defaultValue={footerStatement} required /></div>
          <div className="md:col-span-2"><AdminTextArea label="Hero Headline" name="heroHeadline" defaultValue={heroHeadline} required /></div>
          <div className="md:col-span-2"><AdminTextArea label="Hero Trust Badge" name="heroTrustBadge" defaultValue={settings?.heroTrustBadge ?? siteConfig.hero.trustBadge} required rows={2} /></div>
          <div className="md:col-span-2"><AdminTextArea label="Hero Subheadline" name="heroSubheadline" defaultValue={heroSubheadline} required /></div>
          <div className="md:col-span-2">
            <AdminAssetUploadField
              label="Capabilities Statement PDF"
              name="capabilityStatementFile"
              currentValueName="capabilityStatementUrl"
              currentValue={settings?.capabilityStatementUrl ?? siteConfig.media.capabilityStatementUrl}
              accept="application/pdf"
              note="Upload a replacement PDF to store it in Blob and publish the new file."
            />
          </div>
          <AdminActionRow className="md:col-span-2"><AdminSubmitButton>Save Settings</AdminSubmitButton></AdminActionRow>
        </form>
      </AdminCard>
    </div>
  );
}
