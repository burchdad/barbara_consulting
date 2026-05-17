import Link from "next/link";
import {
  BrainCircuit,
  CheckCircle2,
  Compass,
  Eye,
  Layers3,
  Radar,
  ShieldCheck,
  Target,
} from "lucide-react";

import { Reveal } from "@/components/public/reveal";
import { HomepageCinematicScene } from "@/components/public/homepage-cinematic-scene";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/config/site";
import { getPublishedData } from "@/lib/site-data";

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

const operatingSignals = [
  "AI readiness",
  "Workflow modernization",
  "Cyber readiness",
  "Program support",
  "Data intelligence",
  "Public-sector delivery",
];

const clarityPath = [
  "Discover operational friction",
  "Map responsible AI opportunities",
  "Prioritize secure modernization",
  "Move from plan to execution",
];

const fallbackLeadership = [
  {
    id: "danielle-carr",
    name: "Danielle Carr",
    title: "Chief Executive Officer",
    credential: "MBA; M.S., Acquisition and Supply Chain Management",
    bio: [
      "Danielle Carr was named CEO of Gray Matters Technology Services in January 2025 after serving as CEO of Sage Tech Solutions for the past five years. The merged capabilities of the two companies bring AI strategy, cost-saving innovation, and public-sector delivery experience to federal and state government clients through a Service-Disabled Veteran-Owned Small Business and Woman-Owned Small Business platform.",
      "Her career spans work with NASA, the Department of Defense, HHS, international agencies, and other mission-focused organizations. Recognition for her leadership with the National Contract Management Association underscores her commitment to developing the next generation of procurement professionals and building strong relationships that support organizational growth.",
      "Ms. Carr holds an MBA and a Master of Science in Acquisition and Supply Chain Management from the University of Maryland, College Park. She also holds multiple professional certifications and has served as Education Chair and Past President of the NCMA Bethesda Chapter.",
    ],
  },
  {
    id: "barbara-gray",
    name: "Barbara A. Gray",
    title: "President",
    credential: "M.S., Information Technology; AI Strategy, PMP, ITIL, CISSP, SQL, and Oracle certifications",
    bio: [
      "Barbara A. Gray, former CEO of Gray Matters Technology Services, managed and operated GMTS for more than 23 years as CEO and technology thought leader. She currently serves as President of Integrated Solutions.",
      "Earlier in her career, Ms. Gray served in roles of increasing responsibility while supporting SAIC, Raytheon, Booz Allen, and Houston Associates across 20 collective years of technology and mission support experience.",
      "Ms. Gray holds a Master of Information Technology from Williamsburg University and maintains certifications spanning AI strategy, project management, IT service management, cybersecurity, SQL, and Oracle administration.",
    ],
  },
  {
    id: "alexis-muse",
    name: "Alexis Muse",
    title: "Senior Contracts Manager",
    credential: "B.S., Finance, University of Maryland",
    bio: [
      "Alexis Muse serves as Senior Contracts Manager, supporting federal contract operations across GMTS and Sage Tech Solutions.",
      "She holds a bachelor's degree in finance from the University of Maryland and brings more than 15 years of experience supporting federal government contracts.",
    ],
  },
  {
    id: "gary-fitch",
    name: "Gary Fitch",
    title: "Senior Pricing Manager",
    credential: "Master of Business Administration",
    bio: [
      "Gary Fitch serves as Senior Pricing Manager and brings more than 30 years of pricing and business operations experience.",
      "He has supported GMTS for the past 10 years and holds a Master of Business Administration.",
    ],
  },
];

