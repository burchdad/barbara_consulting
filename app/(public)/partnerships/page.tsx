import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  BrainCircuit,
  DatabaseZap,
  Handshake,
  Network,
  ShieldCheck,
} from "lucide-react";

import { HomepageCinematicScene } from "@/components/public/homepage-cinematic-scene";
import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/ui/section";

const partnershipCards = [
  {
    name: "SageTech Solutions",
    type: "Strategic Partner",
    icon: BrainCircuit,
    summary:
      "Supports Gray Matters Technology Services across cloud services, AI strategy, workforce AI-agile software development, logistics, performance management, medical accuracy reviews, VISN transaction processing, system integration, and cloud solutions.",
    signals: [
      "AWS and Google cloud",
      "HL7 and Maximo",
      "Help desk Tier 2 and 3",
      "Apian and MetaPlan",
      "Authority to Operate support",
    ],
  },
  {
    name: "The Muse Group",
    type: "Business Partner",
    icon: Handshake,
    summary:
      "Planning, IT operations, cybersecurity, and IT service management partner for strategy and delivery support.",
    signals: [
      "Strategic planning",
      "IT operations",
      "Cybersecurity",
      "IT service management",
    ],
  },
  {
    name: "ITG Solutions",
    type: "Subcontractor to GMTS - 10 Years",
    icon: Network,
    summary:
      "Longstanding delivery partner for web development, content, system integration, Apian, low-code, and no-code implementation support.",
    signals: [
      "Web development",
      "Content support",
      "System integration",
      "Low-code and no-code",
    ],
  },
  {
    name: "Elastic",
    type: "Large Business",
    icon: DatabaseZap,
    summary:
      "Large-business ecosystem partner providing small business licensing, AI analytics, datastore, and search-engine capabilities.",
    signals: [
      "AI analytics",
      "Datastore",
      "Search engine",
      "Small business licensing",
    ],
  },
  {
    name: "Fellows Consortium",
    type: "Strategic Partner",
    icon: Blocks,
    summary:
      "New strategic partner supporting extended teaming capacity and opportunity alignment.",
    signals: [
      "Strategic teaming",
      "Partner expansion",
      "Opportunity alignment",
    ],
  },
  {
    name: "Mariji",
    type: "Joint Venture Channel",
    icon: ShieldCheck,
    summary:
      "8(a) joint venture channel with a one-year current pathway and five-year partner runway.",
    signals: [
      "8(a) channel",
      "Joint venture",
      "Partner runway",
    ],
  },
];

const ecosystemAreas = [
  "AI strategy and responsible adoption",
  "Cybersecurity, compliance, and ATO readiness",
  "Cloud services and system integration",
  "Workforce enablement and AI-agile delivery",
  "Service management and mission operations",
  "Low-code, no-code, and automation delivery",
];

export default function PartnershipsPage() {
  return (
    <HomepageCinematicScene
      sceneSettings={{
        type: "mesh",
        glow: "blue",
        particles: true,
        parallax: true,
      }}
    >
      <section className="about-hero relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(2,6,23,0.98)_0%,rgba(2,6,23,0.92)_52%,rgba(8,47,73,0.68)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(34,211,238,0.18),transparent_30%),linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.026)_1px,transparent_1px)] bg-[length:100%_100%,64px_64px,64px_64px]" />
        <div className="about-hero-dissolve absolute inset-x-0 bottom-0" />

        <Section className="relative z-10 flex min-h-[74vh] items-center pb-24 pt-36 lg:pb-28">
          <Reveal variant="angleLeft">
            <div className="max-w-6xl">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-cyan-200">
                Key Partnerships & Ecosystems
              </p>

              <h1 className="text-5xl font-black uppercase leading-[0.92] text-white sm:text-6xl lg:text-[5.2rem]">
                Strategic teaming channels for mission-scale delivery.
              </h1>

              <p className="mt-8 max-w-4xl text-lg leading-8 text-slate-200 sm:text-xl">
                Gray Matters Technology Services - Sage Tech Solutions brings a
                focused ecosystem of strategic partners, subcontractors, large
                business channels, and joint venture pathways to support federal
                modernization, AI, cloud, cybersecurity, and mission operations.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="premium-button rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-cyan-200"
                >
                  Discuss Teaming
                </Link>

                <a
                  href="/capabilities/joint-capability-statement.pdf"
                  download
                  className="premium-button rounded-full border border-white/35 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white backdrop-blur transition hover:border-cyan-200 hover:text-cyan-100"
                >
                  Capabilities Statement
                </a>
              </div>
            </div>
          </Reveal>
        </Section>
      </section>

      <Section className="about-command-section relative overflow-visible py-20 lg:py-28">
        <div aria-hidden className="about-angle-field">
          <div className="about-angle-plane about-angle-plane-a" />
          <div className="about-angle-plane about-angle-plane-b" />
          <div className="about-angle-plane about-angle-plane-c" />
        </div>

        <Reveal>
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                Trusted Partnerships
              </p>
              <h2 className="mt-3 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
                Existing partner ecosystem.
              </h2>
            </div>
            <p className="text-lg leading-8 text-slate-300">
              These relationships expand delivery reach while keeping the
              engagement centered on practical execution, secure implementation,
              and measurable mission outcomes.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-2">
          {partnershipCards.map(({ name, type, summary, signals, icon: Icon }, index) => (
            <Reveal key={name} delay={0.04 + index * 0.03} variant="tiltLeft">
              <article className="about-system-card min-h-[24rem] p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                      {type}
                    </p>
                    <h3 className="mt-3 text-3xl font-black uppercase leading-tight text-white">
                      {name}
                    </h3>
                  </div>
                  <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center border border-cyan-200/25 bg-cyan-200/5 text-cyan-200">
                    <Icon size={24} />
                  </div>
                </div>

                <p className="mt-6 text-base leading-7 text-slate-300">
                  {summary}
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {signals.map((signal) => (
                    <span
                      key={signal}
                      className="border border-cyan-200/15 bg-black/25 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-cyan-100"
                    >
                      {signal}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="about-lead-panel overflow-hidden p-8 sm:p-12 lg:p-14">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                  Ecosystem Depth
                </p>
                <h2 className="mt-3 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
                  Designed to strengthen bid readiness and delivery capacity.
                </h2>
              </div>

              <div>
                <p className="text-lg leading-8 text-slate-300">
                  The partner ecosystem gives GMTS a broader bench for
                  modernization opportunities while preserving a clear lead
                  point of accountability for agencies, primes, and teaming
                  partners.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {ecosystemAreas.map((area) => (
                    <span
                      key={area}
                      className="border border-white/10 bg-black/25 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-200"
                    >
                      {area}
                    </span>
                  ))}
                </div>

                <Link
                  href="/contracts"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-cyan-200 transition hover:text-white"
                >
                  Review Contract Vehicles <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </HomepageCinematicScene>
  );
}
