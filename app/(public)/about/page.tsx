import { Section } from "@/components/ui/section";
import { getPublishedData } from "@/lib/site-data";
import { siteConfig } from "@/lib/config/site";

export default async function AboutPage() {
  const { settings, leadership } = await getPublishedData();
  const aboutHeroImageUrl = settings?.aboutHeroImageUrl || siteConfig.media.aboutHeroImageUrl;

  return (
    <main>
      <Section className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/50 py-12">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(2, 6, 23, 0.26), rgba(2, 6, 23, 0.82)), url(${aboutHeroImageUrl})`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.2),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
        <h1 className="relative text-5xl font-black uppercase">{settings?.companyName ?? siteConfig.companyName}: AI Delivery Leadership</h1>
        <p className="relative mt-4 max-w-3xl text-sm uppercase tracking-[0.24em] text-cyan-300">Responsible Intelligence. Mission Outcomes. Proven Execution.</p>
        <div className="relative mt-8 space-y-4 text-zinc-300">
          {siteConfig.about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>

      <Section className="grid gap-4 md:grid-cols-2">
        <article className="floating-panel rounded-xl p-6">
          <h2 className="text-3xl font-black uppercase">Mission</h2>
          <p className="mt-3 text-zinc-300">{siteConfig.about.missionStatement}</p>
        </article>
        <article className="floating-panel rounded-xl p-6">
          <h2 className="text-3xl font-black uppercase">Vision</h2>
          <p className="mt-3 text-zinc-300">{siteConfig.about.visionStatement}</p>
        </article>
      </Section>

      <Section>
        <h2 className="text-4xl font-black uppercase">Values</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {siteConfig.about.values.map((value) => (
            <div key={value} className="rounded-xl border border-cyan-400/20 bg-gradient-to-b from-cyan-500/10 to-white/[0.02] p-5 text-center font-bold">
              {value}
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-4xl font-black uppercase">Leadership Team</h2>
        <div className="mt-8 space-y-6">
          {leadership.map((leader) => (
            <article key={leader.id} className="leadership-card grid gap-5 rounded-xl border border-white/10 bg-white/[0.02] p-5 md:grid-cols-[220px_1fr]">
              <div className="h-56 rounded-xl bg-cover bg-center" style={{ backgroundImage: `url(${leader.photoUrl || "https://images.unsplash.com/photo-1521119989659-a83eee488004"})` }} />
              <div>
                <h3 className="text-2xl font-black uppercase">{leader.name}</h3>
                <p className="text-sm text-red-300">{leader.title}</p>
                <p className="mt-4 text-zinc-300">{leader.fullBio}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </main>
  );
}