function AboutSignalGraph() {
  const nodes = [
    "left-[11%] top-[34%]",
    "left-[32%] top-[58%]",
    "left-[52%] top-[25%]",
    "right-[24%] top-[51%]",
    "right-[10%] bottom-[23%]",
  ];

  return (
    <div
      aria-hidden
      className="about-signal-graph relative min-h-[24rem] overflow-hidden border border-cyan-200/20 bg-[linear-gradient(135deg,rgba(8,47,73,0.52),rgba(2,6,23,0.9))] shadow-[0_32px_110px_rgba(34,211,238,0.14)]"
    >
      <div className="absolute inset-7 border border-white/10 bg-[linear-gradient(to_right,rgba(34,211,238,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[length:4.75rem_4.75rem]" />
      <div className="absolute inset-[18%_8%_20%] skew-y-[-13deg] border border-cyan-200/25" />
      <div className="absolute inset-[27%_16%_16%_20%] skew-y-[12deg] border border-white/15" />

      {nodes.map((position) => (
        <span
          key={position}
          className={`absolute h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_28px_rgba(34,211,238,0.92)] ${position}`}
        />
      ))}

      <div className="absolute left-7 top-7 border border-white/15 bg-black/60 p-5 shadow-2xl backdrop-blur">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
          Adoption Risk
        </p>
        <p className="mt-2 text-4xl font-black text-white">Low</p>
      </div>

      <div className="absolute bottom-7 right-7 border border-white/15 bg-black/60 p-5 shadow-2xl backdrop-blur">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
          Clarity Index
        </p>
        <p className="mt-2 text-4xl font-black text-white">92%</p>
      </div>
    </div>
  );
}

