import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/section";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/config/site";

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [study, settings] = await Promise.all([
    prisma.caseStudy.findUnique({ where: { slug } }),
    prisma.globalSetting.findFirst(),
  ]);

  if (!study || !study.isPublished) {
    notFound();
  }
  const fallbackImageUrl = settings?.caseStudyDetailFallbackImageUrl || siteConfig.media.caseStudyDetailFallbackImageUrl;

  return (
    <main>
      <Section className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/50 py-10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(2,6,23,0.2), rgba(2,6,23,0.88)), url(${study.imageUrl || fallbackImageUrl})`,
          }}
        />
        <div className="relative">
          <Link href="/case-studies" className="text-sm text-zinc-300 hover:text-cyan-300">← Back to Case Studies</Link>
          <p className="mt-4 text-xs uppercase tracking-[0.24em] text-cyan-300">AI Outcome Brief</p>
          <h1 className="mt-2 text-5xl font-black uppercase">{study.title}</h1>
          <p className="mt-4 max-w-4xl text-zinc-200">{study.summary}</p>
        </div>
      </Section>

      <Section className="grid gap-4 md:grid-cols-2">
        <article className="floating-panel rounded-xl p-5">
          <h2 className="text-2xl font-black uppercase">AI Highlights</h2>
          <ul className="mt-3 space-y-2 text-zinc-300">
            {(study.highlights as string[]).map((item) => <li key={item}>• {item}</li>)}
          </ul>
        </article>
        <article className="floating-panel rounded-xl p-5">
          <h2 className="text-2xl font-black uppercase">Metrics</h2>
          <ul className="mt-3 space-y-2 text-zinc-300">
            {(study.metrics as string[]).map((item) => <li key={item}>• {item}</li>)}
          </ul>
        </article>
      </Section>

      <Section className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-xl border border-white/10 bg-gradient-to-b from-cyan-500/10 to-white/[0.02] p-5">
          <h3 className="text-xl font-black uppercase">Challenge</h3>
          <p className="mt-3 text-zinc-300">{study.challenge}</p>
        </article>
        <article className="rounded-xl border border-white/10 bg-gradient-to-b from-red-500/10 to-white/[0.02] p-5">
          <h3 className="text-xl font-black uppercase">Solution</h3>
          <p className="mt-3 text-zinc-300">{study.solution}</p>
        </article>
        <article className="rounded-xl border border-white/10 bg-gradient-to-b from-emerald-500/10 to-white/[0.02] p-5">
          <h3 className="text-xl font-black uppercase">Results</h3>
          <p className="mt-3 text-zinc-300">{study.results}</p>
        </article>
      </Section>
    </main>
  );
}
