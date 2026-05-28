"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Logo } from "@/components/ui/Logo";

const primaryNavItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contracts", label: "Contract Vehicles" },
  { href: "/partnerships", label: "Key Partnerships / Eco-Systems" },
];

const menuItems = [
  { href: "/services", label: "Services" },
  { href: "/podcasts-webinars", label: "Podcasts / Webinars" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
];

const capabilitiesStatementHref = "/capabilities/joint-capability-statement.pdf";

type SiteNavProps = {
  brand: string;
};

export function SiteNav({ brand }: SiteNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/60 to-transparent" />
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="min-w-0 font-black uppercase tracking-[0.12em] text-white">
          <Logo companyName={brand} className="block max-w-[34rem] text-sm leading-tight sm:text-base lg:text-lg xl:truncate" />
        </Link>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-5 text-sm text-zinc-300 xl:flex">
            {primaryNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link-premium whitespace-nowrap transition hover:text-red-400"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <a
            href={capabilitiesStatementHref}
            download
            className="inline-flex min-h-10 items-center gap-2 whitespace-nowrap rounded-full border border-cyan-200/50 bg-cyan-200/10 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.12)] transition hover:border-cyan-200 hover:bg-cyan-200/20 hover:text-white sm:px-5"
          >
            <span className="hidden sm:inline">Capabilities Statement</span>
            <span className="sm:hidden">PDF</span>
          </a>

          <button
            type="button"
            className="rounded-md border border-white/20 p-2 text-white transition hover:border-cyan-200/50 hover:text-cyan-100"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute right-4 top-[calc(100%+0.75rem)] w-[min(calc(100vw-2rem),24rem)] overflow-hidden rounded-lg border border-cyan-200/18 bg-[#05080b]/95 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:right-6 lg:right-8"
          >
            <nav className="grid gap-4 p-4 text-right">
              <div className="grid gap-1 xl:hidden">
                {primaryNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2 text-base font-semibold text-zinc-200 transition hover:bg-white/5 hover:text-red-400"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="grid gap-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2 text-base font-semibold text-zinc-200 transition hover:bg-white/5 hover:text-red-400"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-2 border-t border-cyan-200/15 bg-cyan-200/[0.045] p-3">
                <Link
                  href="/admin/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between gap-4 rounded-md border border-cyan-200/20 bg-black/35 px-4 py-3 text-base font-black uppercase tracking-[0.14em] text-cyan-100 transition hover:border-cyan-200/50 hover:bg-cyan-200/10 hover:text-white"
                >
                  <span className="text-xs text-cyan-300">Admin</span>
                  Login
                </Link>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
