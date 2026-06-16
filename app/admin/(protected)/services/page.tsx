import { AdminCard, AdminField, AdminTextArea } from "@/components/admin/admin-form";
import { ModuleHeader } from "@/components/admin/module-header";
import { deleteServiceAction, upsertServiceAction } from "@/lib/actions";
import { ensureContentBaseline } from "@/lib/content-baseline";
import { prisma } from "@/lib/prisma";

function toLines(value: unknown) {
  return Array.isArray(value) ? value.join("\n") : "";
}

export default async function AdminServicesPage() {
  await ensureContentBaseline();
  const services = await prisma.serviceItem.findMany({ orderBy: { displayOrder: "asc" } });
  const publishedCount = services.filter((service) => service.isPublished).length;

  return (
    <div className="space-y-6">
      <ModuleHeader title="Services" subtitle="Maintain capability categories and bullet content." />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminCard><p className="text-sm text-zinc-400">Displayed Services</p><p className="mt-2 text-4xl font-black">{services.length}</p></AdminCard>
        <AdminCard><p className="text-sm text-zinc-400">Published</p><p className="mt-2 text-4xl font-black">{publishedCount}</p></AdminCard>
        <AdminCard><p className="text-sm text-zinc-400">Status</p><p className="mt-2 text-lg font-black uppercase text-cyan-100">{services.length ? "Services live" : "Ready for first service"}</p></AdminCard>
      </div>
      <AdminCard>
        <h2 className="text-xl font-black uppercase">Create Service Item</h2>
        <form action={upsertServiceAction} className="mt-4 grid gap-3 md:grid-cols-2">
          <AdminField label="Category" name="category" required />
          <AdminField label="Title" name="title" required />
          <div className="md:col-span-2"><AdminTextArea label="Description" name="description" required /></div>
          <div className="md:col-span-2"><AdminTextArea label="Bullet Items (one per line)" name="bulletItems" required /></div>
          <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={0} />
          <label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" name="isPublished" /> Published</label>
          <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white md:col-span-2" type="submit">Save Service</button>
        </form>
      </AdminCard>

      {services.map((service) => (
        <AdminCard key={service.id}>
          <form action={upsertServiceAction} className="grid gap-3 md:grid-cols-2">
            <input type="hidden" name="id" value={service.id} />
            <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-black uppercase">{service.title}</h2>
              <span className={service.isPublished ? "text-xs font-bold uppercase text-cyan-300" : "text-xs font-bold uppercase text-zinc-500"}>{service.isPublished ? "Published" : "Draft"}</span>
            </div>
            <AdminField label="Category" name="category" defaultValue={service.category} required />
            <AdminField label="Title" name="title" defaultValue={service.title} required />
            <div className="md:col-span-2"><AdminTextArea label="Description" name="description" defaultValue={service.description} required /></div>
            <div className="md:col-span-2"><AdminTextArea label="Bullet Items" name="bulletItems" defaultValue={toLines(service.bulletItems)} required /></div>
            <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={service.displayOrder} />
            <label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" name="isPublished" defaultChecked={service.isPublished} /> Published</label>
            <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white md:col-span-2" type="submit">Update Service</button>
          </form>
          <form action={deleteServiceAction} className="mt-2"><input type="hidden" name="id" value={service.id} /><button type="submit" className="rounded-md border border-white/20 px-3 py-1.5 text-xs">Delete</button></form>
        </AdminCard>
      ))}
    </div>
  );
}
