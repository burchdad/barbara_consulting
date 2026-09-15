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
import { deleteContractAction, upsertContractAction } from "@/lib/actions";
import { ensureContentBaseline } from "@/lib/content-baseline";
import { prisma } from "@/lib/prisma";
import { getContractDates } from "@/lib/contract-period";

export default async function AdminContractsPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  await ensureContentBaseline();
  const contracts = await prisma.contract.findMany({ orderBy: { displayOrder: "asc" } });
  const publishedCount = contracts.filter((contract) => contract.isPublished).length;

  return (
    <div className="space-y-6">
      <ModuleHeader title="Contracts" subtitle="Manage procurement-facing contract vehicle records." />
      {error === "period" && <p role="alert" className="text-red-300">Enter valid contract dates. The expiration date must be on or after the begin date.</p>}
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard label="Displayed Contracts" value={contracts.length} />
        <AdminStatCard label="Published" value={publishedCount} />
        <AdminStatCard label="Status" value={contracts.length ? "Live" : "Ready"} note={contracts.length ? "Procurement content live" : "Ready for first contract"} />
      </div>
      <AdminCard>
        <AdminSectionHeader title="Create Contract" description="Add a contract vehicle for procurement-facing pages." />
        <form action={upsertContractAction} className="mt-5 grid gap-4 md:grid-cols-2">
          <AdminField label="Contract Name" name="name" required />
          <AdminField label="Contract Number" name="contractNumber" required />
          <AdminField label="Agency" name="agency" required />
          <AdminField label="Begin Date (optional)" name="beginDate" type="date" />
          <AdminField label="End / Expiration Date" name="expirationDate" type="date" required />
          <p className="text-xs text-zinc-400 md:col-span-2">Dates stay in the admin. The public page shows Active through the expiration day (Eastern time), Upcoming before the begin date, and Expired afterward.</p>
          <AdminField label="Contract Type" name="contractType" required />
          <AdminField label="Availability" name="availability" required />
          <AdminField label="Program Manager" name="programManager" required />
          <AdminField label="Email" name="email" type="email" required />
          <AdminField label="Phone" name="phone" required />
          <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={0} />
          <AdminCheckbox label="Published" name="isPublished" />
          <div className="md:col-span-2"><AdminTextArea label="Summary" name="summary" required /></div>
          <div className="md:col-span-2"><AdminTextArea label="Scope" name="scope" required /></div>
          <AdminActionRow className="md:col-span-2"><AdminSubmitButton>Save Contract</AdminSubmitButton></AdminActionRow>
        </form>
      </AdminCard>

      <div className="space-y-3">
      <AdminSectionHeader title="Manage Contracts" description="Open a contract record to update vehicle details and availability." />
      {contracts.map((contract) => (
        <AdminEditCard key={contract.id} title={contract.name} meta={`${contract.agency} / ${contract.contractNumber} / ${contract.contractType}`} published={contract.isPublished}>
          <form action={upsertContractAction} className="grid gap-4 md:grid-cols-2">
            <input type="hidden" name="id" value={contract.id} />
            <AdminField label="Contract Name" name="name" defaultValue={contract.name} required />
            <AdminField label="Contract Number" name="contractNumber" defaultValue={contract.contractNumber} required />
            <AdminField label="Agency" name="agency" defaultValue={contract.agency} required />
            <AdminField label="Begin Date (optional)" name="beginDate" type="date" defaultValue={getContractDates(contract).beginDate} />
            <AdminField label="End / Expiration Date" name="expirationDate" type="date" defaultValue={getContractDates(contract).expirationDate} required />
            <p className="text-xs text-zinc-400 md:col-span-2">Dates stay in the admin. Active includes the expiration day (Eastern time). Legacy period: {contract.period}. Year-only expirations use December 31; confirm the exact date when known.</p>
            <AdminField label="Contract Type" name="contractType" defaultValue={contract.contractType} required />
            <AdminField label="Availability" name="availability" defaultValue={contract.availability} required />
            <AdminField label="Program Manager" name="programManager" defaultValue={contract.programManager} required />
            <AdminField label="Email" name="email" type="email" defaultValue={contract.email} required />
            <AdminField label="Phone" name="phone" defaultValue={contract.phone} required />
            <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={contract.displayOrder} />
            <AdminCheckbox label="Published" name="isPublished" defaultChecked={contract.isPublished} />
            <div className="md:col-span-2"><AdminTextArea label="Summary" name="summary" defaultValue={contract.summary} required /></div>
            <div className="md:col-span-2"><AdminTextArea label="Scope" name="scope" defaultValue={contract.scope} required /></div>
            <AdminActionRow className="md:col-span-2"><AdminSubmitButton>Update Contract</AdminSubmitButton></AdminActionRow>
          </form>
          <form action={deleteContractAction} className="mt-3"><input type="hidden" name="id" value={contract.id} /><AdminDeleteButton /></form>
        </AdminEditCard>
      ))}
      </div>
    </div>
  );
}
