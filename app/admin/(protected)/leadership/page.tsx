import { AdminCard, AdminField, AdminTextArea } from "@/components/admin/admin-form";
import { ModuleHeader } from "@/components/admin/module-header";
import { deleteLeadershipAction, upsertLeadershipAction } from "@/lib/actions";
import { prisma } from "@/lib/prisma";

export default async function AdminLeadershipPage() {
  const leaders = await prisma.leadershipMember.findMany({ orderBy: { displayOrder: "asc" } });

  return (
    <div className="space-y-6">
      <ModuleHeader title="Leadership" subtitle="Maintain executive team bios and profile content." />
      <AdminCard>
        <h2 className="text-xl font-black uppercase">Create Leader</h2>
        <form action={upsertLeadershipAction} className="mt-4 grid gap-3 md:grid-cols-2">
          <AdminField label="Name" name="name" required />
          <AdminField label="Title" name="title" required />
          <AdminField label="Photo URL" name="photoUrl" />
          <AdminField label="LinkedIn URL" name="linkedInUrl" />
          <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={0} />
          <label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" name="isPublished" /> Published</label>
          <div className="md:col-span-2"><AdminTextArea label="Short Bio" name="shortBio" required /></div>
          <div className="md:col-span-2"><AdminTextArea label="Full Bio" name="fullBio" rows={6} required /></div>
          <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white md:col-span-2" type="submit">Save Leader</button>
        </form>
      </AdminCard>

      {leaders.map((leader) => (
        <AdminCard key={leader.id}>
          <form action={upsertLeadershipAction} className="grid gap-3 md:grid-cols-2">
            <input type="hidden" name="id" value={leader.id} />
            <AdminField label="Name" name="name" defaultValue={leader.name} required />
            <AdminField label="Title" name="title" defaultValue={leader.title} required />
            <AdminField label="Photo URL" name="photoUrl" defaultValue={leader.photoUrl} />
            <AdminField label="LinkedIn URL" name="linkedInUrl" defaultValue={leader.linkedInUrl} />
            <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={leader.displayOrder} />
            <label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" name="isPublished" defaultChecked={leader.isPublished} /> Published</label>
            <div className="md:col-span-2"><AdminTextArea label="Short Bio" name="shortBio" defaultValue={leader.shortBio} required /></div>
            <div className="md:col-span-2"><AdminTextArea label="Full Bio" name="fullBio" rows={6} defaultValue={leader.fullBio} required /></div>
            <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white md:col-span-2" type="submit">Update</button>
          </form>
          <form action={deleteLeadershipAction} className="mt-2"><input type="hidden" name="id" value={leader.id} /><button type="submit" className="rounded-md border border-white/20 px-3 py-1.5 text-xs">Delete</button></form>
        </AdminCard>
      ))}
    </div>
  );
}
