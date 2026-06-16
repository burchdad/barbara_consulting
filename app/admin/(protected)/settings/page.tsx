import {
  AdminActionRow,
  AdminCard,
  AdminCheckbox,
  AdminField,
  AdminSectionHeader,
  AdminSelect,
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
  const settings = await prisma.globalSetting.findFirst().catch((error) => {
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
        <form action={updateGlobalSettingsAction} className="mt-5 grid gap-4 md:grid-cols-2">
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
          <div className="md:col-span-2"><AdminField label="About Hero Image URL" name="aboutHeroImageUrl" defaultValue={settings?.aboutHeroImageUrl ?? siteConfig.media.aboutHeroImageUrl} type="url" /></div>
          <div className="md:col-span-2"><AdminField label="Case Studies Hero Image URL" name="caseStudiesHeroImageUrl" defaultValue={settings?.caseStudiesHeroImageUrl ?? siteConfig.media.caseStudiesHeroImageUrl} type="url" /></div>
          <div className="md:col-span-2"><AdminField label="Case Study Detail Fallback Image URL" name="caseStudyDetailFallbackImageUrl" defaultValue={settings?.caseStudyDetailFallbackImageUrl ?? siteConfig.media.caseStudyDetailFallbackImageUrl} type="url" /></div>
          <div className="md:col-span-2"><AdminField label="Careers Hero Image URL" name="careersHeroImageUrl" defaultValue={settings?.careersHeroImageUrl ?? siteConfig.media.careersHeroImageUrl} type="url" /></div>
          <div className="md:col-span-2"><AdminField label="Contact Hero Image URL" name="contactHeroImageUrl" defaultValue={settings?.contactHeroImageUrl ?? siteConfig.media.contactHeroImageUrl} type="url" /></div>
          <div className="md:col-span-2"><AdminField label="Contracts Hero Image URL" name="contractsHeroImageUrl" defaultValue={settings?.contractsHeroImageUrl ?? siteConfig.media.contractsHeroImageUrl} type="url" /></div>
          <div className="md:col-span-2"><AdminField label="Privacy Hero Image URL" name="privacyHeroImageUrl" defaultValue={settings?.privacyHeroImageUrl ?? siteConfig.media.privacyHeroImageUrl} type="url" /></div>
          <div className="md:col-span-2"><AdminField label="Capabilities Statement URL or Path" name="capabilityStatementUrl" defaultValue={settings?.capabilityStatementUrl ?? siteConfig.media.capabilityStatementUrl} required /></div>
          <AdminSelect label="Homepage Scene Type" name="homepageSceneType" defaultValue={settings?.homepageSceneType ?? "grid"}>
            <option value="grid">AI Grid</option>
            <option value="mesh">Neural Mesh</option>
            <option value="cityscape">Cityscape</option>
            <option value="earth">Earth</option>
          </AdminSelect>
          <AdminSelect label="Homepage Scene Glow" name="homepageSceneGlow" defaultValue={settings?.homepageSceneGlow ?? "blue"}>
            <option value="blue">Blue</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="gold">Gold</option>
          </AdminSelect>
          <AdminCheckbox label="Enable scene particles" name="homepageSceneParticles" defaultChecked={settings?.homepageSceneParticles ?? true} />
          <AdminCheckbox label="Enable scene parallax" name="homepageSceneParallax" defaultChecked={settings?.homepageSceneParallax ?? true} />
          <AdminActionRow className="md:col-span-2"><AdminSubmitButton>Save Settings</AdminSubmitButton></AdminActionRow>
        </form>
      </AdminCard>
    </div>
  );
}
