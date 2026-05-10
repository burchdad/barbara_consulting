import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/public/contact-form";
import { getGlobalSettings } from "@/lib/site-data";
import { siteConfig } from "@/lib/config/site";

export default async function ContactPage() {
  const settings = await getGlobalSettings();
  const heroImageUrl = settings?.contactHeroImageUrl || siteConfig.media.contactHeroImageUrl;

  return (
    <main>
      <Section className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/50 py-12">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-33"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(2, 6, 23, 0.3), rgba(2, 6, 23, 0.84)), url(${heroImageUrl})`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(56,189,248,0.2),transparent_32%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:34px_34px] opacity-20" />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">Contact AI Delivery Team</p>
          <h1 className="mt-2 text-5xl font-black uppercase">Get in Touch</h1>
          <p className="mt-4 max-w-3xl text-zinc-300">Share the mission outcomes you need. Our AI and delivery teams will respond quickly with a practical path forward.</p>
        </div>
      </Section>

      <Section className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-6xl font-black uppercase leading-none text-white">Let&apos;s Build the Future Together.</h2>
          <p className="mt-4 max-w-xl text-zinc-300">From AI modernization to operational support, we design engagements that balance speed, security, and measurable impact.</p>
          <div className="mt-8 grid gap-3 text-sm text-zinc-300">
            <div className="floating-panel rounded-xl p-4"><span className="text-zinc-500">Email:</span> {settings?.email}</div>
            <div className="floating-panel rounded-xl p-4"><span className="text-zinc-500">Phone:</span> {settings?.phone}</div>
            <div className="floating-panel rounded-xl p-4"><span className="text-zinc-500">Headquarters:</span> {settings?.address}</div>
          </div>
        </div>
        <ContactForm />
      </Section>
    </main>
  );
}
