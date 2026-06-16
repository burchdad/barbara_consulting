import { AdminCard, AdminField } from "@/components/admin/admin-form";
import { ModuleHeader } from "@/components/admin/module-header";
import {
  deletePartnerAction,
  deletePartnershipContactAction,
  upsertPartnerAction,
  upsertPartnershipContactAction,
} from "@/lib/actions";
import { ensureContentBaseline } from "@/lib/content-baseline";
import { ensurePartnershipContactCompatibility } from "@/lib/partnership-contact-compatibility";
import { prisma } from "@/lib/prisma";

function contactHeading(category: string) {
  return category === "advisor" ? "Key Advisors" : "Key Technologists";
}

function contactLabel(category: string) {
  return category === "advisor" ? "Advisor" : "Technologist";
}

export default async function AdminPartnersPage() {
  await ensureContentBaseline();
  await ensurePartnershipContactCompatibility();

  const [partners, contacts] = await Promise.all([
    prisma.missionPartner.findMany({ orderBy: { displayOrder: "asc" } }),
    prisma.partnershipContact.findMany({ orderBy: [{ category: "asc" }, { displayOrder: "asc" }] }),
  ]);

  const publishedPartners = partners.filter((partner) => partner.isPublished).length;
  const publishedContacts = contacts.filter((contact) => contact.isPublished).length;
  const advisors = contacts.filter((contact) => contact.category === "advisor");
  const technologists = contacts.filter((contact) => contact.category === "technologist");
  const contactSections = [
    { category: "advisor", items: advisors },
    { category: "technologist", items: technologists },
  ] as const;

  return (
    <div className="space-y-6">
      <ModuleHeader title="Mission Partners" subtitle="Manage published partner, advisor, and technologist records used on the partnerships page." />

      <div className="grid gap-4 md:grid-cols-4">
        <AdminCard><p className="text-sm text-zinc-400">Saved Partners</p><p className="mt-2 text-4xl font-black">{partners.length}</p></AdminCard>
        <AdminCard><p className="text-sm text-zinc-400">Published Partners</p><p className="mt-2 text-4xl font-black">{publishedPartners}</p></AdminCard>
        <AdminCard><p className="text-sm text-zinc-400">Ecosystem Contacts</p><p className="mt-2 text-4xl font-black">{contacts.length}</p></AdminCard>
        <AdminCard><p className="text-sm text-zinc-400">Published Contacts</p><p className="mt-2 text-4xl font-black">{publishedContacts}</p></AdminCard>
      </div>

      <AdminCard>
        <h2 className="text-xl font-black uppercase">Create Mission Partner</h2>
        <form action={upsertPartnerAction} className="mt-4 grid gap-3 md:grid-cols-2">
          <AdminField label="Name" name="name" required />
          <AdminField label="Logo URL" name="logoUrl" />
          <AdminField label="Website URL" name="websiteUrl" />
          <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={0} />
          <label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" name="isPublished" /> Published</label>
          <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white md:col-span-2" type="submit">Save Partner</button>
        </form>
      </AdminCard>

      <AdminCard>
        <h2 className="text-xl font-black uppercase">Create Partnerships Contact</h2>
        <form action={upsertPartnershipContactAction} className="mt-4 grid gap-3 md:grid-cols-2">
          <AdminField label="Name" name="name" required />
          <AdminField label="Organization / Descriptor" name="organization" required />
          <label className="grid gap-2 text-sm text-zinc-300">
            <span>Category</span>
            <select name="category" defaultValue="advisor" className="rounded-md border border-white/15 bg-black px-3 py-2 text-sm text-zinc-100">
              <option value="advisor">Advisor</option>
              <option value="technologist">Technologist</option>
            </select>
          </label>
          <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={0} />
          <label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" name="isPublished" /> Published</label>
          <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white md:col-span-2" type="submit">Save Partnerships Contact</button>
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

      {contactSections.map(({ category, items }) => (
        <div key={category} className="space-y-4">
          <h2 className="text-xl font-black uppercase text-white">{contactHeading(category)}</h2>
          {items.length ? items.map((contact) => (
            <AdminCard key={contact.id}>
              <form action={upsertPartnershipContactAction} className="grid gap-3 md:grid-cols-2">
                <input type="hidden" name="id" value={contact.id} />
                <input type="hidden" name="category" value={contact.category} />
                <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-xl font-black uppercase">{contact.name}</h3>
                  <span className={contact.isPublished ? "text-xs font-bold uppercase text-cyan-300" : "text-xs font-bold uppercase text-zinc-500"}>
                    {contact.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <AdminField label="Name" name="name" defaultValue={contact.name} required />
                <AdminField label="Organization / Descriptor" name="organization" defaultValue={contact.organization} required />
                <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={contact.displayOrder} />
                <label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" name="isPublished" defaultChecked={contact.isPublished} /> Published</label>
                <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white md:col-span-2" type="submit">Save {contactLabel(contact.category)}</button>
              </form>
              <form action={deletePartnershipContactAction} className="mt-2">
                <input type="hidden" name="id" value={contact.id} />
                <button type="submit" className="rounded-md border border-white/20 px-3 py-1.5 text-xs">Delete</button>
              </form>
            </AdminCard>
          )) : (
            <AdminCard>
              <p className="text-sm text-zinc-400">No {contactHeading(category).toLowerCase()} saved yet.</p>
            </AdminCard>
          )}
        </div>
      ))}
    </div>
  );
}
