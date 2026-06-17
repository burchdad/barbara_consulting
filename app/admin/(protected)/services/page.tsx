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
        <AdminStatCard label="Displayed Services" value={services.length} />
        <AdminStatCard label="Published" value={publishedCount} />
        <AdminStatCard label="Status" value={services.length ? "Live" : "Ready"} note={services.length ? "Services live" : "Ready for first service"} />
      </div>
      <AdminCard>
        <AdminSectionHeader title="Create Service Item" description="Add a public capability card to the services page." />
        <form action={upsertServiceAction} className="mt-5 grid gap-4 md:grid-cols-2">
          <AdminField label="Category" name="category" required />
          <AdminField label="Title" name="title" required />
          <div className="md:col-span-2"><AdminTextArea label="Description" name="description" required /></div>
          <div className="md:col-span-2"><AdminTextArea label="Bullet Items (one per line)" name="bulletItems" required /></div>
          <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={0} />
          <AdminCheckbox label="Published" name="isPublished" />
          <AdminActionRow className="md:col-span-2"><AdminSubmitButton>Save Service</AdminSubmitButton></AdminActionRow>
        </form>
      </AdminCard>

      <div className="space-y-3">
        <AdminSectionHeader title="Manage Services" description="Open a record to edit, reorder, publish, or delete it." />
        {services.map((service) => (
        <AdminEditCard key={service.id} title={service.title} meta={`${service.category} / order ${service.displayOrder}`} published={service.isPublished}>
          <form action={upsertServiceAction} className="grid gap-4 md:grid-cols-2">
            <input type="hidden" name="id" value={service.id} />
            <AdminField label="Category" name="category" defaultValue={service.category} required />
            <AdminField label="Title" name="title" defaultValue={service.title} required />
            <div className="md:col-span-2"><AdminTextArea label="Description" name="description" defaultValue={service.description} required /></div>
            <div className="md:col-span-2"><AdminTextArea label="Bullet Items" name="bulletItems" defaultValue={toLines(service.bulletItems)} required /></div>
            <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={service.displayOrder} />
            <AdminCheckbox label="Published" name="isPublished" defaultChecked={service.isPublished} />
            <AdminActionRow className="md:col-span-2"><AdminSubmitButton>Update Service</AdminSubmitButton></AdminActionRow>
          </form>
          <form action={deleteServiceAction} className="mt-3"><input type="hidden" name="id" value={service.id} /><AdminDeleteButton /></form>
        </AdminEditCard>
        ))}
      </div>
    </div>
  );
}
