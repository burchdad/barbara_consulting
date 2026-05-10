import { AdminCard } from "@/components/admin/admin-form";
import { ModuleHeader } from "@/components/admin/module-header";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [jobs, studies, contracts, submissions, recentSubmissions] = await Promise.all([
    prisma.job.count({ where: { isPublished: true } }),
    prisma.caseStudy.count({ where: { isPublished: true } }),
    prisma.contract.count({ where: { isPublished: true } }),
    prisma.contactSubmission.count(),
    prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  return (
    <div className="space-y-6">
      <ModuleHeader title="Dashboard Overview" subtitle="Operational snapshot and quick action context." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminCard><p className="text-sm text-zinc-400">Active Jobs</p><p className="mt-2 text-4xl font-black">{jobs}</p></AdminCard>
        <AdminCard><p className="text-sm text-zinc-400">Published Case Studies</p><p className="mt-2 text-4xl font-black">{studies}</p></AdminCard>
        <AdminCard><p className="text-sm text-zinc-400">Published Contracts</p><p className="mt-2 text-4xl font-black">{contracts}</p></AdminCard>
        <AdminCard><p className="text-sm text-zinc-400">Contact Submissions</p><p className="mt-2 text-4xl font-black">{submissions}</p></AdminCard>
      </div>

      <AdminCard>
        <h2 className="text-2xl font-black uppercase">Recent Submissions</h2>
        <div className="mt-4 space-y-3">
          {recentSubmissions.map((submission) => (
            <article key={submission.id} className="rounded-md border border-white/10 bg-white/[0.02] p-3 text-sm">
              <p className="font-semibold text-white">{submission.name} • {submission.email}</p>
              <p className="mt-1 text-zinc-400">{submission.message}</p>
            </article>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
