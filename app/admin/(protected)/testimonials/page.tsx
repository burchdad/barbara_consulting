import { AdminCard, AdminField, AdminTextArea } from "@/components/admin/admin-form";
import { ModuleHeader } from "@/components/admin/module-header";
import { deleteTestimonialAction, upsertTestimonialAction } from "@/lib/actions";
import { prisma } from "@/lib/prisma";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { displayOrder: "asc" } });

  return (
    <div className="space-y-6">
      <ModuleHeader title="Testimonials" subtitle="Manage social proof shown on public pages." />
      <AdminCard>
        <h2 className="text-xl font-black uppercase">Create Testimonial</h2>
        <form action={upsertTestimonialAction} className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="md:col-span-2"><AdminTextArea label="Quote" name="quote" required /></div>
          <AdminField label="Author Name" name="authorName" required />
          <AdminField label="Author Title" name="authorTitle" required />
          <AdminField label="Organization" name="organization" required />
          <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={0} />
          <label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" name="isPublished" /> Published</label>
          <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white md:col-span-2" type="submit">Save Testimonial</button>
        </form>
      </AdminCard>

      {testimonials.map((item) => (
        <AdminCard key={item.id}>
          <form action={upsertTestimonialAction} className="grid gap-3 md:grid-cols-2">
            <input type="hidden" name="id" value={item.id} />
            <div className="md:col-span-2"><AdminTextArea label="Quote" name="quote" defaultValue={item.quote} required /></div>
            <AdminField label="Author Name" name="authorName" defaultValue={item.authorName} required />
            <AdminField label="Author Title" name="authorTitle" defaultValue={item.authorTitle} required />
            <AdminField label="Organization" name="organization" defaultValue={item.organization} required />
            <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={item.displayOrder} />
            <label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" name="isPublished" defaultChecked={item.isPublished} /> Published</label>
            <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white md:col-span-2" type="submit">Update</button>
          </form>
          <form action={deleteTestimonialAction} className="mt-2"><input type="hidden" name="id" value={item.id} /><button type="submit" className="rounded-md border border-white/20 px-3 py-1.5 text-xs">Delete</button></form>
        </AdminCard>
      ))}
    </div>
  );
}
