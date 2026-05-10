import { AdminCard, AdminField, AdminTextArea } from "@/components/admin/admin-form";
import { ModuleHeader } from "@/components/admin/module-header";
import { updateGlobalSettingsAction } from "@/lib/actions";
import { prisma } from "@/lib/prisma";

export default async function AdminSettingsPage() {
  const settings = await prisma.globalSetting.findFirst();

  return (
    <div className="space-y-6">
      <ModuleHeader title="Global Settings" subtitle="Manage company-level public content and contact data." />
      <AdminCard>
        <form action={updateGlobalSettingsAction} className="grid gap-3 md:grid-cols-2">
          <AdminField label="Company Name" name="companyName" defaultValue={settings?.companyName} required />
          <AdminField label="Tagline" name="tagline" defaultValue={settings?.tagline} required />
          <AdminField label="Email" name="email" type="email" defaultValue={settings?.email} required />
          <AdminField label="Phone" name="phone" defaultValue={settings?.phone} required />
          <div className="md:col-span-2"><AdminField label="Address" name="address" defaultValue={settings?.address} required /></div>
          <AdminField label="LinkedIn URL" name="linkedInUrl" defaultValue={settings?.linkedInUrl} />
          <div className="md:col-span-2"><AdminTextArea label="Footer Statement" name="footerStatement" defaultValue={settings?.footerStatement} required /></div>
          <div className="md:col-span-2"><AdminTextArea label="Hero Headline" name="heroHeadline" defaultValue={settings?.heroHeadline} required /></div>
          <div className="md:col-span-2"><AdminTextArea label="Hero Subheadline" name="heroSubheadline" defaultValue={settings?.heroSubheadline} required /></div>
          <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white md:col-span-2" type="submit">Save Settings</button>
        </form>
      </AdminCard>
    </div>
  );
}
