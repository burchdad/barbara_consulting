import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CircuitBoard,
  CloudCog,
  DatabaseZap,
  Landmark,
  Layers3,
  Quote,
  ShieldCheck,
  Sparkles,
  Truck,
  UsersRound,
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

const audienceSegments = [
  { title: "Federal Agencies", body: "AI modernization, acquisition support, and secure operational transformation for complex mission environments.", icon: Landmark },
  { title: "State & Local Government", body: "Practical automation, analytics, and digital service improvements designed for measurable public-sector outcomes.", icon: UsersRound },
  { title: "Mission Partners", body: "Strategy, governance, and technical delivery support for organizations serving high-consequence programs.", icon: ShieldCheck },
  { title: "Technology Teams", body: "Architecture guidance, workflow intelligence, and implementation pathways for teams building smarter systems.", icon: CircuitBoard },
];

const modernizationSteps = [
  { step: "01", title: "Discover", body: "Assess mission goals, current systems, procurement constraints, and modernization opportunities." },
  { step: "02", title: "Design", body: "Map an AI-ready strategy across governance, data, security, workflow, and measurable outcomes." },
  { step: "03", title: "Deploy", body: "Implement intelligent systems, automations, dashboards, and secure operating workflows." },
  { step: "04", title: "Optimize", body: "Measure performance, refine adoption, and continuously improve operational efficiency." },
];

const capabilityMatrix = [
  { title: "AI Strategy & Governance", icon: Sparkles },
  { title: "Secure Workflow Automation", icon: Workflow },
  { title: "Cloud & System Modernization", icon: CloudCog },
  { title: "Data Intelligence & Analytics", icon: DatabaseZap },
  { title: "Compliance Readiness", icon: ShieldCheck },
  { title: "Program & Acquisition Support", icon: Layers3 },
];

function categoryIcon(category: string) {
  const normalized = category.toLowerCase();
  if (normalized.includes("engineering") || normalized.includes("technology")) return <CircuitBoard size={18} />;
  if (normalized.includes("mission") || normalized.includes("logistics")) return <Truck size={18} />;
  return <BriefcaseBusiness size={18} />;
}

