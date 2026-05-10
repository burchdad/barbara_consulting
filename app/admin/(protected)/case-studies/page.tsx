import { AdminCard, AdminField, AdminTextArea } from "@/components/admin/admin-form";
import { ModuleHeader } from "@/components/admin/module-header";
import { deleteCaseStudyAction, upsertCaseStudyAction } from "@/lib/actions";
import { prisma } from "@/lib/prisma";

export default async function AdminCaseStudiesPage() {
  const studies = await prisma.caseStudy.findMany({ orderBy: { displayOrder: "asc" } });

  return (
    <div className="space-y-6">
      <ModuleHeader title="Case Studies" subtitle="Manage featured proof points and detail pages." />
      <AdminCard>
        <h2 className="text-xl font-black uppercase">Create Case Study</h2>
        <form action={upsertCaseStudyAction} className="mt-4 grid gap-3 md:grid-cols-2">
          <AdminField label="Title" name="title" required />
          <AdminField label="Slug" name="slug" required />
          <div className="md:col-span-2"><AdminTextArea label="Summary" name="summary" required /></div>
          <AdminField label="Icon URL" name="iconUrl" />
          <AdminField label="Image URL" name="imageUrl" />
          <div><AdminTextArea label="Highlights (one per line)" name="highlights" required /></div>
          <div><AdminTextArea label="Metrics (one per line)" name="metrics" required /></div>
          <div className="md:col-span-2"><AdminTextArea label="Challenge" name="challenge" required /></div>
          <div className="md:col-span-2"><AdminTextArea label="Solution" name="solution" required /></div>
          <div className="md:col-span-2"><AdminTextArea label="Results" name="results" required /></div>
          <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={0} />
          <div className="flex gap-4 text-sm text-zinc-300"><label><input type="checkbox" name="isFeatured" /> Featured</label><label><input type="checkbox" name="isPublished" /> Published</label></div>
          <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white md:col-span-2" type="submit">Save Case Study</button>
        </form>
      </AdminCard>

      {studies.map((study) => (
        <AdminCard key={study.id}>
          <form action={upsertCaseStudyAction} className="grid gap-3 md:grid-cols-2">
            <input type="hidden" name="id" value={study.id} />
            <AdminField label="Title" name="title" defaultValue={study.title} required />
            <AdminField label="Slug" name="slug" defaultValue={study.slug} required />
            <div className="md:col-span-2"><AdminTextArea label="Summary" name="summary" defaultValue={study.summary} required /></div>
            <AdminField label="Icon URL" name="iconUrl" defaultValue={study.iconUrl} />
            <AdminField label="Image URL" name="imageUrl" defaultValue={study.imageUrl} />
            <div><AdminTextArea label="Highlights" name="highlights" defaultValue={(study.highlights as string[]).join("\n")} required /></div>
            <div><AdminTextArea label="Metrics" name="metrics" defaultValue={(study.metrics as string[]).join("\n")} required /></div>
            <div className="md:col-span-2"><AdminTextArea label="Challenge" name="challenge" defaultValue={study.challenge} required /></div>
            <div className="md:col-span-2"><AdminTextArea label="Solution" name="solution" defaultValue={study.solution} required /></div>
            <div className="md:col-span-2"><AdminTextArea label="Results" name="results" defaultValue={study.results} required /></div>
            <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={study.displayOrder} />
            <div className="flex gap-4 text-sm text-zinc-300"><label><input type="checkbox" name="isFeatured" defaultChecked={study.isFeatured} /> Featured</label><label><input type="checkbox" name="isPublished" defaultChecked={study.isPublished} /> Published</label></div>
            <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white md:col-span-2" type="submit">Update</button>
          </form>
          <form action={deleteCaseStudyAction} className="mt-2"><input type="hidden" name="id" value={study.id} /><button type="submit" className="rounded-md border border-white/20 px-3 py-1.5 text-xs">Delete</button></form>
        </AdminCard>
      ))}
    </div>
  );
}
