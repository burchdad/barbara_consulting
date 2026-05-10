export function ModuleHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-black tracking-wide text-white">{title}</h1>
      <p className="text-sm text-zinc-400">{subtitle}</p>
    </div>
  );
}
