import { format } from "date-fns";
import { AdminCard } from "@/components/admin/admin-form";
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
        <AdminCard><p className="text-sm text-zinc-400">Total Submissions</p><p className="mt-2 text-4xl font-black">{submissions.length}</p></AdminCard>
        <AdminCard><p className="text-sm text-zinc-400">Unread</p><p className="mt-2 text-4xl font-black">{unreadCount}</p></AdminCard>
        <AdminCard><p className="text-sm text-zinc-400">Reviewed</p><p className="mt-2 text-4xl font-black">{readCount}</p></AdminCard>
      </div>

      <AdminCard>
        <div className="space-y-4">
          {submissions.length ? submissions.map((submission) => (
            <article key={submission.id} className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-white">{submission.name} • {submission.email}</p>
                  <p className="mt-1 text-sm text-zinc-400">{submission.phone || "No phone provided"}</p>
                  <p className="text-xs text-zinc-500">{format(submission.createdAt, "PPpp")}</p>
                </div>
                <span className={`rounded-md px-3 py-1.5 text-xs font-bold uppercase ${submission.status === "read" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>
                  {submission.status}
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-zinc-300">{submission.message}</p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <form action={setSubmissionStatusAction} className="flex flex-wrap items-center gap-2">
                  <input type="hidden" name="id" value={submission.id} />
                  <select name="status" defaultValue={submission.status} className="rounded-md border border-white/15 bg-black px-3 py-2 text-sm text-zinc-100">
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                  </select>
                  <button className="rounded-md bg-red-600 px-3 py-2 text-xs font-semibold uppercase text-white" type="submit">
                    Save Submission
                  </button>
                </form>

                <form action={deleteSubmissionAction}>
                  <input type="hidden" name="id" value={submission.id} />
                  <button className="rounded-md border border-white/20 px-3 py-2 text-xs" type="submit">Delete</button>
                </form>
              </div>
            </article>
          )) : (
            <p className="text-sm text-zinc-400">No contact submissions have been received yet.</p>
          )}
        </div>
      </AdminCard>
    </div>
  );
}
