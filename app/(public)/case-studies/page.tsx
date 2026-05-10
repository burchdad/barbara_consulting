import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/config/site";

export default async function CaseStudiesPage() {
  const [studies, settings] = await Promise.all([
    prisma.caseStudy.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: "asc" },
    }),
    prisma.globalSetting.findFirst(),
  ]);
  const heroImageUrl = settings?.caseStudiesHeroImageUrl || siteConfig.media.caseStudiesHeroImageUrl;

  return (
    <main>
      <Section className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/50 py-12">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-34"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(2, 6, 23, 0.26), rgba(2, 6, 23, 0.86)), url(${heroImageUrl})`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_28%,rgba(56,189,248,0.2),transparent_32%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20" />
        <h1 className="relative text-5xl font-black uppercase">AI Impact: Case Study Highlights</h1>
        <p className="relative mt-4 max-w-3xl text-zinc-300">Evidence-backed outcomes across AI modernization, mission technology, and operational resilience programs.</p>
      </Section>

      <Section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {studies.map((study) => (
          <article key={study.id} className="case-card group rounded-xl border border-white/10 bg-white/[0.02] p-0 transition hover:border-red-500/50 hover:bg-white/[0.04]">
            <div
              className="h-36 rounded-t-xl bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(2, 6, 23, 0.22), rgba(2, 6, 23, 0.76)), url(${study.imageUrl || "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80"})`,
              }}
            />
            <div className="p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">AI Case Study</p>
              <h2 className="mt-2 text-2xl font-black uppercase">{study.title}</h2>
              <p className="mt-3 text-sm text-zinc-300">{study.summary}</p>
              <Link href={`/case-studies/${study.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-300">
                Read details <ArrowRight size={15} className="transition group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        ))}
      </Section>
    </main>
  );
}
