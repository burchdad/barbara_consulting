import Link from "next/link";
import { BarChart3, BriefcaseBusiness, Building2, FileText, Handshake, Home, Mail, MessageSquareQuote, Settings, ShieldCheck, Users } from "lucide-react";
import { logoutAction } from "@/lib/actions";

const links = [
  { href: "/admin", label: "Dashboard Overview", icon: Home },
  { href: "/admin/jobs", label: "Jobs / Careers", icon: BriefcaseBusiness },
  { href: "/admin/case-studies", label: "Case Studies", icon: BarChart3 },
  { href: "/admin/contracts", label: "Contracts", icon: FileText },
  { href: "/admin/leadership", label: "Leadership", icon: Users },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/services", label: "Services", icon: ShieldCheck },
  { href: "/admin/partners", label: "Mission Partners", icon: Handshake },
  { href: "/admin/submissions", label: "Contact Submissions", icon: Mail },
  { href: "/admin/settings", label: "Global Settings", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070707] text-zinc-100">
      <div className="grid w-full gap-5 px-4 py-4 sm:px-5 lg:grid-cols-[248px_minmax(0,1fr)] lg:px-6 xl:px-8">
        <aside className="rounded-lg border border-white/10 bg-black/70 p-4 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:overflow-y-auto">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-red-600/15 text-red-300">
              <Building2 size={18} aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-red-300">Admin</p>
              <p className="text-xs text-zinc-500">Website updates</p>
            </div>
          </div>
          <nav className="mt-4 grid gap-1 text-sm">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.href} href={link.href} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-zinc-300 transition hover:bg-white/5 hover:text-white">
                  <Icon size={16} aria-hidden="true" className="text-zinc-500" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <form action={logoutAction} className="mt-6">
            <button className="w-full rounded-md border border-white/15 px-3 py-2.5 text-sm font-semibold text-zinc-200 transition hover:bg-white/5" type="submit">
              Sign Out
            </button>
          </form>
        </aside>
        <main className="min-w-0 space-y-6 pb-10">{children}</main>
      </div>
    </div>
  );
}
