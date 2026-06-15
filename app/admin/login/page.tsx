import { AdminLoginForm } from "./login-form";

type AdminLoginPageProps = {
  searchParams?: Promise<{
    mode?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = await searchParams;
  const isWebsiteUpdates = params?.mode === "updates";

  return <AdminLoginForm isWebsiteUpdates={isWebsiteUpdates} />;
}
