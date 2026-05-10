import { Section } from "@/components/ui/section";
import { getGlobalSettings } from "@/lib/site-data";
import { siteConfig } from "@/lib/config/site";

export default async function PrivacyPage() {
  const settings = await getGlobalSettings();
  const heroImageUrl = settings?.privacyHeroImageUrl || siteConfig.media.privacyHeroImageUrl;

  return (
    <main>
      <Section className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/50 py-12">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(2, 6, 23, 0.3), rgba(2, 6, 23, 0.88)), url(${heroImageUrl})`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(56,189,248,0.2),transparent_32%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
        <h1 className="relative text-5xl font-black uppercase">Privacy Policy</h1>
        <p className="relative mt-4 max-w-3xl text-zinc-300">How we protect data across AI-enabled delivery systems, contact workflows, and operational platforms.</p>
      </Section>

      <Section className="floating-panel rounded-2xl p-6">
        <div className="mt-6 space-y-4 text-zinc-300">
          <p>This is a placeholder privacy policy page for enterprise deployment. Replace with approved legal language before production launch.</p>
          <p>We collect contact form data solely to respond to inquiries and operational requests.</p>
          <p>Information is stored in secure systems and retained according to contractual, regulatory, and legal requirements.</p>
          <p>For questions about privacy handling, contact your designated program representative.</p>
        </div>
      </Section>
    </main>
  );
}
