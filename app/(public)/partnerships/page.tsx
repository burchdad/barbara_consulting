import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Handshake,
  Landmark,
  Network,
  ShieldCheck,
} from "lucide-react";

import { HomepageCinematicScene } from "@/components/public/homepage-cinematic-scene";
import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/ui/section";
import {
  ecosystemChannels,
  positioningSignals,
} from "@/lib/data/partnership-ecosystem";
import { getPublicPartnershipsPageData } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Partnerships",
  description:
    "Explore Gray Matters Technology Services partner ecosystem, advisor relationships, technology channels, and teaming support for public-sector modernization.",
  alternates: {
    canonical: "/partnerships",
  },
};

export default async function PartnershipsPage() {
  const { partners, contacts } = await getPublicPartnershipsPageData();
  const keyAdvisors = contacts.filter((contact) => contact.category === "advisor");
  const keyTechnologists = contacts.filter((contact) => contact.category === "technologist");

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
                Key Partnerships / Eco-Systems
              </p>

              <h1 className="text-5xl font-black uppercase leading-[0.92] text-white sm:text-6xl lg:text-[5.2rem]">
                Advisory and technology channels for mission-scale delivery.
              </h1>

              <p className="mt-8 max-w-4xl text-lg leading-8 text-slate-200 sm:text-xl">
                Gray Matters Technology Services - Sage Tech Solutions is
                supported by a focused network of senior advisors,
                technologists, and teaming channels with direct federal
                acquisition, modernization, cybersecurity, and mission delivery
                experience.
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
                Key Partnerships
              </p>
              <h2 className="mt-3 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
                Advisors and technologists connected to the work.
              </h2>
            </div>
            <p className="text-lg leading-8 text-slate-300">
              These relationships strengthen strategic positioning, technical
              credibility, and partner readiness for agencies and primes
              evaluating AI-forward modernization opportunities.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal variant="tiltLeft">
            <article className="about-system-card min-h-[34rem] p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                    Key Advisors
                  </p>
                  <h3 className="mt-3 text-4xl font-black uppercase leading-tight text-white">
                    Acquisition and mission guidance.
                  </h3>
                </div>
                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center border border-cyan-200/25 bg-cyan-200/5 text-cyan-200">
                  <Handshake size={24} />
                </div>
              </div>

              <div className="mt-8 grid gap-3">
                {keyAdvisors.length ? keyAdvisors.map((advisor) => (
                  <p
                    key={`${advisor.name}-${advisor.organization}`}
                    className="border border-cyan-200/15 bg-black/25 px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] text-slate-100"
                  >
                    {advisor.name} - {advisor.organization}
                  </p>
                )) : (
                  <p className="text-sm leading-6 text-slate-300">No advisors are published yet.</p>
                )}
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.05} variant="tiltRight">
            <article className="about-system-card min-h-[34rem] p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                    Key Advisors
                  </p>
                  <h3 className="mt-3 text-4xl font-black uppercase leading-tight text-white">
                    Technical leaders and modernization operators.
                  </h3>
                </div>
                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center border border-cyan-200/25 bg-cyan-200/5 text-cyan-200">
                  <BrainCircuit size={24} />
                </div>
              </div>

              <div className="mt-8 grid gap-3">
                {keyTechnologists.length ? keyTechnologists.map((technologist) => (
                  <p
                    key={`${technologist.name}-${technologist.organization}`}
                    className="border border-white/10 bg-black/25 px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] text-slate-200"
                  >
                    {technologist.name} - {technologist.organization}
                  </p>
                )) : (
                  <p className="text-sm leading-6 text-slate-300">No technologists are published yet.</p>
                )}
              </div>
            </article>
          </Reveal>
        </div>
      </Section>

      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="about-overview-panel p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
              Mission Partners
            </p>

            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <h2 className="mt-3 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
                Published partner relationships from the admin dashboard.
              </h2>

              <p className="text-lg leading-8 text-slate-300">
                This section is fully database-driven. Add, edit, publish, or remove mission partner records in admin and the frontend updates here.
              </p>
            </div>

            {partners.length ? (
              <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {partners.map((partner) => (
                  <article key={partner.id} className="border border-cyan-200/15 bg-black/25 p-6">
                    {partner.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={partner.logoUrl} alt={partner.name} className="mb-5 h-14 w-auto object-contain" />
                    ) : null}
                    <h3 className="text-2xl font-black uppercase leading-tight text-white">{partner.name}</h3>
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">
                      Mission Partner
                    </p>
                    {partner.websiteUrl ? (
                      <a href={partner.websiteUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-cyan-200 transition hover:text-white">
                        Visit Partner <ArrowRight size={16} />
                      </a>
                    ) : null}
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-8 text-base leading-7 text-slate-300">
                No mission partners are published yet. As records are saved and published in the admin dashboard, they will appear here automatically.
              </p>
            )}
          </div>
        </Reveal>
      </Section>

      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="about-lead-panel overflow-hidden p-8 sm:p-12 lg:p-14">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                  Eco-System Depth
                </p>
                <h2 className="mt-3 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
                  Built to strengthen bid readiness and technical confidence.
                </h2>
              </div>

              <div>
                <p className="text-lg leading-8 text-slate-300">
                  The updated eco-system gives GMTS a deeper advisory
                  and technical bench for upcoming opportunities while
                  preserving a clear lead point of accountability for agencies,
                  primes, and teaming partners.
                </p>

                <div className="mt-8 grid gap-4 lg:grid-cols-3">
                  {ecosystemChannels.map(({ title, body }, index) => {
                    const Icon = [Landmark, BrainCircuit, Network][index] ?? ShieldCheck;
                    return (
                    <article
                      key={title}
                      className="border border-cyan-200/15 bg-black/25 p-5"
                    >
                      <Icon className="text-cyan-200" size={24} />
                      <h3 className="mt-5 text-xl font-black uppercase leading-tight text-white">
                        {title}
                      </h3>
                      <p className="mt-4 text-sm leading-6 text-slate-300">
                        {body}
                      </p>
                    </article>
                    );
                  })}
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {positioningSignals.map((signal) => (
                    <span
                      key={signal}
                      className="border border-white/10 bg-black/25 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-200"
                    >
                      {signal}
                    </span>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-cyan-200 transition hover:text-white"
                >
                  Discuss the Eco-System <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </HomepageCinematicScene>
  );
}
