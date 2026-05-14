import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileSearch,
  Layers3,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/public/reveal";
import { siteConfig } from "@/lib/config/site";
import { getPublicCaseStudiesPageData } from "@/lib/site-data";

const proofPoints = [
  {
    title: "Operational Clarity",
    body: "Each engagement is framed around the mission problem, stakeholder needs, constraints, and measurable outcomes.",
    icon: Target,
  },
  {
    title: "Secure Modernization",
    body: "Case studies highlight technology improvements designed around security, resilience, and responsible adoption.",
    icon: ShieldCheck,
  },
  {
    title: "Execution Evidence",
    body: "The focus is not only strategy, but practical movement from planning into deployed workflows and improved operations.",
    icon: CheckCircle2,
  },
];

const caseStudySignals = [
  "AI modernization",
  "Mission technology",
  "Workflow intelligence",
  "Cyber readiness",
  "Operational resilience",
  "Program support",
];

export default async function CaseStudiesPage() {
  const { studies, settings } = await getPublicCaseStudiesPageData();

  const heroImageUrl =
    settings?.caseStudiesHeroImageUrl ||
    siteConfig.media.caseStudiesHeroImageUrl;

  return (
    <main className="overflow-hidden">
      {/* HERO */}
      <Section className="relative isolate overflow-hidden py-24 lg:py-32">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(2, 6, 23, 0.18), rgba(2, 6, 23, 0.94)), url(${heroImageUrl})`,
          }}
        />

        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_28%,rgba(34,211,238,0.24),transparent_32%),radial-gradient(circle_at_18%_70%,rgba(168,85,247,0.13),transparent_30%),linear-gradient(135deg,rgba(2,6,23,0.96),rgba(2,6,23,0.76))]" />

        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

        <Reveal>
          <div className="max-w-6xl">
            <p className="text-xs font-bold uppercase tracking-[0.36em] text-cyan-300">
              Case Studies
            </p>

            <h1 className="mt-5 max-w-6xl text-5xl font-black uppercase leading-[0.92] text-white sm:text-7xl lg:text-8xl">
              Evidence-backed impact across AI, mission technology, and
              modernization.
            </h1>

            <p className="mt-8 max-w-4xl text-lg leading-8 text-slate-200 sm:text-xl">
              Explore examples of how intelligent systems, secure workflows,
              and practical technology strategy can help organizations improve
              clarity, execution, resilience, and operational performance.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="premium-button rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-cyan-200"
              >
                Discuss a Project
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

      {/* PROOF INTRO */}
      <Section className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                Impact Framework
              </p>

              <h2 className="mt-4 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
                Proof should be clear, practical, and tied to mission outcomes.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 shadow-[0_0_80px_rgba(34,211,238,0.06)] sm:p-10">
              <p className="text-lg leading-8 text-slate-300">
                These case study highlights are structured to show more than
                activity. They are designed to clarify the challenge, the
                strategic response, the technology approach, and the measurable
                value created for complex organizations.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {caseStudySignals.map((signal) => (
                  <span
                    key={signal}
                    className="rounded-full border border-cyan-200/20 bg-cyan-200/[0.03] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-cyan-100"
                  >
                    {signal}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* PROOF POINTS */}
      <Section className="py-20 lg:py-28">
        <div className="grid gap-5 lg:grid-cols-3">
          {proofPoints.map(({ title, body, icon: Icon }, index) => (
            <Reveal key={title} delay={0.04 + index * 0.04}>
              <article className="group min-h-[300px] rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] p-8 transition hover:-translate-y-2 hover:border-cyan-200/40">
                <Icon className="text-cyan-200" size={28} />

                <h3 className="mt-10 text-3xl font-black uppercase leading-tight text-white">
                  {title}
                </h3>

                <p className="mt-5 text-base leading-7 text-slate-300">
                  {body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CASE STUDY GRID */}
      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                Featured Work
              </p>

              <h2 className="mt-3 text-5xl font-black uppercase text-white sm:text-7xl">
                Case study highlights.
              </h2>
            </div>

            <p className="max-w-xl text-slate-300">
              Review selected examples of modernization, AI strategy, workflow
              improvement, and operational support.
            </p>
          </div>
        </Reveal>

        {studies.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {studies.map((study, index) => (
              <Reveal key={study.id} delay={0.04 + index * 0.04}>
                <article className="case-card group flex min-h-[520px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] transition hover:-translate-y-2 hover:border-cyan-200/40 hover:bg-white/[0.055]">
                  <div
                    className="relative h-56 bg-cover bg-center"
                    style={{
                      backgroundImage: `linear-gradient(to bottom, rgba(2, 6, 23, 0.16), rgba(2, 6, 23, 0.86)), url(${
                        study.imageUrl ||
                        "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80"
                      })`,
                    }}
                  >
                    <div className="absolute left-5 top-5 rounded-full border border-cyan-200/25 bg-black/35 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100 backdrop-blur">
                      AI Case Study
                    </div>

                    <div className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-cyan-100 backdrop-blur">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">
                      Impact Highlight
                    </p>

                    <h3 className="mt-3 text-3xl font-black uppercase leading-tight text-white">
                      {study.title}
                    </h3>

                    <p className="mt-4 text-sm leading-6 text-slate-300">
                      {study.summary}
                    </p>

                    <div className="mt-auto pt-8">
                      <div className="mb-5 h-px bg-gradient-to-r from-cyan-300/40 to-transparent" />

                      <Link
                        href={`/case-studies/${study.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-cyan-200 transition hover:text-white"
                      >
                        Read Details
                        <ArrowRight
                          size={15}
                          className="transition group-hover:translate-x-1"
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-10 text-center">
              <FileSearch className="mx-auto text-cyan-300" size={32} />

              <h3 className="mt-5 text-3xl font-black uppercase text-white">
                Case studies are being prepared.
              </h3>

              <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                This section is ready to showcase published case studies once
                they are added to the site.
              </p>
            </div>
          </Reveal>
        )}
      </Section>

      {/* OUTCOME STRIP */}
      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="rounded-[2.5rem] border border-cyan-200/15 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.14),transparent_30%),linear-gradient(135deg,rgba(15,23,42,0.76),rgba(2,6,23,0.9))] p-8 sm:p-12 lg:p-16">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
              <div>
                <BarChart3 className="text-cyan-200" size={30} />

                <p className="mt-5 text-xs uppercase tracking-[0.3em] text-cyan-300">
                  Outcome Lens
                </p>

                <h2 className="mt-3 text-5xl font-black uppercase leading-none text-white sm:text-6xl">
                  Every project should connect technology to measurable value.
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Reduced operational friction",
                  "Improved decision visibility",
                  "Stronger security posture",
                  "Clearer modernization roadmap",
                  "Better workflow coordination",
                  "More confident execution",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/25 p-5"
                  >
                    <CheckCircle2
                      className="shrink-0 text-cyan-200"
                      size={20}
                    />

                    <p className="text-sm font-bold uppercase tracking-[0.12em] text-white">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* CTA */}
      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="rounded-[2.5rem] border border-cyan-200/20 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.18),transparent_36%),linear-gradient(135deg,rgba(15,23,42,0.92),rgba(2,6,23,0.92))] p-10 text-center sm:p-16">
            <Sparkles className="mx-auto text-cyan-300" size={28} />

            <p className="mt-4 text-xs uppercase tracking-[0.28em] text-cyan-200">
              Build the Next Case Study
            </p>

            <h2 className="mx-auto mt-4 max-w-5xl text-5xl font-black uppercase leading-[0.92] text-white sm:text-7xl">
              Turn modernization goals into measurable results.
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-200">
              Partner with a technology firm focused on practical strategy,
              secure systems, AI adoption, and mission-aligned execution.
            </p>

            <Link
              href="/contact"
              className="premium-button mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-cyan-200"
            >
              Start a Strategic Conversation
            </Link>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}