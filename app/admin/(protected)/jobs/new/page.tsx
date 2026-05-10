import { redirect } from "next/navigation";

export default function AdminNewJobRedirectPage() {
  redirect("/admin/jobs");
}
