import {
  AdminActionRow,
  AdminCard,
  AdminCheckbox,
  AdminDeleteButton,
  AdminEditCard,
  AdminField,
  AdminSectionHeader,
  AdminStatCard,
  AdminSubmitButton,
  AdminTextArea,
} from "@/components/admin/admin-form";
import { ModuleHeader } from "@/components/admin/module-header";
import { deleteJobAction, upsertJobAction } from "@/lib/actions";
import { ensureContentBaseline } from "@/lib/content-baseline";
import { prisma } from "@/lib/prisma";

function toLines(value: unknown) {
  return Array.isArray(value) ? value.join("\n") : "";
}

export default async function AdminJobsPage() {
  await ensureContentBaseline();
  const jobs = await prisma.job.findMany({ orderBy: { createdAt: "desc" } });
  const publishedCount = jobs.filter((job) => job.isPublished).length;

  return (
    <div className="space-y-6">
      <ModuleHeader title="Jobs / Careers" subtitle="Create, edit, delete, and publish roles." />

      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard label="Displayed Roles" value={jobs.length} />
        <AdminStatCard label="Published Roles" value={publishedCount} />
        <AdminStatCard label="Career Page Status" value={jobs.length ? "Live" : "Ready"} note={jobs.length ? "Live roles active" : "Ready for first role"} />
      </div>

      <AdminCard>
        <AdminSectionHeader title="Create Job" description="Publish a role to the careers page or save it as a draft." />
        <form action={upsertJobAction} className="mt-5 grid gap-4 md:grid-cols-2">
          <AdminField label="Title" name="title" required />
          <AdminField label="Slug" name="slug" required />
          <AdminField label="Department" name="department" required />
          <AdminField label="Location" name="location" required />
          <AdminField label="Job Type" name="jobType" required />
          <AdminField label="Employment Type" name="employmentType" required />
          <AdminField label="Apply URL" name="applyUrl" />
          <AdminCheckbox label="Published" name="isPublished" />
          <div className="md:col-span-2"><AdminTextArea label="Description" name="description" rows={3} required /></div>
          <div><AdminTextArea label="Responsibilities (one per line)" name="responsibilities" rows={4} required /></div>
          <div><AdminTextArea label="Requirements (one per line)" name="requirements" rows={4} required /></div>
          <div className="md:col-span-2"><AdminTextArea label="Benefits (one per line)" name="benefits" rows={3} required /></div>
          <AdminActionRow className="md:col-span-2"><AdminSubmitButton>Save Job</AdminSubmitButton></AdminActionRow>
        </form>
      </AdminCard>

      <div className="space-y-3">
        <AdminSectionHeader title="Manage Roles" description="Open a role to update its details, publishing state, or application link." />
        {jobs.map((job) => (
          <AdminEditCard key={job.id} title={job.title} meta={`${job.department} / ${job.location} / ${job.employmentType}`} published={job.isPublished}>
            <form id={job.id} action={upsertJobAction} className="grid gap-4 md:grid-cols-2">
              <input type="hidden" name="id" value={job.id} />
              <AdminField label="Title" name="title" defaultValue={job.title} required />
              <AdminField label="Slug" name="slug" defaultValue={job.slug} required />
              <AdminField label="Department" name="department" defaultValue={job.department} required />
              <AdminField label="Location" name="location" defaultValue={job.location} required />
              <AdminField label="Job Type" name="jobType" defaultValue={job.jobType} required />
              <AdminField label="Employment Type" name="employmentType" defaultValue={job.employmentType} required />
              <AdminField label="Apply URL" name="applyUrl" defaultValue={job.applyUrl} />
              <AdminCheckbox label="Published" name="isPublished" defaultChecked={job.isPublished} />
              <div className="md:col-span-2"><AdminTextArea label="Description" name="description" defaultValue={job.description} rows={3} required /></div>
              <div><AdminTextArea label="Responsibilities" name="responsibilities" defaultValue={toLines(job.responsibilities)} rows={4} required /></div>
              <div><AdminTextArea label="Requirements" name="requirements" defaultValue={toLines(job.requirements)} rows={4} required /></div>
              <div className="md:col-span-2"><AdminTextArea label="Benefits" name="benefits" defaultValue={toLines(job.benefits)} rows={3} required /></div>
              <AdminActionRow className="md:col-span-2"><AdminSubmitButton>Update Job</AdminSubmitButton></AdminActionRow>
            </form>
            <form action={deleteJobAction} className="mt-2">
              <input type="hidden" name="id" value={job.id} />
              <AdminDeleteButton />
            </form>
          </AdminEditCard>
        ))}
      </div>
    </div>
  );
}
