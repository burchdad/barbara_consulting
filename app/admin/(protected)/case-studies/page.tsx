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
import { deleteCaseStudyAction, upsertCaseStudyAction } from "@/lib/actions";
import { ensureContentBaseline } from "@/lib/content-baseline";
import { prisma } from "@/lib/prisma";

function toLines(value: unknown) {
  return Array.isArray(value) ? value.join("\n") : "";
}

export default async function AdminCaseStudiesPage() {
  await ensureContentBaseline();
  const studies = await prisma.caseStudy.findMany({ orderBy: { displayOrder: "asc" } });
  const publishedCount = studies.filter((study) => study.isPublished).length;

  return (
    <div className="space-y-6">
      <ModuleHeader title="Case Studies" subtitle="Manage featured proof points and detail pages." />

      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard label="Displayed Studies" value={studies.length} />
        <AdminStatCard label="Published" value={publishedCount} />
        <AdminStatCard label="Status" value={studies.length ? "Live" : "Ready"} note={studies.length ? "Live proof active" : "Ready for first study"} />
      </div>

      <AdminCard>
        <AdminSectionHeader title="Create Case Study" description="Add a proof point for the public case studies page." />
        <form action={upsertCaseStudyAction} className="mt-5 grid gap-4 md:grid-cols-2">
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
          <div className="grid gap-2 sm:grid-cols-2"><AdminCheckbox label="Featured" name="isFeatured" /><AdminCheckbox label="Published" name="isPublished" /></div>
          <AdminActionRow className="md:col-span-2"><AdminSubmitButton>Save Case Study</AdminSubmitButton></AdminActionRow>
        </form>
      </AdminCard>

      <div className="space-y-3">
      <AdminSectionHeader title="Manage Case Studies" description="Open a case study to edit page copy, metrics, images, or publishing state." />
      {studies.map((study) => (
        <AdminEditCard key={study.id} title={study.title} meta={`slug: ${study.slug} / order ${study.displayOrder}${study.isFeatured ? " / featured" : ""}`} published={study.isPublished}>
          <form action={upsertCaseStudyAction} className="grid gap-4 md:grid-cols-2">
            <input type="hidden" name="id" value={study.id} />
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
            <div className="grid gap-2 sm:grid-cols-2"><AdminCheckbox label="Featured" name="isFeatured" defaultChecked={study.isFeatured} /><AdminCheckbox label="Published" name="isPublished" defaultChecked={study.isPublished} /></div>
            <AdminActionRow className="md:col-span-2"><AdminSubmitButton>Update Case Study</AdminSubmitButton></AdminActionRow>
          </form>
          <form action={deleteCaseStudyAction} className="mt-3"><input type="hidden" name="id" value={study.id} /><AdminDeleteButton /></form>
        </AdminEditCard>
      ))}
      </div>
    </div>
  );
}
