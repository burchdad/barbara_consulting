import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  ChevronDown,
  CircuitBoard,
  Cpu,
  Handshake,
  Network,
  Quote,
  Radar,
  ShieldCheck,
  Sparkles,
  Truck,
  Workflow,
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
  if (normalized.includes("engineering") || normalized.includes("technology")) {
    return <CircuitBoard size={18} />;
  }
  if (normalized.includes("mission") || normalized.includes("logistics")) {
    return <Truck size={18} />;
  }
  return <BriefcaseBusiness size={18} />;
}

function contractTags(contractType: string) {
  const normalized = contractType.toLowerCase();
  const tags = [normalized.includes("prime") ? "Prime" : "Sub"];
  if (normalized.includes("idiq")) tags.push("IDIQ");
  if (normalized.includes("bpa")) tags.push("BPA");
  if (normalized.includes("gwac")) tags.push("GWAC");
  return tags;
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
  const { settings, services, partners, contracts, cases, leadership, testimonials, jobs } = await getPublishedData();
  const servicesToRender = services.length ? services : fallbackServices;
  const partnersToRender = partners.length ? partners : fallbackPartners;
  const heroEyebrow = settings?.heroEyebrow ?? "AI Strategy • Federal Modernization • Intelligent Operations";
  const heroTrustBadge = settings?.heroTrustBadge ?? siteConfig.hero.trustBadge;

  return (
    <HomepageCinematicScene sceneSettings={{ type: "mesh", glow: "blue", particles: true, parallax: true }}>
      <section className="ai-hero relative isolate min-h-[92vh] overflow-hidden border-b border-cyan-300/15">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(34,211,238,0.22),transparent_34%),radial-gradient(circle_at_20%_70%,rgba(168,85,247,0.18),transparent_32%),linear-gradient(120deg,rgba(2,6,23,0.78),rgba(0,0,0,0.72))]" />
        <div className="ai-neural-field" />
        <Section className="relative z-10 grid min-h-[92vh] items-center gap-10 py-24 lg:grid-cols-[1.05fr_.95fr] lg:py-28">
          <Reveal>
            <div className="hero-parallax-group max-w-6xl">
              <div className="hero-hud-grid" />
              <p className="text-xs font-semibold uppercase tracking-[0.38em] text-cyan-300">{heroEyebrow}</p>
              <h1 className="mt-5 max-w-7xl text-6xl font-black uppercase leading-[0.86] text-white sm:text-7xl lg:text-8xl 2xl:text-[9.5rem]">
                {settings?.heroHeadline ?? siteConfig.hero.headline}
              </h1>
              <p className="mt-7 max-w-4xl text-lg leading-8 text-cyan-50/82 sm:text-xl">
                {settings?.heroSubheadline ?? siteConfig.hero.subtext}
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link href="/contact" className="premium-button rounded-full bg-cyan-300 px-7 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950 shadow-[0_0_40px_rgba(34,211,238,0.35)] transition hover:bg-white">Deploy AI Strategy</Link>
                <Link href="/case-studies" className="premium-button rounded-full border border-cyan-200/35 bg-white/5 px-7 py-4 text-sm font-black uppercase tracking-[0.18em] text-cyan-100 transition hover:border-cyan-200 hover:text-white">View Intelligence Layer</Link>
              </div>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-slate-950/60 px-4 py-2 text-xs uppercase tracking-[0.18em] text-cyan-100 backdrop-blur">
                <BadgeCheck size={14} className="text-cyan-300" /> {heroTrustBadge}
              </div>
              <div className="mt-12 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-cyan-100/60">
                <ChevronDown size={14} className="scroll-indicator text-cyan-300" /> Scroll through the operating layer
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="ai-orbital-console relative mx-auto aspect-square w-full max-w-[680px]">
              <div className="ai-orbit ai-orbit-one" />
              <div className="ai-orbit ai-orbit-two" />
              <div className="ai-core"><Cpu size={56} /><span>AI CORE</span></div>
              {["Strategy", "Automation", "Data", "Security", "Growth", "Ops"].map((label, index) => (
                <div key={label} className={`ai-node ai-node-${index + 1}`}>{label}</div>
              ))}
              <div className="ai-telemetry-panel left-0 top-[12%]"><Radar size={16} /> Live signal mapping<br /><strong>98.7%</strong> confidence</div>
              <div className="ai-telemetry-panel bottom-[10%] right-0"><Workflow size={16} /> Autonomous workflow<br /><strong>24/7</strong> orchestration</div>
            </div>
          </Reveal>
        </Section>
      </section>

      <Section className="py-10 lg:py-12">
        <Reveal staggerChildren>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
            {metrics.map((item, index) => (
              <Reveal key={item.label} delay={0.05 + index * 0.04}>
                <article className="kpi-card ai-glass-card group rounded-2xl border border-cyan-200/15 p-5 transition duration-300 hover:-translate-y-1 hover:scale-[1.015] hover:border-cyan-300/50">
                  <span className="kpi-sweep" />
                  <p className="text-[11px] uppercase tracking-[0.16em] text-cyan-100/60">{item.label}</p>
                  <p className="mt-3 text-4xl font-black tracking-tight text-white"><AnimatedCounter value={item.value} prefix={item.prefix} suffix={item.suffix} /></p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-cyan-100/40">{item.meta}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section className="ai-wide-panel grid gap-10 py-16 lg:grid-cols-[.8fr_1.2fr] lg:py-20">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">AI Operating Ecosystem</p>
          <h2 className="mt-3 text-5xl font-black uppercase leading-[0.92] sm:text-6xl">Strategy, automation, and mission intelligence in one operating layer.</h2>
          <p className="mt-5 max-w-2xl text-lg text-zinc-300">{siteConfig.globalImpact.body}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {siteConfig.globalImpact.stats.map(({ label, value }) => <div key={label} className="ai-glass-card rounded-2xl border border-cyan-200/15 p-4"><p className="text-3xl font-black text-white">{value}</p><p className="text-xs uppercase tracking-[0.14em] text-cyan-100/55">{label}</p></div>)}
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="ai-network-map min-h-[430px] rounded-[2rem] border border-cyan-200/15 bg-slate-950/55 p-6">
            <div className="network-grid" />
            {servicesToRender.slice(0, 6).map((service, index) => <div key={service.id} className={`network-chip chip-${index + 1}`}><Network size={14} />{service.title}</div>)}
          </div>
        </Reveal>
      </Section>

      <Section className="relative py-16 lg:py-20">
        <div className="absolute inset-0 rounded-[2rem] border border-cyan-200/10 bg-[linear-gradient(120deg,rgba(34,211,238,0.08),rgba(168,85,247,0.06),transparent_65%)]" />
        <Reveal>
          <p className="relative text-xs uppercase tracking-[0.25em] text-cyan-300">{siteConfig.whoWeAre.eyebrow}</p>
          <h2 className="relative mt-3 max-w-7xl text-5xl font-black uppercase leading-[0.95] sm:text-6xl lg:text-7xl">{siteConfig.whoWeAre.headline}</h2>
          <p className="relative mt-6 max-w-5xl text-lg text-zinc-300">{siteConfig.whoWeAre.body}</p>
          <Link href="/about" className="relative mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-cyan-300 hover:text-white">{siteConfig.whoWeAre.linkLabel} <ArrowRight size={16} /></Link>
        </Reveal>
      </Section>

      <Section className="section-divider py-16 lg:py-20">
        <Reveal>
          <h2 className="text-5xl font-black uppercase sm:text-6xl">Company Growth Timeline</h2>
          <div className="timeline-rail relative mt-10 hidden grid-cols-5 gap-5 lg:grid">
            {timeline.map((item, index) => <Reveal key={item.year} delay={0.08 + index * 0.07}><article className="timeline-card ai-glass-card group relative rounded-2xl border border-cyan-200/15 p-6"><div className="timeline-marker" /><p className="text-sm font-bold tracking-[0.08em] text-cyan-300">{item.year}</p><h3 className="mt-2 text-2xl font-bold uppercase">{item.title}</h3><p className="mt-3 text-sm text-zinc-300">{item.detail}</p></article></Reveal>)}
          </div>
          <div className="mt-5 space-y-3 lg:hidden">{timeline.map((item, index) => <Reveal key={item.year} delay={0.04 + index * 0.05}><article className="timeline-card ai-glass-card rounded-xl border border-cyan-200/15 p-4"><p className="text-sm font-bold text-cyan-300">{item.year}</p><h3 className="mt-1 text-lg font-bold uppercase">{item.title}</h3><p className="mt-2 text-sm text-zinc-300">{item.detail}</p></article></Reveal>)}</div>
        </Reveal>
      </Section>

      <Section id="services" className="ai-wide-panel py-16 lg:py-20">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[.65fr_1.35fr]"><div><p className="text-xs uppercase tracking-[0.24em] text-cyan-300">AI Capability Matrix</p><h2 className="mt-3 text-5xl font-black uppercase leading-none sm:text-6xl">Core Services</h2><p className="mt-4 text-zinc-300">Every capability is positioned as part of a connected intelligence architecture, not an isolated service page.</p></div><div className="grid gap-4 lg:grid-cols-2">{servicesToRender.map((service, index) => <Reveal key={service.id} delay={0.05 + index * 0.04}><article className="service-module ai-glass-card group relative min-h-[260px] rounded-2xl border border-cyan-200/15 p-6"><div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-black/40 px-3 py-1 text-xs text-cyan-100">{categoryIcon(service.category)}{service.category}</div><h3 className="mt-5 text-3xl font-black uppercase leading-tight">{service.title}</h3><p className="mt-3 text-sm text-zinc-300">{service.description}</p><ul className="mt-4 grid gap-2 text-xs text-zinc-300">{(service.bulletItems as string[]).slice(0, 3).map((item) => <li key={item} className="service-capability rounded-md border border-cyan-200/10 bg-black/30 px-3 py-2">{item}</li>)}</ul></article></Reveal>)}</div></div>
        </Reveal>
      </Section>

      <Section className="py-16 lg:py-20"><Reveal><div className="flex items-end justify-between gap-4"><h2 className="text-5xl font-black uppercase sm:text-6xl">Leadership Preview</h2><Link href="/about" className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300 hover:text-white">Meet Leadership</Link></div><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{leadership.slice(0, 4).map((leader, index) => <Reveal key={leader.id} delay={0.06 + index * 0.05}><article className="leadership-card group overflow-hidden rounded-2xl border border-cyan-200/15 bg-white/[0.02] transition hover:border-cyan-300/50"><div className="h-72 bg-cover bg-center grayscale transition duration-500 group-hover:scale-[1.04] group-hover:grayscale-0" style={{ backgroundImage: `url(${leader.photoUrl || "https://images.unsplash.com/photo-1521119989659-a83eee488004"})` }} /><div className="leadership-panel p-5"><p className="text-2xl font-bold uppercase text-white">{leader.name}</p><p className="text-sm text-cyan-100/60">{leader.title}</p><p className="mt-2 text-sm text-zinc-300 transition group-hover:text-white">{leader.shortBio}</p></div></article></Reveal>)}</div></Reveal></Section>

      <Section className="py-16 lg:py-20"><Reveal><p className="text-xs uppercase tracking-[0.22em] text-cyan-300">AI Execution Ecosystem</p><h2 className="mt-2 text-5xl font-black uppercase sm:text-6xl">Mission and AI Partners</h2><p className="mt-2 max-w-3xl text-sm text-zinc-300">Alliance-backed delivery network supporting AI modernization, sustainment, and mission continuity.</p><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{partnersToRender.map((partner, index) => <Reveal key={partner.id} delay={0.04 + index * 0.04}><a href={partner.websiteUrl || "#"} className="partner-card ai-glass-card group flex h-28 items-center justify-center rounded-2xl border border-cyan-200/15 p-4 text-sm text-zinc-300 transition hover:border-cyan-300/50">{partner.logoUrl ? <img src={partner.logoUrl} alt={partner.name} className="h-10 w-auto grayscale brightness-75 transition group-hover:grayscale-0 group-hover:brightness-100" /> : <span className="uppercase tracking-[0.08em] text-zinc-400 transition group-hover:text-zinc-200">{partner.name}</span>}</a></Reveal>)}</div></Reveal></Section>

      <Section className="py-16 lg:py-20"><Reveal><div className="grid gap-5 lg:grid-cols-2"><div><div className="flex items-end justify-between gap-4"><h2 className="text-5xl font-black uppercase">Contract Vehicles</h2><Link href="/contracts" className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300 hover:text-white">View All</Link></div><div className="mt-8 grid gap-4">{contracts.slice(0, 3).map((contract, index) => <Reveal key={contract.id} delay={0.06 + index * 0.05}><article className="contract-card ai-glass-card rounded-2xl border border-cyan-200/15 p-5"><div className="flex flex-wrap gap-2">{contractTags(contract.contractType).map((tag) => <span key={tag} className="rounded-full border border-cyan-200/15 bg-black/35 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-100/70">{tag}</span>)}</div><h3 className="mt-4 text-xl font-bold uppercase">{contract.name}</h3><p className="mt-1 text-sm text-zinc-300">{contract.agency}</p><p className="mt-4 text-sm text-zinc-300">{contract.summary}</p></article></Reveal>)}</div></div><div><div className="flex items-end justify-between gap-4"><h2 className="text-5xl font-black uppercase">Case Studies</h2><Link href="/case-studies" className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300 hover:text-white">Explore</Link></div><div className="mt-8 grid gap-4">{cases.slice(0, 3).map((study, index) => <Reveal key={study.id} delay={0.06 + index * 0.05}><article className="case-card ai-glass-card group rounded-2xl border border-cyan-200/15 p-5 transition hover:-translate-y-1 hover:scale-[1.015] hover:border-cyan-300/40"><div className="mb-3 flex items-center justify-between gap-2"><span className="rounded-full border border-cyan-200/15 bg-black/35 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-zinc-300">Outcome</span><span className="text-[10px] uppercase tracking-[0.14em] text-cyan-300">{caseOutcomeBadge(study)}</span></div><h3 className="text-xl font-bold uppercase">{study.title}</h3><p className="mt-3 text-sm text-zinc-300">{study.summary}</p><Link href={`/case-studies/${study.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition group-hover:text-white">Read Case <ArrowRight size={14} /></Link></article></Reveal>)}</div></div></div></Reveal></Section>

      <Section className="py-16 lg:py-20"><Reveal><div className="flex items-center gap-3 text-zinc-300"><ShieldCheck size={18} className="text-cyan-300" /><p className="text-xs uppercase tracking-[0.24em]">Trust and Performance</p></div><h2 className="mt-2 text-5xl font-black uppercase sm:text-6xl">Client Perspectives</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{testimonials.map((item, index) => <Reveal key={item.id} delay={0.05 + index * 0.05}><article className="testimonial-card ai-glass-card rounded-2xl border border-cyan-200/15 p-6"><Quote size={18} className="text-cyan-300" /><p className="mt-2 text-zinc-100">“{item.quote}”</p><p className="mt-4 text-sm font-semibold text-cyan-300">{item.authorName}</p><p className="text-xs text-zinc-400">{item.authorTitle} • {item.organization}</p></article></Reveal>)}</div></Reveal></Section>

      <Section className="py-16 lg:py-20"><Reveal><div className="ai-final-cta rounded-[2rem] border border-cyan-200/20 p-10 text-center sm:p-16"><Sparkles className="mx-auto text-cyan-300" size={28} /><p className="mt-4 text-xs uppercase tracking-[0.28em] text-cyan-200">Start the Conversation</p><h2 className="mx-auto mt-4 max-w-5xl text-5xl font-black uppercase leading-[0.92] sm:text-7xl">Let&apos;s Build the Future Together</h2><p className="mx-auto mt-5 max-w-3xl text-lg text-zinc-200">Partner with a delivery organization designed for AI modernization, enterprise rigor, and measurable mission outcomes.</p><Link href="/contact" className="premium-button mt-8 inline-flex rounded-full bg-cyan-300 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-white">Contact Our Team</Link></div></Reveal></Section>
    </HomepageCinematicScene>
  );
}
