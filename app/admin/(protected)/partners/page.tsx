import { AdminCard, AdminField } from "@/components/admin/admin-form";
import { ModuleHeader } from "@/components/admin/module-header";
import { deletePartnerAction, upsertPartnerAction } from "@/lib/actions";
import { prisma } from "@/lib/prisma";

export default async function AdminPartnersPage() {
  const partners = await prisma.missionPartner.findMany({ orderBy: { displayOrder: "asc" } });

  return (
    <div className="space-y-6">
      <ModuleHeader title="Mission Partners" subtitle="Manage logo list and partner references." />
      <AdminCard>
        <h2 className="text-xl font-black uppercase">Create Partner</h2>
        <form action={upsertPartnerAction} className="mt-4 grid gap-3 md:grid-cols-2">
          <AdminField label="Name" name="name" required />
          <AdminField label="Logo URL" name="logoUrl" />
          <AdminField label="Website URL" name="websiteUrl" />
          <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={0} />
          <label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" name="isPublished" /> Published</label>
          <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white md:col-span-2" type="submit">Save Partner</button>
        </form>
      </AdminCard>

      {partners.map((partner) => (
        <AdminCard key={partner.id}>
          <form action={upsertPartnerAction} className="grid gap-3 md:grid-cols-2">
            <input type="hidden" name="id" value={partner.id} />
            <AdminField label="Name" name="name" defaultValue={partner.name} required />
            <AdminField label="Logo URL" name="logoUrl" defaultValue={partner.logoUrl} />
            <AdminField label="Website URL" name="websiteUrl" defaultValue={partner.websiteUrl} />
            <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={partner.displayOrder} />
            <label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" name="isPublished" defaultChecked={partner.isPublished} /> Published</label>
            <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white md:col-span-2" type="submit">Update</button>
          </form>
          <form action={deletePartnerAction} className="mt-2"><input type="hidden" name="id" value={partner.id} /><button type="submit" className="rounded-md border border-white/20 px-3 py-1.5 text-xs">Delete</button></form>
        </AdminCard>
      ))}
    </div>
  );
}
