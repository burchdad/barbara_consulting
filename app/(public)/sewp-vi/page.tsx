import type { Metadata } from "next";
import { ArrowDown, ArrowUpRight, FileText, Mail, Phone } from "lucide-react";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "NASA SEWP VI",
  description: "Gray Matters Technology Services NASA SEWP VI information: Category C services, contract details, program contacts, and fair opportunity guidance.",
  alternates: { canonical: "/sewp-vi" },
};

const contractDetails = [
  ["SEWP VI contract number", "80TECH26DXXXX"],
  ["Awarded category", "C"],
  ["Contract type", "GWAC"],
  ["Period of performance", "Nov 2026 - Oct 2036"],
  ["SEWP surcharge", "0.34%"],
  ["UEI", "DRJDASA3SJJ3"],
];

const services = [
  ["Software & modernization", "Custom software development, database services, and digital modernization."],
  ["Infrastructure & operations", "Network services, telecommunications, and help desk."],
  ["Cybersecurity & cloud", "Cybersecurity systems, cloud support, and innovative emerging technology services."],
  ["Data & analytics", "Data processing, analytics, and AI-enabled solutions."],
  ["Consulting & management", "IT consulting, program and project management, and digital multimedia."],
  ["Communications & training", "Technical communications and specialized training."],
];

const contacts = [
  { name: "Christa Moyer", role: "SEWP VI Program Manager", email: "Cmoyer@graymatterstech.com", phone: "410-725-1155", tel: "+14107251155" },
  { name: "Barbara A. Gray", role: "SEWP Deputy Program Manager", email: "Bgray@graymatterstech.com", phone: "202-420-1767", tel: "+12024201767" },
];

const sectionLinks = [
  ["contract", "Contract information"],
  ["services", "Category C services"],
  ["contacts", "Program contacts"],
  ["fair-opportunity", "Fair opportunity"],
  ["resources", "Ordering & resources"],
];

const eyebrow = "text-xs font-bold uppercase tracking-[0.22em] text-cyan-300";
const heading = "mt-4 text-3xl font-black uppercase leading-tight text-white sm:text-4xl";
const linkStyle = "inline-flex items-center gap-2 text-sm font-bold text-cyan-200 underline underline-offset-4 transition hover:text-white";

