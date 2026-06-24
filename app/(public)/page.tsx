import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Landmark,
  Layers3,
  Quote,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Section } from "@/components/ui/section";
import { JsonLd } from "@/components/public/json-ld";
import { Reveal } from "@/components/public/reveal";
import { HomepageCinematicScene } from "@/components/public/homepage-cinematic-scene";
import { getPublishedData } from "@/lib/site-data";
import { siteConfig } from "@/lib/config/site";

const featuredAudience = [
  "AI readiness",
  "Federal IT modernization",
  "Secure modernization",
];

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const procurementIcons = [ShieldCheck, Layers3, Sparkles];

const buyerQuestions = [
  {
    question: "What services does Gray Matters Technology Services provide?",
    answer:
      "Gray Matters Technology Services - Sage Tech Solutions provides AI consulting, responsible adoption planning, workflow automation, federal IT modernization, cybersecurity readiness, cloud, data, and secure mission technology delivery.",
  },
  {
    question: "Does Gray Matters Technology Services support federal agencies?",
    answer:
      "Yes. The company supports agencies and public-sector partners with modernization, automation, cyber readiness, acquisition support, and disciplined mission delivery.",
  },
  {
    question: "What contract vehicles can buyers use?",
    answer:
      "Public-sector buyers can review available contract vehicle details on the contract vehicles page and the capability statement, then contact the team to confirm fit for a specific requirement.",
  },
  {
    question: "What is the revenue of Graymatter?",
    answer:
      "Gray Matters Technology Services is privately held, and the public website does not publish revenue figures. Buyers evaluating qualification should review the capability statement, contract vehicles, certifications, delivery focus, and contact the company for official business details.",
  },
  {
    question: "How should buyers compare AI consulting and federal IT providers?",
    answer:
      "Compare providers by mission fit, implementation process, public-sector experience, contract access, cybersecurity readiness, evidence of delivery discipline, and whether the team can turn AI strategy into practical workflow outcomes.",
  },
];

const comparisonPoints = [
  "AI strategy tied to operational workflows instead of generic experimentation",
  "Federal IT modernization, cybersecurity readiness, cloud, and data delivery in one partner",
  "Contract vehicle and capability statement details organized for public-sector buyers",
  "Clear engagement path for agencies, primes, and mission partners evaluating fit",
];

function FloatingReadinessGraph() {
  const nodes = [
    "left-[12%] top-[48%]",
    "left-[34%] top-[30%]",
    "right-[28%] top-[42%]",
    "right-[15%] bottom-[27%]",
    "left-[46%] bottom-[20%]",
  ];

  return (
    <div
      aria-hidden
      className="readiness-graph-shell relative min-h-[22rem] overflow-hidden border border-cyan-200/20 bg-[linear-gradient(135deg,rgba(8,47,73,0.5),rgba(2,6,23,0.88))] shadow-[0_34px_110px_rgba(34,211,238,0.16)]"
    >
      <div className="absolute inset-8 border border-white/10 bg-[linear-gradient(to_right,rgba(34,211,238,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.14)_1px,transparent_1px)] bg-[length:5.5rem_5.5rem] opacity-70" />

      <div className="absolute inset-14">
        <div className="absolute inset-[22%_10%_22%_6%] skew-y-[-12deg] border border-emerald-200/25" />
        <div className="absolute inset-[14%_20%_32%_21%] skew-y-[15deg] border border-cyan-200/25" />

        {nodes.map((position) => (
          <span
            key={position}
            className={`absolute h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.85)] ${position}`}
          />
        ))}
      </div>

      <div className="absolute right-8 top-8 rounded-2xl border border-white/15 bg-black/60 p-5 shadow-2xl backdrop-blur">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
          Readiness
        </p>
        <p className="mt-2 text-4xl font-black text-white">84%</p>
      </div>

      <div className="absolute bottom-8 left-8 rounded-2xl border border-white/15 bg-black/60 p-5 shadow-2xl backdrop-blur">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
          Workflow Load
        </p>
        <p className="mt-2 text-4xl font-black text-white">-32%</p>
      </div>
    </div>
  );
}

