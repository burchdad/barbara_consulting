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
import { deleteTestimonialAction, upsertTestimonialAction } from "@/lib/actions";
import { ensureContentBaseline } from "@/lib/content-baseline";
import { prisma } from "@/lib/prisma";

export default async function AdminTestimonialsPage() {
  await ensureContentBaseline();
  const testimonials = await prisma.testimonial.findMany({ orderBy: { displayOrder: "asc" } });
  const publishedCount = testimonials.filter((item) => item.isPublished).length;

  return (
    <div className="space-y-6">
      <ModuleHeader title="Testimonials" subtitle="Manage social proof shown on public pages." />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard label="Displayed Testimonials" value={testimonials.length} />
        <AdminStatCard label="Published" value={publishedCount} />
        <AdminStatCard label="Status" value={testimonials.length ? "Live" : "Ready"} note={testimonials.length ? "Testimonials live" : "Ready for first testimonial"} />
      </div>
      <AdminCard>
        <AdminSectionHeader title="Create Testimonial" description="Add a public quote for social proof sections." />
        <form action={upsertTestimonialAction} className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2"><AdminTextArea label="Quote" name="quote" required /></div>
          <AdminField label="Author Name" name="authorName" required />
          <AdminField label="Author Title" name="authorTitle" required />
          <AdminField label="Organization" name="organization" required />
          <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={0} />
          <AdminCheckbox label="Published" name="isPublished" />
          <AdminActionRow className="md:col-span-2"><AdminSubmitButton>Save Testimonial</AdminSubmitButton></AdminActionRow>
        </form>
      </AdminCard>

      <div className="space-y-3">
      <AdminSectionHeader title="Manage Testimonials" description="Open a testimonial to update attribution, quote text, or visibility." />
      {testimonials.map((item) => (
        <AdminEditCard key={item.id} title={item.authorName} meta={`${item.organization} / order ${item.displayOrder}`} published={item.isPublished}>
          <form action={upsertTestimonialAction} className="grid gap-4 md:grid-cols-2">
            <input type="hidden" name="id" value={item.id} />
            <div className="md:col-span-2"><AdminTextArea label="Quote" name="quote" defaultValue={item.quote} required /></div>
            <AdminField label="Author Name" name="authorName" defaultValue={item.authorName} required />
            <AdminField label="Author Title" name="authorTitle" defaultValue={item.authorTitle} required />
            <AdminField label="Organization" name="organization" defaultValue={item.organization} required />
            <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={item.displayOrder} />
            <AdminCheckbox label="Published" name="isPublished" defaultChecked={item.isPublished} />
            <AdminActionRow className="md:col-span-2"><AdminSubmitButton>Update Testimonial</AdminSubmitButton></AdminActionRow>
          </form>
          <form action={deleteTestimonialAction} className="mt-3"><input type="hidden" name="id" value={item.id} /><AdminDeleteButton /></form>
        </AdminEditCard>
      ))}
      </div>
    </div>
  );
}
