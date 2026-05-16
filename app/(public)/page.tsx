import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CircuitBoard,
  Landmark,
  Layers3,
  Quote,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/public/reveal";
import { HomepageCinematicScene } from "@/components/public/homepage-cinematic-scene";
import { getPublishedData } from "@/lib/site-data";
import { fallbackServices } from "@/lib/data/services";

const featuredAudience = [
  "AI readiness",
  "Workflow automation",
  "Secure modernization",
];

function categoryIcon(category: string) {
  const normalized = category.toLowerCase();

  if (
    normalized.includes("engineering") ||
    normalized.includes("technology") ||
    normalized.includes("cyber")
  ) {
    return <CircuitBoard size={18} />;
  }

  if (
    normalized.includes("mission") ||
    normalized.includes("program") ||
    normalized.includes("acquisition")
  ) {
    return <Layers3 size={18} />;
  }

  return <BriefcaseBusiness size={18} />;
}

export default async function HomePage() {
  const { services, contracts, leadership, testimonials } = await getPublishedData();

  const servicesToRender = services.length ? services : fallbackServices;

  const heroHeadline =
    "AI consulting for smarter operations and secure growth.";

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
      <section className="relative isolate min-h-screen overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/greyaivideo.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.96)_0%,rgba(2,6,23,0.82)_44%,rgba(2,6,23,0.52)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(34,211,238,0.22),transparent_30%),radial-gradient(circle_at_18%_78%,rgba(168,85,247,0.14),transparent_28%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent via-slate-950/70 to-slate-950" />

        <Section className="relative z-10 flex min-h-screen items-end pb-24 pt-36 lg:pb-32">
          <Reveal>
            <div className="max-w-6xl">
              <img
                src="/greylogo.png"
                alt="Gray Matters Technology - Sage Tech Solutions"
                className="mb-10 h-auto w-[220px] sm:w-[300px] lg:w-[420px]"
              />

              <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-cyan-200">
                AI Strategy • Workflow Automation • Secure Systems
              </p>

              <h1 className="max-w-7xl text-5xl font-black uppercase leading-[0.92] text-white sm:text-7xl lg:text-8xl 2xl:text-[8.5rem]">
                {heroHeadline}
              </h1>

              <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
                Gray Matters Technology- Sage Tech Solutions helps teams
                identify practical AI opportunities, modernize workflows,
                strengthen secure systems, and move from ideas to execution.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="premium-button rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-cyan-200"
                >
                  Start a Strategic Conversation
                </Link>

                <Link
                  href="/services"
                  className="premium-button rounded-full border border-white/35 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white backdrop-blur transition hover:border-cyan-200 hover:text-cyan-100"
                >
                  Explore Capabilities
                </Link>
              </div>
            </div>
          </Reveal>
        </Section>
      </section>

      {/* POSITIONING / ABOUT PREVIEW */}
      <Section className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">
                AI-Native Consulting and Automation
              </p>

              <h2 className="mt-4 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
                Where operational experience meets intelligent modernization.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 shadow-[0_0_80px_rgba(34,211,238,0.06)] sm:p-10">
              <p className="text-lg leading-8 text-slate-300">
                Gray Matters Technology- Sage Tech Solutions supports
                organizations with AI readiness, responsible adoption,
                workflow automation strategy, and secure modernization. The
                goal is simple: help teams make better decisions, reduce
                manual friction, and move forward with measurable confidence.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {featuredAudience.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-cyan-200/20 px-4 py-3 text-center text-xs uppercase tracking-[0.16em] text-cyan-100"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-cyan-200 transition hover:text-white"
              >
                Learn About the Firm <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* SERVICES PREVIEW */}
      <Section id="services" className="py-20 lg:py-28">
        <Reveal>
          <div className="mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                Core Services
              </p>

              <h2 className="mt-3 text-5xl font-black uppercase text-white sm:text-7xl">
                Focused capabilities for modern teams.
              </h2>
            </div>

            <p className="max-w-xl text-slate-300">
              A streamlined view of the firm&apos;s highest-value AI consulting,
              automation, and secure modernization services.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {servicesToRender.slice(0, 3).map((service, index) => (
            <Reveal key={service.id} delay={0.05 + index * 0.04}>
              <article className="group flex min-h-[340px] flex-col rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] p-7 backdrop-blur transition hover:-translate-y-2 hover:border-cyan-200/40">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-200/20 px-3 py-1 text-xs text-cyan-100">
                  {categoryIcon(service.category)}
                  {service.category}
                </div>

                <h3 className="mt-8 text-3xl font-black uppercase leading-tight text-white">
                  {service.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-slate-300">
                  {service.description}
                </p>

                <div className="mt-auto pt-8">
                  <div className="h-px bg-gradient-to-r from-cyan-300/40 to-transparent" />
                  <p className="mt-4 text-xs uppercase tracking-[0.18em] text-cyan-200">
                    Strategic capability 0{index + 1}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="premium-button inline-flex rounded-full border border-cyan-200/30 bg-white/[0.03] px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-200/10"
            >
              View All Services
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* LEADERSHIP PREVIEW */}
      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="rounded-[2.5rem] border border-white/10 bg-[linear-gradient(120deg,rgba(15,23,42,0.92),rgba(2,6,23,0.7)),url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=2200&q=85')] bg-cover bg-center p-8 sm:p-14 lg:p-20">
            <div className="max-w-4xl">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">
                Leadership
              </p>

              <h2 className="mt-4 text-5xl font-black uppercase leading-[0.95] text-white sm:text-7xl">
                AI-forward guidance for complex organizations.
              </h2>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
                Built for organizations that need practical AI strategy,
                secure modernization guidance, workflow intelligence, and
                trusted support through change.
              </p>

              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-cyan-200 transition hover:text-white"
              >
                Meet Leadership <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>

        {leadership.length > 0 && (
          <Reveal delay={0.08}>
            <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.025] p-6">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-cyan-200">
                    Featured Leadership
                  </p>

                  <p className="mt-2 text-xl font-bold text-white">
                    {leadership[0].name}
                  </p>

                  <p className="text-sm text-slate-400">
                    {leadership[0].title}
                  </p>
                </div>

                {leadership[0].shortBio && (
                  <p className="max-w-2xl text-sm leading-6 text-slate-300">
                    {leadership[0].shortBio}
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        )}
      </Section>

      {/* PROCUREMENT / CONTRACTS TEASER */}
      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-8 sm:p-12 lg:p-16">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <Landmark className="text-cyan-200" size={28} />

                <p className="mt-5 text-xs uppercase tracking-[0.28em] text-cyan-300">
                  Procurement Ready
                </p>

                <h2 className="mt-3 text-5xl font-black uppercase leading-none text-white sm:text-6xl">
                  Clear pathways for public-sector partners.
                </h2>

                <p className="mt-5 text-slate-300">
                  For agencies and partners who need a clear acquisition route,
                  contract vehicle and procurement details are available in one
                  focused location.
                </p>

                <Link
                  href="/contracts"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-cyan-200 transition hover:text-white"
                >
                  View Contract Vehicles <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {contracts.slice(0, 3).map((contract) => (
                  <article
                    key={contract.id}
                    className="rounded-2xl border border-white/10 bg-black/25 p-5"
                  >
                    <h3 className="text-lg font-bold uppercase text-white">
                      {contract.name}
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                      {contract.agency}
                    </p>
                  </article>
                ))}

                {contracts.length === 0 && (
                  <>
                    <article className="rounded-2xl border border-white/10 bg-black/25 p-5">
                      <ShieldCheck className="text-cyan-200" size={22} />
                      <h3 className="mt-5 text-lg font-bold uppercase text-white">
                        Public-Sector Ready
                      </h3>
                      <p className="mt-2 text-sm text-slate-400">
                        Structured for government and enterprise review.
                      </p>
                    </article>

                    <article className="rounded-2xl border border-white/10 bg-black/25 p-5">
                      <Layers3 className="text-cyan-200" size={22} />
                      <h3 className="mt-5 text-lg font-bold uppercase text-white">
                        Mission Aligned
                      </h3>
                      <p className="mt-2 text-sm text-slate-400">
                        Designed around operational goals and measurable value.
                      </p>
                    </article>

                    <article className="rounded-2xl border border-white/10 bg-black/25 p-5">
                      <Sparkles className="text-cyan-200" size={22} />
                      <h3 className="mt-5 text-lg font-bold uppercase text-white">
                        AI Forward
                      </h3>
                      <p className="mt-2 text-sm text-slate-400">
                        Practical modernization without unnecessary complexity.
                      </p>
                    </article>
                  </>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* TESTIMONIALS - ONLY SHOW IF REAL TESTIMONIALS EXIST */}
      {testimonials.length > 0 && (
        <Section className="py-20 lg:py-28">
          <Reveal>
            <div className="flex items-center gap-3 text-slate-300">
              <ShieldCheck size={18} className="text-cyan-300" />

              <p className="text-xs uppercase tracking-[0.24em]">
                Trust and Performance
              </p>
            </div>

            <h2 className="mt-3 text-5xl font-black uppercase text-white sm:text-6xl">
              Client Perspectives
            </h2>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {testimonials.slice(0, 3).map((item, index) => (
                <Reveal key={item.id} delay={0.05 + index * 0.05}>
                  <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-7">
                    <Quote size={18} className="text-cyan-300" />

                    <p className="mt-4 text-lg leading-7 text-white">
                      “{item.quote}”
                    </p>

                    <p className="mt-6 text-sm font-semibold text-cyan-200">
                      {item.authorName}
                    </p>

                    <p className="text-xs text-slate-400">
                      {item.authorTitle} • {item.organization}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </Section>
      )}

      {/* FINAL CTA */}
      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="rounded-[2.5rem] border border-cyan-200/20 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.18),transparent_36%),linear-gradient(135deg,rgba(15,23,42,0.92),rgba(2,6,23,0.92))] p-10 text-center sm:p-16">
            <Sparkles className="mx-auto text-cyan-300" size={28} />

            <p className="mt-4 text-xs uppercase tracking-[0.28em] text-cyan-200">
              Start the Conversation
            </p>

            <h2 className="mx-auto mt-4 max-w-5xl text-5xl font-black uppercase leading-[0.92] text-white sm:text-7xl">
              Modernize with clarity, intelligence, and confidence.
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-200">
              Partner with a technology firm designed for AI strategy,
              workflow automation, secure modernization, and measurable
              operational improvement.
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
    </HomepageCinematicScene>
  );
}
