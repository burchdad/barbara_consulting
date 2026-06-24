import type { Metadata } from "next";
import Link from "next/link";
import {
  ClipboardCheck,
  Landmark,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { HomepageCinematicScene } from "@/components/public/homepage-cinematic-scene";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/public/reveal";
import { siteConfig } from "@/lib/config/site";
import { getPublicContractsPageData } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contract Vehicles",
  description:
    "Review contract vehicles, procurement pathways, capability statement access, and public-sector acquisition details for Gray Matters Technology Services.",
  alternates: {
    canonical: "/contracts",
  },
};

const procurementPoints = [
  {
    title: "Certified Access",
    body: "WOSB and SDVOSB status, partner channels, and relevant NAICS alignment support practical acquisition conversations.",
    icon: ClipboardCheck,
  },
  {
    title: "Mission Alignment",
    body: "Capabilities are positioned around AI modernization, federal IT delivery, cybersecurity readiness, cloud, data, and mission operations.",
    icon: Landmark,
  },
  {
    title: "Trusted Delivery",
    body: "More than two decades of federal performance support clear procurement conversations with agencies and teaming partners.",
    icon: ShieldCheck,
  },
];

const supportAreas = [
  "AI strategy",
  "AI-agile software",
  "Application modernization",
  "Cloud services",
  "Cybersecurity and ATO",
  "ServiceNow and help desk",
  "Data reporting",
  "Low-code automation",
  "Logistics support",
];

const procurementSignals = [
  "Certified WOSB",
  "Certified SDVOSB",
  "8(a) partner channels",
  "MBE - State of Maryland",
  "NAICS 541512",
  "NAICS 541511",
  "NAICS 541190",
];

const pastClients = [
  "CIO",
  "Department of Education",
  "Department of State",
  "Family & Youth Services Bureau",
  "USDA Farm Service Agency",
  "Defense Intelligence Agency",
  "IRS",
  "Department of the Navy",
];

