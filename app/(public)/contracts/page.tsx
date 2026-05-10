import { Section } from "@/components/ui/section";
import { prisma } from "@/lib/prisma";

export default async function ContractsPage() {
  const contracts = await prisma.contract.findMany({ where: { isPublished: true }, orderBy: { displayOrder: "asc" } });

  return (
    <main>
      <Section>
        <h1 className="text-5xl font-black uppercase">Contract Vehicles & Procurement Access</h1>
        <p className="mt-4 max-w-3xl text-zinc-300">Our contract portfolio enables agencies and partners to engage quickly with proven delivery teams.</p>
      </Section>

      <Section className="grid gap-4 lg:grid-cols-2">
        {contracts.map((contract) => (
          <article key={contract.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <h2 className="text-2xl font-black uppercase">{contract.name}</h2>
            <div className="mt-4 grid gap-2 text-sm text-zinc-300 sm:grid-cols-2">
              <p><span className="text-zinc-500">Contract #:</span> {contract.contractNumber}</p>
              <p><span className="text-zinc-500">Agency:</span> {contract.agency}</p>
              <p><span className="text-zinc-500">Period:</span> {contract.period}</p>
              <p><span className="text-zinc-500">Type:</span> {contract.contractType}</p>
              <p><span className="text-zinc-500">Availability:</span> {contract.availability}</p>
              <p><span className="text-zinc-500">Program Manager:</span> {contract.programManager}</p>
              <p><span className="text-zinc-500">Email:</span> {contract.email}</p>
              <p><span className="text-zinc-500">Phone:</span> {contract.phone}</p>
            </div>
            <p className="mt-4 text-sm text-zinc-300"><span className="text-zinc-500">Summary:</span> {contract.summary}</p>
            <p className="mt-2 text-sm text-zinc-300"><span className="text-zinc-500">Scope:</span> {contract.scope}</p>
          </article>
        ))}
      </Section>
    </main>
  );
}
