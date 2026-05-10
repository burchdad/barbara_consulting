import Link from "next/link";
import { logoutAction } from "@/lib/actions";

const links = [
  { href: "/admin", label: "Dashboard Overview" },
  { href: "/admin/jobs", label: "Jobs / Careers" },
  { href: "/admin/case-studies", label: "Case Studies" },
  { href: "/admin/contracts", label: "Contracts" },
  { href: "/admin/leadership", label: "Leadership" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/partners", label: "Mission Partners" },
  { href: "/admin/submissions", label: "Contact Submissions" },
  { href: "/admin/settings", label: "Global Settings" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[260px_1fr] lg:px-8">
        <aside className="rounded-xl border border-white/10 bg-black/40 p-4">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-400">Admin</p>
          <nav className="mt-4 grid gap-1 text-sm">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-md px-3 py-2 text-zinc-300 transition hover:bg-white/5 hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
          <form action={logoutAction} className="mt-6">
            <button className="w-full rounded-md border border-white/20 px-3 py-2 text-sm text-zinc-200 hover:bg-white/5" type="submit">
              Sign Out
            </button>
          </form>
        </aside>
        <main className="space-y-6">{children}</main>
      </div>
    </div>
  );
}
