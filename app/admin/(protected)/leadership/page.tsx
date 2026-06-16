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
import { deleteLeadershipAction, upsertLeadershipAction } from "@/lib/actions";
import { ensureContentBaseline } from "@/lib/content-baseline";
import { prisma } from "@/lib/prisma";

export default async function AdminLeadershipPage() {
  await ensureContentBaseline();
  const leaders = await prisma.leadershipMember.findMany({ orderBy: { displayOrder: "asc" } });
  const publishedCount = leaders.filter((leader) => leader.isPublished).length;

  return (
    <div className="space-y-6">
      <ModuleHeader title="Leadership" subtitle="Maintain executive team bios and profile content." />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard label="Displayed Leaders" value={leaders.length} />
        <AdminStatCard label="Published" value={publishedCount} />
        <AdminStatCard label="Status" value={leaders.length ? "Live" : "Ready"} note={leaders.length ? "Leadership live" : "Ready for first leader"} />
      </div>
      <AdminCard>
        <AdminSectionHeader title="Create Leader" description="Add a public leadership profile with headshot and biography content." />
        <form action={upsertLeadershipAction} className="mt-5 grid gap-4 md:grid-cols-2">
          <AdminField label="Name" name="name" required />
          <AdminField label="Title" name="title" required />
          <AdminField label="Photo URL" name="photoUrl" />
          <AdminField label="LinkedIn URL" name="linkedInUrl" />
          <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={0} />
          <AdminCheckbox label="Published" name="isPublished" />
          <div className="md:col-span-2"><AdminTextArea label="Short Bio" name="shortBio" required /></div>
          <div className="md:col-span-2"><AdminTextArea label="Full Bio" name="fullBio" rows={6} required /></div>
          <AdminActionRow className="md:col-span-2"><AdminSubmitButton>Save Leader</AdminSubmitButton></AdminActionRow>
        </form>
      </AdminCard>

      <div className="space-y-3">
      <AdminSectionHeader title="Manage Leadership" description="Open a profile to edit bios, links, headshots, and visibility." />
      {leaders.map((leader) => (
        <AdminEditCard key={leader.id} title={leader.name} meta={`${leader.title} / order ${leader.displayOrder}`} published={leader.isPublished}>
          <form action={upsertLeadershipAction} className="grid gap-4 md:grid-cols-2">
            <input type="hidden" name="id" value={leader.id} />
            <AdminField label="Name" name="name" defaultValue={leader.name} required />
            <AdminField label="Title" name="title" defaultValue={leader.title} required />
            <AdminField label="Photo URL" name="photoUrl" defaultValue={leader.photoUrl} />
            <AdminField label="LinkedIn URL" name="linkedInUrl" defaultValue={leader.linkedInUrl} />
            <AdminField label="Display Order" name="displayOrder" type="number" defaultValue={leader.displayOrder} />
            <AdminCheckbox label="Published" name="isPublished" defaultChecked={leader.isPublished} />
            <div className="md:col-span-2"><AdminTextArea label="Short Bio" name="shortBio" defaultValue={leader.shortBio} required /></div>
            <div className="md:col-span-2"><AdminTextArea label="Full Bio" name="fullBio" rows={6} defaultValue={leader.fullBio} required /></div>
            <AdminActionRow className="md:col-span-2"><AdminSubmitButton>Update Leader</AdminSubmitButton></AdminActionRow>
          </form>
          <form action={deleteLeadershipAction} className="mt-3"><input type="hidden" name="id" value={leader.id} /><AdminDeleteButton /></form>
        </AdminEditCard>
      ))}
      </div>
    </div>
  );
}
