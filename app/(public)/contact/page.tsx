import {
  Clock3,
  Mail,
  Phone,
} from "lucide-react";

import { HomepageCinematicScene } from "@/components/public/homepage-cinematic-scene";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/public/reveal";
import { getGlobalSettings } from "@/lib/site-data";
import { siteConfig } from "@/lib/config/site";

type LeadershipContact = {
  name: string;
  title: string;
  email: string;
  phone: string;
  secondary?: string;
};

const leadershipContacts: LeadershipContact[] = [
  {
    name: "Danielle Carr",
    title: "CEO",
    email: "Dcarr@graymatterstech.com",
    phone: "240-784-7418 Mobile",
    secondary: "301-966-7523 Corporate",
  },
  {
    name: "Barbara A. Gray",
    title: "President",
    email: "Bgray@graymatterstech.com",
    phone: "301-966-7523 or 202-420-1767",
  },
  {
    name: "Alexis Muse",
    title: "Operations Coordinator / AR",
    email: "Amuse@graymatterstech.com",
    phone: "301-966-7523 Corporate; 202-375-1217",
  },
  {
    name: "Joy Hodge",
    title: "Admin Manager",
    email: "Jhodge@graymatterstech.com",
    phone: "301-966-7523 Corporate; 301-798-7091",
  },
  {
    name: "Bookkeeping / Accounting Department / AP",
    title: "Accounting",
    email: "",
    phone: "301-966-7523 Corporate",
  },
  {
    name: "Philip C. Katner",
    title: "Sr. Security Specialist / Assistant FSO",
    email: "",
    phone: "301-966-7523 or 301-717-3380 Mobile",
  },
];

const responseSteps = [
  {
    title: "Share the Need",
    body: "Send a short overview of the mission, workflow, system, or modernization goal you want to improve.",
  },
  {
    title: "Clarify the Path",
    body: "The team reviews your request and identifies the most practical next step based on urgency, fit, and scope.",
  },
  {
    title: "Start the Conversation",
    body: "If aligned, the next step is a focused conversation around goals, timelines, constraints, and outcomes.",
  },
];

export default async function ContactPage() {
  const settings = await getGlobalSettings();

  const heroImageUrl =
    settings?.contactHeroImageUrl || siteConfig.media.contactHeroImageUrl;

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
                  Contact the AI-Forward Delivery Team
                </p>

                <h1 className="max-w-6xl text-5xl font-black uppercase leading-[0.92] text-white sm:text-6xl lg:text-[4.9rem]">
                  Let&apos;s build a practical path forward.
                </h1>

                <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
                  Share the mission outcome, modernization goal, operational
                  challenge, procurement path, or AI opportunity you want to
                  move forward. The team will review your request and respond
                  with a practical next step.
                </p>
              </div>

              <div className="about-hero-profile relative hidden min-h-[34rem] overflow-hidden lg:block">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-58"
                  style={{ backgroundImage: `url(${heroImageUrl})` }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,6,23,0.2),rgba(2,6,23,0.92)_64%,rgba(8,47,73,0.86))]" />
                <div className="absolute inset-8 border border-cyan-200/15 bg-[linear-gradient(to_right,rgba(34,211,238,0.11)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[length:4.5rem_4.5rem]" />

                <div className="absolute left-8 top-8 max-w-[18rem] border border-white/15 bg-black/50 p-5 backdrop-blur">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">
                    Project Intake
                  </p>
                  <p className="mt-3 text-2xl font-black uppercase leading-tight text-white">
                    Mission context into a clear next step.
                  </p>
                </div>

                <div className="absolute bottom-8 right-8 grid w-[21rem] gap-3">
                  {["Need", "Fit", "Path"].map((item, index) => (
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

      {/* LEADERSHIP POINTS OF CONTACT */}
      <Section className="about-command-section relative overflow-visible py-20 lg:py-24">
        <div aria-hidden className="about-angle-field">
          <div className="about-angle-plane about-angle-plane-a" />
          <div className="about-angle-plane about-angle-plane-b" />
          <div className="about-angle-plane about-angle-plane-c" />
        </div>

        <div className="relative z-10 grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <Reveal variant="angleLeft">
            <div className="relative">
              <div aria-hidden className="about-title-rail" />
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                Leadership Points of Contact
              </p>

              <h2 className="mt-4 text-5xl font-black uppercase leading-none text-white sm:text-6xl">
                Contact Gray Matters Technology Services.
              </h2>

              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
                Direct leadership, operations, security, and accounting contacts
                for procurement, teaming, contract administration, and project
                intake.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05} variant="tiltRight">
            <div className="about-lead-panel grid gap-4 p-6 sm:p-8 md:grid-cols-2">
              {leadershipContacts.map((contact) => (
                <article
                  key={contact.name}
                  className="border border-cyan-200/15 bg-black/25 p-5"
                >
                  <h3 className="text-2xl font-black uppercase leading-tight text-white">
                    {contact.name}
                  </h3>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
                    {contact.title}
                  </p>

                  <div className="mt-5 grid gap-3 text-sm leading-6 text-slate-300">
                    <p className="flex items-start gap-3">
                      <Phone className="mt-1 shrink-0 text-cyan-300" size={16} />
                      <span>
                        {contact.phone}
                        {contact.secondary ? (
                          <>
                            <br />
                            {contact.secondary}
                          </>
                        ) : null}
                      </span>
                    </p>
                    {contact.email ? (
                      <p className="flex items-start gap-3 break-words">
                        <Mail className="mt-1 shrink-0 text-cyan-300" size={16} />
                        {contact.email}
                      </p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* RESPONSE PROCESS */}
      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                What Happens Next
              </p>

              <h2 className="mt-3 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
                A clear path from message to momentum.
              </h2>
            </div>

            <p className="max-w-xl text-slate-300">
              The contact process is designed to quickly understand the need,
              assess fit, and move toward a practical conversation.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {responseSteps.map((step, index) => (
            <Reveal key={step.title} delay={0.04 + index * 0.04}>
              <article className={`about-path-node about-path-node-${index + 1}`}>
                <span className="about-path-node-index">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <Clock3 className="text-cyan-200" size={22} />

                <h3 className="mt-6 text-2xl font-black uppercase text-white">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-slate-300">
                  {step.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

    </HomepageCinematicScene>
  );
}
