import { AdminActionRow, AdminAssetUploadField, AdminCard, AdminField, AdminSectionHeader, AdminStatCard, AdminSubmitButton, AdminStatusBadge, AdminTextArea } from "@/components/admin/admin-form";
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
        <AdminStatCard label="Active Jobs" value={jobs} />
        <AdminStatCard label="Published Case Studies" value={studies} />
        <AdminStatCard label="Published Contracts" value={contracts} />
        <AdminStatCard label="Contact Submissions" value={submissions} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard label="Published Services" value={services} />
        <AdminStatCard label="Published Testimonials" value={testimonials} />
        <AdminStatCard label="Published Partners" value={partners} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AdminCard>
          <AdminSectionHeader title="Homepage Quick Update" description="Fast edits for the content clients are most likely to request." />
          <form action={updateDashboardOverviewAction} encType="multipart/form-data" className="mt-5 grid gap-4 md:grid-cols-2">
            <AdminField label="Company Name" name="companyName" defaultValue={settings?.companyName} required />
            <AdminField label="Tagline" name="tagline" defaultValue={settings?.tagline} required />
            <div className="md:col-span-2"><AdminField label="Hero Eyebrow" name="heroEyebrow" defaultValue={settings?.heroEyebrow} required /></div>
            <div className="md:col-span-2"><AdminTextArea label="Hero Headline" name="heroHeadline" defaultValue={settings?.heroHeadline} rows={2} required /></div>
            <div className="md:col-span-2"><AdminTextArea label="Hero Subheadline" name="heroSubheadline" defaultValue={settings?.heroSubheadline} rows={3} required /></div>
            <div className="md:col-span-2"><AdminTextArea label="Footer Statement" name="footerStatement" defaultValue={settings?.footerStatement} rows={3} required /></div>
            <div className="md:col-span-2">
              <AdminAssetUploadField
                label="Capabilities Statement PDF"
                name="capabilityStatementFile"
                currentValueName="capabilityStatementUrl"
                currentValue={settings?.capabilityStatementUrl}
                accept="application/pdf"
                note="Upload a replacement PDF to store it in Blob and publish the new file."
              />
            </div>
            <AdminActionRow className="md:col-span-2"><AdminSubmitButton>Save Overview</AdminSubmitButton></AdminActionRow>
          </form>
        </AdminCard>

        <AdminCard>
          <AdminSectionHeader title="Recent Submissions" description="Latest contact messages captured by the website." />
          <div className="mt-4 space-y-3">
            {recentSubmissions.length ? recentSubmissions.map((submission) => (
              <article key={submission.id} className="rounded-md border border-white/10 bg-white/[0.02] p-3 text-sm">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="font-semibold text-white">{submission.name} / {submission.email}</p>
                  <AdminStatusBadge active={submission.status === "read"} activeLabel="Read" inactiveLabel="Unread" />
                </div>
                <p className="mt-2 line-clamp-4 text-zinc-400">{submission.message}</p>
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
