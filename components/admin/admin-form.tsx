import { cn } from "@/components/ui/cn";

export function AdminCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <section
      className={cn(
        "rounded-lg border border-white/10 bg-[#050505]/80 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.24)] xl:p-6",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function AdminField({ label, name, defaultValue, required = false, type = "text" }: { label: string; name: string; defaultValue?: string | number | null; required?: boolean; type?: string }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-zinc-300">
      <span className="text-xs uppercase tracking-[0.08em] text-zinc-400">{label}</span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue ?? ""}
        required={required}
        className="min-w-0 rounded-md border border-white/15 bg-black/80 px-3 py-2.5 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-red-400/70 focus:ring-2 focus:ring-red-500/15"
      />
    </label>
  );
}

export function AdminFileField({ label, name, accept, note }: { label: string; name: string; accept: string; note?: string }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-zinc-300">
      <span className="text-xs uppercase tracking-[0.08em] text-zinc-400">{label}</span>
      <input
        type="file"
        name={name}
        accept={accept}
        className="min-w-0 rounded-md border border-dashed border-white/20 bg-black/60 px-3 py-2.5 text-sm text-zinc-300 file:mr-3 file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-xs file:font-bold file:uppercase file:tracking-[0.08em] file:text-white hover:border-red-400/50"
      />
      {note ? <span className="text-xs leading-5 text-zinc-500">{note}</span> : null}
    </label>
  );
}

export function AdminAssetUploadField({
  label,
  name,
  currentValueName,
  currentValue,
  accept,
  note,
}: {
  label: string;
  name: string;
  currentValueName: string;
  currentValue?: string | null;
  accept: string;
  note?: string;
}) {
  return (
    <div className="grid gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-4">
      <input type="hidden" name={currentValueName} value={currentValue ?? ""} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.12em] text-zinc-400">{label}</p>
          <p className="mt-1 text-sm text-zinc-500">Current file will stay active unless a replacement is uploaded.</p>
        </div>
        {currentValue ? (
          <a href={currentValue} target="_blank" rel="noreferrer" className="rounded-md border border-white/15 px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-zinc-200 transition hover:bg-white/5">
            View Current
          </a>
        ) : null}
      </div>
      <input
        type="file"
        name={name}
        accept={accept}
        className="min-w-0 rounded-md border border-dashed border-white/20 bg-black/60 px-3 py-2.5 text-sm text-zinc-300 file:mr-3 file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-xs file:font-bold file:uppercase file:tracking-[0.08em] file:text-white hover:border-red-400/50"
      />
      {note ? <p className="text-xs leading-5 text-zinc-500">{note}</p> : null}
    </div>
  );
}

export function AdminTextArea({ label, name, defaultValue, required = false, rows = 4 }: { label: string; name: string; defaultValue?: string; required?: boolean; rows?: number }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-zinc-300">
      <span className="text-xs uppercase tracking-[0.08em] text-zinc-400">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue ?? ""}
        required={required}
        rows={rows}
        className="min-w-0 rounded-md border border-white/15 bg-black/80 px-3 py-2.5 text-sm leading-6 text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-red-400/70 focus:ring-2 focus:ring-red-500/15"
      />
    </label>
  );
}

export function AdminStatCard({ label, value, note }: { label: string; value: React.ReactNode; note?: string }) {
  return (
    <AdminCard className="p-4 xl:p-5">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-500">{label}</p>
      <p className="mt-3 text-4xl font-black leading-none text-white">{value}</p>
      {note ? <p className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-cyan-200">{note}</p> : null}
    </AdminCard>
  );
}

export function AdminSectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-lg font-black uppercase tracking-wide text-white">{title}</h2>
        {description ? <p className="mt-1 text-sm text-zinc-500">{description}</p> : null}
      </div>
    </div>
  );
}

export function AdminStatusBadge({ active, activeLabel = "Published", inactiveLabel = "Draft" }: { active: boolean; activeLabel?: string; inactiveLabel?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em]",
        active ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-200" : "border-white/10 bg-white/[0.03] text-zinc-500",
      )}
    >
      {active ? activeLabel : inactiveLabel}
    </span>
  );
}

export function AdminCheckbox({ label, name, defaultChecked = false }: { label: string; name: string; defaultChecked?: boolean }) {
  return (
    <label className="flex min-h-[42px] items-center gap-2 rounded-md border border-white/10 bg-black/40 px-3 text-sm font-medium text-zinc-300">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4 rounded border-white/20 bg-black accent-red-600" />
      {label}
    </label>
  );
}

export function AdminSelect({ label, name, defaultValue, children }: { label: string; name: string; defaultValue?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-zinc-300">
      <span className="text-xs uppercase tracking-[0.08em] text-zinc-400">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="rounded-md border border-white/15 bg-black/80 px-3 py-2.5 text-sm text-zinc-100 outline-none transition focus:border-red-400/70 focus:ring-2 focus:ring-red-500/15"
      >
        {children}
      </select>
    </label>
  );
}

export function AdminSubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded-md bg-red-600 px-4 py-2.5 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:bg-red-500" type="submit">
      {children}
    </button>
  );
}

export function AdminDeleteButton() {
  return (
    <button type="submit" className="rounded-md border border-white/15 px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-zinc-300 transition hover:border-red-500/60 hover:bg-red-500/10 hover:text-red-200">
      Delete
    </button>
  );
}

export function AdminActionRow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex flex-wrap items-center gap-2 border-t border-white/10 pt-4", className)}>{children}</div>;
}

export function AdminEditCard({
  title,
  meta,
  published,
  children,
}: {
  title: string;
  meta?: string;
  published?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details className="group rounded-lg border border-white/10 bg-[#050505]/80 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
      <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-3 px-5 py-4 transition hover:bg-white/[0.03]">
        <div className="min-w-0">
          <p className="truncate text-lg font-black uppercase tracking-wide text-white">{title}</p>
          {meta ? <p className="mt-1 truncate text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">{meta}</p> : null}
        </div>
        <div className="flex items-center gap-3">
          {typeof published === "boolean" ? <AdminStatusBadge active={published} /> : null}
          <span className="rounded-md border border-white/10 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.08em] text-zinc-400 group-open:bg-white/10">
            Edit
          </span>
        </div>
      </summary>
      <div className="border-t border-white/10 p-5">{children}</div>
    </details>
  );
}
