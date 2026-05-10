import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { prisma } from "@/lib/prisma";

export default async function CaseStudiesPage() {
  const studies = await prisma.caseStudy.findMany({
    where: { isPublished: true },
    orderBy: { displayOrder: "asc" },
  });

  return (
    <main>
      <Section>
        <h1 className="text-5xl font-black uppercase">Proven Results: Case Study Highlights</h1>
        <p className="mt-4 max-w-3xl text-zinc-300">Evidence-backed delivery outcomes across federal mission, technology, and operations programs.</p>
      </Section>

      <Section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {studies.map((study) => (
          <article key={study.id} className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-red-500/50 hover:bg-white/[0.04]">
            <p className="text-sm uppercase tracking-[0.2em] text-red-400">Case Study</p>
            <h2 className="mt-2 text-2xl font-black uppercase">{study.title}</h2>
            <p className="mt-3 text-sm text-zinc-300">{study.summary}</p>
            <Link href={`/case-studies/${study.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-300">
              Read details <ArrowRight size={15} className="transition group-hover:translate-x-1" />
            </Link>
          </article>
        ))}
      </Section>
    </main>
  );
}
