import { Section } from "@/components/ui/section";
import { CareersClient } from "@/components/public/careers-client";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/config/site";

export default async function CareersPage() {
  const jobs = await prisma.job.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      location: true,
      jobType: true,
      employmentType: true,
      applyUrl: true,
      description: true,
    },
  });

  return (
    <main>
      <Section>
        <h1 className="text-5xl font-black uppercase">{siteConfig.careers.headline}</h1>
        <p className="mt-4 max-w-3xl text-zinc-300">{siteConfig.careers.subtext}</p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-zinc-300">
          {siteConfig.careers.perks.map((item) => (
            <span key={item} className="rounded-md border border-white/15 px-3 py-2">{item}</span>
          ))}
        </div>
      </Section>

      <Section>
        <CareersClient jobs={jobs} />
      </Section>
    </main>
  );
}
