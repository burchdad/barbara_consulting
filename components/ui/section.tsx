import { cn } from "@/components/ui/cn";

type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto w-full max-w-[1800px] px-4 py-16 sm:px-6 lg:px-10 2xl:px-14 lg:py-24",
        className,
      )}
    >
      {children}
    </section>
  );
}
