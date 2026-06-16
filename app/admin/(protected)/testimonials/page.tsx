import { AdminCard, AdminField, AdminTextArea } from "@/components/admin/admin-form";
import { ModuleHeader } from "@/components/admin/module-header";
import { deleteTestimonialAction, upsertTestimonialAction } from "@/lib/actions";
import { testimonialsSeed } from "@/lib/data/testimonials";
import { prisma } from "@/lib/prisma";

export default async function AdminTestimonialsPage() {
  const savedTestimonials = await prisma.testimonial.findMany({ orderBy: { displayOrder: "asc" } }).catch((error) => {
    console.error("[admin/testimonials] Unable to load testimonials.", error);
    return [];
  });
  const testimonials = savedTestimonials.length ? savedTestimonials : testimonialsSeed;
  const isShowingFallback = savedTestimonials.length === 0;
  const publishedCount = testimonials.filter((item) => item.isPublished).length;

  return (
    <div className="space-y-6">
      <ModuleHeader title="Testimonials" subtitle="Manage social proof shown on public pages." />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminCard><p className="text-sm text-zinc-400">Displayed Testimonials</p><p className="mt-2 text-4xl font-black">{testimonials.length}</p></AdminCard>
        <AdminCard><p className="text-sm text-zinc-400">Published</p><p className="mt-2 text-4xl font-black">{publishedCount}</p></AdminCard>
        <AdminCard><p className="text-sm text-zinc-400">Status</p><p className="mt-2 text-lg font-black uppercase text-cyan-100">{isShowingFallback ? "Default content active" : "Testimonials live"}</p></AdminCard>
      </div>
      {isShowingFallback ? (
        <AdminCard className="border-cyan-200/25 bg-cyan-200/[0.04]">
          <p className="text-sm font-semibold text-cyan-100">Displaying default testimonial content for this environment. When saved testimonial records exist, this tab automatically uses the live database content.</p>
        </AdminCard>
      ) : null}
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
        <AdminCard key={isShowingFallback ? `${item.authorName}-${item.displayOrder}` : item.id}>
          {isShowingFallback ? (
            <article className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Displayed Content</p>
              <blockquote className="text-lg leading-7 text-zinc-100">{item.quote}</blockquote>
              <p className="text-sm uppercase tracking-[0.12em] text-zinc-400">{item.authorName} / {item.organization}</p>
            </article>
          ) : (
            <>
              <form action={upsertTestimonialAction} className="grid gap-3 md:grid-cols-2">
                <input type="hidden" name="id" value={item.id} />
                <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-black uppercase">{item.authorName}</h2>
                  <span className={item.isPublished ? "text-xs font-bold uppercase text-cyan-300" : "text-xs font-bold uppercase text-zinc-500"}>{item.isPublished ? "Published" : "Draft"}</span>
                </div>
                <div className="md:col-span-2"><AdminTextArea label="Quote" name="quote" defaultValue={item.quote} required /></div>
                <AdminField label="Author Name" name="authorName" defaultValue={item.authorName} required />
                <AdminField label="Author Title" name="authorTitle" defaultValue={item.authorTitle} required />
                <AdminField label="Organization" name="organization" defaultValue={item.organization} required />
                <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={item.displayOrder} />
                <label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" name="isPublished" defaultChecked={item.isPublished} /> Published</label>
                <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white md:col-span-2" type="submit">Update Testimonial</button>
              </form>
              <form action={deleteTestimonialAction} className="mt-2"><input type="hidden" name="id" value={item.id} /><button type="submit" className="rounded-md border border-white/20 px-3 py-1.5 text-xs">Delete</button></form>
            </>
          )}
        </AdminCard>
      ))}
    </div>
  );
}
