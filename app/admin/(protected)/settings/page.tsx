import { AdminCard, AdminField, AdminTextArea } from "@/components/admin/admin-form";
import { ModuleHeader } from "@/components/admin/module-header";
import { updateGlobalSettingsAction } from "@/lib/actions";
import { siteConfig } from "@/lib/config/site";
import { prisma } from "@/lib/prisma";

export default async function AdminSettingsPage() {
  const settings = await prisma.globalSetting.findFirst();

  return (
    <div className="space-y-6">
      <ModuleHeader title="Global Settings" subtitle="Manage company-level public content and contact data." />
      <AdminCard>
        <form action={updateGlobalSettingsAction} className="grid gap-3 md:grid-cols-2">
          <AdminField label="Company Name" name="companyName" defaultValue={settings?.companyName} required />
          <AdminField label="Tagline" name="tagline" defaultValue={settings?.tagline} required />
          <AdminField label="Email" name="email" type="email" defaultValue={settings?.email} required />
          <AdminField label="Phone" name="phone" defaultValue={settings?.phone} />
          <div className="md:col-span-2"><AdminField label="Address" name="address" defaultValue={settings?.address} required /></div>
          <AdminField label="LinkedIn URL" name="linkedInUrl" defaultValue={settings?.linkedInUrl} />
          <div className="md:col-span-2"><AdminTextArea label="Hero Eyebrow" name="heroEyebrow" defaultValue={settings?.heroEyebrow ?? siteConfig.hero.eyebrow} required rows={2} /></div>
          <div className="md:col-span-2"><AdminTextArea label="Footer Statement" name="footerStatement" defaultValue={settings?.footerStatement} required /></div>
          <div className="md:col-span-2"><AdminTextArea label="Hero Headline" name="heroHeadline" defaultValue={settings?.heroHeadline} required /></div>
          <div className="md:col-span-2"><AdminTextArea label="Hero Trust Badge" name="heroTrustBadge" defaultValue={settings?.heroTrustBadge ?? siteConfig.hero.trustBadge} required rows={2} /></div>
          <div className="md:col-span-2"><AdminTextArea label="Hero Subheadline" name="heroSubheadline" defaultValue={settings?.heroSubheadline} required /></div>
          <div className="md:col-span-2"><AdminField label="About Hero Image URL" name="aboutHeroImageUrl" defaultValue={settings?.aboutHeroImageUrl ?? siteConfig.media.aboutHeroImageUrl} type="url" /></div>
          <div className="md:col-span-2"><AdminField label="Case Studies Hero Image URL" name="caseStudiesHeroImageUrl" defaultValue={settings?.caseStudiesHeroImageUrl ?? siteConfig.media.caseStudiesHeroImageUrl} type="url" /></div>
          <div className="md:col-span-2"><AdminField label="Case Study Detail Fallback Image URL" name="caseStudyDetailFallbackImageUrl" defaultValue={settings?.caseStudyDetailFallbackImageUrl ?? siteConfig.media.caseStudyDetailFallbackImageUrl} type="url" /></div>
          <div className="md:col-span-2"><AdminField label="Careers Hero Image URL" name="careersHeroImageUrl" defaultValue={settings?.careersHeroImageUrl ?? siteConfig.media.careersHeroImageUrl} type="url" /></div>
          <div className="md:col-span-2"><AdminField label="Contact Hero Image URL" name="contactHeroImageUrl" defaultValue={settings?.contactHeroImageUrl ?? siteConfig.media.contactHeroImageUrl} type="url" /></div>
          <div className="md:col-span-2"><AdminField label="Contracts Hero Image URL" name="contractsHeroImageUrl" defaultValue={settings?.contractsHeroImageUrl ?? siteConfig.media.contractsHeroImageUrl} type="url" /></div>
          <div className="md:col-span-2"><AdminField label="Privacy Hero Image URL" name="privacyHeroImageUrl" defaultValue={settings?.privacyHeroImageUrl ?? siteConfig.media.privacyHeroImageUrl} type="url" /></div>
          <div className="md:col-span-2"><AdminField label="Capabilities Statement URL or Path" name="capabilityStatementUrl" defaultValue={settings?.capabilityStatementUrl ?? siteConfig.media.capabilityStatementUrl} required /></div>
          <label className="grid gap-2 text-sm text-zinc-300">
            <span>Homepage Scene Type</span>
            <select
              name="homepageSceneType"
              defaultValue={settings?.homepageSceneType ?? "grid"}
              className="rounded-md border border-white/15 bg-black px-3 py-2 text-sm text-zinc-100"
            >
              <option value="grid">AI Grid</option>
              <option value="mesh">Neural Mesh</option>
              <option value="cityscape">Cityscape</option>
              <option value="earth">Earth</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm text-zinc-300">
            <span>Homepage Scene Glow</span>
            <select
              name="homepageSceneGlow"
              defaultValue={settings?.homepageSceneGlow ?? "blue"}
              className="rounded-md border border-white/15 bg-black px-3 py-2 text-sm text-zinc-100"
            >
              <option value="blue">Blue</option>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="gold">Gold</option>
            </select>
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-zinc-300">
            <input
              type="checkbox"
              name="homepageSceneParticles"
              defaultChecked={settings?.homepageSceneParticles ?? true}
              className="h-4 w-4 rounded border border-white/15 bg-black"
            />
            Enable scene particles
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-zinc-300">
            <input
              type="checkbox"
              name="homepageSceneParallax"
              defaultChecked={settings?.homepageSceneParallax ?? true}
              className="h-4 w-4 rounded border border-white/15 bg-black"
            />
            Enable scene parallax
          </label>
          <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white md:col-span-2" type="submit">Save Settings</button>
        </form>
      </AdminCard>
    </div>
  );
}
