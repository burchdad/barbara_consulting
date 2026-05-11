import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CircuitBoard,
  Landmark,
  Network,
  Quote,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { AnimatedCounter } from "@/components/public/animated-counter";
import { Reveal } from "@/components/public/reveal";
import { HomepageCinematicScene } from "@/components/public/homepage-cinematic-scene";
import { getPublishedData } from "@/lib/site-data";
import { siteConfig } from "@/lib/config/site";
import { timeline } from "@/lib/data/timeline";
import { metrics } from "@/lib/data/metrics";
import { fallbackServices } from "@/lib/data/services";
import { fallbackPartners } from "@/lib/data/partners";

function categoryIcon(category: string) {
  const normalized = category.toLowerCase();
  if (normalized.includes("engineering") || normalized.includes("technology")) return <CircuitBoard size={18} />;
  if (normalized.includes("mission") || normalized.includes("logistics")) return <Truck size={18} />;
  return <BriefcaseBusiness size={18} />;
}

function caseOutcomeBadge(study: { metrics: unknown; results: string }) {
  if (study.metrics && typeof study.metrics === "object" && !Array.isArray(study.metrics)) {
    const [firstKey] = Object.keys(study.metrics as Record<string, unknown>);
    if (firstKey) return firstKey;
  }
  const trimmed = study.results.split(".")[0]?.trim();
  return trimmed.length > 48 ? "Documented Outcomes" : trimmed || "Documented Outcomes";
}