export default function SewpViPage() {
  return (
    <main className="overflow-hidden bg-[#050a12]">
      <div className="relative isolate border-b border-cyan-200/15 bg-[radial-gradient(ellipse_at_top_right,rgba(8,145,178,0.22),transparent_65%)]">
        <Section className="relative py-16 lg:py-24">
          <p className={eyebrow}>Federal acquisition / Category C</p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <h1 className="text-6xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-8xl lg:text-9xl">NASA SEWP VI</h1>
              <p className="mt-6 text-xl font-semibold text-cyan-100 sm:text-2xl">Solutions for Enterprise-Wide Procurement</p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">Gray Matters Technology Services, LLC</p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-wider text-slate-200">
                <span className="border border-cyan-200/20 bg-cyan-200/5 px-4 py-2">WOSB / SDVOSB Certified</span>
                <span className="border border-cyan-200/20 bg-cyan-200/5 px-4 py-2">CMMI Level 3 Dev & ISO 9001 Certified</span>
              </div>
            </div>
            <div className="border-l-2 border-cyan-300/60 pl-6">
              <p className="text-lg leading-8 text-slate-200">Information technology, communication, and audio-visual solutions and services for federal agencies and their approved contractors.</p>
              <a href="#contacts" className="mt-6 inline-flex items-center gap-3 rounded-full bg-cyan-200 px-6 py-3 text-sm font-black uppercase tracking-wider text-slate-950 transition hover:bg-white">Contact our team <ArrowDown size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <nav aria-label="On this page" className="mt-12 flex flex-wrap gap-x-6 gap-y-4 border-t border-white/10 pt-6">
            {sectionLinks.map(([id, label]) => <a key={id} href={`#${id}`} className="text-sm font-semibold text-slate-300 underline-offset-4 hover:text-cyan-200 hover:underline">{label}</a>)}
          </nav>
        </Section>
      </div>

      <Section id="contract" className="scroll-mt-32">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className={eyebrow}>Understanding the contract</p>
            <h2 className={heading}>An evolving acquisition pathway.</h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-slate-300">
              <p>NASA SEWP (Solutions for Enterprise-Wide Procurement), pronounced &quot;soup,&quot; provides the latest Information Technology, Communication, and Audio-Visual (ITC/AV) solutions and services for all federal agencies and their approved contractors.</p>
              <p>Originally, the contract vehicle provided only technology products for NASA and all other agencies. SEWP has continually evolved over the past 30 years, expanding its scope to meet the requests of its customers.</p>
              <p>The SEWP vehicle represents acquisition innovation within the Federal Government. The program is self-funded through usage fees (0.34%) and provides all federal agencies with acquisition support for more than 50,000 orders a year.</p>
            </div>
          </div>
          <div className="border border-cyan-200/20 bg-white/[0.025] p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white">GMTS contract information</h3>
            <dl className="mt-6 divide-y divide-white/10">
              {contractDetails.map(([label, value]) => <div key={label} className="grid gap-2 py-4 sm:grid-cols-2"><dt className="text-sm text-slate-400">{label}</dt><dd className="break-words text-base font-semibold text-white">{value}</dd></div>)}
            </dl>
          </div>
        </div>
      </Section>

      <Section id="services" className="scroll-mt-32 border-t border-white/10">
        <p className={eyebrow}>Category C</p>
        <h2 className={heading}>Service offerings.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map(([title, description], index) => <article key={title} className="border border-cyan-200/15 bg-white/[0.025] p-6 sm:p-8"><p className="text-sm font-bold tracking-widest text-cyan-300">0{index + 1}</p><h3 className="mt-5 text-xl font-bold text-white">{title}</h3><p className="mt-3 text-base leading-7 text-slate-300">{description}</p></article>)}
        </div>
      </Section>

      <Section id="contacts" className="scroll-mt-32 border-t border-white/10">
        <p className={eyebrow}>GMTS program management</p>
        <h2 className={heading}>Your SEWP VI contacts.</h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {contacts.map((contact) => <article key={contact.email} className="min-w-0 border border-cyan-200/20 bg-cyan-200/[0.04] p-6 sm:p-8"><p className={eyebrow}>{contact.role}</p><h3 className="mt-4 text-3xl font-bold text-white">{contact.name}</h3><div className="mt-6 flex flex-col items-start gap-4"><a href={`mailto:${contact.email}`} className={`${linkStyle} break-all`}><Mail size={18} className="shrink-0" aria-hidden="true" />{contact.email}</a><a href={`tel:${contact.tel}`} className={linkStyle}><Phone size={18} aria-hidden="true" />{contact.phone}</a></div></article>)}
        </div>
      </Section>

      <Section id="fair-opportunity" className="scroll-mt-32 border-t border-white/10">
        <div className="max-w-5xl">
          <p className={eyebrow}>A.1.13</p>
          <h2 className={heading}>Fair opportunity and requests for quotes.</h2>
          <div className="mt-8 space-y-6 text-base leading-8 text-slate-300">
            <p>Contractors will be provided a fair opportunity at the individual order level as appropriate per FAR Part 16.505(b), including the SEWP RFQ tools. No documentation for the order selection is required to be submitted with the order. All such documentation is to be maintained by the issuing procurement office.</p>
            <p>The Contractor shall not market, quote or otherwise offer for sale, any IT Solutions not listed under this contract, until the said solutions are included in the SEWP database of record, and available to all Government end-users.</p>
            <p>If the Government issues a Request For Information (RFI) as part of market research, the Contractor may provide items not yet listed on their SEWP contract as part of a market research quote if:</p>
            <ol className="list-decimal space-y-3 pl-6 marker:text-cyan-300"><li>All such items are clearly marked as not yet available on their SEWP contract; and</li><li>The contractor submits a technology refreshment request to add those products to their contract.</li></ol>
            <p>If the Government issues a Request For Quote (RFQ) or a Market Research Request (MRR), the Contractor may only respond with items available on their Contract and the price of each item shall be no greater than the price in Attachment F SEWP database of record at the time the quote is issued. If the Contractor has insufficient items on their contract to fully respond to the Formal RFQ, the Contractor must respond with a No Bid.</p>
            <p>Unless the RFQ specifically allows for partial quotes, the Contractor must respond fully to all requirements specified in the RFQ.</p>
            <p>When submitting a quote to a government end-user, the contractor must clearly state the length of time the quote is valid. The contractor shall honor any order submitted within the stated time period of a quote.</p>
            <p>When responding to an RFI or RFQ issued from the NASA SEWP RFQ on-line quoting system, the Contractor must respond as outlined in <strong className="font-semibold text-white">Attachment C: Contract Holder User Manual (CHUM).</strong></p>
            <p>Contract Holders are prohibited from using Government information posted on the NASA SEWP Contract Holder Only Page, such as RFQs, RFIs, etc., for purposes other than proposing on SEWP requirements. This includes Contract Holders providing third parties with SEWP information and requirements for the purpose of assisting companies, that are not SEWP Contract Holders, with providing unsolicited proposals to meet agency requirements already posted to the NASA SEWP RFQ on-line quoting system.</p>
          </div>
        </div>
      </Section>

      <Section id="resources" className="scroll-mt-32 border-t border-white/10">
        <p className={eyebrow}>Federal agencies / Learn more</p>
        <h2 className={heading}>Ordering & resources.</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="border border-white/15 bg-white/[0.025] p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-white">How to contact SEWP</h3>
            <p className="mt-5 text-base leading-7 text-slate-300">SEWP PMO hours: Monday-Friday, 7:30 AM - 6 PM (ET)</p>
            <div className="mt-5 flex flex-col items-start gap-4"><a className={linkStyle} href="mailto:help@sewp.nasa.gov">help@sewp.nasa.gov</a><a className={linkStyle} href="tel:+13012861478">Customer Help Desk: (301) 286-1478</a><a className={linkStyle} href="https://www.sewp.nasa.gov/" target="_blank" rel="noopener noreferrer">Visit NASA SEWP <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a></div>
          </article>
          <article className="border border-white/15 bg-white/[0.025] p-6 sm:p-8">
            <FileText className="text-cyan-300" size={28} aria-hidden="true" />
            <h3 className="mt-4 text-2xl font-bold text-white">GMTS SEWP ordering guide</h3>
            <a href="/sewp-ordering-guide" className={`${linkStyle} mt-4`}>Read the SEWP VI ordering guide <ArrowUpRight size={16} aria-hidden="true" /></a>
            <p className="mt-4 text-base leading-7 text-slate-300">Find program support contacts and guidance for ordering through SEWP VI. The guide covers:</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300 marker:text-cyan-300"><li>SEWP overview and fair opportunity</li><li>Contact information</li><li>What&apos;s in scope for SEWP VI</li><li>Ordering process</li></ul>
          </article>
        </div>
        <a href="/capabilities/sewp-vi.pdf" download className={`${linkStyle} mt-8`}><FileText size={18} aria-hidden="true" />Download SEWP VI information (PDF)</a>
      </Section>
    </main>
  );
}
