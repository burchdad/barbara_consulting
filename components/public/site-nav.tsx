"use client";

import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
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
        <Link href="/" className="font-black uppercase tracking-[0.12em] text-white">
          <Logo companyName={brand} />
        </Link>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-5 text-sm text-zinc-300 xl:flex">
            {primaryNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link-premium max-w-[11.5rem] text-center leading-tight transition hover:text-red-400"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <a
            href={capabilitiesStatementHref}
            download
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-cyan-200/50 bg-cyan-200/10 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.12)] transition hover:border-cyan-200 hover:bg-cyan-200/20 hover:text-white sm:px-5"
          >
            <Download size={15} />
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
            className="border-t border-white/10 bg-[#080808]"
          >
            <nav className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-4 sm:px-6">
              <div className="grid gap-1 xl:hidden">
                {primaryNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2 text-lg font-semibold text-zinc-200 transition hover:bg-white/5 hover:text-red-400"
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
                    className="rounded-md px-3 py-2 text-lg font-semibold text-zinc-200 transition hover:bg-white/5 hover:text-red-400"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-2 border-t border-cyan-200/15 bg-cyan-200/[0.045] p-3">
                <Link
                  href="/admin/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-md border border-cyan-200/20 bg-black/35 px-4 py-3 text-lg font-black uppercase tracking-[0.14em] text-cyan-100 transition hover:border-cyan-200/50 hover:bg-cyan-200/10 hover:text-white"
                >
                  Login
                  <span className="text-xs text-cyan-300">Admin</span>
                </Link>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
