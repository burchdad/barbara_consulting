import { format } from "date-fns";
import { AdminCard } from "@/components/admin/admin-form";
import { ModuleHeader } from "@/components/admin/module-header";
import { deleteSubmissionAction, setSubmissionStatusAction } from "@/lib/actions";
import { prisma } from "@/lib/prisma";

export default async function AdminSubmissionsPage() {
  const submissions = await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <ModuleHeader title="Contact Submissions" subtitle="Review and triage incoming requests." />
      <AdminCard>
        <div className="space-y-4">
          {submissions.map((submission) => (
            <article key={submission.id} className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <p className="font-semibold text-white">{submission.name} • {submission.email}</p>
              <p className="text-xs text-zinc-500">{format(submission.createdAt, "PPpp")}</p>
              <p className="mt-2 text-sm text-zinc-300">{submission.message}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <form action={setSubmissionStatusAction}>
                  <input type="hidden" name="id" value={submission.id} />
                  <input type="hidden" name="status" value={submission.status === "unread" ? "read" : "unread"} />
                  <button className="rounded-md border border-white/20 px-3 py-1.5 text-xs" type="submit">
                    Mark as {submission.status === "unread" ? "Read" : "Unread"}
                  </button>
                </form>
                <form action={deleteSubmissionAction}>
                  <input type="hidden" name="id" value={submission.id} />
                  <button className="rounded-md border border-white/20 px-3 py-1.5 text-xs" type="submit">Delete</button>
                </form>
                <span className={`rounded-md px-3 py-1.5 text-xs ${submission.status === "read" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>{submission.status}</span>
              </div>
            </article>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
