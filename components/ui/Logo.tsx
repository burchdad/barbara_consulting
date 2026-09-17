import Image from "next/image";
import { cn } from "@/components/ui/cn";

type LogoProps = {
  companyName: string;
  className?: string;
};

export function Logo({ companyName, className }: LogoProps) {
  return (
    <span className={cn("relative block aspect-[4/1] overflow-hidden rounded-sm bg-white", className)}>
      <Image
        src="/gray-matters-logo.png"
        alt={companyName}
        fill
        sizes="(max-width: 639px) 240px, 320px"
        className="object-cover object-center"
      />
    </span>
  );
}