export default async function AboutPage() {
  const { settings, leadership } = await getPublishedData();

  const companyName = settings?.companyName ?? siteConfig.companyName;
  const aboutHeroImageUrl =
    settings?.aboutHeroImageUrl || siteConfig.media.aboutHeroImageUrl;
  const leadersToRender =
    leadership.length > 0
      ? leadership.map((leader) => ({
          id: leader.id,
          name: leader.name,
          title: leader.title,
          credential: "Executive Leadership",
          bio: [leader.fullBio || leader.shortBio].filter(Boolean),
        }))
      : fallbackLeadership;

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
            <div className="grid w-full gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="max-w-4xl">
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-cyan-200">
                  About {companyName}
                </p>

                <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.92] text-white sm:text-6xl lg:text-[4.9rem]">
                  Practical AI leadership built around mission, security, and
                  execution.
                </h1>

                <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
                  Gray Matters Technology- Sage Tech Solutions helps leaders
                  turn emerging technology into responsible, useful operating
                  capability without losing sight of people, process, or risk.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href="#firm-overview"
                    className="premium-button rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-cyan-200"
                  >
                    Read the Firm Profile
                  </Link>

                  <Link
                    href="/contact"
                    className="premium-button rounded-full border border-white/35 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white backdrop-blur transition hover:border-cyan-200 hover:text-cyan-100"
                  >
                    Start a Conversation
                  </Link>
                </div>
              </div>

              <div className="about-hero-profile relative hidden min-h-[34rem] overflow-hidden lg:block">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-70"
                  style={{ backgroundImage: `url(${aboutHeroImageUrl})` }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,6,23,0.3),rgba(2,6,23,0.92)_64%,rgba(8,47,73,0.86))]" />
                <div className="absolute inset-8 border border-cyan-200/15 bg-[linear-gradient(to_right,rgba(34,211,238,0.11)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[length:4.5rem_4.5rem]" />

                <div className="absolute left-8 top-8 max-w-[17rem] border border-white/15 bg-black/50 p-5 backdrop-blur">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">
                    Firm Role
                  </p>
                  <p className="mt-3 text-2xl font-black uppercase leading-tight text-white">
                    Strategy partner for responsible AI modernization.
                  </p>
                </div>

                <div className="absolute bottom-8 right-8 grid w-[20rem] gap-3">
                  {[
                    "AI readiness",
                    "Secure systems",
                    "Workflow execution",
                  ].map((item, index) => (
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

      {/* POSITIONING */}
      <Section
        id="firm-overview"
        className="about-command-section relative overflow-visible py-20 lg:py-28"
      >
        <div aria-hidden className="about-angle-field">
          <div className="about-angle-plane about-angle-plane-a" />
          <div className="about-angle-plane about-angle-plane-b" />
          <div className="about-angle-plane about-angle-plane-c" />
        </div>

        <div className="relative z-10 grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <Reveal variant="angleLeft">
            <div className="relative">
              <div aria-hidden className="about-title-rail" />
              <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">
                Firm Overview
              </p>

              <h2 className="mt-4 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
                Built at the intersection of strategy, technology, security,
                and execution.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.06} variant="tiltRight">
            <div className="about-overview-panel relative p-6 sm:p-8 lg:p-10">
              <div className="space-y-5 text-lg leading-8 text-slate-300">
                {siteConfig.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {operatingSignals.map((signal) => (
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

      {/* MISSION SYSTEM */}
      <Section className="about-mission-section relative py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <Reveal variant="tiltLeft">
            <AboutSignalGraph />
          </Reveal>

          <Reveal delay={0.07} variant="angleRight">
            <div className="relative">
              <div className="inline-flex h-12 w-12 items-center justify-center border border-cyan-200/25 bg-cyan-200/5 text-cyan-200">
                <Radar size={23} />
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.32em] text-cyan-300">
                Direction
              </p>

              <h2 className="mt-4 max-w-3xl text-4xl font-black uppercase leading-[0.95] text-white sm:text-5xl lg:text-6xl">
                Mission, vision, and purpose working as one operating model.
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300">
                The firm brings clear priorities, secure judgment, and
                implementation discipline to organizations modernizing critical
                workflows with responsible AI.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {[
            {
              title: "Mission",
              body: siteConfig.about.missionStatement,
              Icon: Target,
            },
            {
              title: "Vision",
              body: siteConfig.about.visionStatement,
              Icon: Eye,
            },
            {
              title: "Purpose",
              body: "To help organizations move beyond outdated systems and fragmented workflows into a future where strategy, security, intelligence, and execution work together.",
              Icon: Compass,
            },
          ].map(({ title, body, Icon }, index) => (
            <Reveal key={title} delay={0.04 + index * 0.04} variant="angleLeft">
              <article className="about-system-card min-h-[19rem] p-7">
                <Icon className="text-cyan-200" size={28} />

                <h3 className="mt-10 text-3xl font-black uppercase text-white">
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

      {/* VALUES / CLARITY PATH */}
      <Section className="about-values-section relative overflow-visible py-24 lg:py-32">
        <div aria-hidden className="about-route-field">
          <div className="about-route-outline" />
          <div className="about-route-beam" />
        </div>

        <div className="relative z-10 grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <Reveal variant="angleLeft">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">
                Core Values
              </p>

              <h2 className="mt-4 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
                Principles that keep the work grounded.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                The firm&apos;s values shape how strategy is developed, how
                technology is introduced, and how modernization efforts are
                carried from vision into execution.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06} variant="tiltRight">
            <div className="grid gap-4 sm:grid-cols-2">
              {siteConfig.about.values.map((value, index) => (
                <div
                  key={value}
                  className="about-value-chip flex min-h-[6rem] items-center gap-4 p-5"
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

        <div className="relative z-10 mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {clarityPath.map((item, index) => (
            <Reveal key={item} delay={0.04 + index * 0.04} variant="tiltLeft">
              <article className={`about-path-node about-path-node-${index + 1}`}>
                <span className="about-path-node-index">0{index + 1}</span>
                <CheckCircle2 className="text-cyan-200" size={22} />
                <h3 className="mt-5 text-base font-black uppercase leading-tight text-white">
                  {item}
                </h3>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* HOW WE LEAD */}
      <Section className="py-24 lg:py-32">
        <Reveal>
          <div className="about-lead-panel p-8 sm:p-12 lg:p-16">
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
                  <article className="about-lead-card min-h-[17rem] p-7">
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
      <Section className="py-24 lg:py-32">
        <Reveal>
          <div className="mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                Leadership Team
              </p>

              <h2 className="mt-3 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
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

        <div className="grid gap-6 lg:grid-cols-2">
            {leadersToRender.map((leader, index) => (
              <Reveal key={leader.id} delay={0.05 + index * 0.04}>
                <article className="about-leader-card overflow-hidden p-7 sm:p-8">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">
                        Executive Leadership
                      </p>

                      <h3 className="mt-3 text-4xl font-black uppercase leading-tight text-white">
                        {leader.name}
                      </h3>

                      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
                        {leader.title}
                      </p>
                    </div>

                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-cyan-200/25 bg-cyan-200/[0.06] text-xl font-black text-cyan-100">
                      {leader.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                  </div>

                  <div className="mt-6 h-px bg-gradient-to-r from-cyan-300/35 to-transparent" />

                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200/80">
                    {leader.credential}
                  </p>

                  <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
                    {leader.bio.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
        </div>
      </Section>

    </HomepageCinematicScene>
  );
}
