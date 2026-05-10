import { redirect } from "next/navigation";

export default async function AdminEditJobRedirectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/admin/jobs#${id}`);
}
