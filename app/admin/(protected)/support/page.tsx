import { format } from "date-fns";
import { AdminCard, AdminSectionHeader, AdminStatCard, AdminStatusBadge } from "@/components/admin/admin-form";
import { ModuleHeader } from "@/components/admin/module-header";
import { ensureContentBaseline } from "@/lib/content-baseline";
import { prisma } from "@/lib/prisma";
import { SupportTicketForm } from "@/app/admin/(protected)/support/support-ticket-form";

function statusLabel(status: string) {
  if (status === "sent") return "Sent";
  if (status === "needs_webhook" || status === "needs_webhook_secret") return "Saved";
  if (status === "webhook_failed") return "Retry Needed";
  return "Pending";
}

export default async function AdminSupportPage() {
  await ensureContentBaseline();

  const [settings, tickets] = await Promise.all([
    prisma.globalSetting.findFirst(),
    prisma.supportTicket.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
  ]);

  const sentCount = tickets.filter((ticket) => ticket.status === "sent").length;
  const openCount = tickets.filter((ticket) => ticket.status !== "sent").length;
  const webhookConfigured = Boolean(
    process.env.GHOST_WEBHOOK_SECRET ||
    process.env.GHOST_MISSION_CONTROL_WEBHOOK_SECRET ||
    process.env.WEB_HELPER_AGENT_WEBHOOK_SECRET,
  );

  return (
    <div className="space-y-6">
      <ModuleHeader title="Website Support" subtitle="Create structured work tickets for Ghost Mission Control and the web helper agents." />

      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard label="Recent Tickets" value={tickets.length} />
        <AdminStatCard label="Sent to Agents" value={sentCount} />
        <AdminStatCard label="Webhook" value={webhookConfigured ? "Live" : "Setup"} note={webhookConfigured ? "Ghost handoff active" : "Env var needed"} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AdminCard>
          <AdminSectionHeader title="Website Helper Bot" description="Collect the request, attach context, and create a review-gated work ticket." />
          <div className="mt-5">
            <SupportTicketForm clientName={settings?.companyName || "Gray Matters Technology Services"} defaultEmail={settings?.email || ""} />
          </div>
        </AdminCard>

        <AdminCard>
          <AdminSectionHeader title="Recent Support Tickets" description="Latest requests captured from this dashboard." />
          <div className="mt-5 space-y-3">
            {tickets.length ? tickets.map((ticket) => (
              <article key={ticket.id} className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-black uppercase tracking-wide text-white">{ticket.summary}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-zinc-500">{ticket.requestType} / {ticket.priority}</p>
                  </div>
                  <AdminStatusBadge active={ticket.status === "sent"} activeLabel={statusLabel(ticket.status)} inactiveLabel={statusLabel(ticket.status)} />
                </div>
                <p className="mt-3 line-clamp-4 text-sm leading-6 text-zinc-400">{ticket.details}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-500">
                  <span>{ticket.pageUrl}</span>
                  <span>/</span>
                  <span>{format(ticket.createdAt, "PPp")}</span>
                </div>
              </article>
            )) : (
              <p className="text-sm text-zinc-400">No website support tickets have been created yet.</p>
            )}
          </div>
          {openCount ? <p className="mt-4 text-xs text-amber-200">{openCount} ticket(s) are saved but not marked sent.</p> : null}
        </AdminCard>
      </div>
    </div>
  );
}
