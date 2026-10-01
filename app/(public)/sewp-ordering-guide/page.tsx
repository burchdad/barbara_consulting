import type { Metadata } from "next";
import styles from "./ordering-guide.module.css";
import { PrintGuide } from "./print-guide";

export const metadata: Metadata = {
  title: "SEWP VI Ordering Guide",
  description: "Gray Matters Technology Services SEWP VI ordering guide, program contacts, scope categories, fair opportunity, and ordering process.",
  alternates: { canonical: "/sewp-ordering-guide" },
};

export default function OrderingGuidePage() {
  return (
    <main className={styles.page}>
      <div className={styles.toolbar}><span>Gray Matters Technology Services</span><PrintGuide /></div>
      <article className={styles.guide}>
        <h1 className={styles.title}>SEWP VI Ordering Guide</h1>
        <div className={styles.firstPage}>
          <div className={styles.overview}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.logo} src="/capabilities/sewp-vi-contract-holder.jpg" width="865" height="384" alt="NASA SEWP VI Contract Holder" />
            <section>
              <h2>SEWP Overview</h2>
              <p>NASA SEWP VI - The NASA SEWP (Solutions for Enterprise-Wide Procurement), pronounced &quot;soup&quot;, provides the latest Information Technology, Communication, and Audio-Visual (ITC/AV) solutions and services for all Federal Agencies and their approved contractors. Created in 1993, SEWP I was the first Government-Wide Acquisition Contract (GWAC) in the federal acquisition space. Originally, the contract vehicle provided only technology products for NASA and all other agencies. SEWP has continually evolved over the past 30 years, expanding its scope to meet the requests of its customers. The SEWP vehicle represents acquisition innovation within the Federal Government. The program is self-funded through usage fees (0.34%) and provides all Federal agencies with acquisition support - more than 50,000 orders a year.</p>
            </section>
            <section>
              <h2>Fair Opportunity</h2>
              <p>FAR 16.505(b)(1) provides that each contractor shall be given fair opportunity to be considered for each order exceeding $10,000 and issued under multiple award contracts. The FAR states that the method to obtain fair opportunity is at the discretion of the Contracting Officer (CO) and that the CO must document the rationale for placement and price of each order. Using the SEWP online Quote Request Tool is the recommended method to assist in this activity and to augment the required decision documentation. The SEWP Quote Request Tool (QRT) will automatically include the Contract Holders within a selected Group or based on a suggested source.</p>
            </section>
            <section>
              <h2>About Gray Matters Technology Services</h2>
              <p>Gray Matters Technology Services supports federal agencies and partners with IT modernization, cybersecurity, cloud, data, workflow automation, and mission technology delivery.</p>
              <p>Visit our website: <a href="https://www.graymatterstech.com/">www.graymatterstech.com</a></p>
            </section>
          </div>
          <aside className={styles.sidebar} aria-label="Contract and program support information">
            <div className={styles.contract}>
              <h2>Gray Matters<br />Technology Services</h2>
              <p className={styles.contractHeading}>Category C Contract</p>
              <p className={styles.contractHeading}>80TECH26DXXXX</p>
              <p>PoP: November 2026 - October 2036</p>
              <section>
                <h3>Main Office Address:</h3>
                <p>Gray Matters Technology Services<br />10011 Nicol Court E<br />Bowie, MD 20721<br />Phone: <a href="tel:+13019667523">301-966-7523</a><br />Fax: 240-206-8796</p>
              </section>
              <section>
                <h3>SEWP VI Program Support</h3>
                <h4>Order Issues and Post-Delivery Contacts</h4>
                <p>Christa Moyer<br />SEWP VI Program Manager<br /><a href="mailto:Cmoyer@graymatterstech.com">Cmoyer@graymatterstech.com</a><br /><a href="tel:+14107251155">410-725-1155</a></p>
                <p>Barbara A. Gray<br />SEWP Deputy Program Manager<br /><a href="mailto:Bgray@graymatterstech.com">Bgray@graymatterstech.com</a><br /><a href="tel:+12024201767">202-420-1767</a></p>
              </section>
            </div>
            <section className={styles.helpline}>
              <h3>SEWP Helpline</h3>
              <p><a href="mailto:help@sewp.nasa.gov">help@sewp.nasa.gov</a><br /><a href="tel:+13012861478">(301) 286-1478</a><br />SEWP PMO Hours:<br />M-F, 7:30 AM - 6 PM (ET)<br /><a href="https://www.sewp.nasa.gov/">www.sewp.nasa.gov</a></p>
            </section>
          </aside>
        </div>
        <div className={styles.secondPage}>
          <section>
            <h2>What&apos;s in scope for SEWP VI?</h2>
            <p>SEWP is designed to provide a broad suite of Information Technology, Communication and Audio Visual (ITC/AV) solutions and services. Technology is ever-evolving and for that reason SEWP&apos;s processes enable our Contract Holders to add new commercial technology and IT services to their contract daily, as requested by our customers. The focus of SEWP is on the full suite of technology offerings that simplify Governmental access and Industry offerings across the entire ITC/AV solutions and services landscape. SEWP is composed of three (3) scope categories detailed below. If you would like SEWP to determine if your requirement is within scope of the SEWP VI contract, please send an overview and/or bill of materials (BOM) to <a href="mailto:help@sewp.nasa.gov">help@sewp.nasa.gov</a> for review and feedback.</p>
            <p>The SEWP Contracts were awarded by scope category, the three categories are:</p>
            <ul><li><strong>Category A - ITC/AV Solutions</strong></li><li><strong>Category B - Enterprise-Wide ITC/AV Service Solutions</strong></li><li><strong>Category C - Mission-Based ITC/AV Service Solutions</strong></li></ul>
            <div className={styles.categories}>
              <div><h3>Category A</h3><p>ITC/AV (Information Technology, Communications, and Audio-Visual Solutions)</p></div>
              <div><h3>Category B</h3><p>Enterprise-Wide ITC/AV Service Solutions</p></div>
              <div><h3>Category C</h3><p>ITC/AV Mission-Based Services</p></div>
            </div>
          </section>
          <section>
            <h2>Ordering Process</h2>
            <p>The internal ordering process of each Agency varies. The process and accompanying forms for Purchase Requests (PR) and Delivery Orders (DO) that are issued against a SEWP contract is defined by the issuing Agency, not the NASA SEWP Program Management Office (PMO). The typical process is for an end-user to determine a requirement and generate a Purchase Request (PR).</p>
            <p>The PR along with any necessary funding information is sent to that Agency&apos;s procurement office which results in the issuance of a DO. Any valid Federal Agency DO form, and the associated Delivery Order number may be used. The NASA SEWP Program Management Office (PMO) does not issue DOs - these must be issued through the issuing Agency&apos;s procurement office. The SEWP Program Management Office (PMO) reviews, processes and tracks issued DOs and forwards them to the Contract Holder(s).</p>
            <p>Some Agencies have special requirements for issuing IT Delivery Orders. It is the Issuing Agency&apos;s Contracting Officers&apos; (COs/KOs) responsibility to be aware of any Agency-specific policies regarding issuing orders via an existing contract vehicle and Government-Wide Acquisition Contracts. There are no requirements under the SEWP Contracts for issuing Agencies to use other intermediary procurement offices, except as directed through their own internal policies.</p>
            <p>If modifications are made to any order, these modifications must also route through the SEWP Program Management Office (PMO).</p>
          </section>
        </div>
      </article>
    </main>
  );
}
