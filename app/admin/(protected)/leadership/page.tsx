import { AdminCard, AdminField, AdminTextArea } from "@/components/admin/admin-form";
import { ModuleHeader } from "@/components/admin/module-header";
import { deleteLeadershipAction, upsertLeadershipAction } from "@/lib/actions";
import { leadershipSeed } from "@/lib/data/leadership";
import { prisma } from "@/lib/prisma";

export default async function AdminLeadershipPage() {
  const savedLeaders = await prisma.leadershipMember.findMany({ orderBy: { displayOrder: "asc" } }).catch((error) => {
    console.error("[admin/leadership] Unable to load leaders.", error);
    return [];
  });
  const leaders = savedLeaders.length ? savedLeaders : leadershipSeed;
  const isShowingFallback = savedLeaders.length === 0;
  const publishedCount = leaders.filter((leader) => leader.isPublished).length;

  return (
    <div className="space-y-6">
      <ModuleHeader title="Leadership" subtitle="Maintain executive team bios and profile content." />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminCard><p className="text-sm text-zinc-400">Displayed Leaders</p><p className="mt-2 text-4xl font-black">{leaders.length}</p></AdminCard>
        <AdminCard><p className="text-sm text-zinc-400">Published</p><p className="mt-2 text-4xl font-black">{publishedCount}</p></AdminCard>
        <AdminCard><p className="text-sm text-zinc-400">Status</p><p className="mt-2 text-lg font-black uppercase text-cyan-100">{isShowingFallback ? "Default content active" : "Leadership live"}</p></AdminCard>
      </div>
      {isShowingFallback ? (
        <AdminCard className="border-cyan-200/25 bg-cyan-200/[0.04]">
          <p className="text-sm font-semibold text-cyan-100">Displaying default leadership content for this environment. When saved leadership records exist, this tab automatically uses the live database content.</p>
        </AdminCard>
      ) : null}
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
        <AdminCard key={isShowingFallback ? leader.name : leader.id}>
          {isShowingFallback ? (
            <article className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Displayed Content</p>
              <h2 className="text-2xl font-black uppercase text-white">{leader.name}</h2>
              <p className="text-sm uppercase tracking-[0.12em] text-zinc-400">{leader.title}</p>
              <p className="text-sm leading-6 text-zinc-300">{leader.shortBio}</p>
              <p className="text-xs text-zinc-500">Photo: {leader.photoUrl || "None"}</p>
            </article>
          ) : (
            <>
              <form action={upsertLeadershipAction} className="grid gap-3 md:grid-cols-2">
                <input type="hidden" name="id" value={leader.id} />
                <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-black uppercase">{leader.name}</h2>
                  <span className={leader.isPublished ? "text-xs font-bold uppercase text-cyan-300" : "text-xs font-bold uppercase text-zinc-500"}>{leader.isPublished ? "Published" : "Draft"}</span>
                </div>
                <AdminField label="Name" name="name" defaultValue={leader.name} required />
                <AdminField label="Title" name="title" defaultValue={leader.title} required />
                <AdminField label="Photo URL" name="photoUrl" defaultValue={leader.photoUrl} />
                <AdminField label="LinkedIn URL" name="linkedInUrl" defaultValue={leader.linkedInUrl} />
                <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={leader.displayOrder} />
                <label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" name="isPublished" defaultChecked={leader.isPublished} /> Published</label>
                <div className="md:col-span-2"><AdminTextArea label="Short Bio" name="shortBio" defaultValue={leader.shortBio} required /></div>
                <div className="md:col-span-2"><AdminTextArea label="Full Bio" name="fullBio" rows={6} defaultValue={leader.fullBio} required /></div>
                <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white md:col-span-2" type="submit">Update Leader</button>
              </form>
              <form action={deleteLeadershipAction} className="mt-2"><input type="hidden" name="id" value={leader.id} /><button type="submit" className="rounded-md border border-white/20 px-3 py-1.5 text-xs">Delete</button></form>
            </>
          )}
        </AdminCard>
      ))}
    </div>
  );
}
