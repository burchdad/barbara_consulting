import { AdminCard, AdminField, AdminTextArea } from "@/components/admin/admin-form";
import { ModuleHeader } from "@/components/admin/module-header";
import { deleteContractAction, upsertContractAction } from "@/lib/actions";
import { prisma } from "@/lib/prisma";

export default async function AdminContractsPage() {
  const contracts = await prisma.contract.findMany({ orderBy: { displayOrder: "asc" } });

  return (
    <div className="space-y-6">
      <ModuleHeader title="Contracts" subtitle="Manage procurement-facing contract vehicle records." />
      <AdminCard>
        <h2 className="text-xl font-black uppercase">Create Contract</h2>
        <form action={upsertContractAction} className="mt-4 grid gap-3 md:grid-cols-2">
          <AdminField label="Contract Name" name="name" required />
          <AdminField label="Contract Number" name="contractNumber" required />
          <AdminField label="Agency" name="agency" required />
          <AdminField label="Period" name="period" required />
          <AdminField label="Contract Type" name="contractType" required />
          <AdminField label="Availability" name="availability" required />
          <AdminField label="Program Manager" name="programManager" required />
          <AdminField label="Email" name="email" type="email" required />
          <AdminField label="Phone" name="phone" required />
          <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={0} />
          <label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" name="isPublished" /> Published</label>
          <div className="md:col-span-2"><AdminTextArea label="Summary" name="summary" required /></div>
          <div className="md:col-span-2"><AdminTextArea label="Scope" name="scope" required /></div>
          <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white md:col-span-2" type="submit">Save Contract</button>
        </form>
      </AdminCard>

      {contracts.map((contract) => (
        <AdminCard key={contract.id}>
          <form action={upsertContractAction} className="grid gap-3 md:grid-cols-2">
            <input type="hidden" name="id" value={contract.id} />
            <AdminField label="Contract Name" name="name" defaultValue={contract.name} required />
            <AdminField label="Contract Number" name="contractNumber" defaultValue={contract.contractNumber} required />
            <AdminField label="Agency" name="agency" defaultValue={contract.agency} required />
            <AdminField label="Period" name="period" defaultValue={contract.period} required />
            <AdminField label="Contract Type" name="contractType" defaultValue={contract.contractType} required />
            <AdminField label="Availability" name="availability" defaultValue={contract.availability} required />
            <AdminField label="Program Manager" name="programManager" defaultValue={contract.programManager} required />
            <AdminField label="Email" name="email" type="email" defaultValue={contract.email} required />
            <AdminField label="Phone" name="phone" defaultValue={contract.phone} required />
            <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={contract.displayOrder} />
            <label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" name="isPublished" defaultChecked={contract.isPublished} /> Published</label>
            <div className="md:col-span-2"><AdminTextArea label="Summary" name="summary" defaultValue={contract.summary} required /></div>
            <div className="md:col-span-2"><AdminTextArea label="Scope" name="scope" defaultValue={contract.scope} required /></div>
            <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white md:col-span-2" type="submit">Update</button>
          </form>
          <form action={deleteContractAction} className="mt-2"><input type="hidden" name="id" value={contract.id} /><button type="submit" className="rounded-md border border-white/20 px-3 py-1.5 text-xs">Delete</button></form>
        </AdminCard>
      ))}
    </div>
  );
}
