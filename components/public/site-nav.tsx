"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

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

const sewpViHref = "/sewp-vi";
const employeeTimesheetHref = "https://graymatterstechnology.tsheets.com";

type SiteNavProps = {
  brand: string;
  capabilityStatementHref: string;
};

export function SiteNav({ brand, capabilityStatementHref }: SiteNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const brandLines = brand
    .replace(" - Sage Tech Solutions", " / SageTech Solutions")
    .split(" / ");

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl" onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        event.preventDefault();
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    }}>
      {(pathname === "/sewp-vi" || pathname === "/sewp-ordering-guide") && <a href="#sewp-main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-white focus:px-4 focus:py-3 focus:text-black focus:outline-2 focus:outline-cyan-700">Skip to main content</a>}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/60 to-transparent" />
      <div className="flex w-full flex-wrap items-center justify-between gap-3 px-4 py-4 lg:flex-nowrap sm:gap-6 sm:px-6 lg:px-10 xl:px-12 2xl:px-12">
        <Link href="/" className="w-full min-w-0 font-black uppercase tracking-[0.12em] text-white lg:w-auto lg:shrink-0">
          <span className="sr-only">{brandLines.join(" / ")}</span>
          <span
            aria-hidden="true"
            className="block text-center text-xs font-black uppercase leading-tight tracking-[0.12em] text-white sm:inline-block sm:text-lg lg:text-xl 2xl:text-2xl"
          >
            {brandLines.map((line, index) => (
              <span key={line} className="block sm:whitespace-nowrap">
                {line}
              </span>
            ))}
          </span>
        </Link>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <nav aria-label="Primary" className="hidden items-center gap-6 text-base font-semibold text-zinc-300 2xl:flex">
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

          <Link
            href={sewpViHref}
            className="inline-flex min-h-10 items-center whitespace-nowrap rounded-full border border-white/25 bg-white/[0.04] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:border-cyan-200/50 hover:bg-cyan-200/10 hover:text-cyan-100 sm:px-5"
          >
            SEWP VI
          </Link>

          <a
            href={capabilityStatementHref}
            download
            className="inline-flex min-h-10 items-center gap-2 whitespace-nowrap rounded-full border border-cyan-200/50 bg-cyan-200/10 px-4 py-2 text-sm font-black uppercase tracking-[0.12em] text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.12)] transition hover:border-cyan-200 hover:bg-cyan-200/20 hover:text-white sm:px-5"
          >
            <span className="hidden sm:inline">Capabilities Statement</span>
            <span className="sm:hidden">PDF</span>
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            className="rounded-md border border-white/20 p-2 text-white transition hover:border-cyan-200/50 hover:text-cyan-100"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            aria-controls={open ? "site-navigation-menu" : undefined}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            id="site-navigation-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute right-4 top-[calc(100%+0.75rem)] w-[min(calc(100vw-2rem),24rem)] overflow-hidden rounded-lg border border-cyan-200/18 bg-[#05080b]/95 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:right-6 lg:right-8"
          >
            <nav aria-label="Additional" className="grid gap-4 p-4 text-right">
              <div className="grid gap-1 2xl:hidden">
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

              <div className="mt-2 border-t border-white/10 pt-3">
                <a
                  href={employeeTimesheetHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between gap-4 rounded-md border border-emerald-300/25 bg-emerald-300/[0.08] px-4 py-3 text-base font-black uppercase tracking-[0.14em] text-emerald-100 transition hover:border-emerald-200/60 hover:bg-emerald-300/[0.14] hover:text-white"
                >
                  <span className="text-xs text-emerald-300">Employee</span>
                  Timesheet
                </a>
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
