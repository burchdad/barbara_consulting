import { cn } from "@/components/ui/cn";

export function AdminCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return <section className={cn("rounded-xl border border-white/10 bg-black/40 p-5", className)}>{children}</section>;
}

export function AdminField({ label, name, defaultValue, required = false, type = "text" }: { label: string; name: string; defaultValue?: string | number | null; required?: boolean; type?: string }) {
  return (
    <label className="grid gap-2 text-sm text-zinc-300">
      <span>{label}</span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue ?? ""}
        required={required}
        className="rounded-md border border-white/15 bg-black px-3 py-2 text-sm text-zinc-100"
      />
    </label>
  );
}

export function AdminTextArea({ label, name, defaultValue, required = false, rows = 4 }: { label: string; name: string; defaultValue?: string; required?: boolean; rows?: number }) {
  return (
    <label className="grid gap-2 text-sm text-zinc-300">
      <span>{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue ?? ""}
        required={required}
        rows={rows}
        className="rounded-md border border-white/15 bg-black px-3 py-2 text-sm text-zinc-100"
      />
    </label>
  );
}
