import {
  BrainCircuit,
  GraduationCap,
  ShieldCheck,
  Target,
} from "lucide-react";

import { HomepageCinematicScene } from "@/components/public/homepage-cinematic-scene";
import { Section } from "@/components/ui/section";
import { CareersClient } from "@/components/public/careers-client";
import { Reveal } from "@/components/public/reveal";
import { siteConfig } from "@/lib/config/site";
import { getPublicCareersPageData } from "@/lib/site-data";

const careerPrinciples = [
  {
    title: "Mission-Driven Work",
    body: "Support agencies and partners modernizing high-value workflows with responsible AI, secure systems, and practical federal delivery.",
    icon: Target,
  },
  {
    title: "Responsible Engineering",
    body: "Build with human oversight, data awareness, security judgment, and the accountability complex environments require.",
    icon: ShieldCheck,
  },
  {
    title: "Growth and Certification",
    body: "Develop professional capability through focused learning, applied experience, and certification support.",
    icon: GraduationCap,
  },
];

const teamSignals = [
  "AI strategy",
  "AI-agile development",
  "Workflow automation",
  "Cloud services",
  "Cyber readiness",
  "Data intelligence",
  "ServiceNow support",
  "Low-code platforms",
  "Mission operations",
];

const cultureSignals = [
  "Innovation culture",
  "Cross-functional delivery",
  "Low staff turnover",
  "High utilization",
  "Certification growth",
  "Inclusive collaboration",
];

export default async function CareersPage() {
  const { jobs, settings } = await getPublicCareersPageData();
  const heroImageUrl =
    settings?.careersHeroImageUrl || siteConfig.media.careersHeroImageUrl;

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
                  AI-Forward Careers
                </p>

                <h1 className="max-w-6xl text-5xl font-black uppercase leading-[0.92] text-white sm:text-6xl lg:text-[4.9rem]">
                  Careers for builders of secure, practical mission systems.
                </h1>

                <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
                  {siteConfig.careers.subtext}
                </p>

                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  {siteConfig.careers.perks.map((item) => (
                    <span
                      key={item}
                      className="border border-cyan-200/20 bg-cyan-200/[0.04] px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-cyan-100"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="about-hero-profile relative hidden min-h-[34rem] overflow-hidden lg:block">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-60"
                  style={{ backgroundImage: `url(${heroImageUrl})` }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,6,23,0.2),rgba(2,6,23,0.92)_64%,rgba(8,47,73,0.86))]" />
                <div className="absolute inset-8 border border-cyan-200/15 bg-[linear-gradient(to_right,rgba(34,211,238,0.11)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[length:4.5rem_4.5rem]" />

                <div className="absolute left-8 top-8 max-w-[18rem] border border-white/15 bg-black/50 p-5 backdrop-blur">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">
                    Build What Matters
                  </p>
                  <p className="mt-3 text-2xl font-black uppercase leading-tight text-white">
                    Secure AI systems for real-world operations.
                  </p>
                </div>

                <div className="absolute bottom-8 right-8 grid w-[21rem] gap-3">
                  {["Strategy", "Systems", "Delivery"].map((item, index) => (
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

      {/* TEAM SIGNALS */}
      <Section className="about-command-section relative overflow-visible py-20 lg:py-28">
        <div aria-hidden className="about-angle-field">
          <div className="about-angle-plane about-angle-plane-a" />
          <div className="about-angle-plane about-angle-plane-b" />
          <div className="about-angle-plane about-angle-plane-c" />
        </div>

        <div className="relative z-10 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal variant="angleLeft">
            <div className="relative">
              <div aria-hidden className="about-title-rail" />
              <BrainCircuit className="text-cyan-200" size={30} />

              <p className="mt-5 text-xs uppercase tracking-[0.3em] text-cyan-300">
                Team Environment
              </p>

              <h2 className="mt-4 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
                Multidisciplinary work with measurable mission impact.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.05} variant="tiltRight">
            <div className="about-overview-panel relative p-8 sm:p-10">
              <p className="text-lg leading-8 text-slate-300">
                Join teams building decision support, resilient data pipelines,
                secure automation, cloud-enabled applications, and high-trust AI
                workflows in environments where quality, accountability, and
                outcomes matter.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {teamSignals.map((signal) => (
                  <span
                    key={signal}
                    className="border border-cyan-200/20 bg-cyan-200/[0.03] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-cyan-100"
                  >
                    {signal}
                  </span>
                ))}
              </div>

              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
                  Culture Signals
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {cultureSignals.map((signal) => (
                    <span
                      key={signal}
                      className="border border-white/10 bg-black/25 px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-slate-200"
                    >
                      {signal}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* CAREER PRINCIPLES */}
      <Section className="py-20 lg:py-28">
        <div className="grid gap-5 lg:grid-cols-3">
          {careerPrinciples.map(({ title, body, icon: Icon }, index) => (
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

      {/* OPEN ROLES */}
      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                Open Roles
              </p>

              <h2 className="mt-3 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
                Find your next mission.
              </h2>
            </div>

            <p className="max-w-xl text-slate-300">
              Search available roles by focus area, location, and employment
              type. New opportunities can be published from the admin console.
            </p>
          </div>
        </Reveal>

        <CareersClient jobs={jobs} />
      </Section>

    </HomepageCinematicScene>
  );
}
