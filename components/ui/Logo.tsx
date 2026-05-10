/**
 * Logo component — swap this for a new client by:
 *   1. Replacing the <span> text with an <Image> tag pointing to /public/images/logo.svg
 *   2. Adjusting width/height as needed
 *
 * Example with image:
 *   import Image from "next/image";
 *   <Image src="/images/logo.svg" alt={companyName} width={160} height={32} />
 */

type LogoProps = {
  companyName: string;
  className?: string;
};

export function Logo({ companyName, className }: LogoProps) {
  return (
    <span className={`font-black uppercase tracking-[0.12em] text-white ${className ?? ""}`}>
      {companyName}
    </span>
  );
}
