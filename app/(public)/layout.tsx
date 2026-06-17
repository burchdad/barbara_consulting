import { SiteNav } from "@/components/public/site-nav";
import { SiteFooter } from "@/components/public/site-footer";
import { getGlobalSettings } from "@/lib/site-data";
import { siteConfig } from "@/lib/config/site";

export const dynamic = "force-dynamic";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getGlobalSettings();
  const brand = (settings?.companyName ?? siteConfig.companyName).replace(
    "Gray Matters Technology-",
    "Gray Matters Technology Services -",
  );
  const capabilityStatementHref =
    settings?.capabilityStatementUrl || siteConfig.media.capabilityStatementUrl;

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <SiteNav brand={brand} capabilityStatementHref={capabilityStatementHref} />
      {children}
      <SiteFooter />
    </div>
  );
}
