import { AdminCard, AdminField, AdminTextArea } from "@/components/admin/admin-form";
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
        <AdminCard>
          <p className="text-sm text-zinc-400">Displayed Roles</p>
          <p className="mt-2 text-4xl font-black">{jobs.length}</p>
        </AdminCard>
        <AdminCard>
          <p className="text-sm text-zinc-400">Published Roles</p>
          <p className="mt-2 text-4xl font-black">{publishedCount}</p>
        </AdminCard>
        <AdminCard>
          <p className="text-sm text-zinc-400">Career Page Status</p>
          <p className="mt-2 text-lg font-black uppercase text-cyan-100">
            {jobs.length ? "Live roles active" : "Ready for first role"}
          </p>
        </AdminCard>
      </div>

      <AdminCard>
        <h2 className="text-xl font-black uppercase">Create Job</h2>
        <form action={upsertJobAction} className="mt-4 grid gap-3 md:grid-cols-2">
          <AdminField label="Title" name="title" required />
          <AdminField label="Slug" name="slug" required />
          <AdminField label="Department" name="department" required />
          <AdminField label="Location" name="location" required />
          <AdminField label="Job Type" name="jobType" required />
          <AdminField label="Employment Type" name="employmentType" required />
          <AdminField label="Apply URL" name="applyUrl" />
          <label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" name="isPublished" /> Published</label>
          <div className="md:col-span-2"><AdminTextArea label="Description" name="description" rows={3} required /></div>
          <div><AdminTextArea label="Responsibilities (one per line)" name="responsibilities" rows={4} required /></div>
          <div><AdminTextArea label="Requirements (one per line)" name="requirements" rows={4} required /></div>
          <div className="md:col-span-2"><AdminTextArea label="Benefits (one per line)" name="benefits" rows={3} required /></div>
          <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 md:col-span-2" type="submit">Save Job</button>
        </form>
      </AdminCard>

      <div className="space-y-4">
        {jobs.map((job) => (
          <AdminCard key={job.id}>
            <form id={job.id} action={upsertJobAction} className="grid gap-3 md:grid-cols-2">
              <input type="hidden" name="id" value={job.id} />
              <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-black uppercase">{job.title}</h2>
                <span className={job.isPublished ? "text-xs font-bold uppercase text-cyan-300" : "text-xs font-bold uppercase text-zinc-500"}>
                  {job.isPublished ? "Published" : "Draft"}
                </span>
              </div>
              <AdminField label="Title" name="title" defaultValue={job.title} required />
              <AdminField label="Slug" name="slug" defaultValue={job.slug} required />
              <AdminField label="Department" name="department" defaultValue={job.department} required />
              <AdminField label="Location" name="location" defaultValue={job.location} required />
              <AdminField label="Job Type" name="jobType" defaultValue={job.jobType} required />
              <AdminField label="Employment Type" name="employmentType" defaultValue={job.employmentType} required />
              <AdminField label="Apply URL" name="applyUrl" defaultValue={job.applyUrl} />
              <label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" name="isPublished" defaultChecked={job.isPublished} /> Published</label>
              <div className="md:col-span-2"><AdminTextArea label="Description" name="description" defaultValue={job.description} rows={3} required /></div>
              <div><AdminTextArea label="Responsibilities" name="responsibilities" defaultValue={toLines(job.responsibilities)} rows={4} required /></div>
              <div><AdminTextArea label="Requirements" name="requirements" defaultValue={toLines(job.requirements)} rows={4} required /></div>
              <div className="md:col-span-2"><AdminTextArea label="Benefits" name="benefits" defaultValue={toLines(job.benefits)} rows={3} required /></div>
              <div className="flex gap-2 md:col-span-2">
                <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white" type="submit">Update Job</button>
              </div>
            </form>
            <form action={deleteJobAction} className="mt-2">
              <input type="hidden" name="id" value={job.id} />
              <button type="submit" className="rounded-md border border-white/20 px-3 py-1.5 text-xs hover:bg-white/5">Delete</button>
            </form>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}