export default async function HomePage() {
  const { settings, services, partners, contracts, leadership, testimonials } = await getPublishedData();
  const servicesToRender = services.length ? services : fallbackServices;
  const partnersToRender = partners.length ? partners : fallbackPartners;
  const heroHeadline = "We help create intelligent systems";

  return (
    <HomepageCinematicScene sceneSettings={{ type: "mesh", glow: "blue", particles: true, parallax: true }}>
      <section className="relative isolate min-h-screen overflow-hidden">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata">
          <source src="/greyaivideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.96)_0%,rgba(2,6,23,0.80)_44%,rgba(2,6,23,0.46)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(34,211,238,0.20),transparent_30%),radial-gradient(circle_at_18%_78%,rgba(168,85,247,0.16),transparent_28%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent via-slate-950/70 to-slate-950" />
        <Section className="relative z-10 flex min-h-screen items-end pb-24 pt-36 lg:pb-32">
          <Reveal>
            <div className="max-w-6xl">
              <img src="/greylogo.png" alt="Gray Matters Technology - Sage Tech Solutions" className="mb-10 h-auto w-[220px] sm:w-[300px] lg:w-[420px]" />
              <h1 className="max-w-7xl text-6xl font-black uppercase leading-[0.88] text-white sm:text-7xl lg:text-8xl 2xl:text-[9rem]">{heroHeadline}</h1>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/contact" className="premium-button rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-cyan-200">Start a Strategic Conversation</Link>
                <Link href="/services" className="premium-button rounded-full border border-white/35 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white backdrop-blur transition hover:border-cyan-200 hover:text-cyan-100">Explore Capabilities</Link>
              </div>
            </div>
          </Reveal>
        </Section>
      </section>

      <Section className="-mt-24 pb-10 pt-0 lg:-mt-28 lg:pb-14">
        <Reveal staggerChildren>
          <div className="relative z-20 grid gap-3 border-y border-cyan-200/10 bg-slate-950/35 py-5 backdrop-blur-md sm:grid-cols-2 xl:grid-cols-6">
            {metrics.map((item, index) => <Reveal key={item.label} delay={0.04 + index * 0.03}><article className="px-5 py-4"><p className="text-[11px] uppercase tracking-[0.16em] text-cyan-100/60">{item.label}</p><p className="mt-3 text-4xl font-black text-white"><AnimatedCounter value={item.value} prefix={item.prefix} suffix={item.suffix} /></p><p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-slate-500">{item.meta}</p></article></Reveal>)}
          </div>
        </Reveal>
      </Section>

      <Section className="grid gap-12 pt-10 lg:grid-cols-[.8fr_1.2fr] lg:pt-14 lg:pb-28">
        <Reveal><p className="text-xs uppercase tracking-[0.32em] text-cyan-300">AI-Native Public Sector Innovation</p><h2 className="mt-4 text-5xl font-black uppercase leading-[0.95] sm:text-6xl">Where government experience meets intelligent modernization.</h2></Reveal>
        <Reveal delay={0.05}><div className="grid gap-5 text-lg leading-8 text-slate-300"><p>Gray Matters Technology Services helps agencies and mission-driven organizations design intelligent systems that improve decisions, reduce operational friction, and modernize high-value workflows.</p><p>The experience is intentionally structured, scannable, and procurement-friendly while still feeling like a modern AI technology firm.</p><div className="mt-4 grid gap-3 sm:grid-cols-3"><span className="rounded-full border border-cyan-200/20 px-4 py-3 text-center text-xs uppercase tracking-[0.16em] text-cyan-100">AI Readiness</span><span className="rounded-full border border-cyan-200/20 px-4 py-3 text-center text-xs uppercase tracking-[0.16em] text-cyan-100">Secure Automation</span><span className="rounded-full border border-cyan-200/20 px-4 py-3 text-center text-xs uppercase tracking-[0.16em] text-cyan-100">Mission ROI</span></div></div></Reveal>
      </Section>

      <Section className="py-20 lg:py-28"><Reveal><div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Who We Serve</p><h2 className="mt-3 text-5xl font-black uppercase sm:text-7xl">Built for complex organizations.</h2></div><p className="max-w-xl text-slate-300">Clear audience pathways help government and enterprise buyers quickly understand where Gray Matters fits.</p></div></Reveal><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{audienceSegments.map(({ title, body, icon: Icon }, index) => <Reveal key={title} delay={0.05 + index * 0.04}><article className="group min-h-[280px] rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 transition hover:-translate-y-2 hover:border-cyan-200/40 hover:bg-white/[0.055]"><Icon className="text-cyan-200" size={24} /><h3 className="mt-10 text-2xl font-black uppercase leading-tight text-white">{title}</h3><p className="mt-4 text-sm leading-6 text-slate-300">{body}</p></article></Reveal>)}</div></Section>

      <Section className="py-20 lg:py-28"><Reveal><div className="rounded-[2.5rem] border border-cyan-200/15 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.14),transparent_30%),linear-gradient(135deg,rgba(15,23,42,0.76),rgba(2,6,23,0.9))] p-8 sm:p-12 lg:p-16"><div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><p className="text-xs uppercase tracking-[0.3em] text-cyan-300">AI Capability Matrix</p><h2 className="mt-3 text-5xl font-black uppercase leading-none text-white sm:text-6xl">Systems, data, security, and workflow intelligence.</h2><p className="mt-5 text-slate-300">A tighter enterprise matrix makes the firm easier to scan while reinforcing that this is an AI technology partner, not a generic consulting brochure.</p></div><div className="grid gap-4 sm:grid-cols-2">{capabilityMatrix.map(({ title, icon: Icon }, index) => <Reveal key={title} delay={0.04 + index * 0.03}><article className="flex min-h-[120px] items-center gap-4 rounded-2xl border border-white/10 bg-black/25 p-5 transition hover:border-cyan-200/40 hover:bg-cyan-200/[0.04]"><Icon className="shrink-0 text-cyan-200" size={22} /><h3 className="text-lg font-black uppercase leading-tight text-white">{title}</h3></article></Reveal>)}</div></div></div></Reveal></Section>

      <Section id="services" className="py-20 lg:py-28">
        <Reveal><div className="mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Core Services</p><h2 className="mt-3 text-5xl font-black uppercase sm:text-7xl">Designed for modern government.</h2></div><p className="max-w-xl text-slate-300">Disciplined service cards, consistent sizing, and restrained motion create a more federal-ready enterprise interface.</p></div></Reveal>
        <div className="grid gap-5 lg:grid-cols-3">{servicesToRender.slice(0, 6).map((service, index) => <Reveal key={service.id} delay={0.05 + index * 0.04}><article className="group flex min-h-[360px] flex-col rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] p-7 backdrop-blur transition hover:-translate-y-2 hover:border-cyan-200/40"><div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-200/20 px-3 py-1 text-xs text-cyan-100">{categoryIcon(service.category)}{service.category}</div><h3 className="mt-8 text-3xl font-black uppercase leading-tight text-white">{service.title}</h3><p className="mt-4 text-sm leading-6 text-slate-300">{service.description}</p><div className="mt-auto pt-8"><div className="h-px bg-gradient-to-r from-cyan-300/40 to-transparent" /><p className="mt-4 text-xs uppercase tracking-[0.18em] text-cyan-200">Strategic capability 0{index + 1}</p></div></article></Reveal>)}</div>
      </Section>

      <Section className="py-20 lg:py-28"><Reveal><div className="rounded-[2.5rem] border border-white/10 bg-[linear-gradient(120deg,rgba(15,23,42,0.92),rgba(2,6,23,0.76)),url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=2200&q=80')] bg-cover bg-center p-8 sm:p-14 lg:p-20"><div className="max-w-4xl"><p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Management Team</p><h2 className="mt-4 text-5xl font-black uppercase leading-[0.95] sm:text-7xl">Leadership with public-sector depth and AI-forward vision.</h2><Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-cyan-200 hover:text-white">Meet Leadership <ArrowRight size={16} /></Link></div></div></Reveal><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{leadership.slice(0, 4).map((leader, index) => <Reveal key={leader.id} delay={0.05 + index * 0.04}><article className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.035]"><div className="h-72 bg-cover bg-center grayscale transition duration-500 hover:grayscale-0" style={{ backgroundImage: `url(${leader.photoUrl || "https://images.unsplash.com/photo-1521119989659-a83eee488004"})` }} /><div className="p-5"><p className="text-xl font-bold uppercase text-white">{leader.name}</p><p className="text-sm text-cyan-100/60">{leader.title}</p><p className="mt-3 text-sm leading-6 text-slate-300">{leader.shortBio}</p></div></article></Reveal>)}</div></Section>

      <Section className="py-20 lg:py-28"><Reveal><div className="grid gap-5 lg:grid-cols-4">{modernizationSteps.map((item, index) => <article key={item.step} className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7"><p className="text-5xl font-black text-cyan-300/30">{item.step}</p><h3 className="mt-6 text-2xl font-black uppercase text-white">{item.title}</h3><p className="mt-4 text-sm leading-6 text-slate-300">{item.body}</p></article>)}</div></Reveal></Section>

      <Section className="relative overflow-hidden py-24 lg:py-32"><div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.12),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0.25),rgba(0,0,0,0.72))]" /><Reveal><div className="relative mx-auto max-w-7xl"><p className="text-xs uppercase tracking-[0.38em] text-cyan-300">Company History</p><h2 className="mt-4 text-5xl font-black uppercase leading-none text-white sm:text-7xl">Growth Timeline</h2><div className="mt-14 hidden lg:block"><div className="relative h-px bg-white/15"><div className="absolute left-0 top-0 h-px w-1/2 bg-gradient-to-r from-cyan-300/70 to-transparent" />{timeline.map((item, index) => <div key={item.year} className="absolute top-1/2 -translate-y-1/2" style={{ left: `${(index / Math.max(timeline.length - 1, 1)) * 100}%` }}><div className="h-4 w-4 rounded-full border border-cyan-200/60 bg-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.45)]" /><p className="mt-4 -translate-x-1/3 text-sm font-bold tracking-[0.18em] text-slate-400">{item.year}</p></div>)}</div></div><div className="mt-20 grid gap-12 lg:grid-cols-[.38fr_.62fr] lg:items-center"><div><p className="text-[8rem] font-black leading-none tracking-tight text-cyan-300/12 sm:text-[11rem] lg:text-[13rem]">{timeline[2]?.year ?? timeline[0]?.year}</p><h3 className="-mt-10 text-4xl font-black uppercase leading-tight text-white sm:text-5xl">{timeline[2]?.title ?? timeline[0]?.title}</h3><div className="mt-8 h-px w-full bg-gradient-to-r from-cyan-300/70 to-transparent" /></div><div><p className="max-w-3xl text-2xl leading-10 text-slate-200">{timeline[2]?.detail ?? timeline[0]?.detail}</p><div className="mt-8 flex gap-4"><span className="rounded-full border border-white/15 px-6 py-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-300">AI-ready evolution</span><span className="ml-auto text-sm tracking-[0.2em] text-slate-500">03 / 06</span></div></div></div></div></Reveal></Section>

      <Section className="py-20 lg:py-28"><Reveal><div className="rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-8 sm:p-12 lg:p-16"><div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-center"><div><Landmark className="text-cyan-200" /><p className="mt-5 text-xs uppercase tracking-[0.28em] text-cyan-300">Procurement Pathways</p><h2 className="mt-3 text-5xl font-black uppercase leading-none text-white sm:text-6xl">Contract Vehicles</h2><p className="mt-5 text-slate-300">For agencies and partners who need a clear acquisition route, contract vehicle details belong one level deeper where procurement teams can review the full record.</p><Link href="/contracts" className="mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-cyan-200">View Contract Vehicles <ArrowRight size={14} /></Link></div><div className="grid gap-4 sm:grid-cols-3">{contracts.slice(0, 3).map((contract) => <article key={contract.id} className="rounded-2xl border border-white/10 bg-black/25 p-5"><h3 className="text-lg font-bold uppercase text-white">{contract.name}</h3><p className="mt-2 text-sm text-slate-400">{contract.agency}</p></article>)}</div></div></div></Reveal></Section>

      <Section className="py-20 lg:py-28"><Reveal><p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Trusted Ecosystem</p><h2 className="mt-3 text-5xl font-black uppercase sm:text-6xl">Mission and AI Partners</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{partnersToRender.map((partner, index) => <Reveal key={partner.id} delay={0.04 + index * 0.04}><a href={partner.websiteUrl || "#"} className="flex h-28 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyan-200/40">{partner.logoUrl ? <img src={partner.logoUrl} alt={partner.name} className="h-10 w-auto grayscale brightness-75 transition hover:grayscale-0 hover:brightness-100" /> : <span className="uppercase tracking-[0.1em] text-slate-300">{partner.name}</span>}</a></Reveal>)}</div></Reveal></Section>

      <Section className="py-20 lg:py-28"><Reveal><div className="flex items-center gap-3 text-slate-300"><ShieldCheck size={18} className="text-cyan-300" /><p className="text-xs uppercase tracking-[0.24em]">Trust and Performance</p></div><h2 className="mt-3 text-5xl font-black uppercase sm:text-6xl">Client Perspectives</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{testimonials.map((item, index) => <Reveal key={item.id} delay={0.05 + index * 0.05}><article className="rounded-2xl border border-white/10 bg-white/[0.035] p-7"><Quote size={18} className="text-cyan-300" /><p className="mt-4 text-lg leading-7 text-white">“{item.quote}”</p><p className="mt-6 text-sm font-semibold text-cyan-200">{item.authorName}</p><p className="text-xs text-slate-400">{item.authorTitle} • {item.organization}</p></article></Reveal>)}</div></Reveal></Section>

      <Section className="py-20 lg:py-28"><Reveal><div className="rounded-[2.5rem] border border-cyan-200/20 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.18),transparent_36%),linear-gradient(135deg,rgba(15,23,42,0.92),rgba(2,6,23,0.92))] p-10 text-center sm:p-16"><Sparkles className="mx-auto text-cyan-300" size={28} /><p className="mt-4 text-xs uppercase tracking-[0.28em] text-cyan-200">Start the Conversation</p><h2 className="mx-auto mt-4 max-w-5xl text-5xl font-black uppercase leading-[0.92] sm:text-7xl">Modernize with clarity, intelligence, and confidence.</h2><p className="mx-auto mt-5 max-w-3xl text-lg text-slate-200">Partner with a government technology firm designed for AI strategy, mission continuity, and measurable cost-saving innovation.</p><Link href="/contact" className="premium-button mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-cyan-200">Contact Our Team</Link></div></Reveal></Section>
    </HomepageCinematicScene>
  );
}
