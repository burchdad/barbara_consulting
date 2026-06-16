import { AdminCard, AdminField, AdminTextArea } from "@/components/admin/admin-form";
import { ModuleHeader } from "@/components/admin/module-header";
import { deleteContractAction, upsertContractAction } from "@/lib/actions";
import { contractsSeed } from "@/lib/data/contracts";
import { prisma } from "@/lib/prisma";

export default async function AdminContractsPage() {
  const savedContracts = await prisma.contract.findMany({ orderBy: { displayOrder: "asc" } }).catch((error) => {
    console.error("[admin/contracts] Unable to load contracts.", error);
    return [];
  });
  const contracts = savedContracts.length ? savedContracts : contractsSeed;
  const isShowingFallback = savedContracts.length === 0;
  const publishedCount = savedContracts.filter((contract) => contract.isPublished).length;

  return (
    <div className="space-y-6">
      <ModuleHeader title="Contracts" subtitle="Manage procurement-facing contract vehicle records." />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminCard><p className="text-sm text-zinc-400">Saved Contracts</p><p className="mt-2 text-4xl font-black">{savedContracts.length}</p></AdminCard>
        <AdminCard><p className="text-sm text-zinc-400">Published</p><p className="mt-2 text-4xl font-black">{publishedCount}</p></AdminCard>
        <AdminCard><p className="text-sm text-zinc-400">Status</p><p className="mt-2 text-lg font-black uppercase text-cyan-100">{publishedCount ? "Procurement content live" : "Using starter examples"}</p></AdminCard>
      </div>
      {isShowingFallback ? (
        <AdminCard className="border-cyan-200/25 bg-cyan-200/[0.04]">
          <p className="text-sm font-semibold text-cyan-100">No saved contracts were found. Starter vehicle examples are shown below; create and publish a contract to replace them.</p>
        </AdminCard>
      ) : null}
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
        <AdminCard key={isShowingFallback ? contract.contractNumber : contract.id}>
          {isShowingFallback ? (
            <article className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Starter Example</p>
              <h2 className="text-2xl font-black uppercase text-white">{contract.name}</h2>
              <p className="text-sm uppercase tracking-[0.12em] text-zinc-400">{contract.agency} / {contract.contractNumber} / {contract.contractType}</p>
              <p className="text-sm leading-6 text-zinc-300">{contract.summary}</p>
            </article>
          ) : (
            <>
              <form action={upsertContractAction} className="grid gap-3 md:grid-cols-2">
                <input type="hidden" name="id" value={contract.id} />
                <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-black uppercase">{contract.name}</h2>
                  <span className={contract.isPublished ? "text-xs font-bold uppercase text-cyan-300" : "text-xs font-bold uppercase text-zinc-500"}>{contract.isPublished ? "Published" : "Draft"}</span>
                </div>
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
                <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white md:col-span-2" type="submit">Update Contract</button>
              </form>
              <form action={deleteContractAction} className="mt-2"><input type="hidden" name="id" value={contract.id} /><button type="submit" className="rounded-md border border-white/20 px-3 py-1.5 text-xs">Delete</button></form>
            </>
          )}
        </AdminCard>
      ))}
    </div>
  );
}
