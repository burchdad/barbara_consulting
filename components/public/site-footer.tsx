import Link from "next/link";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/public/reveal";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/config/site";

export async function SiteFooter() {
  const settings = await prisma.globalSetting.findFirst();

  return (
    <footer className="relative border-t border-red-500/20 bg-[#050505]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/60 to-transparent blur-px" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/32 via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(255,43,43,0.12),transparent_35%)]" />
      <div className="relative mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-xl border border-white/10 bg-gradient-to-r from-white/[0.06] via-white/[0.02] to-transparent px-6 py-6">
            <p className="text-xs uppercase tracking-[0.2em] text-red-300">Strategic Engagement</p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-3xl text-sm text-zinc-200 sm:text-base">
                {settings?.footerStatement ?? siteConfig.footer.ctaHeadline}
              </p>
              <Link
                href="/contact"
                className="premium-button rounded-md border border-red-500/60 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-500/20"
              >
                {siteConfig.footer.ctaButtonLabel}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-red-500">{settings?.companyName ?? "Enterprise Platform"}</p>
          <p className="max-w-md text-sm text-zinc-300">{settings?.footerStatement ?? "Mission-grade delivery for federal operations."}</p>
          <div className="space-y-2 text-sm text-zinc-400">
            <p className="inline-flex items-center gap-2"><MapPin size={14} className="text-red-400" />{settings?.address}</p>
            <p className="inline-flex items-center gap-2"><Mail size={14} className="text-red-400" />{settings?.email}</p>
            <p className="inline-flex items-center gap-2"><Phone size={14} className="text-red-400" />{settings?.phone}</p>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Company</p>
          <nav className="mt-4 grid gap-2 text-sm text-zinc-300">
            <Link href="/" className="hover:text-red-300">Home</Link>
            <Link href="/about" className="hover:text-red-300">About</Link>
            <Link href="/careers" className="hover:text-red-300">Careers</Link>
            <Link href="/contact" className="hover:text-red-300">Contact</Link>
          </nav>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Capabilities</p>
          <nav className="mt-4 grid gap-2 text-sm text-zinc-300">
            <Link href="/#services" className="hover:text-red-300">Services</Link>
            <Link href="/contracts" className="hover:text-red-300">Contracts</Link>
            <Link href="/case-studies" className="hover:text-red-300">Case Studies</Link>
            <Link href="/privacy" className="hover:text-red-300">Privacy</Link>
          </nav>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Follow</p>
          <div className="mt-4 flex items-center gap-3 text-zinc-300">
            <a
              href={settings?.linkedInUrl || "https://www.linkedin.com"}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-white/15 p-2 transition hover:border-red-500/50 hover:text-red-300"
              aria-label="LinkedIn"
            >
              <Globe size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-2 text-[72px] font-black uppercase tracking-[0.16em] text-white/8 sm:text-[96px] lg:px-8 lg:text-[124px]">
          AUTHORITY
        </p>
      </div>
    </footer>
  );
}
