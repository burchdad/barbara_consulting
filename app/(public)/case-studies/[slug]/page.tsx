import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  FileText,
  Lightbulb,
  ShieldCheck,
  Target,
  Workflow,
} from "lucide-react";

import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/public/reveal";
import { siteConfig } from "@/lib/config/site";
import { getPublicCaseStudyDetailData } from "@/lib/site-data";

function normalizeList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
  }

  return [];
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { study, settings } = await getPublicCaseStudyDetailData(slug);

  if (!study || !study.isPublished) {
    notFound();
  }

  const fallbackImageUrl =
    settings?.caseStudyDetailFallbackImageUrl ||
    siteConfig.media.caseStudyDetailFallbackImageUrl;

  const heroImageUrl = study.imageUrl || fallbackImageUrl;
  const highlights = normalizeList(study.highlights);
  const metrics = normalizeList(study.metrics);

  return (
    <main className="overflow-hidden">
      {/* HERO */}
      <Section className="relative isolate overflow-hidden py-24 lg:py-32">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(2,6,23,0.12), rgba(2,6,23,0.94)), url(${heroImageUrl})`,
          }}
        />

        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_28%,rgba(34,211,238,0.24),transparent_32%),radial-gradient(circle_at_18%_72%,rgba(168,85,247,0.13),transparent_30%),linear-gradient(135deg,rgba(2,6,23,0.96),rgba(2,6,23,0.72))]" />

        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

        <Reveal>
          <div className="max-w-6xl">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-slate-300 transition hover:text-cyan-300"
            >
              <ArrowLeft size={16} />
              Back to Case Studies
            </Link>

            <p className="mt-8 text-xs font-bold uppercase tracking-[0.36em] text-cyan-300">
              AI Outcome Brief
            </p>

            <h1 className="mt-5 max-w-6xl text-5xl font-black uppercase leading-[0.92] text-white sm:text-7xl lg:text-8xl">
              {study.title}
            </h1>

            <p className="mt-8 max-w-4xl text-lg leading-8 text-slate-200 sm:text-xl">
              {study.summary}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="premium-button rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-cyan-200"
              >
                Discuss Similar Work
              </Link>

              <Link
                href="/services"
                className="premium-button rounded-full border border-white/35 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white backdrop-blur transition hover:border-cyan-200 hover:text-cyan-100"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* SNAPSHOT */}
      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="grid gap-5 lg:grid-cols-3">
            <article className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7">
              <Target className="text-cyan-200" size={26} />

              <p className="mt-8 text-xs uppercase tracking-[0.24em] text-cyan-300">
                Challenge
              </p>

              <h2 className="mt-3 text-3xl font-black uppercase text-white">
                The mission need.
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-300">
                {study.challenge}
              </p>
            </article>

            <article className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7">
              <Lightbulb className="text-cyan-200" size={26} />

              <p className="mt-8 text-xs uppercase tracking-[0.24em] text-cyan-300">
                Solution
              </p>

              <h2 className="mt-3 text-3xl font-black uppercase text-white">
                The strategic response.
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-300">
                {study.solution}
              </p>
            </article>

            <article className="rounded-[2rem] border border-cyan-200/20 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.16),transparent_30%),linear-gradient(145deg,rgba(15,23,42,0.92),rgba(2,6,23,0.88))] p-7">
              <BarChart3 className="text-cyan-200" size={26} />

              <p className="mt-8 text-xs uppercase tracking-[0.24em] text-cyan-300">
                Results
              </p>

              <h2 className="mt-3 text-3xl font-black uppercase text-white">
                The measurable impact.
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-300">
                {study.results}
              </p>
            </article>
          </div>
        </Reveal>
      </Section>

      {/* HIGHLIGHTS / METRICS */}
      <Section className="py-20 lg:py-28">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <article className="min-h-[420px] rounded-[2.5rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <Workflow className="text-cyan-200" size={26} />

                <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">
                  AI Highlights
                </p>
              </div>

              <h2 className="mt-6 text-4xl font-black uppercase leading-tight text-white">
                Key modernization and workflow improvements.
              </h2>

              {highlights.length > 0 ? (
                <ul className="mt-8 space-y-4">
                  {highlights.map((item) => (
                    <li key={item} className="flex gap-4 text-slate-300">
                      <CheckCircle2
                        className="mt-1 shrink-0 text-cyan-200"
                        size={18}
                      />

                      <span className="leading-7">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-8 text-slate-300">
                  Highlights are being prepared for this case study.
                </p>
              )}
            </article>
          </Reveal>

          <Reveal delay={0.05}>
            <article className="min-h-[420px] rounded-[2.5rem] border border-cyan-200/15 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.14),transparent_30%),linear-gradient(135deg,rgba(15,23,42,0.76),rgba(2,6,23,0.9))] p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <BarChart3 className="text-cyan-200" size={26} />

                <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">
                  Metrics
                </p>
              </div>

              <h2 className="mt-6 text-4xl font-black uppercase leading-tight text-white">
                Indicators of performance and operational value.
              </h2>

              {metrics.length > 0 ? (
                <div className="mt-8 grid gap-4">
                  {metrics.map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/25 p-5"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-200/30 bg-cyan-200/[0.06] text-sm font-black text-cyan-200">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="text-sm font-bold uppercase tracking-[0.12em] text-white">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-8 text-slate-300">
                  Metrics are being prepared for this case study.
                </p>
              )}
            </article>
          </Reveal>
        </div>
      </Section>

      {/* APPROACH */}
      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-8 sm:p-12 lg:p-16">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
              <div>
                <ShieldCheck className="text-cyan-200" size={30} />

                <p className="mt-5 text-xs uppercase tracking-[0.3em] text-cyan-300">
                  Delivery Lens
                </p>

                <h2 className="mt-3 text-5xl font-black uppercase leading-none text-white sm:text-6xl">
                  Responsible modernization with practical execution.
                </h2>

                <p className="mt-5 text-lg leading-8 text-slate-300">
                  This outcome brief frames the work through a practical
                  delivery model: understand the mission need, align technology
                  to operational realities, improve visibility, and strengthen
                  execution.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Mission Context",
                    body: "Understand the organization, stakeholders, constraints, and operational requirements.",
                    icon: Target,
                  },
                  {
                    title: "Technology Alignment",
                    body: "Connect systems, data, automation, and AI strategy to the actual work being performed.",
                    icon: Workflow,
                  },
                  {
                    title: "Risk Awareness",
                    body: "Account for cybersecurity, governance, adoption, continuity, and responsible use.",
                    icon: ShieldCheck,
                  },
                  {
                    title: "Outcome Focus",
                    body: "Measure improvement through clarity, efficiency, resilience, and execution confidence.",
                    icon: BarChart3,
                  },
                ].map(({ title, body, icon: Icon }) => (
                  <article
                    key={title}
                    className="rounded-2xl border border-white/10 bg-black/25 p-5"
                  >
                    <Icon className="text-cyan-200" size={22} />

                    <h3 className="mt-5 text-xl font-black uppercase leading-tight text-white">
                      {title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {body}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

    </main>
  );
}
