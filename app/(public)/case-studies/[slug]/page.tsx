import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/section";
import { prisma } from "@/lib/prisma";

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = await prisma.caseStudy.findUnique({ where: { slug } });

  if (!study || !study.isPublished) {
    notFound();
  }

  return (
    <main>
      <Section>
        <Link href="/case-studies" className="text-sm text-zinc-400 hover:text-red-300">← Back to Case Studies</Link>
        <h1 className="mt-4 text-5xl font-black uppercase">{study.title}</h1>
        <p className="mt-4 text-zinc-300">{study.summary}</p>
      </Section>

      <Section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <h2 className="text-2xl font-black uppercase">Highlights</h2>
          <ul className="mt-3 space-y-2 text-zinc-300">
            {(study.highlights as string[]).map((item) => <li key={item}>• {item}</li>)}
          </ul>
        </article>
        <article className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <h2 className="text-2xl font-black uppercase">Metrics</h2>
          <ul className="mt-3 space-y-2 text-zinc-300">
            {(study.metrics as string[]).map((item) => <li key={item}>• {item}</li>)}
          </ul>
        </article>
      </Section>

      <Section className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <h3 className="text-xl font-black uppercase">Challenge</h3>
          <p className="mt-3 text-zinc-300">{study.challenge}</p>
        </article>
        <article className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <h3 className="text-xl font-black uppercase">Solution</h3>
          <p className="mt-3 text-zinc-300">{study.solution}</p>
        </article>
        <article className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <h3 className="text-xl font-black uppercase">Results</h3>
          <p className="mt-3 text-zinc-300">{study.results}</p>
        </article>
      </Section>
    </main>
  );
}
