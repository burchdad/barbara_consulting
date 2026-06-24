import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileSearch,
  Layers3,
  ShieldCheck,
  Target,
} from "lucide-react";

import { HomepageCinematicScene } from "@/components/public/homepage-cinematic-scene";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/public/reveal";
import { siteConfig } from "@/lib/config/site";
import { getPublicCaseStudiesPageData } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Read Gray Matters Technology Services case studies focused on AI modernization, workflow intelligence, cyber readiness, and mission technology outcomes.",
  alternates: {
    canonical: "/case-studies",
  },
};

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
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-cyan-200">
                  Case Studies
                </p>

                <h1 className="max-w-6xl text-5xl font-black uppercase leading-[0.92] text-white sm:text-6xl lg:text-[4.9rem]">
                  Evidence-backed impact across AI, mission technology, and
                  modernization.
                </h1>

                <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
                  Explore examples of how intelligent systems, secure
                  workflows, and practical technology strategy can help
                  organizations improve clarity, execution, resilience, and
                  operational performance.
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

              <div className="about-hero-profile relative hidden min-h-[34rem] overflow-hidden lg:block">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-65"
                  style={{ backgroundImage: `url(${heroImageUrl})` }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,6,23,0.22),rgba(2,6,23,0.92)_64%,rgba(8,47,73,0.86))]" />
                <div className="absolute inset-8 border border-cyan-200/15 bg-[linear-gradient(to_right,rgba(34,211,238,0.11)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[length:4.5rem_4.5rem]" />

                <div className="absolute left-8 top-8 max-w-[18rem] border border-white/15 bg-black/50 p-5 backdrop-blur">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">
                    Outcome Briefs
                  </p>
                  <p className="mt-3 text-2xl font-black uppercase leading-tight text-white">
                    Mission results translated into practical proof.
                  </p>
                </div>

                <div className="absolute bottom-8 right-8 grid w-[21rem] gap-3">
                  {["Challenge", "Response", "Impact"].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center justify-between border border-cyan-200/18 bg-black/48 px-4 py-3 backdrop-blur"
                    >
                      <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-300">
                        0{index + 1}
                      </span>
                      <span className="text-sm font-black uppercase tracking-[0.14em] text-white">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </Section>
      </section>

      {/* PROOF INTRO */}
      <Section className="about-command-section relative overflow-visible py-20 lg:py-28">
        <div aria-hidden className="about-angle-field">
          <div className="about-angle-plane about-angle-plane-a" />
          <div className="about-angle-plane about-angle-plane-b" />
          <div className="about-angle-plane about-angle-plane-c" />
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal variant="angleLeft">
            <div className="relative">
              <div aria-hidden className="about-title-rail" />
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                Impact Framework
              </p>

              <h2 className="mt-4 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
                Proof should be clear, practical, and tied to mission outcomes.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.05} variant="tiltRight">
            <div className="about-overview-panel relative p-8 sm:p-10">
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
                    className="border border-cyan-200/20 bg-cyan-200/[0.03] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-cyan-100"
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
            <Reveal key={title} delay={0.04 + index * 0.04} variant="tiltLeft">
              <article className="about-system-card min-h-[19rem] p-8">
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
                <article className="about-leader-card group flex min-h-[520px] flex-col overflow-hidden transition hover:border-cyan-200/40">
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
            <div className="about-leader-card p-10 text-center">
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
          <div className="about-lead-panel p-8 sm:p-12 lg:p-16">
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
                    className="about-lead-card flex min-h-[6rem] items-center gap-4 p-5"
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

    </HomepageCinematicScene>
  );
}
