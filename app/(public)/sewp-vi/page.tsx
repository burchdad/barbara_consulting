import type { Metadata } from "next";
import styles from "./sewp-vi.module.css";

export const metadata: Metadata = {
  title: "NASA SEWP VI",
  description: "Gray Matters Technology Services SEWP VI Category C contract information, services, program contacts, and fair opportunity guidance.",
  alternates: { canonical: "/sewp-vi" },
};

export default function SewpViPage() {
  return (
    <main className={styles.page}>
      <div className={styles.sheet}>
        <p className={styles.company}>Gray Matters Technology Services, LLC, Social Economic Status: WOSB/SDVOSB Certified</p>
        <div className={styles.columns}>
          <div className={styles.left}>
            {/* The original PDF's logo, with the surrounding content rebuilt as HTML. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.logo} src="/capabilities/sewp-vi-contract-holder.jpg" width="865" height="384" alt="NASA SEWP VI - Solutions for Enterprise-Wide Procurement - Contract Holder" />
            <section aria-labelledby="sewp-overview">
              <h2 id="sewp-overview" className={styles.overviewTitle}>Understanding the NASA SEWP VI Contract</h2>
              <p className={styles.overview}><strong>The NASA SEWP (Solutions for Enterprise-Wide Procurement),</strong> pronounced <strong>&quot;soup&quot;,</strong> provides the latest Information Technology, Communication, and Audio-Visual (ITC/AV) solutions and services for all Federal Agencies and their approved contractors. Enterprise-Wide Acquisition Contract (GWAC) in the federal acquisition space. Originally, the contract vehicle provided only technology products for NASA and all other agencies. SEWP has continually evolved over the past 30 years, expanding its scope to meet the requests of its customers. The SEWP vehicle represents acquisition innovation within the Federal Government. The program is self-funded through usage fees (0.34%) and provides all Federal agencies with acquisition support - more than 50,000 orders a year.</p>
            </section>
            <section className={styles.information} aria-labelledby="contract-information">
              <h2 id="contract-information">Gray Matters Technology Services Contract Information</h2>
              <p><strong>SEWP VI Contract Number:</strong> 80TECH26DXXXX</p>
              <p><strong>Awarded Category: C</strong></p>
              <p><strong>Contract Type:</strong> GWAC</p>
              <p><strong>Period of Performance: Nov 2026 - Oct 2036</strong></p>
              <p><strong>SEWP Surcharge: 0.34%</strong></p>
              <p><strong>UEI:</strong> DRJDASA3SJJ3</p>
              <p><strong>SEWP Contract Holder Information:</strong></p>
              <a className={styles.holderLink} href="https://www.sewp.nasa.gov/sewp6public/contractholders#/detail/01">https://www.sewp.nasa.gov/sewp6public/contractholders#/detail/01</a>
              <p><strong>GMTS Program Management Contacts:</strong> SEWP VI Program Manager -<br />Christa Moyer <a href="mailto:Cmoyer@graymatterstech.com">Cmoyer@graymatterstech.com</a> Phone: <a className={styles.phone} href="tel:+14107251155">410-725-1155</a></p>
              <p>SEWP Deputy Program Manager - Barbara A. Gray<br /><a href="mailto:Bgray@graymatterstech.com">Bgray@graymatterstech.com</a> <a href="tel:+12024201767">202-420-1767</a></p>
            </section>
            <section className={styles.services} aria-labelledby="category-services">
              <h2 id="category-services">Category C- Service Offerings</h2>
              <ul>
                <li>Custom Software Development, Database Services, Digital Modernization</li>
                <li>Infrastructure &amp; Operations- Network Services, Telecommunications, helpdesk</li>
                <li>Cybersecurity Systems, Cloud Support and innovative emerging Tech Services</li>
                <li>Data &amp; Analytics- Data Processing, Analytics and AI Enabled Solutions</li>
                <li>IT Consulting, Program and Project Management, Digital Multimedia/</li>
                <li>Technical communications and specialized training.</li>
              </ul>
            </section>
          </div>
          <div className={styles.right}>
            <h1 className={styles.contractTitle}>Category C Contract<br />80TECH26DXXXX</h1>
            <section className={styles.fair} aria-labelledby="fair-opportunity">
              <h2 id="fair-opportunity">A.1.13 FAIR OPPORTUNITY AND REQUESTS FOR QUOTES</h2>
            <p>Contractors will be provided a fair opportunity at the individual order level as appropriate per FAR Part 16.505(b), including the SEWP RFQ tools. No documentation for the order selection is required to be submitted with the order. All such documentation is to be maintained by the issuing procurement office.</p>
            <p>The Contractor shall not market, quote or otherwise offer for sale, any IT Solutions not listed under this contract, until the said solutions are included in the SEWP database of record, and available to all Government end-users.</p>
            <p>If the Government issues a Request For Information (RFI) as part of market research, the Contractor may provide items not yet listed on their SEWP contract as part of a market research quote if:</p>
            <ol><li>All such items are clearly marked as not yet available on their SEWP contract; and</li><li>The contractor submits a technology refreshment request to add those products to their contract.</li></ol>
            <p>If the Government issues a Request For Quote (RFQ) or a Market Research Request (MRR), the Contractor may only respond with items available on their Contract and the price of each item shall be no greater than the price in Attachment F SEWP database of record at the time the quote is issued. If the Contractor has insufficient items on their contract to fully respond to the Formal RFQ, the Contractor must respond with a No Bid.</p>
            <p>Unless the RFQ specifically allows for partial quotes, the Contractor must respond fully to all requirements specified in the RFQ.</p>
            <p>When submitting a quote to a government end-user, the contractor must clearly state the length of time the quote is valid. The contractor shall honor any order submitted within the stated time period of a quote.</p>
            <p>When responding to an RFI or RFQ issued from the NASA SEWP RFQ on-line quoting system, the Contractor must respond as outlined in <strong>Attachment C: Contract Holder User Manual (CHUM).</strong></p>
            <p>Contract Holders are prohibited from using Government information posted on the NASA SEWP Contract Holder Only Page, such as RFQs, RFIs, etc., for purposes other than proposing on SEWP requirements. This includes Contract Holders providing third parties with SEWP information and requirements for the purpose of assisting companies, that are not SEWP Contract Holders, with providing unsolicited proposals to meet agency requirements already posted to the NASA SEWP RFQ on-line quoting system.</p>

            </section>
            <div className={styles.resources}>
              <section className={styles.contact} aria-labelledby="federal-agencies">
                <h2 id="federal-agencies">Federal Agencies- Learn More</h2>
                <h3>How to Contact SEWP</h3>
                <p><strong>SEWP PMO Hours:</strong> Mon-Fri, 7:30 AM - 6 PM (ET)</p>
                <p><strong>Email:</strong> <a href="mailto:help@sewp.nasa.gov">help@sewp.nasa.gov</a></p>
                <p><strong>Customer Help Desk:</strong> <a className={styles.phone} href="tel:+13012861478">(301) 286-1478</a></p>
                <p><strong>Website:</strong> <a href="https://www.sewp.nasa.gov/">www.sewp.nasa.gov</a></p>
              </section>
              <section className={styles.guide} aria-labelledby="ordering-guide">
                <h2 id="ordering-guide">Gray Matters Technology Services,<br />LLC--SEWP Ordering Guide</h2>
                <p><strong><em>TBD (click to open document)</em></strong></p>
                <p>Ordering Guide Contains:</p>
                <p>SEWP Overview Fair Opportunity</p>
                <p>Contact Information</p>
                <p>What&apos;s in Scope for SEWP VI Ordering Process</p>
              </section>
            </div>
            <p className={styles.certification}>CMMI Level 3 Dev &amp; ISO 9001 Certified</p>
          </div>
        </div>
      </div>
    </main>
  );
}
