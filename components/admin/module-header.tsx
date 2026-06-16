export function ModuleHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/40 px-5 py-5">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-red-300">Website update center</p>
      <h1 className="mt-2 text-3xl font-black tracking-wide text-white xl:text-4xl">{title}</h1>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">{subtitle}</p>
    </div>
  );
}
