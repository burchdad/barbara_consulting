import {
  ArrowRight,
  Building2,
  Clock3,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

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
    <main className="overflow-hidden">
      {/* HERO */}
      <Section className="relative isolate overflow-hidden py-24 lg:py-32">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(2, 6, 23, 0.18), rgba(2, 6, 23, 0.94)), url(${heroImageUrl})`,
          }}
        />

        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_22%,rgba(34,211,238,0.24),transparent_32%),radial-gradient(circle_at_18%_75%,rgba(168,85,247,0.13),transparent_30%),linear-gradient(135deg,rgba(2,6,23,0.96),rgba(2,6,23,0.76))]" />

        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

        <Reveal>
          <div className="max-w-6xl">
            <p className="text-xs font-bold uppercase tracking-[0.36em] text-cyan-300">
              Contact the AI Delivery Team
            </p>

            <h1 className="mt-5 max-w-6xl text-5xl font-black uppercase leading-[0.92] text-white sm:text-7xl lg:text-8xl">
              Let’s build a practical path forward.
            </h1>

            <p className="mt-8 max-w-4xl text-lg leading-8 text-slate-200 sm:text-xl">
              Share the mission outcome, modernization goal, operational
              challenge, or AI opportunity you want to move forward. The team
              will review your request and respond with a practical next step.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* CONTACT FORM + INFO */}
      <Section className="py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            <div className="sticky top-28">
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
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4"
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
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
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
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
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
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
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

          <Reveal delay={0.05}>
            <div className="rounded-[2.5rem] border border-white/10 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.12),transparent_28%),linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] p-5 shadow-[0_0_80px_rgba(34,211,238,0.08)] sm:p-8">
              <div className="mb-8 rounded-[2rem] border border-white/10 bg-black/25 p-6">
                <div className="flex items-center gap-3">
                  <MessageSquareText className="text-cyan-300" size={24} />

                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
                    Project Intake
                  </p>
                </div>

                <h3 className="mt-5 text-3xl font-black uppercase leading-tight text-white">
                  Send the request. We’ll help define the next move.
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

              <h2 className="mt-3 text-5xl font-black uppercase text-white sm:text-7xl">
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
              <article className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 transition hover:-translate-y-2 hover:border-cyan-200/40">
                <p className="text-5xl font-black text-cyan-300/30">
                  {String(index + 1).padStart(2, "0")}
                </p>

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

      {/* TRUST STRIP */}
      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="rounded-[2.5rem] border border-cyan-200/20 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.18),transparent_36%),linear-gradient(135deg,rgba(15,23,42,0.92),rgba(2,6,23,0.92))] p-10 text-center sm:p-16">
            <Sparkles className="mx-auto text-cyan-300" size={28} />

            <p className="mt-4 text-xs uppercase tracking-[0.28em] text-cyan-200">
              Mission-Aligned Engagements
            </p>

            <h2 className="mx-auto mt-4 max-w-5xl text-5xl font-black uppercase leading-[0.92] text-white sm:text-7xl">
              Built for teams that need clarity, security, and execution.
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-200">
              Whether the need is strategy, modernization, AI readiness, or
              secure workflow design, the first step is a clear conversation.
            </p>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}