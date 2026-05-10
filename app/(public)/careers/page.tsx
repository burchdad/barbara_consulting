import { Section } from "@/components/ui/section";
import { CareersClient } from "@/components/public/careers-client";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/config/site";

export default async function CareersPage() {
  const [jobs, settings] = await Promise.all([
    prisma.job.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        location: true,
        jobType: true,
        employmentType: true,
        applyUrl: true,
        description: true,
      },
    }),
    prisma.globalSetting.findFirst(),
  ]);
  const heroImageUrl = settings?.careersHeroImageUrl || siteConfig.media.careersHeroImageUrl;

  return (
    <main>
      <Section className="relative grid gap-8 overflow-hidden rounded-2xl border border-white/10 bg-black/50 py-12 lg:grid-cols-2">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(2, 6, 23, 0.26), rgba(2, 6, 23, 0.82)), url(${heroImageUrl})`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_30%,rgba(56,189,248,0.2),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:34px_34px] opacity-20" />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">AI Careers</p>
          <h1 className="mt-2 text-5xl font-black uppercase">{siteConfig.careers.headline}</h1>
          <p className="mt-4 max-w-3xl text-zinc-300">{siteConfig.careers.subtext}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-zinc-300">
            {siteConfig.careers.perks.map((item) => (
              <span key={item} className="rounded-md border border-cyan-400/30 bg-cyan-500/10 px-3 py-2">{item}</span>
            ))}
          </div>
        </div>
        <div className="floating-panel relative p-5">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Build What Matters</p>
          <h2 className="mt-3 text-3xl font-black uppercase">Secure AI Systems for Real-World Operations</h2>
          <p className="mt-3 text-sm text-zinc-300">Join multidisciplinary teams building decision support, resilient data pipelines, and high-trust automation in environments where quality and accountability matter.</p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-200">
            <li>• Mission-scale AI and data platforms</li>
            <li>• Responsible engineering and human oversight</li>
            <li>• High ownership with measurable impact</li>
          </ul>
        </div>
      </Section>

      <Section>
        <CareersClient jobs={jobs} />
      </Section>
    </main>
  );
}
