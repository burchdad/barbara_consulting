import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CircuitBoard,
  CloudCog,
  DatabaseZap,
  Landmark,
  Layers3,
  ShieldCheck,
  Sparkles,
  Truck,
  UsersRound,
  Workflow,
} from "lucide-react";

import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/public/reveal";
import { getPublishedData } from "@/lib/site-data";
import { fallbackServices } from "@/lib/data/services";

const audienceSegments = [
  {
    title: "Federal Agencies",
    body: "AI modernization, acquisition support, and secure operational transformation for complex mission environments.",
    icon: Landmark,
  },
  {
    title: "State & Local Government",
    body: "Practical automation, analytics, and digital service improvements designed for measurable public-sector outcomes.",
    icon: UsersRound,
  },
  {
    title: "Mission Partners",
    body: "Strategy, governance, and technical delivery support for organizations serving high-consequence programs.",
    icon: ShieldCheck,
  },
  {
    title: "Technology Teams",
    body: "Architecture guidance, workflow intelligence, and implementation pathways for teams building smarter systems.",
    icon: CircuitBoard,
  },
];

const capabilityMatrix = [
  { title: "AI Strategy & Governance", icon: Sparkles },
  { title: "Secure Workflow Automation", icon: Workflow },
  { title: "Cloud & System Modernization", icon: CloudCog },
  { title: "Data Intelligence & Analytics", icon: DatabaseZap },
  { title: "Compliance Readiness", icon: ShieldCheck },
  { title: "Program & Acquisition Support", icon: Layers3 },
];

const modernizationSteps = [
  {
    step: "01",
    title: "Discover",
    body: "Assess mission goals, current systems, procurement constraints, stakeholder needs, and modernization opportunities.",
  },
  {
    step: "02",
    title: "Design",
    body: "Map an AI-ready strategy across governance, data, security, workflow, implementation, and measurable outcomes.",
  },
  {
    step: "03",
    title: "Deploy",
    body: "Implement intelligent systems, automations, dashboards, secure operating workflows, and adoption support.",
  },
  {
    step: "04",
    title: "Optimize",
    body: "Measure performance, refine adoption, improve operational efficiency, and continuously strengthen the system.",
  },
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

  if (normalized.includes("mission") || normalized.includes("logistics")) {
    return <Truck size={18} />;
  }

  if (
    normalized.includes("program") ||
    normalized.includes("acquisition") ||
    normalized.includes("management")
  ) {
    return <Layers3 size={18} />;
  }

  return <BriefcaseBusiness size={18} />;
}

