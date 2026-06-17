import {
  AdminActionRow,
  AdminCard,
  AdminCheckbox,
  AdminDeleteButton,
  AdminEditCard,
  AdminField,
  AdminSectionHeader,
  AdminSelect,
  AdminStatCard,
  AdminSubmitButton,
} from "@/components/admin/admin-form";
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
        <AdminStatCard label="Saved Partners" value={partners.length} />
        <AdminStatCard label="Published Partners" value={publishedPartners} />
        <AdminStatCard label="Ecosystem Contacts" value={contacts.length} />
        <AdminStatCard label="Published Contacts" value={publishedContacts} />
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <AdminCard>
          <AdminSectionHeader title="Create Mission Partner" description="Add a partner logo and optional website link." />
          <form action={upsertPartnerAction} className="mt-5 grid gap-4 md:grid-cols-2">
            <AdminField label="Name" name="name" required />
            <AdminField label="Logo URL" name="logoUrl" />
            <AdminField label="Website URL" name="websiteUrl" />
            <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={0} />
            <AdminCheckbox label="Published" name="isPublished" />
            <AdminActionRow className="md:col-span-2"><AdminSubmitButton>Save Partner</AdminSubmitButton></AdminActionRow>
          </form>
        </AdminCard>

        <AdminCard>
          <AdminSectionHeader title="Create Partnerships Contact" description="Add advisors and technologists displayed on the partnerships page." />
          <form action={upsertPartnershipContactAction} className="mt-5 grid gap-4 md:grid-cols-2">
            <AdminField label="Name" name="name" required />
            <AdminField label="Organization / Descriptor" name="organization" required />
            <AdminSelect label="Category" name="category" defaultValue="advisor">
              <option value="advisor">Advisor</option>
              <option value="technologist">Technologist</option>
            </AdminSelect>
            <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={0} />
            <AdminCheckbox label="Published" name="isPublished" />
            <AdminActionRow className="md:col-span-2"><AdminSubmitButton>Save Contact</AdminSubmitButton></AdminActionRow>
          </form>
        </AdminCard>
      </div>

      <div className="space-y-3">
        <AdminSectionHeader title="Manage Mission Partners" description="Open a partner to update logos, links, order, or visibility." />
        {partners.map((partner) => (
          <AdminEditCard key={partner.id} title={partner.name} meta={`order ${partner.displayOrder}`} published={partner.isPublished}>
            <form action={upsertPartnerAction} className="grid gap-4 md:grid-cols-2">
              <input type="hidden" name="id" value={partner.id} />
              <AdminField label="Name" name="name" defaultValue={partner.name} required />
              <AdminField label="Logo URL" name="logoUrl" defaultValue={partner.logoUrl} />
              <AdminField label="Website URL" name="websiteUrl" defaultValue={partner.websiteUrl} />
              <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={partner.displayOrder} />
              <AdminCheckbox label="Published" name="isPublished" defaultChecked={partner.isPublished} />
              <AdminActionRow className="md:col-span-2"><AdminSubmitButton>Save Partner</AdminSubmitButton></AdminActionRow>
            </form>
            <form action={deletePartnerAction} className="mt-3">
              <input type="hidden" name="id" value={partner.id} />
              <AdminDeleteButton />
            </form>
          </AdminEditCard>
        ))}
      </div>

      {contactSections.map(({ category, items }) => (
        <div key={category} className="space-y-3">
          <AdminSectionHeader title={contactHeading(category)} description={`Manage ${contactHeading(category).toLowerCase()} shown in the partnerships ecosystem.`} />
          {items.length ? items.map((contact) => (
            <AdminEditCard key={contact.id} title={contact.name} meta={`${contact.organization} / order ${contact.displayOrder}`} published={contact.isPublished}>
              <form action={upsertPartnershipContactAction} className="grid gap-4 md:grid-cols-2">
                <input type="hidden" name="id" value={contact.id} />
                <input type="hidden" name="category" value={contact.category} />
                <AdminField label="Name" name="name" defaultValue={contact.name} required />
                <AdminField label="Organization / Descriptor" name="organization" defaultValue={contact.organization} required />
                <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={contact.displayOrder} />
                <AdminCheckbox label="Published" name="isPublished" defaultChecked={contact.isPublished} />
                <AdminActionRow className="md:col-span-2"><AdminSubmitButton>Save {contactLabel(contact.category)}</AdminSubmitButton></AdminActionRow>
              </form>
              <form action={deletePartnershipContactAction} className="mt-3">
                <input type="hidden" name="id" value={contact.id} />
                <AdminDeleteButton />
              </form>
            </AdminEditCard>
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
