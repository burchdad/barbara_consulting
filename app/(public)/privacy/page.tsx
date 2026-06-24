import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Database,
  FileText,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

import { HomepageCinematicScene } from "@/components/public/homepage-cinematic-scene";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/public/reveal";
import { getGlobalSettings } from "@/lib/site-data";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Review how Gray Matters Technology Services handles website inquiries, contact information, data usage, and responsible privacy practices.",
  alternates: {
    canonical: "/privacy",
  },
};

const privacyHighlights = [
  {
    title: "Responsible Data Handling",
    body: "Information submitted through the website is used to respond to inquiries, evaluate requests, and support appropriate business communications.",
    icon: UserCheck,
  },
  {
    title: "Security-Aware Operations",
    body: "Contact and operational information is handled through secure systems and protected using reasonable administrative, technical, and organizational safeguards.",
    icon: LockKeyhole,
  },
  {
    title: "Purpose-Limited Use",
    body: "Data is not collected for unnecessary purposes and is used in connection with legitimate business, operational, contractual, or legal needs.",
    icon: ShieldCheck,
  },
];

const policySections = [
  {
    title: "Information We Collect",
    body: [
      "We may collect information you choose to provide through contact forms, project inquiries, email communications, or other direct interactions with the firm.",
      "This information may include your name, organization, role, email address, phone number, message details, project interests, and other information you voluntarily provide.",
    ],
  },
  {
    title: "How Information Is Used",
    body: [
      "Information is used to respond to inquiries, evaluate potential engagements, coordinate communications, provide requested information, and support business operations.",
      "We may also use information to improve website functionality, understand visitor needs, maintain security, and fulfill contractual, regulatory, or legal obligations.",
    ],
  },
  {
    title: "AI-Enabled Workflows",
    body: [
      "Where AI-enabled tools or operational systems are used, information is handled with attention to responsible use, access control, and appropriate business purpose.",
      "The firm does not intentionally use submitted contact information to train public AI models unless expressly disclosed or agreed in writing.",
    ],
  },
  {
    title: "Data Sharing",
    body: [
      "We do not sell personal information. Information may be shared with trusted service providers, operational platforms, or advisors only when necessary to support business operations, respond to requests, or comply with legal requirements.",
      "Information may also be disclosed if required by law, regulation, legal process, security need, or enforceable governmental request.",
    ],
  },
  {
    title: "Data Retention",
    body: [
      "Information is retained only as long as reasonably necessary for business, operational, contractual, legal, or compliance purposes.",
      "Retention periods may vary depending on the nature of the inquiry, the relationship, applicable requirements, and legitimate business needs.",
    ],
  },
  {
    title: "Security",
    body: [
      "We use reasonable safeguards designed to protect information from unauthorized access, loss, misuse, alteration, or disclosure.",
      "No online system can be guaranteed completely secure, but security-aware handling is part of the firm’s operational approach.",
    ],
  },
  {
    title: "Your Choices",
    body: [
      "You may contact the firm to request updates, corrections, or deletion of information you have provided, subject to legal, contractual, operational, and recordkeeping requirements.",
      "You may also request that the firm stop using your contact information for non-essential communications.",
    ],
  },
  {
    title: "Policy Updates",
    body: [
      "This Privacy Policy may be updated periodically to reflect changes in operations, legal requirements, website functionality, or business practices.",
      "The version posted on this page is the current version unless otherwise stated.",
    ],
  },
];

