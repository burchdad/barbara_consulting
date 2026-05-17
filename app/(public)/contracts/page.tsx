import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Landmark,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/public/reveal";
import { siteConfig } from "@/lib/config/site";
import { getPublicContractsPageData } from "@/lib/site-data";

const procurementPoints = [
  {
    title: "Rapid Engagement",
    body: "Structured contract details help agencies and partners understand available paths to engage quickly.",
    icon: ClipboardCheck,
  },
  {
    title: "Mission Alignment",
    body: "Contract vehicles are positioned around operational support, technology modernization, and measurable outcomes.",
    icon: Landmark,
  },
  {
    title: "Trusted Delivery",
    body: "The contract portfolio supports clear procurement conversations with public-sector and mission partners.",
    icon: ShieldCheck,
  },
];

const supportAreas = [
  "AI strategy",
  "Mission technology",
  "Secure workflow modernization",
  "Program support",
  "Cyber readiness",
  "Operational resilience",
];

export default async function ContractsPage() {
  const { contracts, settings } = await getPublicContractsPageData();

  const heroImageUrl =
    settings?.contractsHeroImageUrl || siteConfig.media.contractsHeroImageUrl;

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

        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_18%,rgba(34,211,238,0.24),transparent_32%),radial-gradient(circle_at_18%_75%,rgba(168,85,247,0.13),transparent_30%),linear-gradient(135deg,rgba(2,6,23,0.96),rgba(2,6,23,0.76))]" />

        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

        <Reveal>
          <div className="max-w-6xl">
            <p className="text-xs font-bold uppercase tracking-[0.36em] text-cyan-300">
              Contract Vehicles
            </p>

            <h1 className="mt-5 max-w-6xl text-5xl font-black uppercase leading-[0.92] text-white sm:text-7xl lg:text-8xl">
              Procurement-ready pathways for AI and mission delivery.
            </h1>

            <p className="mt-8 max-w-4xl text-lg leading-8 text-slate-200 sm:text-xl">
              Review available contract vehicles, acquisition pathways, and
              engagement details for agencies and partners seeking trusted
              support across AI modernization, secure systems, and operational
              delivery.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="premium-button rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-cyan-200"
              >
                Discuss Procurement Path
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

      {/* PROCUREMENT OVERVIEW */}
      <Section className="py-20 lg:py-28">
        <div className="grid gap-5 lg:grid-cols-3">
          {procurementPoints.map(({ title, body, icon: Icon }, index) => (
            <Reveal key={title} delay={0.04 + index * 0.04}>
              <article className="group min-h-[300px] rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] p-8 transition hover:-translate-y-2 hover:border-cyan-200/40">
                <Icon className="text-cyan-200" size={28} />

                <h2 className="mt-10 text-3xl font-black uppercase leading-tight text-white">
                  {title}
                </h2>

                <p className="mt-5 text-base leading-7 text-slate-300">
                  {body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SUPPORT AREAS */}
      <Section className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                Acquisition Support
              </p>

              <h2 className="mt-4 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
                Built for agencies and partners that need a clear route to
                support.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 shadow-[0_0_80px_rgba(34,211,238,0.06)] sm:p-10">
              <p className="text-lg leading-8 text-slate-300">
                Contract vehicle information helps procurement teams,
                government stakeholders, and partner organizations understand
                availability, scope, points of contact, and alignment with
                mission-focused technology needs.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {supportAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-cyan-200/20 bg-cyan-200/[0.03] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-cyan-100"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* CONTRACT VEHICLES */}
      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                Available Pathways
              </p>

              <h2 className="mt-3 text-5xl font-black uppercase text-white sm:text-7xl">
                Contract portfolio.
              </h2>
            </div>

            <p className="max-w-xl text-slate-300">
              Review the available contract records below. Each card includes
              key procurement, availability, and point-of-contact details.
            </p>
          </div>
        </Reveal>

        {contracts.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {contracts.map((contract, index) => (
              <Reveal key={contract.id} delay={0.04 + index * 0.04}>
                <article className="contract-card group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] transition hover:-translate-y-2 hover:border-cyan-200/40 hover:bg-white/[0.055]">
                  <div className="border-b border-white/10 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.14),transparent_30%),linear-gradient(135deg,rgba(15,23,42,0.86),rgba(2,6,23,0.92))] p-7">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
                          Contract Vehicle
                        </p>

                        <h3 className="mt-3 text-3xl font-black uppercase leading-tight text-white">
                          {contract.name}
                        </h3>

                        <p className="mt-3 text-sm text-slate-400">
                          {contract.agency}
                        </p>
                      </div>

                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-cyan-200/25 bg-cyan-200/[0.06] text-sm font-black text-cyan-200">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </div>

                  <div className="p-7">
                    <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                      {contract.contractNumber && (
                        <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                            Contract #
                          </p>
                          <p className="mt-2 text-white">
                            {contract.contractNumber}
                          </p>
                        </div>
                      )}

                      {contract.period && (
                        <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                            Period
                          </p>
                          <p className="mt-2 text-white">{contract.period}</p>
                        </div>
                      )}

                      {contract.contractType && (
                        <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                            Type
                          </p>
                          <p className="mt-2 text-white">
                            {contract.contractType}
                          </p>
                        </div>
                      )}

                      {contract.availability && (
                        <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                            Availability
                          </p>
                          <p className="mt-2 text-white">
                            {contract.availability}
                          </p>
                        </div>
                      )}
                    </div>

                    {contract.summary && (
                      <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-5">
                        <div className="flex items-center gap-3">
                          <FileText className="text-cyan-300" size={18} />
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                            Summary
                          </p>
                        </div>

                        <p className="mt-3 text-sm leading-6 text-slate-300">
                          {contract.summary}
                        </p>
                      </div>
                    )}

                    {contract.scope && (
                      <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-5">
                        <div className="flex items-center gap-3">
                          <Building2 className="text-cyan-300" size={18} />
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                            Scope
                          </p>
                        </div>

                        <p className="mt-3 text-sm leading-6 text-slate-300">
                          {contract.scope}
                        </p>
                      </div>
                    )}

                    {(contract.programManager ||
                      contract.email ||
                      contract.phone) && (
                      <div className="mt-5 rounded-2xl border border-cyan-200/15 bg-cyan-200/[0.03] p-5">
                        <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">
                          Point of Contact
                        </p>

                        {contract.programManager && (
                          <p className="mt-3 text-base font-bold text-white">
                            {contract.programManager}
                          </p>
                        )}

                        <div className="mt-4 grid gap-3 text-sm text-slate-300">
                          {contract.email && (
                            <p className="flex items-center gap-3 break-words">
                              <Mail
                                className="shrink-0 text-cyan-300"
                                size={16}
                              />
                              {contract.email}
                            </p>
                          )}

                          {contract.phone && (
                            <p className="flex items-center gap-3">
                              <Phone
                                className="shrink-0 text-cyan-300"
                                size={16}
                              />
                              {contract.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-10 text-center">
              <ClipboardCheck className="mx-auto text-cyan-300" size={34} />

              <h3 className="mt-5 text-3xl font-black uppercase text-white">
                Contract vehicle details are being prepared.
              </h3>

              <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                This section is ready to display available contract records once
                they are published.
              </p>
            </div>
          </Reveal>
        )}
      </Section>

    </main>
  );
}
