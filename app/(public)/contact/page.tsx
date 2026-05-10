import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/public/contact-form";
import { getGlobalSettings } from "@/lib/site-data";

export default async function ContactPage() {
  const settings = await getGlobalSettings();

  return (
    <main>
      <Section>
        <h1 className="text-5xl font-black uppercase">Get in Touch</h1>
        <p className="mt-4 max-w-3xl text-zinc-300">Tell us what mission outcomes you need. Our team will respond quickly.</p>
      </Section>

      <Section className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-6xl font-black uppercase leading-none text-white">Let&apos;s Build the Future Together.</h2>
          <div className="mt-8 grid gap-3 text-sm text-zinc-300">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4"><span className="text-zinc-500">Email:</span> {settings?.email}</div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4"><span className="text-zinc-500">Phone:</span> {settings?.phone}</div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4"><span className="text-zinc-500">Headquarters:</span> {settings?.address}</div>
          </div>
        </div>
        <ContactForm />
      </Section>
    </main>
  );
}
