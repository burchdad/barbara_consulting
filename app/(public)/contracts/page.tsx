import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/config/site";
import { getPublicContractsPageData } from "@/lib/site-data";

export default async function ContractsPage() {
  const { contracts, settings } = await getPublicContractsPageData();
  const heroImageUrl = settings?.contractsHeroImageUrl || siteConfig.media.contractsHeroImageUrl;

  return (
    <main>
      <Section className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/50 py-12">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(2, 6, 23, 0.3), rgba(2, 6, 23, 0.86)), url(${heroImageUrl})`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(56,189,248,0.2),transparent_32%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
        <h1 className="relative text-5xl font-black uppercase">AI-Ready Contract Vehicles</h1>
        <p className="relative mt-4 max-w-3xl text-zinc-300">Our contract portfolio enables agencies and partners to engage rapidly with trusted AI and mission delivery teams.</p>
      </Section>

      <Section className="grid gap-4 lg:grid-cols-2">
        {contracts.map((contract) => (
          <article key={contract.id} className="contract-card rounded-xl border border-white/10 bg-white/[0.02] p-5">
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
