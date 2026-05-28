import Link from "next/link";
import { CalendarClock, Headphones, Radio, Video } from "lucide-react";

import { HomepageCinematicScene } from "@/components/public/homepage-cinematic-scene";
import { Reveal } from "@/components/public/reveal";
import { Section } from "@/components/ui/section";

const resourceTracks = [
  {
    title: "AI Readiness Conversations",
    body: "Short-form discussions on responsible adoption, operational fit, workforce preparation, and modernization planning.",
    icon: Radio,
  },
  {
    title: "Federal Modernization Webinars",
    body: "Recorded and upcoming sessions for agencies and partners evaluating secure workflow automation, data, cloud, and compliance pathways.",
    icon: Video,
  },
  {
    title: "Procurement & Teaming Briefs",
    body: "Practical conversations around contract vehicles, capability positioning, strategic partnerships, and bid readiness.",
    icon: Headphones,
  },
];

export default function PodcastsWebinarsPage() {
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

        <Section className="relative z-10 flex min-h-[72vh] items-center pb-24 pt-36 lg:pb-28">
          <Reveal variant="angleLeft">
            <div className="max-w-6xl">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-cyan-200">
                Podcasts & Webinars
              </p>

              <h1 className="text-5xl font-black uppercase leading-[0.92] text-white sm:text-6xl lg:text-[5.2rem]">
                Practical conversations for AI-forward public-sector teams.
              </h1>

              <p className="mt-8 max-w-4xl text-lg leading-8 text-slate-200 sm:text-xl">
                A resource hub for upcoming webinars, recorded briefings, and
                podcast-style conversations on AI readiness, modernization,
                cybersecurity, procurement, and mission delivery.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="premium-button rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-cyan-200"
                >
                  Request a Topic
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

        <div className="grid gap-5 lg:grid-cols-3">
          {resourceTracks.map(({ title, body, icon: Icon }, index) => (
            <Reveal key={title} delay={0.04 + index * 0.04} variant="tiltLeft">
              <article className="about-system-card min-h-[21rem] p-8">
                <Icon className="text-cyan-200" size={30} />
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

      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="about-lead-panel p-8 sm:p-12">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                  Publishing Queue
                </p>
                <h2 className="mt-3 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
                  Content calendar coming online.
                </h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                  This page is ready for the client&apos;s podcast episodes,
                  webinar registrations, replay links, and partner briefings as
                  they become available.
                </p>
              </div>

              <div className="border border-cyan-200/20 bg-black/25 p-6 text-cyan-100">
                <CalendarClock size={32} />
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
                  Next Update
                </p>
                <p className="mt-3 text-2xl font-black uppercase leading-tight text-white">
                  Add episode and webinar details when dates are confirmed.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </HomepageCinematicScene>
  );
}
