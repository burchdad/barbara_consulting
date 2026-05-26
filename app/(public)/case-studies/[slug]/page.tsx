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

import { HomepageCinematicScene } from "@/components/public/homepage-cinematic-scene";
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
    <HomepageCinematicScene
      sceneSettings={{
        type: "mesh",
        glow: "blue",
        particles: true,
        parallax: true,
      }}
    >
      {/* HERO */}
      <section className="about-hero relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(2,6,23,0.98)_0%,rgba(2,6,23,0.9)_50%,rgba(8,47,73,0.62)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(34,211,238,0.18),transparent_30%),linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.026)_1px,transparent_1px)] bg-[length:100%_100%,64px_64px,64px_64px]" />
        <div className="about-hero-dissolve absolute inset-x-0 bottom-0" />

        <Section className="relative z-10 flex min-h-[82vh] items-center pb-24 pt-36 lg:pb-28">
          <Reveal variant="angleLeft">
            <div className="grid w-full gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="max-w-5xl">
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-slate-300 transition hover:text-cyan-300"
                >
                  <ArrowLeft size={16} />
                  Back to Case Studies
                </Link>

                <p className="mt-8 text-xs font-bold uppercase tracking-[0.35em] text-cyan-200">
                  AI Outcome Brief
                </p>

                <h1 className="mt-5 max-w-6xl text-5xl font-black uppercase leading-[0.92] text-white sm:text-6xl lg:text-[4.9rem]">
                  {study.title}
                </h1>

                <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
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

              <div className="about-hero-profile relative hidden min-h-[34rem] overflow-hidden lg:block">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-62"
                  style={{ backgroundImage: `url(${heroImageUrl})` }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,6,23,0.2),rgba(2,6,23,0.92)_64%,rgba(8,47,73,0.86))]" />
                <div className="absolute inset-8 border border-cyan-200/15 bg-[linear-gradient(to_right,rgba(34,211,238,0.11)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[length:4.5rem_4.5rem]" />

                <div className="absolute left-8 top-8 max-w-[18rem] border border-white/15 bg-black/50 p-5 backdrop-blur">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">
                    Outcome Brief
                  </p>
                  <p className="mt-3 text-2xl font-black uppercase leading-tight text-white">
                    Challenge, response, and measurable value.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Section>
      </section>

      {/* SNAPSHOT */}
      <Section className="about-command-section relative overflow-visible py-20 lg:py-28">
        <div aria-hidden className="about-angle-field">
          <div className="about-angle-plane about-angle-plane-a" />
          <div className="about-angle-plane about-angle-plane-b" />
          <div className="about-angle-plane about-angle-plane-c" />
        </div>

        <Reveal>
          <div className="grid gap-5 lg:grid-cols-3">
            <article className="about-system-card min-h-[19rem] p-7">
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

            <article className="about-system-card min-h-[19rem] p-7">
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

            <article className="about-system-card min-h-[19rem] p-7">
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
            <article className="about-lead-panel min-h-[420px] p-8 sm:p-10">
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
            <article className="about-lead-panel min-h-[420px] p-8 sm:p-10">
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
          <div className="about-lead-panel p-8 sm:p-12 lg:p-16">
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
                    className="about-lead-card p-5"
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

    </HomepageCinematicScene>
  );
}
