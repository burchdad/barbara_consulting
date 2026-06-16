import { AdminCard, AdminField, AdminTextArea } from "@/components/admin/admin-form";
import { ModuleHeader } from "@/components/admin/module-header";
import { updateDashboardOverviewAction } from "@/lib/actions";
import { ensureContentBaseline } from "@/lib/content-baseline";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  await ensureContentBaseline();

  const [jobs, studies, contracts, submissions, recentSubmissions, services, testimonials, partners, settings] = await Promise.all([
    prisma.job.count({ where: { isPublished: true } }),
    prisma.caseStudy.count({ where: { isPublished: true } }),
    prisma.contract.count({ where: { isPublished: true } }),
    prisma.contactSubmission.count(),
    prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.serviceItem.count({ where: { isPublished: true } }),
    prisma.testimonial.count({ where: { isPublished: true } }),
    prisma.missionPartner.count({ where: { isPublished: true } }),
    prisma.globalSetting.findFirst(),
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

      <div className="grid gap-4 md:grid-cols-3">
        <AdminCard><p className="text-sm text-zinc-400">Published Services</p><p className="mt-2 text-4xl font-black">{services}</p></AdminCard>
        <AdminCard><p className="text-sm text-zinc-400">Published Testimonials</p><p className="mt-2 text-4xl font-black">{testimonials}</p></AdminCard>
        <AdminCard><p className="text-sm text-zinc-400">Published Partners</p><p className="mt-2 text-4xl font-black">{partners}</p></AdminCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AdminCard>
          <h2 className="text-2xl font-black uppercase">Homepage Quick Update</h2>
          <form action={updateDashboardOverviewAction} className="mt-4 grid gap-3 md:grid-cols-2">
            <AdminField label="Company Name" name="companyName" defaultValue={settings?.companyName} required />
            <AdminField label="Tagline" name="tagline" defaultValue={settings?.tagline} required />
            <div className="md:col-span-2"><AdminField label="Hero Eyebrow" name="heroEyebrow" defaultValue={settings?.heroEyebrow} required /></div>
            <div className="md:col-span-2"><AdminTextArea label="Hero Headline" name="heroHeadline" defaultValue={settings?.heroHeadline} rows={2} required /></div>
            <div className="md:col-span-2"><AdminTextArea label="Hero Subheadline" name="heroSubheadline" defaultValue={settings?.heroSubheadline} rows={3} required /></div>
            <div className="md:col-span-2"><AdminTextArea label="Footer Statement" name="footerStatement" defaultValue={settings?.footerStatement} rows={3} required /></div>
            <div className="md:col-span-2"><AdminField label="Capabilities Statement URL or Path" name="capabilityStatementUrl" defaultValue={settings?.capabilityStatementUrl} required /></div>
            <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white md:col-span-2" type="submit">Save Overview</button>
          </form>
        </AdminCard>

        <AdminCard>
          <h2 className="text-2xl font-black uppercase">Recent Submissions</h2>
          <div className="mt-4 space-y-3">
            {recentSubmissions.length ? recentSubmissions.map((submission) => (
              <article key={submission.id} className="rounded-md border border-white/10 bg-white/[0.02] p-3 text-sm">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="font-semibold text-white">{submission.name} • {submission.email}</p>
                  <span className={submission.status === "read" ? "text-xs font-bold uppercase text-cyan-300" : "text-xs font-bold uppercase text-amber-300"}>
                    {submission.status}
                  </span>
                </div>
                <p className="mt-1 text-zinc-400">{submission.message}</p>
              </article>
            )) : (
              <p className="text-sm text-zinc-400">No submissions have been captured yet.</p>
            )}
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
