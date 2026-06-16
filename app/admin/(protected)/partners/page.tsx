import { AdminCard, AdminField } from "@/components/admin/admin-form";
import { ModuleHeader } from "@/components/admin/module-header";
import { deletePartnerAction, upsertPartnerAction } from "@/lib/actions";
import { ensureContentBaseline } from "@/lib/content-baseline";
import { prisma } from "@/lib/prisma";

export default async function AdminPartnersPage() {
  await ensureContentBaseline();
  const partners = await prisma.missionPartner.findMany({ orderBy: { displayOrder: "asc" } });
  const publishedCount = partners.filter((partner) => partner.isPublished).length;

  return (
    <div className="space-y-6">
      <ModuleHeader title="Mission Partners" subtitle="Manage published partner records used on the partnerships page." />

      <div className="grid gap-4 md:grid-cols-3">
        <AdminCard><p className="text-sm text-zinc-400">Saved Partners</p><p className="mt-2 text-4xl font-black">{partners.length}</p></AdminCard>
        <AdminCard><p className="text-sm text-zinc-400">Published</p><p className="mt-2 text-4xl font-black">{publishedCount}</p></AdminCard>
        <AdminCard><p className="text-sm text-zinc-400">Status</p><p className="mt-2 text-lg font-black uppercase text-cyan-100">{partners.length ? "Partner records live" : "Ready for first entry"}</p></AdminCard>
      </div>

      {!partners.length ? (
        <AdminCard className="border-cyan-200/25 bg-cyan-200/[0.04]">
          <p className="text-sm font-semibold text-cyan-100">
            No partner records are published yet. Add mission partners here and they will appear on the public partnerships page.
          </p>
        </AdminCard>
      ) : null}

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

      <div className="space-y-4">
        {partners.map((partner) => (
          <AdminCard key={partner.id}>
            <form action={upsertPartnerAction} className="grid gap-3 md:grid-cols-2">
              <input type="hidden" name="id" value={partner.id} />
              <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-black uppercase">{partner.name}</h2>
                <span className={partner.isPublished ? "text-xs font-bold uppercase text-cyan-300" : "text-xs font-bold uppercase text-zinc-500"}>
                  {partner.isPublished ? "Published" : "Draft"}
                </span>
              </div>
              <AdminField label="Name" name="name" defaultValue={partner.name} required />
              <AdminField label="Logo URL" name="logoUrl" defaultValue={partner.logoUrl} />
              <AdminField label="Website URL" name="websiteUrl" defaultValue={partner.websiteUrl} />
              <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={partner.displayOrder} />
              <label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" name="isPublished" defaultChecked={partner.isPublished} /> Published</label>
              <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white md:col-span-2" type="submit">Save Partner</button>
            </form>
            <form action={deletePartnerAction} className="mt-2">
              <input type="hidden" name="id" value={partner.id} />
              <button type="submit" className="rounded-md border border-white/20 px-3 py-1.5 text-xs">Delete</button>
            </form>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}