export default async function ServicesPage() {
  const { services } = await getPublishedData();

  const servicesToRender = services.length ? services : fallbackServices;

  return (
    <main className="overflow-hidden">
      {/* HERO */}
      <Section className="relative isolate overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_18%,rgba(34,211,238,0.24),transparent_30%),radial-gradient(circle_at_78%_20%,rgba(168,85,247,0.14),transparent_28%),linear-gradient(135deg,rgba(2,6,23,0.98),rgba(2,6,23,0.78))]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

        <Reveal>
          <div className="max-w-6xl">
            <p className="text-xs font-bold uppercase tracking-[0.36em] text-cyan-300">
              Services & Capabilities
            </p>

            <h1 className="mt-5 max-w-6xl text-5xl font-black uppercase leading-[0.92] text-white sm:text-7xl lg:text-8xl">
              Strategy, systems, security, and AI modernization.
            </h1>

            <p className="mt-8 max-w-4xl text-lg leading-8 text-slate-200 sm:text-xl">
              Gray Matters Technology Services helps mission-driven
              organizations assess needs, design practical modernization
              strategies, implement intelligent workflows, and strengthen
              operational performance.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="premium-button rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-cyan-200"
              >
                Start a Strategic Conversation
              </Link>

              <Link
                href="/contracts"
                className="premium-button rounded-full border border-white/35 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white backdrop-blur transition hover:border-cyan-200 hover:text-cyan-100"
              >
                View Contract Vehicles
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* WHO WE SERVE */}
      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                Who We Serve
              </p>

              <h2 className="mt-3 text-5xl font-black uppercase text-white sm:text-7xl">
                Built for complex organizations.
              </h2>
            </div>

            <p className="max-w-xl text-slate-300">
              Clear audience pathways help government, enterprise, and
              mission-focused buyers quickly understand where the firm fits.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {audienceSegments.map(({ title, body, icon: Icon }, index) => (
            <Reveal key={title} delay={0.05 + index * 0.04}>
              <article className="group min-h-[280px] rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 transition hover:-translate-y-2 hover:border-cyan-200/40 hover:bg-white/[0.055]">
                <Icon className="text-cyan-200" size={24} />

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
      </Section>

      {/* CAPABILITY MATRIX */}
      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="rounded-[2.5rem] border border-cyan-200/15 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.14),transparent_30%),linear-gradient(135deg,rgba(15,23,42,0.76),rgba(2,6,23,0.9))] p-8 sm:p-12 lg:p-16">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                  AI Capability Matrix
                </p>

                <h2 className="mt-3 text-5xl font-black uppercase leading-none text-white sm:text-6xl">
                  Systems, data, security, and workflow intelligence.
                </h2>

                <p className="mt-5 text-slate-300">
                  The firm supports the strategy and implementation layers
                  required to move from scattered tools into coordinated,
                  intelligent operating systems.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {capabilityMatrix.map(({ title, icon: Icon }, index) => (
                  <Reveal key={title} delay={0.04 + index * 0.03}>
                    <article className="flex min-h-[120px] items-center gap-4 rounded-2xl border border-white/10 bg-black/25 p-5 transition hover:border-cyan-200/40 hover:bg-cyan-200/[0.04]">
                      <Icon className="shrink-0 text-cyan-200" size={22} />

                      <h3 className="text-lg font-black uppercase leading-tight text-white">
                        {title}
                      </h3>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* SERVICES */}
      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                Core Services
              </p>

              <h2 className="mt-3 text-5xl font-black uppercase text-white sm:text-7xl">
                Designed for modern government.
              </h2>
            </div>

            <p className="max-w-xl text-slate-300">
              Service areas are structured for clarity, procurement review, and
              practical execution across complex operating environments.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {servicesToRender.map((service, index) => (
            <Reveal key={service.id} delay={0.04 + index * 0.035}>
              <article className="group flex min-h-[360px] flex-col rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] p-7 backdrop-blur transition hover:-translate-y-2 hover:border-cyan-200/40">
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
                    Strategic capability {String(index + 1).padStart(2, "0")}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PROCESS */}
      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
              Engagement Process
            </p>

            <h2 className="mt-3 text-5xl font-black uppercase text-white sm:text-7xl">
              From discovery to measurable improvement.
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid gap-5 lg:grid-cols-4">
            {modernizationSteps.map((item) => (
              <article
                key={item.step}
                className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 transition hover:-translate-y-2 hover:border-cyan-200/40"
              >
                <p className="text-5xl font-black text-cyan-300/30">
                  {item.step}
                </p>

                <h3 className="mt-6 text-2xl font-black uppercase text-white">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-slate-300">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* CTA */}
      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="rounded-[2.5rem] border border-cyan-200/20 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.18),transparent_36%),linear-gradient(135deg,rgba(15,23,42,0.92),rgba(2,6,23,0.92))] p-10 text-center sm:p-16">
            <Sparkles className="mx-auto text-cyan-300" size={28} />

            <p className="mt-4 text-xs uppercase tracking-[0.28em] text-cyan-200">
              Start the Conversation
            </p>

            <h2 className="mx-auto mt-4 max-w-5xl text-5xl font-black uppercase leading-[0.92] text-white sm:text-7xl">
              Build smarter systems with clarity and confidence.
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-200">
              Partner with a technology firm designed for AI strategy, secure
              modernization, mission continuity, and measurable operational
              improvement.
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