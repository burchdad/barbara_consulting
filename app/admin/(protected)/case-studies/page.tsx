import { AdminCard, AdminField, AdminTextArea } from "@/components/admin/admin-form";
import { ModuleHeader } from "@/components/admin/module-header";
import { deleteCaseStudyAction, upsertCaseStudyAction } from "@/lib/actions";
import { caseStudiesSeed } from "@/lib/data/caseStudies";
import { prisma } from "@/lib/prisma";

function toLines(value: unknown) {
  return Array.isArray(value) ? value.join("\n") : "";
}

export default async function AdminCaseStudiesPage() {
  const savedStudies = await prisma.caseStudy.findMany({ orderBy: { displayOrder: "asc" } }).catch((error) => {
    console.error("[admin/case-studies] Unable to load case studies.", error);
    return [];
  });
  const studies = savedStudies.length ? savedStudies : caseStudiesSeed;
  const isShowingFallback = savedStudies.length === 0;
  const publishedCount = savedStudies.filter((study) => study.isPublished).length;

  return (
    <div className="space-y-6">
      <ModuleHeader title="Case Studies" subtitle="Manage featured proof points and detail pages." />

      <div className="grid gap-4 md:grid-cols-3">
        <AdminCard><p className="text-sm text-zinc-400">Saved Studies</p><p className="mt-2 text-4xl font-black">{savedStudies.length}</p></AdminCard>
        <AdminCard><p className="text-sm text-zinc-400">Published</p><p className="mt-2 text-4xl font-black">{publishedCount}</p></AdminCard>
        <AdminCard><p className="text-sm text-zinc-400">Status</p><p className="mt-2 text-lg font-black uppercase text-cyan-100">{publishedCount ? "Live proof active" : "Using starter examples"}</p></AdminCard>
      </div>

      {isShowingFallback ? (
        <AdminCard className="border-cyan-200/25 bg-cyan-200/[0.04]">
          <p className="text-sm font-semibold text-cyan-100">No saved case studies were found. Starter examples are shown below; create and publish a case study to replace them.</p>
        </AdminCard>
      ) : null}

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
        <AdminCard key={isShowingFallback ? study.slug : study.id}>
          {isShowingFallback ? (
            <article className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Starter Example</p>
              <h2 className="text-2xl font-black uppercase text-white">{study.title}</h2>
              <p className="text-sm leading-6 text-zinc-300">{study.summary}</p>
              <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">Slug: {study.slug}</p>
            </article>
          ) : (
            <>
              <form action={upsertCaseStudyAction} className="grid gap-3 md:grid-cols-2">
                <input type="hidden" name="id" value={study.id} />
                <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-black uppercase">{study.title}</h2>
                  <span className={study.isPublished ? "text-xs font-bold uppercase text-cyan-300" : "text-xs font-bold uppercase text-zinc-500"}>{study.isPublished ? "Published" : "Draft"}</span>
                </div>
                <AdminField label="Title" name="title" defaultValue={study.title} required />
                <AdminField label="Slug" name="slug" defaultValue={study.slug} required />
                <div className="md:col-span-2"><AdminTextArea label="Summary" name="summary" defaultValue={study.summary} required /></div>
                <AdminField label="Icon URL" name="iconUrl" defaultValue={study.iconUrl} />
                <AdminField label="Image URL" name="imageUrl" defaultValue={study.imageUrl} />
                <div><AdminTextArea label="Highlights" name="highlights" defaultValue={toLines(study.highlights)} required /></div>
                <div><AdminTextArea label="Metrics" name="metrics" defaultValue={toLines(study.metrics)} required /></div>
                <div className="md:col-span-2"><AdminTextArea label="Challenge" name="challenge" defaultValue={study.challenge} required /></div>
                <div className="md:col-span-2"><AdminTextArea label="Solution" name="solution" defaultValue={study.solution} required /></div>
                <div className="md:col-span-2"><AdminTextArea label="Results" name="results" defaultValue={study.results} required /></div>
                <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={study.displayOrder} />
                <div className="flex gap-4 text-sm text-zinc-300"><label><input type="checkbox" name="isFeatured" defaultChecked={study.isFeatured} /> Featured</label><label><input type="checkbox" name="isPublished" defaultChecked={study.isPublished} /> Published</label></div>
                <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white md:col-span-2" type="submit">Update Case Study</button>
              </form>
              <form action={deleteCaseStudyAction} className="mt-2"><input type="hidden" name="id" value={study.id} /><button type="submit" className="rounded-md border border-white/20 px-3 py-1.5 text-xs">Delete</button></form>
            </>
          )}
        </AdminCard>
      ))}
    </div>
  );
}