export default async function ContractsPage() {
  const { contracts, settings } = await getPublicContractsPageData();

  const heroImageUrl =
    settings?.contractsHeroImageUrl || siteConfig.media.contractsHeroImageUrl;
  const publishedContracts = contracts;
  const agencyExperience = [...new Set(publishedContracts.map((contract) => contract.agency))].slice(0, 7);
  const procurementContacts = publishedContracts
    .map((contract) => ({
      name: contract.programManager,
      title: contract.name,
      email: contract.email,
      phone: contract.phone,
    }))
    .filter((contact, index, list) => list.findIndex((item) => item.email === contact.email && item.phone === contact.phone) === index);

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
                  Contract Vehicles
                </p>

                <h1 className="max-w-6xl text-5xl font-black uppercase leading-[0.92] text-white sm:text-6xl lg:text-[4.9rem]">
                  Procurement-ready pathways for AI and mission delivery.
                </h1>

                <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
                  Review acquisition pathways, certification vehicles, and
                  engagement details for agencies and partners seeking trusted
                  support across AI modernization, secure systems, cloud, data,
                  and operational delivery.
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

              <div className="about-hero-profile relative hidden min-h-[34rem] overflow-hidden lg:block">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-62"
                  style={{ backgroundImage: `url(${heroImageUrl})` }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,6,23,0.24),rgba(2,6,23,0.92)_64%,rgba(8,47,73,0.86))]" />
                <div className="absolute inset-8 border border-cyan-200/15 bg-[linear-gradient(to_right,rgba(34,211,238,0.11)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[length:4.5rem_4.5rem]" />

                <div className="absolute left-8 top-8 max-w-[18rem] border border-white/15 bg-black/50 p-5 backdrop-blur">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">
                    Acquisition Path
                  </p>
                  <p className="mt-3 text-2xl font-black uppercase leading-tight text-white">
                    Clear routes into mission-ready support.
                  </p>
                </div>

                <div className="absolute bottom-8 right-8 grid w-[21rem] gap-3">
                  {["Scope", "Availability", "Contact"].map((item, index) => (
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

      {/* PROCUREMENT OVERVIEW */}
      <Section className="about-command-section relative overflow-visible py-20 lg:py-28">
        <div aria-hidden className="about-angle-field">
          <div className="about-angle-plane about-angle-plane-a" />
          <div className="about-angle-plane about-angle-plane-b" />
          <div className="about-angle-plane about-angle-plane-c" />
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {procurementPoints.map(({ title, body, icon: Icon }, index) => (
            <Reveal key={title} delay={0.04 + index * 0.04} variant="tiltLeft">
              <article className="about-system-card min-h-[19rem] p-8">
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

      {/* CONTRACT VEHICLE MATRIX */}
      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="about-lead-panel overflow-hidden p-8 sm:p-12 lg:p-14">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                  Contract Vehicles
                </p>

                <h2 className="mt-3 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
                  Acquisition paths built for federal speed.
                </h2>

                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Public-sector buyers and teaming partners can quickly assess
                  small-business certifications, active vehicles, and corporate
                  quality credentials in one focused view.
                </p>
              </div>

              {publishedContracts.length ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {publishedContracts.map((contract) => (
                    <div
                      key={contract.id}
                      className="border border-cyan-200/18 bg-cyan-200/[0.035] px-5 py-4"
                    >
                      <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-100">
                        {contract.name}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.14em] text-slate-300">
                        {contract.agency} • {contract.contractType}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-base leading-7 text-slate-300">
                  Contract vehicles will appear here after they are published from the admin dashboard.
                </p>
              )}
            </div>

            {publishedContracts.length ? (
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {publishedContracts.map((contract) => (
                  <article key={`${contract.id}-detail`} className="border border-white/10 bg-black/25 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                      {contract.contractNumber}
                    </p>
                    <p className="mt-3 text-lg font-semibold leading-6 text-white">
                      {contract.period}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {contract.summary}
                    </p>
                    <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">
                      {contract.availability}
                    </p>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </Reveal>
      </Section>

      {/* SUPPORT AREAS */}
      <Section className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal variant="angleLeft">
            <div className="relative">
              <div aria-hidden className="about-title-rail" />
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                Acquisition Support
              </p>

              <h2 className="mt-4 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
                Built for agencies and partners that need a clear route to
                support.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.05} variant="tiltRight">
            <div className="about-overview-panel relative p-8 sm:p-10">
              <p className="text-lg leading-8 text-slate-300">
                Procurement information helps government stakeholders and
                partner organizations understand small-business access, scope,
                points of contact, and alignment with mission-focused
                technology needs.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {supportAreas.map((area) => (
                  <span
                    key={area}
                    className="border border-cyan-200/20 bg-cyan-200/[0.03] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-cyan-100"
                  >
                    {area}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
                    Certification Vehicles
                  </p>
                  <div className="mt-4 grid gap-3">
                    {procurementSignals.map((signal) => (
                      <span
                        key={signal}
                        className="border border-white/10 bg-black/25 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-200"
                      >
                        {signal}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
                    Federal Experience
                  </p>
                  <div className="mt-4 grid gap-3">
                    {agencyExperience.map((agency) => (
                      <span
                        key={agency}
                        className="border border-white/10 bg-black/25 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-200"
                      >
                        {agency}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* PAST CLIENTS */}
      <Section className="py-20 lg:py-28">
        <Reveal variant="tiltRight">
          <div className="about-overview-panel p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
              Past Clients
            </p>

            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <h2 className="mt-3 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
                Proven support across public and mission environments.
              </h2>

              <p className="text-lg leading-8 text-slate-300">
                Client experience reflects work across federal, public-sector,
                intelligence, finance, education, agriculture, and Navy mission
                environments.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {pastClients.map((client) => (
                <span
                  key={client}
                  className="border border-white/10 bg-black/25 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-200"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* PROCUREMENT CONTACTS */}
      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="about-lead-panel p-8 sm:p-12">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
              Procurement Contacts
            </p>

            <h2 className="mt-3 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
              Direct contacts for teaming and bid conversations.
            </h2>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {procurementContacts.map((contact) => (
                <article
                  key={contact.email}
                  className="border border-cyan-200/15 bg-black/25 p-6"
                >
                  <h3 className="text-3xl font-black uppercase leading-tight text-white">
                    {contact.name}
                  </h3>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
                    {contact.title}
                  </p>

                  <div className="mt-5 grid gap-3 text-sm text-slate-300">
                    <p className="flex items-center gap-3 break-words">
                      <Mail className="shrink-0 text-cyan-300" size={16} />
                      {contact.email}
                    </p>
                    <p className="flex items-center gap-3">
                      <Phone className="shrink-0 text-cyan-300" size={16} />
                      {contact.phone}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

    </HomepageCinematicScene>
  );
}
