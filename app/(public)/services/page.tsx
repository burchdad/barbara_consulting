import Link from "next/link";
import {
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

import { HomepageCinematicScene } from "@/components/public/homepage-cinematic-scene";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/public/reveal";
import { getPublishedData } from "@/lib/site-data";

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
  { title: "AI-Agile Software Development", icon: CircuitBoard },
  { title: "Low-Code Workflow Automation", icon: Workflow },
  { title: "Cloud & Enterprise Operations", icon: CloudCog },
  { title: "Data Intelligence & Analytics", icon: DatabaseZap },
  { title: "Cybersecurity & ATO Readiness", icon: ShieldCheck },
  { title: "Program, Logistics & Acquisition Support", icon: Layers3 },
  { title: "ServiceNow, Help Desk & O&M", icon: BriefcaseBusiness },
  { title: "Training & Change Enablement", icon: UsersRound },
];

const certificationSignals = [
  "Certified WOSB",
  "Certified SDVOSB",
  "8(a) partner channels",
  "MBE - State of Maryland",
  "NAICS 541512",
  "NAICS 541511",
  "NAICS 541190",
];

const technologyStack = [
  "AWS",
  "Azure DevOps",
  "Power Platform",
  "Appian",
  "ServiceNow",
  "C# / .NET",
  "SQL / MySQL / PostgreSQL",
  "Power BI / SSRS",
  "Qualys / Burp Suite / Rapid7",
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

const operatingSignals = [
  "Readiness",
  "Governance",
  "Automation",
  "Security",
  "Analytics",
  "Adoption",
];

function categoryIcon(category: string) {
  const normalized = category.toLowerCase();

  if (
    normalized.includes("ai") ||
    normalized.includes("automation") ||
    normalized.includes("training") ||
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

function ServicesCommandMap() {
  const routeNodes = [
    {
      label: "Readiness",
      className: "left-[8%] top-[24%]",
    },
    {
      label: "Governance",
      className: "left-[34%] top-[56%]",
    },
    {
      label: "Workflow",
      className: "right-[28%] top-[30%]",
    },
    {
      label: "Security",
      className: "right-[7%] bottom-[22%]",
    },
  ];

  return (
    <div className="service-command-map relative min-h-[32rem] overflow-hidden border border-cyan-200/20 bg-[linear-gradient(135deg,rgba(8,47,73,0.5),rgba(2,6,23,0.88))] shadow-[0_34px_110px_rgba(34,211,238,0.16)]">
      <div className="absolute inset-8 border border-white/10 bg-[linear-gradient(to_right,rgba(34,211,238,0.13)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[length:4.5rem_4.5rem]" />
      <div className="absolute left-[-10%] top-[28%] h-36 w-[118%] rotate-[-12deg] border border-cyan-200/25 shadow-[0_0_46px_rgba(34,211,238,0.14)]" />
      <div className="absolute left-[10%] right-[6%] top-[47%] h-px rotate-[-7deg] bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent shadow-[0_0_24px_rgba(34,211,238,0.55)]" />

      {routeNodes.map((node, index) => (
        <div
          key={node.label}
          className={`absolute border border-cyan-200/20 bg-black/55 px-4 py-3 backdrop-blur ${node.className}`}
        >
          <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-cyan-200/60">
            0{index + 1}
          </span>
          <p className="mt-1 text-sm font-black uppercase tracking-[0.12em] text-white">
            {node.label}
          </p>
        </div>
      ))}

      <div className="absolute bottom-7 left-7 max-w-[17rem] border border-white/15 bg-black/60 p-5 backdrop-blur">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
          Service Model
        </p>
        <p className="mt-3 text-3xl font-black uppercase leading-none text-white">
          Strategy into operating capability.
        </p>
      </div>
    </div>
  );
}

export default async function ServicesPage() {
  const { services } = await getPublishedData();

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
                  Services & Capabilities
                </p>

                <h1 className="max-w-6xl text-5xl font-black uppercase leading-[0.92] text-white sm:text-6xl lg:text-[4.9rem]">
                  AI strategy, federal IT modernization, and secure mission delivery.
                </h1>

                <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
                  Gray Matters Technology Services - Sage Tech Solutions helps
                  organizations assess AI readiness, modernize applications,
                  automate workflows, strengthen cybersecurity and ATO
                  readiness, operate cloud-enabled systems, and improve mission
                  performance.
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

              <div className="about-hero-profile relative hidden min-h-[34rem] overflow-hidden lg:block">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-60"
                  style={{
                    backgroundImage:
                      "url(https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1800&q=85)",
                  }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,6,23,0.2),rgba(2,6,23,0.92)_64%,rgba(8,47,73,0.86))]" />
                <div className="absolute inset-8 border border-cyan-200/15 bg-[linear-gradient(to_right,rgba(34,211,238,0.11)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[length:4.5rem_4.5rem]" />

                <div className="absolute left-8 top-8 max-w-[18rem] border border-white/15 bg-black/50 p-5 backdrop-blur">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">
                    Capability Stack
                  </p>
                  <p className="mt-3 text-2xl font-black uppercase leading-tight text-white">
                    AI readiness connected to secure delivery.
                  </p>
                </div>

                <div className="absolute bottom-8 right-8 grid w-[21rem] gap-3">
                  {operatingSignals.slice(0, 3).map((item, index) => (
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

      {/* WHO WE SERVE */}
      <Section className="about-command-section relative overflow-visible py-20 lg:py-28">
        <div aria-hidden className="about-angle-field">
          <div className="about-angle-plane about-angle-plane-a" />
          <div className="about-angle-plane about-angle-plane-b" />
          <div className="about-angle-plane about-angle-plane-c" />
        </div>

        <div className="relative z-10 grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <Reveal variant="angleLeft">
            <div className="relative">
              <div aria-hidden className="about-title-rail" />
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                Who We Serve
              </p>

              <h2 className="mt-4 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
                Built for complex organizations.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.06} variant="tiltRight">
            <p className="about-copy-float relative max-w-2xl p-6 text-lg leading-8 text-slate-300 sm:p-8">
              Clear audience pathways help government, enterprise, and
              mission-focused buyers quickly understand where the firm fits.
            </p>
          </Reveal>
        </div>

        <div className="relative z-10 mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {audienceSegments.map(({ title, body, icon: Icon }, index) => (
            <Reveal key={title} delay={0.05 + index * 0.04} variant="tiltLeft">
              <article className="about-system-card min-h-[18rem] p-7">
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
      <Section className="about-mission-section relative py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <Reveal variant="tiltLeft">
            <ServicesCommandMap />
          </Reveal>

          <Reveal delay={0.07} variant="angleRight">
            <div className="relative">
              <div className="inline-flex h-12 w-12 items-center justify-center border border-cyan-200/25 bg-cyan-200/5 text-cyan-200">
                <Workflow size={23} />
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.32em] text-cyan-300">
                AI Capability Matrix
              </p>

              <h2 className="mt-4 max-w-3xl text-4xl font-black uppercase leading-[0.95] text-white sm:text-5xl lg:text-6xl">
                AI, systems, data, security, and mission operations.
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300">
                The firm supports the strategy, engineering, compliance, and
                operations layers required to move from scattered tools into
                coordinated, intelligent operating systems.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {capabilityMatrix.map(({ title, icon: Icon }, index) => (
            <Reveal key={title} delay={0.04 + index * 0.03}>
              <article className="about-lead-card flex min-h-[8rem] items-center gap-4 p-6">
                <Icon className="shrink-0 text-cyan-200" size={24} />

                <h3 className="text-lg font-black uppercase leading-tight text-white">
                  {title}
                </h3>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CERTIFICATIONS / STACK */}
      <Section className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal variant="angleLeft">
            <div className="relative">
              <div aria-hidden className="about-title-rail" />
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                Certifications & Technology
              </p>

              <h2 className="mt-4 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
                Small-business access with enterprise-grade delivery.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                The team brings certified small-business pathways, federal IT
                performance, and practical implementation experience across
                cloud, AI, cybersecurity, low-code platforms, and enterprise
                support environments.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05} variant="tiltRight">
            <div className="about-overview-panel grid gap-8 p-8 sm:p-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
                  Procurement Signals
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {certificationSignals.map((signal) => (
                    <span
                      key={signal}
                      className="border border-cyan-200/20 bg-cyan-200/[0.03] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-cyan-100"
                    >
                      {signal}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
                  Delivery Stack
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {technologyStack.map((item) => (
                    <span
                      key={item}
                      className="border border-white/10 bg-black/25 px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* SERVICES */}
      <Section className="about-values-section relative overflow-visible py-24 lg:py-32">
        <div aria-hidden className="about-route-field">
          <div className="about-route-outline" />
          <div className="about-route-beam" />
        </div>

        <Reveal>
          <div className="relative z-10 mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                Core Services
              </p>

              <h2 className="mt-3 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
                Focused capabilities for modern teams.
              </h2>
            </div>

            <p className="max-w-xl text-base leading-7 text-slate-300">
              The firm&apos;s highest-value AI consulting, software modernization,
              automation, cloud, cyber, data, and mission operations services
              now live here as the dedicated services destination.
            </p>
          </div>
        </Reveal>

        {services.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={0.04 + index * 0.035} variant="tiltLeft">
                <article className="about-lead-card relative flex min-h-[22rem] flex-col p-7">
                  <span className="absolute right-5 top-5 text-xs font-black uppercase tracking-[0.22em] text-cyan-200/45">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="inline-flex w-fit items-center gap-2 border border-cyan-200/20 bg-cyan-200/[0.04] px-3 py-1 text-xs text-cyan-100">
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
        ) : (
          <Reveal>
            <article className="about-overview-panel p-8 text-slate-300">
              Service items will appear here after they are published from the admin dashboard.
            </article>
          </Reveal>
        )}
      </Section>

      {/* PROCESS */}
      <Section className="py-24 lg:py-32">
        <Reveal>
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
              Engagement Process
            </p>

            <h2 className="mt-3 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
              From discovery to measurable improvement.
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid gap-5 lg:grid-cols-4">
            {modernizationSteps.map((item, index) => (
              <article
                key={item.step}
                className={`about-path-node about-path-node-${index + 1}`}
              >
                <span className="about-path-node-index">{item.step}</span>

                <p className="text-5xl font-black text-cyan-300/35">
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

    </HomepageCinematicScene>
  );
}