export default async function HomePage() {
  const { settings, services, partners, contracts, cases, leadership, testimonials } = await getPublishedData();
  const servicesToRender = services.length ? services : fallbackServices;
  const partnersToRender = partners.length ? partners : fallbackPartners;
  const heroHeadline = "We help create intelligent systems";

  return (
    <HomepageCinematicScene sceneSettings={{ type: "mesh", glow: "blue", particles: true, parallax: true }}>
      <section className="relative isolate min-h-screen overflow-hidden border-b border-white/10">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata">
          <source src="/greyaivideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.96)_0%,rgba(2,6,23,0.80)_44%,rgba(2,6,23,0.46)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(34,211,238,0.20),transparent_30%),radial-gradient(circle_at_18%_78%,rgba(168,85,247,0.16),transparent_28%)]" />
        <Section className="relative z-10 flex min-h-screen items-end pb-16 pt-36 lg:pb-24">
          <Reveal>
            <div className="max-w-6xl">
              <img src="/greylogo.png" alt="Gray Matters Technology - Sage Tech Solutions" className="mb-10 h-auto w-[220px] sm:w-[300px] lg:w-[420px]" />
              <h1 className="max-w-7xl text-6xl font-black uppercase leading-[0.88] text-white sm:text-7xl lg:text-8xl 2xl:text-[9rem]">{heroHeadline}</h1>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/contact" className="premium-button rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-cyan-200">Start a Strategic Conversation</Link>
                <Link href="/case-studies" className="premium-button rounded-full border border-white/35 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white backdrop-blur transition hover:border-cyan-200 hover:text-cyan-100">Explore Capabilities</Link>
              </div>
            </div>
          </Reveal>
        </Section>
      </section>

      <Section className="py-8 lg:py-10"><Reveal staggerChildren><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">{metrics.map((item, index) => <Reveal key={item.label} delay={0.04 + index * 0.03}><article className="ai-glass-card rounded-2xl border border-white/10 p-5"><p className="text-[11px] uppercase tracking-[0.16em] text-cyan-100/60">{item.label}</p><p className="mt-3 text-4xl font-black text-white"><AnimatedCounter value={item.value} prefix={item.prefix} suffix={item.suffix} /></p><p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-slate-500">{item.meta}</p></article></Reveal>)}</div></Reveal></Section>

      <Section className="grid gap-12 py-20 lg:grid-cols-[.8fr_1.2fr] lg:py-28">
        <Reveal><p className="text-xs uppercase tracking-[0.32em] text-cyan-300">Premium AI Strategy</p><h2 className="mt-4 text-5xl font-black uppercase leading-[0.95] sm:text-6xl">Where government experience meets intelligent modernization.</h2></Reveal>
        <Reveal delay={0.05}><div className="grid gap-5 text-lg leading-8 text-slate-300"><p>Gray Matters Technology Services supports public-sector leaders who need more than technology implementation. They need strategy, governance, acquisition fluency, and practical AI execution that protects mission continuity.</p><p>The experience should feel elevated, confident, and future-facing while still credible for federal and state government buyers.</p><div className="mt-4 grid gap-3 sm:grid-cols-3"><span className="rounded-full border border-cyan-200/20 px-4 py-3 text-center text-xs uppercase tracking-[0.16em] text-cyan-100">AI Readiness</span><span className="rounded-full border border-cyan-200/20 px-4 py-3 text-center text-xs uppercase tracking-[0.16em] text-cyan-100">Procurement Insight</span><span className="rounded-full border border-cyan-200/20 px-4 py-3 text-center text-xs uppercase tracking-[0.16em] text-cyan-100">Mission ROI</span></div></div></Reveal>
      </Section>

      <Section id="services" className="py-20 lg:py-28">
        <Reveal><div className="mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Capabilities</p><h2 className="mt-3 text-5xl font-black uppercase sm:text-7xl">Designed for Modern Government.</h2></div><p className="max-w-xl text-slate-300">Elegant on the surface. Deeply operational underneath. Every capability is framed around measurable modernization outcomes.</p></div></Reveal>
        <div className="grid gap-5 lg:grid-cols-3">{servicesToRender.slice(0, 6).map((service, index) => <Reveal key={service.id} delay={0.05 + index * 0.04}><article className="group min-h-[360px] rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] p-7 backdrop-blur transition hover:-translate-y-2 hover:border-cyan-200/40"><div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 px-3 py-1 text-xs text-cyan-100">{categoryIcon(service.category)}{service.category}</div><h3 className="mt-8 text-3xl font-black uppercase leading-tight text-white">{service.title}</h3><p className="mt-4 text-sm leading-6 text-slate-300">{service.description}</p><div className="mt-8 h-px bg-gradient-to-r from-cyan-300/40 to-transparent" /><p className="mt-4 text-xs uppercase tracking-[0.18em] text-cyan-200">Strategic capability 0{index + 1}</p></article></Reveal>)}</div>
      </Section>

      <Section className="py-20 lg:py-28"><Reveal><div className="rounded-[2.5rem] border border-white/10 bg-[linear-gradient(120deg,rgba(15,23,42,0.92),rgba(2,6,23,0.76)),url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=2200&q=80')] bg-cover bg-center p-8 sm:p-14 lg:p-20"><div className="max-w-4xl"><p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Management Team</p><h2 className="mt-4 text-5xl font-black uppercase leading-[0.95] sm:text-7xl">Leadership with public-sector depth and AI-forward vision.</h2><Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-cyan-200 hover:text-white">Meet Leadership <ArrowRight size={16} /></Link></div></div></Reveal><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{leadership.slice(0, 4).map((leader, index) => <Reveal key={leader.id} delay={0.05 + index * 0.04}><article className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.035]"><div className="h-72 bg-cover bg-center grayscale transition duration-500 hover:grayscale-0" style={{ backgroundImage: `url(${leader.photoUrl || "https://images.unsplash.com/photo-1521119989659-a83eee488004"})` }} /><div className="p-5"><p className="text-xl font-bold uppercase text-white">{leader.name}</p><p className="text-sm text-cyan-100/60">{leader.title}</p><p className="mt-3 text-sm leading-6 text-slate-300">{leader.shortBio}</p></div></article></Reveal>)}</div></Section>

      <Section className="py-20 lg:py-28"><Reveal><div className="grid gap-8 lg:grid-cols-2"><div><p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Growth Timeline</p><h2 className="mt-3 text-5xl font-black uppercase sm:text-6xl">Built for the next era of government technology.</h2></div><div className="space-y-4">{timeline.map((item) => <article key={item.year} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"><p className="text-sm font-bold text-cyan-200">{item.year}</p><h3 className="mt-1 text-2xl font-bold uppercase text-white">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</p></article>)}</div></div></Reveal></Section>

      <Section className="py-20 lg:py-28"><Reveal><div className="grid gap-5 lg:grid-cols-2"><div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8"><Landmark className="text-cyan-200" /><h2 className="mt-5 text-5xl font-black uppercase">Contract Vehicles</h2><div className="mt-8 space-y-4">{contracts.slice(0, 3).map((contract) => <div key={contract.id} className="border-t border-white/10 pt-4"><h3 className="text-xl font-bold uppercase text-white">{contract.name}</h3><p className="text-sm text-slate-300">{contract.agency}</p></div>)}</div><Link href="/contracts" className="mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-cyan-200">View Contracts <ArrowRight size={14} /></Link></div><div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8"><Network className="text-cyan-200" /><h2 className="mt-5 text-5xl font-black uppercase">Case Studies</h2><div className="mt-8 space-y-4">{cases.slice(0, 3).map((study) => <div key={study.id} className="border-t border-white/10 pt-4"><p className="text-xs uppercase tracking-[0.14em] text-cyan-200">{caseOutcomeBadge(study)}</p><h3 className="mt-1 text-xl font-bold uppercase text-white">{study.title}</h3><p className="mt-2 text-sm text-slate-300">{study.summary}</p></div>)}</div><Link href="/case-studies" className="mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-cyan-200">Explore Results <ArrowRight size={14} /></Link></div></div></Reveal></Section>

      <Section className="py-20 lg:py-28"><Reveal><p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Trusted Ecosystem</p><h2 className="mt-3 text-5xl font-black uppercase sm:text-6xl">Mission and AI Partners</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{partnersToRender.map((partner, index) => <Reveal key={partner.id} delay={0.04 + index * 0.04}><a href={partner.websiteUrl || "#"} className="flex h-28 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyan-200/40">{partner.logoUrl ? <img src={partner.logoUrl} alt={partner.name} className="h-10 w-auto grayscale brightness-75 transition hover:grayscale-0 hover:brightness-100" /> : <span className="uppercase tracking-[0.1em] text-slate-300">{partner.name}</span>}</a></Reveal>)}</div></Reveal></Section>

      <Section className="py-20 lg:py-28"><Reveal><div className="flex items-center gap-3 text-slate-300"><ShieldCheck size={18} className="text-cyan-300" /><p className="text-xs uppercase tracking-[0.24em]">Trust and Performance</p></div><h2 className="mt-3 text-5xl font-black uppercase sm:text-6xl">Client Perspectives</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{testimonials.map((item, index) => <Reveal key={item.id} delay={0.05 + index * 0.05}><article className="rounded-2xl border border-white/10 bg-white/[0.035] p-7"><Quote size={18} className="text-cyan-300" /><p className="mt-4 text-lg leading-7 text-white">“{item.quote}”</p><p className="mt-6 text-sm font-semibold text-cyan-200">{item.authorName}</p><p className="text-xs text-slate-400">{item.authorTitle} • {item.organization}</p></article></Reveal>)}</div></Reveal></Section>

      <Section className="py-20 lg:py-28"><Reveal><div className="rounded-[2.5rem] border border-cyan-200/20 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.18),transparent_36%),linear-gradient(135deg,rgba(15,23,42,0.92),rgba(2,6,23,0.92))] p-10 text-center sm:p-16"><Sparkles className="mx-auto text-cyan-300" size={28} /><p className="mt-4 text-xs uppercase tracking-[0.28em] text-cyan-200">Start the Conversation</p><h2 className="mx-auto mt-4 max-w-5xl text-5xl font-black uppercase leading-[0.92] sm:text-7xl">Modernize with clarity, intelligence, and confidence.</h2><p className="mx-auto mt-5 max-w-3xl text-lg text-slate-200">Partner with a government technology firm designed for AI strategy, mission continuity, and measurable cost-saving innovation.</p><Link href="/contact" className="premium-button mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-cyan-200">Contact Our Team</Link></div></Reveal></Section>
    </HomepageCinematicScene>
  );
}
