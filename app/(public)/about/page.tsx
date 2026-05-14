import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Compass,
  Eye,
  Landmark,
  Layers3,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";

import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/public/reveal";
import { getPublishedData } from "@/lib/site-data";
import { siteConfig } from "@/lib/config/site";

const leadershipPrinciples = [
  {
    title: "Mission-First Strategy",
    body: "Every recommendation is anchored to operational needs, measurable outcomes, and the realities of public-sector execution.",
    icon: Target,
  },
  {
    title: "Responsible AI Adoption",
    body: "AI is introduced with practical governance, workflow clarity, security awareness, and human accountability.",
    icon: BrainCircuit,
  },
  {
    title: "Secure Modernization",
    body: "Technology decisions are shaped around resilience, continuity, cybersecurity, and long-term organizational value.",
    icon: ShieldCheck,
  },
  {
    title: "Execution Partnership",
    body: "The firm supports strategy through implementation, helping teams move from planning to practical delivery.",
    icon: Layers3,
  },
];

const impactAreas = [
  "AI Strategy",
  "Cyber Readiness",
  "Workflow Modernization",
  "Program Support",
  "Data Intelligence",
  "Public-Sector Delivery",
];

export default async function AboutPage() {
  const { settings, leadership } = await getPublishedData();

  const companyName = settings?.companyName ?? siteConfig.companyName;
  const aboutHeroImageUrl =
    settings?.aboutHeroImageUrl || siteConfig.media.aboutHeroImageUrl;

  return (
    <main className="overflow-hidden">
      {/* HERO */}
      <Section className="relative isolate overflow-hidden py-20 lg:py-28">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(2, 6, 23, 0.18), rgba(2, 6, 23, 0.92)), url(${aboutHeroImageUrl})`,
          }}
        />

        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_18%,rgba(34,211,238,0.24),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.14),transparent_28%),linear-gradient(135deg,rgba(2,6,23,0.96),rgba(2,6,23,0.68))]" />

        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

        <Reveal>
          <div className="max-w-6xl">
            <p className="text-xs font-bold uppercase tracking-[0.36em] text-cyan-300">
              About {companyName}
            </p>

            <h1 className="mt-5 max-w-6xl text-5xl font-black uppercase leading-[0.92] text-white sm:text-7xl lg:text-8xl">
              AI delivery leadership for mission-driven organizations.
            </h1>

            <p className="mt-8 max-w-4xl text-lg leading-8 text-slate-200 sm:text-xl">
              {companyName} helps public-sector, enterprise, and
              mission-focused teams modernize systems, strengthen operational
              clarity, and apply intelligent technology with responsible
              execution.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/services"
                className="premium-button rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-cyan-200"
              >
                Explore Services
              </Link>

              <Link
                href="/contact"
                className="premium-button rounded-full border border-white/35 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white backdrop-blur transition hover:border-cyan-200 hover:text-cyan-100"
              >
                Start a Conversation
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* POSITIONING */}
      <Section className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                Firm Overview
              </p>

              <h2 className="mt-4 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
                Built at the intersection of strategy, technology, security,
                and execution.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="space-y-5 rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 text-lg leading-8 text-slate-300 shadow-[0_0_80px_rgba(34,211,238,0.06)] sm:p-10">
              {siteConfig.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              <div className="grid gap-3 pt-4 sm:grid-cols-2 lg:grid-cols-3">
                {impactAreas.map((area) => (
                  <div
                    key={area}
                    className="rounded-full border border-cyan-200/20 bg-cyan-200/[0.03] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-cyan-100"
                  >
                    {area}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* MISSION / VISION / PURPOSE */}
      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
              Direction
            </p>

            <h2 className="mt-3 text-5xl font-black uppercase text-white sm:text-7xl">
              Mission, vision, and purpose.
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          <Reveal delay={0.03}>
            <article className="group min-h-[320px] rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] p-8 transition hover:-translate-y-2 hover:border-cyan-200/40">
              <Target className="text-cyan-200" size={28} />

              <h3 className="mt-10 text-3xl font-black uppercase text-white">
                Mission
              </h3>

              <p className="mt-5 text-base leading-7 text-slate-300">
                {siteConfig.about.missionStatement}
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.06}>
            <article className="group min-h-[320px] rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] p-8 transition hover:-translate-y-2 hover:border-cyan-200/40">
              <Eye className="text-cyan-200" size={28} />

              <h3 className="mt-10 text-3xl font-black uppercase text-white">
                Vision
              </h3>

              <p className="mt-5 text-base leading-7 text-slate-300">
                {siteConfig.about.visionStatement}
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.09}>
            <article className="group min-h-[320px] rounded-[2rem] border border-cyan-200/20 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.18),transparent_32%),linear-gradient(145deg,rgba(15,23,42,0.94),rgba(2,6,23,0.88))] p-8 transition hover:-translate-y-2 hover:border-cyan-200/50">
              <Compass className="text-cyan-200" size={28} />

              <h3 className="mt-10 text-3xl font-black uppercase text-white">
                Purpose
              </h3>

              <p className="mt-5 text-base leading-7 text-slate-300">
                To help organizations move beyond outdated systems and
                fragmented workflows into a future where strategy, security,
                intelligence, and execution work together.
              </p>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* VALUES */}
      <Section className="py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <Reveal>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                Core Values
              </p>

              <h2 className="mt-3 text-5xl font-black uppercase leading-none text-white sm:text-6xl">
                Principles that guide the work.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-300">
                The firm’s values shape how strategy is developed, how
                technology is introduced, and how modernization efforts are
                carried from vision into execution.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="grid gap-4 sm:grid-cols-2">
              {siteConfig.about.values.map((value, index) => (
                <div
                  key={value}
                  className="flex min-h-[96px] items-center gap-4 rounded-2xl border border-white/10 bg-black/25 p-5 transition hover:border-cyan-200/40 hover:bg-cyan-200/[0.04]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-200/30 bg-cyan-200/[0.06] text-sm font-black text-cyan-200">
                    0{index + 1}
                  </span>

                  <p className="text-lg font-black uppercase leading-tight text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* HOW WE LEAD */}
      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="rounded-[2.5rem] border border-cyan-200/15 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.14),transparent_30%),linear-gradient(135deg,rgba(15,23,42,0.76),rgba(2,6,23,0.9))] p-8 sm:p-12 lg:p-16">
            <div className="mb-10 max-w-4xl">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                How We Lead
              </p>

              <h2 className="mt-3 text-5xl font-black uppercase leading-none text-white sm:text-6xl">
                Practical modernization without unnecessary complexity.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-300">
                The work is designed to help teams understand what matters,
                align leadership around priorities, and move from scattered
                tools into coordinated intelligent systems.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {leadershipPrinciples.map(({ title, body, icon: Icon }, index) => (
                <Reveal key={title} delay={0.04 + index * 0.04}>
                  <article className="min-h-[280px] rounded-[2rem] border border-white/10 bg-black/25 p-7 transition hover:-translate-y-2 hover:border-cyan-200/40">
                    <Icon className="text-cyan-200" size={26} />

                    <h3 className="mt-10 text-2xl font-black uppercase leading-tight text-white">
                      {title}
                    </h3>

                    <p className="mt-4 text-sm leading-6 text-slate-300">
                      {body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* LEADERSHIP TEAM */}
      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                Leadership Team
              </p>

              <h2 className="mt-3 text-5xl font-black uppercase text-white sm:text-7xl">
                Experienced guidance for complex environments.
              </h2>
            </div>

            <p className="max-w-xl text-slate-300">
              Leadership combines mission awareness, technology strategy, and
              practical delivery experience to support organizations through
              modernization and change.
            </p>
          </div>
        </Reveal>

        {leadership.length > 0 ? (
          <div className="grid gap-6">
            {leadership.map((leader, index) => (
              <Reveal key={leader.id} delay={0.05 + index * 0.04}>
                <article className="grid gap-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-200/30 md:grid-cols-[280px_1fr]">
                  <div
                    className="min-h-[320px] rounded-[1.5rem] bg-cover bg-center grayscale transition duration-500 hover:grayscale-0"
                    style={{
                      backgroundImage: `url(${
                        leader.photoUrl ||
                        "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80"
                      })`,
                    }}
                  />

                  <div className="flex flex-col justify-center p-2 md:p-6">
                    <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">
                      Executive Leadership
                    </p>

                    <h3 className="mt-3 text-4xl font-black uppercase leading-tight text-white">
                      {leader.name}
                    </h3>

                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
                      {leader.title}
                    </p>

                    <p className="mt-6 text-base leading-8 text-slate-300">
                      {leader.fullBio || leader.shortBio}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 text-center">
              <UsersRound className="mx-auto text-cyan-300" size={30} />

              <h3 className="mt-5 text-3xl font-black uppercase text-white">
                Leadership information coming soon.
              </h3>

              <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                The leadership section is ready to display executive profiles
                once team information is published.
              </p>
            </div>
          </Reveal>
        )}
      </Section>

      {/* CTA */}
      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="rounded-[2.5rem] border border-cyan-200/20 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.18),transparent_36%),linear-gradient(135deg,rgba(15,23,42,0.92),rgba(2,6,23,0.92))] p-10 text-center sm:p-16">
            <Sparkles className="mx-auto text-cyan-300" size={28} />

            <p className="mt-4 text-xs uppercase tracking-[0.28em] text-cyan-200">
              Move Forward with Clarity
            </p>

            <h2 className="mx-auto mt-4 max-w-5xl text-5xl font-black uppercase leading-[0.92] text-white sm:text-7xl">
              Bring strategy, systems, security, and intelligence into
              alignment.
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-200">
              Partner with a firm designed to help mission-driven teams
              modernize responsibly and execute with confidence.
            </p>

            <Link
              href="/contact"
              className="premium-button mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-cyan-200"
            >
              Contact Our Team
            </Link>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}