export default async function PrivacyPage() {
  const settings = await getGlobalSettings();

  const heroImageUrl =
    settings?.privacyHeroImageUrl || siteConfig.media.privacyHeroImageUrl;

  const companyName = settings?.companyName ?? siteConfig.companyName;
  const email = settings?.email;

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
                  Privacy Policy
                </p>

                <h1 className="max-w-6xl text-5xl font-black uppercase leading-[0.92] text-white sm:text-6xl lg:text-[4.9rem]">
                  Data handling built around trust, clarity, and responsible
                  use.
                </h1>

                <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
                  This Privacy Policy explains how {companyName} collects,
                  uses, protects, and manages information submitted through
                  website forms, communications, AI-enabled delivery workflows,
                  and operational platforms.
                </p>

                <p className="mt-6 max-w-3xl text-sm leading-6 text-slate-400">
                  Last updated: Replace with approved effective date before
                  final production launch.
                </p>
              </div>

              <div className="about-hero-profile relative hidden min-h-[34rem] overflow-hidden lg:block">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-55"
                  style={{ backgroundImage: `url(${heroImageUrl})` }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,6,23,0.22),rgba(2,6,23,0.94)_64%,rgba(8,47,73,0.86))]" />
                <div className="absolute inset-8 border border-cyan-200/15 bg-[linear-gradient(to_right,rgba(34,211,238,0.11)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[length:4.5rem_4.5rem]" />

                <div className="absolute left-8 top-8 max-w-[18rem] border border-white/15 bg-black/50 p-5 backdrop-blur">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">
                    Trust Layer
                  </p>
                  <p className="mt-3 text-2xl font-black uppercase leading-tight text-white">
                    Clear rules for responsible information handling.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Section>
      </section>

      {/* PRIVACY HIGHLIGHTS */}
      <Section className="about-command-section relative overflow-visible py-20 lg:py-28">
        <div aria-hidden className="about-angle-field">
          <div className="about-angle-plane about-angle-plane-a" />
          <div className="about-angle-plane about-angle-plane-b" />
          <div className="about-angle-plane about-angle-plane-c" />
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {privacyHighlights.map(({ title, body, icon: Icon }, index) => (
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

      {/* POLICY CONTENT */}
      <Section className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <Reveal>
            <div className="sticky top-28">
              <div aria-hidden className="about-title-rail" />
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                Policy Overview
              </p>

              <h2 className="mt-4 text-5xl font-black uppercase leading-none text-white sm:text-6xl">
                Clear rules for information handling.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-300">
                This page is intended to provide a clear public-facing privacy
                explanation for website visitors, prospective clients, and
                partners.
              </p>

              <div className="mt-8 border border-cyan-200/15 bg-cyan-200/[0.03] p-6">
                <div className="flex items-center gap-3">
                  <FileText className="text-cyan-300" size={22} />
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                    Legal Review Recommended
                  </p>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-300">
                  This language should be reviewed and approved by qualified
                  legal counsel before being used as the final production policy.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="space-y-5">
              {policySections.map((section, index) => (
                <article
                  key={section.title}
                  className="about-lead-card p-7"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-200/30 bg-cyan-200/[0.06] text-sm font-black text-cyan-200">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <h3 className="text-2xl font-black uppercase leading-tight text-white">
                        {section.title}
                      </h3>

                      <div className="mt-4 space-y-4 text-base leading-7 text-slate-300">
                        {section.body.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* CONTACT / RIGHTS */}
      <Section className="py-20 lg:py-28">
        <Reveal>
          <div className="about-lead-panel p-8 sm:p-12 lg:p-16">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
              <div>
                <Database className="text-cyan-200" size={30} />

                <p className="mt-5 text-xs uppercase tracking-[0.3em] text-cyan-300">
                  Privacy Questions
                </p>

                <h2 className="mt-3 text-5xl font-black uppercase leading-none text-white sm:text-6xl">
                  Questions about your information?
                </h2>

                <p className="mt-5 text-lg leading-8 text-slate-300">
                  For privacy-related questions, data handling concerns, or
                  requests related to information you submitted, contact the
                  firm directly.
                </p>
              </div>

              <div className="border border-white/10 bg-black/25 p-7">
                <div className="flex items-center gap-3">
                  <Mail className="text-cyan-300" size={22} />

                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
                    Contact
                  </p>
                </div>

                <p className="mt-5 text-xl font-bold text-white">
                  {email || "Use the contact page to reach the team."}
                </p>

                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-cyan-200 transition hover:text-white"
                >
                  Go to Contact Page
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

    </HomepageCinematicScene>
  );
}
