import { format } from "date-fns";
import { AdminActionRow, AdminCard, AdminDeleteButton, AdminSectionHeader, AdminSelect, AdminStatCard, AdminStatusBadge, AdminSubmitButton } from "@/components/admin/admin-form";
import { ModuleHeader } from "@/components/admin/module-header";
import { deleteSubmissionAction, setSubmissionStatusAction } from "@/lib/actions";
import { ensureContentBaseline } from "@/lib/content-baseline";
import { prisma } from "@/lib/prisma";

export default async function AdminSubmissionsPage() {
  await ensureContentBaseline();
  const submissions = await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });
  const unreadCount = submissions.filter((submission) => submission.status === "unread").length;
  const readCount = submissions.length - unreadCount;

  return (
    <div className="space-y-6">
      <ModuleHeader title="Contact Submissions" subtitle="Review, save status updates, and triage incoming requests." />

      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard label="Total Submissions" value={submissions.length} />
        <AdminStatCard label="Unread" value={unreadCount} />
        <AdminStatCard label="Reviewed" value={readCount} />
      </div>

      <AdminCard>
        <AdminSectionHeader title="Submission Inbox" description="Update status as requests are reviewed, then delete records that no longer need to be retained." />
        <div className="mt-5 space-y-4">
          {submissions.length ? submissions.map((submission) => (
            <article key={submission.id} className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-white">{submission.name} / {submission.email}</p>
                  <p className="mt-1 text-sm text-zinc-400">{submission.phone || "No phone provided"}</p>
                  <p className="text-xs text-zinc-500">{format(submission.createdAt, "PPpp")}</p>
                </div>
                <AdminStatusBadge active={submission.status === "read"} activeLabel="Read" inactiveLabel="Unread" />
              </div>

              <p className="mt-3 text-sm leading-6 text-zinc-300">{submission.message}</p>

              <AdminActionRow className="mt-4">
                <form action={setSubmissionStatusAction} className="flex flex-wrap items-end gap-2">
                  <input type="hidden" name="id" value={submission.id} />
                  <AdminSelect label="Status" name="status" defaultValue={submission.status}>
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                  </AdminSelect>
                  <AdminSubmitButton>Save Submission</AdminSubmitButton>
                </form>

                <form action={deleteSubmissionAction}>
                  <input type="hidden" name="id" value={submission.id} />
                  <AdminDeleteButton />
                </form>
              </AdminActionRow>
            </article>
          )) : (
            <p className="text-sm text-zinc-400">No contact submissions have been received yet.</p>
          )}
        </div>
      </AdminCard>
    </div>
  );
}