export default async function HomePage() {
  const { settings, contracts, testimonials } = await getPublishedData();
  const procurementNodes = contracts.slice(0, 3).map((contract, index) => ({
    title: contract.name,
    body: contract.agency,
    Icon: procurementIcons[index] ?? ShieldCheck,
  }));
  const heroEyebrow = settings?.heroEyebrow || siteConfig.hero.eyebrow;
  const heroHeadline = settings?.heroHeadline || siteConfig.hero.headline;
  const heroSubheadline = settings?.heroSubheadline || siteConfig.hero.subtext;
  const capabilityStatementUrl = settings?.capabilityStatementUrl || siteConfig.media.capabilityStatementUrl;
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: buyerQuestions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

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
      <section className="home-hero relative isolate min-h-screen overflow-hidden">
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
        <div className="hero-section-dissolve absolute inset-x-0 bottom-0" />

        <Section className="relative z-10 flex min-h-screen items-end pb-24 pt-36 lg:pb-32">
          <Reveal>
            <div className="max-w-6xl">
              <div className="mb-10 inline-flex flex-col gap-3 border border-cyan-200/20 bg-black/35 p-3 shadow-[0_24px_80px_rgba(34,211,238,0.1)] backdrop-blur sm:flex-row sm:items-center sm:p-4">
                <div className="flex h-28 w-28 items-center justify-center bg-white/88 p-2 sm:h-32 sm:w-32">
                  <img
                    src="/greylogo.png"
                    alt="Gray Matters Technology Services"
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="hidden h-16 w-px bg-cyan-200/30 sm:block" />

                <div className="flex h-28 w-28 items-center justify-center bg-white p-2 sm:h-32 sm:w-32">
                  <img
                    src="/sagetech-logo-tight.png"
                    alt="SageTech Solutions"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>

              <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-cyan-200">{heroEyebrow}</p>

              <h1 className="max-w-7xl text-5xl font-black uppercase leading-[0.92] text-white sm:text-7xl lg:text-8xl 2xl:text-[8.5rem]">
                {heroHeadline}
              </h1>

              <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">{heroSubheadline}</p>

              <div className="relative z-30 mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="premium-button pointer-events-auto rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-cyan-200"
                >
                  Start a Strategic Conversation
                </Link>

                <a
                  href={capabilityStatementUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="premium-button pointer-events-auto rounded-full border border-white/35 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white backdrop-blur transition hover:border-cyan-200 hover:text-cyan-100"
                >
                  Capabilities Statement
                </a>
              </div>
            </div>
          </Reveal>
        </Section>
      </section>

      {/* POSITIONING / ABOUT PREVIEW */}
      <Section className="home-about-transition relative overflow-visible py-24 lg:py-32">
        <div aria-hidden className="about-angle-field">
          <div className="about-angle-plane about-angle-plane-a" />
          <div className="about-angle-plane about-angle-plane-b" />
          <div className="about-angle-plane about-angle-plane-c" />
        </div>

        <div className="relative z-10 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal variant="angleLeft">
            <div className="relative">
              <div aria-hidden className="about-title-rail" />
              <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">
                AI-Native Consulting and Automation
              </p>

              <h2 className="mt-4 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
                Where operational experience meets intelligent modernization.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.05} variant="tiltRight">
            <div className="about-graph-stack grid gap-5">
              <FloatingReadinessGraph />

              <div className="about-copy-float relative p-6 sm:p-8">
                <p className="text-lg leading-8 text-slate-300">
                  Gray Matters Technology Services - Sage Tech Solutions supports
                  organizations with AI readiness, responsible adoption,
                  workflow automation, application modernization, cloud, data,
                  cyber readiness, and secure federal IT delivery. The goal is
                  simple: help teams make better decisions, reduce manual
                  friction, and move forward with measurable confidence.
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
            </div>
          </Reveal>
        </div>
      </Section>

      {/* AEO / GEO BUYER ANSWERS */}
      <Section className="relative py-24 lg:py-32">
        <JsonLd data={faqStructuredData} />
        <Reveal>
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">
              Buyer Questions
            </p>
            <h2 className="mt-4 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
              Answers for agencies comparing AI and federal IT partners.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              These answers summarize how Gray Matters Technology Services -
              Sage Tech Solutions should be evaluated by buyers looking for AI
              adoption, secure modernization, contract access, and practical
              mission support.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal delay={0.05}>
            <div className="grid gap-4">
              {buyerQuestions.map((item) => (
                <article
                  key={item.question}
                  className="border border-white/10 bg-white/[0.035] p-6"
                >
                  <h3 className="text-xl font-black uppercase leading-tight text-white">
                    {item.question}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-slate-300">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} variant="tiltRight">
            <aside className="sticky top-28 border border-cyan-200/20 bg-cyan-200/[0.045] p-7">
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">
                Provider Comparison
              </p>
              <h3 className="mt-4 text-3xl font-black uppercase leading-none text-white">
                How to compare providers before a modernization award.
              </h3>
              <ul className="mt-7 space-y-4">
                {comparisonPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-6 text-slate-300">
                    <ShieldCheck className="mt-0.5 shrink-0 text-cyan-300" size={17} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/services"
                className="mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-cyan-200 transition hover:text-white"
              >
                Review Services <ArrowRight size={16} />
              </Link>
            </aside>
          </Reveal>
        </div>
      </Section>

      {/* PROCUREMENT / CONTRACTS TEASER */}
      <Section className="procurement-route-section relative overflow-visible py-28 lg:py-36">
        <div aria-hidden className="procurement-route-field">
          <div className="procurement-route-outline" />
          <div className="procurement-route-plane procurement-route-plane-a" />
          <div className="procurement-route-plane procurement-route-plane-b" />
          <div className="procurement-route-beam" />
        </div>

        <div className="relative z-10 grid gap-12 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
          <Reveal variant="angleLeft">
            <div className="procurement-route-map relative">
              <div aria-hidden className="procurement-route-line">
                <span className="procurement-route-pulse procurement-route-pulse-a" />
                <span className="procurement-route-pulse procurement-route-pulse-b" />
              </div>

              <div className="procurement-node-grid">
                {procurementNodes.map(({ title, body, Icon }, index) => (
                  <article
                    key={title}
                    className={`procurement-node procurement-node-${index + 1}`}
                  >
                    <span className="procurement-node-index">
                      0{index + 1}
                    </span>
                    <Icon className="text-cyan-200" size={22} />
                    <h3 className="mt-5 text-base font-black uppercase leading-tight text-white">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {body}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} variant="tiltRight">
            <div className="procurement-copy relative lg:justify-self-end">
              <div className="inline-flex h-12 w-12 items-center justify-center border border-cyan-200/25 bg-cyan-200/5 text-cyan-200">
                <Landmark size={23} />
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.32em] text-cyan-300">
                Acquisition Channel
              </p>

              <h2 className="mt-4 max-w-2xl text-5xl font-black uppercase leading-[0.92] text-white sm:text-6xl">
                Clear pathways for public-sector partners.
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-300">
                For agencies and partners who need a direct acquisition route,
                contract vehicle and procurement details are organized as one
                focused access layer.
              </p>

              <Link
                href="/contracts"
                className="mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-cyan-200 transition hover:text-white"
              >
                View Contract Vehicles <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
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

    </HomepageCinematicScene>
  );
}
