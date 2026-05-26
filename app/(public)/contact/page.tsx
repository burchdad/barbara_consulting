import {
  Clock3,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { HomepageCinematicScene } from "@/components/public/homepage-cinematic-scene";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/public/contact-form";
import { Reveal } from "@/components/public/reveal";
import { getGlobalSettings } from "@/lib/site-data";
import { siteConfig } from "@/lib/config/site";

const contactReasons = [
  "AI modernization strategy",
  "Secure workflow automation",
  "Public-sector delivery support",
  "Cybersecurity and compliance readiness",
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

  const email = settings?.email || siteConfig.contact.email;
  const phone = settings?.phone || siteConfig.contact.phone;
  const address = settings?.address || siteConfig.contact.address;

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
                  Contact the AI Delivery Team
                </p>

                <h1 className="max-w-6xl text-5xl font-black uppercase leading-[0.92] text-white sm:text-6xl lg:text-[4.9rem]">
                  Let&apos;s build a practical path forward.
                </h1>

                <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
                  Share the mission outcome, modernization goal, operational
                  challenge, or AI opportunity you want to move forward. The
                  team will review your request and respond with a practical
                  next step.
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

      {/* CONTACT FORM + INFO */}
      <Section className="about-command-section relative overflow-visible py-20 lg:py-28">
        <div aria-hidden className="about-angle-field">
          <div className="about-angle-plane about-angle-plane-a" />
          <div className="about-angle-plane about-angle-plane-b" />
          <div className="about-angle-plane about-angle-plane-c" />
        </div>

        <div className="relative z-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal variant="angleLeft">
            <div className="sticky top-28">
              <div aria-hidden className="about-title-rail" />
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                Start the Conversation
              </p>

              <h2 className="mt-4 text-5xl font-black uppercase leading-none text-white sm:text-6xl">
                Tell us what needs to improve.
              </h2>

              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
                From AI modernization to operational support, engagements are
                designed around speed, security, mission alignment, and
                measurable impact.
              </p>

              <div className="mt-8 grid gap-3">
                {contactReasons.map((reason) => (
                  <div
                    key={reason}
                    className="about-value-chip flex min-h-[4.5rem] items-center gap-3 p-4"
                  >
                    <ShieldCheck className="shrink-0 text-cyan-300" size={18} />

                    <p className="text-sm font-bold uppercase tracking-[0.12em] text-slate-200">
                      {reason}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-3 text-sm text-slate-300">
                {email && (
                  <div className="border border-white/10 bg-black/25 p-5">
                    <div className="flex items-center gap-3">
                      <Mail className="text-cyan-300" size={18} />
                      <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Email
                      </span>
                    </div>

                    <p className="mt-3 break-words text-base text-white">
                      {email}
                    </p>
                  </div>
                )}

                {phone && (
                  <div className="border border-white/10 bg-black/25 p-5">
                    <div className="flex items-center gap-3">
                      <Phone className="text-cyan-300" size={18} />
                      <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Phone
                      </span>
                    </div>

                    <p className="mt-3 text-base text-white">{phone}</p>
                  </div>
                )}

                {address && (
                  <div className="border border-white/10 bg-black/25 p-5">
                    <div className="flex items-center gap-3">
                      <MapPin className="text-cyan-300" size={18} />
                      <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Headquarters
                      </span>
                    </div>

                    <p className="mt-3 text-base text-white">{address}</p>
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05} variant="tiltRight">
            <div className="about-lead-panel p-5 sm:p-8">
              <div className="mb-8 border border-white/10 bg-black/25 p-6">
                <div className="flex items-center gap-3">
                  <MessageSquareText className="text-cyan-300" size={24} />

                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
                    Project Intake
                  </p>
                </div>

                <h3 className="mt-5 text-3xl font-black uppercase leading-tight text-white">
                  Send the request. We&apos;ll help define the next move.
                </h3>

                <p className="mt-4 text-sm leading-6 text-slate-300">
                  A strong message includes the organization type, the problem
                  you want solved, the timeline, and the outcome you want to
                  create.
                </p>
              </div>

              <ContactForm />
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
