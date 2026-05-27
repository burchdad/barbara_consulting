import Link from "next/link";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/public/reveal";
import { getGlobalSettings } from "@/lib/site-data";
import { siteConfig } from "@/lib/config/site";

export async function SiteFooter() {
  const settings = await getGlobalSettings();
  const companyName = (settings?.companyName ?? siteConfig.companyName).replace(
    "Gray Matters Technology-",
    "Gray Matters Technology Services -",
  );
  const footerStatement = (
    settings?.footerStatement ?? siteConfig.footer.statement
  ).replace(
    "Gray Matters Technology-",
    "Gray Matters Technology Services -",
  );
  const email = siteConfig.contact.email;
  const phone = siteConfig.contact.phone;
  const address = siteConfig.contact.address;
  const linkedInUrl = settings?.linkedInUrl || siteConfig.social.linkedin;

  return (
    <footer className="relative border-t border-cyan-200/20 bg-[#020617]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent blur-px" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cyan-950/20 via-slate-950/70 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(34,211,238,0.16),transparent_35%),radial-gradient(circle_at_82%_18%,rgba(14,165,233,0.1),transparent_32%)]" />
      <div className="relative mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-xl border border-cyan-200/15 bg-gradient-to-r from-cyan-300/[0.08] via-white/[0.025] to-transparent px-6 py-6 shadow-[0_24px_80px_rgba(34,211,238,0.08)]">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Strategic Engagement</p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-3xl text-sm text-slate-200 sm:text-base">
                {settings?.footerStatement ?? siteConfig.footer.ctaHeadline}
              </p>
              <Link
                href="/contact"
                className="premium-button rounded-md border border-cyan-200/45 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20 hover:text-white"
              >
                {siteConfig.footer.ctaButtonLabel}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">{companyName}</p>
          <p className="max-w-md text-sm text-slate-300">{footerStatement}</p>
          <div className="space-y-2 text-sm text-slate-400">
            {address ? <p className="inline-flex items-center gap-2"><MapPin size={14} className="text-cyan-300" />{address}</p> : null}
            {email ? <p className="inline-flex items-center gap-2"><Mail size={14} className="text-cyan-300" />{email}</p> : null}
            {phone ? <p className="inline-flex items-center gap-2"><Phone size={14} className="text-cyan-300" />{phone}</p> : null}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Company</p>
          <nav className="mt-4 grid gap-2 text-sm text-slate-300">
            <Link href="/" className="hover:text-cyan-200">Home</Link>
            <Link href="/about" className="hover:text-cyan-200">About Us</Link>
            <Link href="/careers" className="hover:text-cyan-200">Careers</Link>
            <Link href="/contact" className="hover:text-cyan-200">Contact</Link>
          </nav>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Capabilities</p>
          <nav className="mt-4 grid gap-2 text-sm text-slate-300">
            <Link href="/services" className="hover:text-cyan-200">Services</Link>
            <Link href="/contracts" className="hover:text-cyan-200">Contract Vehicles</Link>
            <Link href="/capabilities/joint-capability-statement.pdf" className="hover:text-cyan-200">Capabilities Statement</Link>
            <Link href="/privacy" className="hover:text-cyan-200">Privacy</Link>
            <Link href="/admin/login" className="hover:text-cyan-200">Login</Link>
          </nav>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Follow</p>
          <div className="mt-4 flex items-center gap-3 text-slate-300">
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-cyan-200/15 p-2 transition hover:border-cyan-200/50 hover:text-cyan-200"
              aria-label="LinkedIn"
            >
              <Globe size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-2 text-[72px] font-black uppercase tracking-[0.16em] text-white/8 sm:text-[96px] lg:px-8 lg:text-[124px]">
          AI STRATEGY
        </p>
      </div>
    </footer>
  );
}
