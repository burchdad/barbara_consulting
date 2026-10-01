# SEWP checklist preview review

Branch: `codex/sewp-checklist-preview`. Preview only; do not merge or promote until the client approves the remaining items.

## Checklist disposition

| # | Requirement | Preview result / remaining review |
| --- | --- | --- |
| 1 | Public contract resources | Existing SEWP page, guide, and navigation retained. |
| 2 | Publish within one month of award | Award date not supplied. The November performance start does not establish the award date. Client confirmation required. |
| 3 | Downloadable / printable guide | Existing Print / Save as PDF control retained; print CSS now uses one column to avoid a tall sidebar breaking across pages. Corrected contract-information PDF is also linked from the guide. Native browser print output still needs review. |
| 4 | Multiple-award GWAC | Supplied statement added to both pages and PDF. |
| 5 | Fair opportunity | Existing A.1.13 clause retained verbatim from the live HTML and shared with the PDF. Compare with executed contract before release. Guide summary now refers to the applicable micro-purchase threshold and exceptions instead of a fixed $10,000. |
| 6 | Quotes and sales contacts | Supplied quote instructions and both named contacts appear on both pages and PDF. |
| 7 | Installation, warranty, support | Supplied services-only policy appears on both pages and PDF. Client must confirm it reflects the executed scope and actual service policy. |
| 8 | Problematic orders | Supplied required order identifiers, issue description and NASA escalation instructions added to all three. |
| 9 | Corporate home link | Retained on pages; working absolute link included in PDF. |
| 10 | SEWP home link | Retained on pages and PDF. |
| 11 | Accessibility | Improvements and checks listed below. Full Section 508 conformance is NOT established; requested blanket compliance statement withheld. |
| 12 | Contract data | Number changed to `80TECH26D0902` from client checklist, consistently across all three. Existing Category C, PoP, fee and UEI retained. Verify these against award documents. |
| 13 | Contract-holder destination | Still omitted from website and removed from rebuilt PDF. The former `/detail/01` destination has not been confirmed for GMTS. Obtain and validate the actual GMTS URL after it is live; do not auto-enable a guessed URL on November 1. |
| 14 | Program contacts | Christa Moyer and Barbara A. Gray retained consistently with clickable email/phone links. |
| 15 | Web/PDF consistency | Both pages and PDF use `lib/content/sewp.json` for overview, number, multiple-award statement, support wording and contacts. The 1993 sentence is restored. |

## PDF corrections

Replaced the unreadable one-page source with a three-page, selectable-text document. Corrected `acqu325isition`, `Digal Modernization`, missing spacing in `Audio-Visual (ITC/AV)`, and the garbled overview. Replaced TBD with an actionable ordering-guide link. Added the requested support content, awarded number, title, `en-US` language, logical tags, link annotation associations, structure-based tab order, and embedded Arial fonts for visible text. Decorative rules and page footers are marked as artifacts.

The PDF's absolute guide link uses the canonical production URL, so it will open the existing production guide until this preview is approved and deployed. This is intentional for a downloadable document that will remain usable outside the preview.

All three PDF pages were rendered and visually inspected for clipping, overlap and legibility. Extraction assertions cover the shared overview/support wording and contract number; stale placeholder/typo assertions passed. Nine link annotations, sorted parent-tree keys, title/language, page structure references and sequential reading order were checked. This is not a PDF/UA certification or a screen-reader test.

## Verification performed

- Targeted ESLint, TypeScript `--noEmit`, and `git diff --check` passed.
- Vercel preview build passed for the initial content change; the final accessibility fixes require the latest preview build to pass as well.
- Local isolated server-rendered page checks: single H1, English language, no empty links, valid internal anchors, image alternative text, and correct displayed contract number.
- Keyboard Tab reaches the visible skip link; Enter transfers focus to the main content. SEWP links have visible focus styling. Hash targets include space for the sticky header.
- Checked page/header reflow at 320, 375, 768 and 1024 pixels. Fixed the existing narrow-screen header overflow by stacking the company name above the navigation controls.
- Guide link contrast improved to 8.16:1 on white and 6.85:1 on gray. Main SEWP muted labels tested at 7.74:1 against the page background. Guide dark text on white is 14.94:1; navy on yellow is 12.25:1.
- Local rendering excludes live data, footer and client hydration; it does not establish end-to-end deployment behavior. Vercel browser review is blocked by preview authentication pending user sign-in.

Still needed before a broad accessibility claim: authenticated preview review (including shared footer and mobile menu), native print output, complete WCAG/Section 508 evaluation, and assistive-technology review of web and PDF reading order. Automated or limited manual checks alone do not establish conformance.

## Sources and regeneration

- Client-provided checklist and supplied wording are the source for the new contract number and services-only policy; these have not been independently confirmed with an executed award.
- [Current FAR 16.505](https://www.acquisition.gov/far/16.505), reviewed October 1, 2026, supports the threshold-summary correction.
- [W3C guidance on conformance](https://www.w3.org/WAI/WCAG22/Understanding/conformance) explains the need for automated testing and human evaluation.
- Run `python scripts/build-sewp-pdf.py` with `reportlab` and `pypdf` installed. On non-Windows systems set `SEWP_FONT_DIR` to a directory containing licensed `arial.ttf` and `arialbd.ttf`. The script writes `output/pdf/sewp-vi.pdf` and updates `public/capabilities/sewp-vi.pdf`. Render and inspect all pages after regeneration.

## Release review

Confirm the award date, number, Category C scope, PoP, fee, UEI, contacts, and services-only policy against the client's contract. Approve the revised PDF pagination and guide print output. Complete the outstanding accessibility review before publishing the requested compliance assertion. Production deployment remains a separate user-approved step.
