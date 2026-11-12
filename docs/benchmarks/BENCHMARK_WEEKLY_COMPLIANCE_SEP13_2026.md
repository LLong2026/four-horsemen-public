# SquirlOS Technologies LLC — Weekly Compliance Audit

**Audit date:** September 13, 2026 (America/Chicago)  
**Entity:** SquirlOS Technologies LLC, Texas single-member LLC  
**Owner:** Leon Calvin Long II  
**Status:** **YELLOW — material data-quality, deadline, privacy, and governance follow-up required**

## Mandatory caveat
This is AI-generated legal analysis provided for educational and research purposes only. It does not constitute legal advice or create an attorney-client relationship. Consult a licensed attorney for binding legal opinions.

## Prototype disclaimer
This software is a prototype and is provided for educational and research purposes only. It is not intended for production use, commercial deployment, or safety-critical environments. All systems are experimental and may contain defects on them.

## Executive summary
The audit found no verified real tax liability in the TaxFiling entity: all 9 records are explicitly marked `simulated` and are excluded from legal or payment conclusions. The most urgent real-world items are: (1) confirm the filing/receipt status of provisional application 64/145,825; (2) reconcile the contract corpus, which contains many records with August 1, 2026 end dates still marked active; (3) review the active critical synthetic chaos alerts before treating the system as fully clear; and (4) verify privacy coverage and vendor/data-processing terms before external customer onboarding.

FinCEN BOI status was corrected during this audit. FinCEN's current materials state that U.S.-formed companies are exempt from BOI reporting; the former 90-day domestic-LLC warning should not be used. Texas franchise-tax reports remain due May 15, with the 2026 no-tax-due threshold reported by the Texas Comptroller as $2.65 million, not $1.23 million.

## IRAC findings

### 1. Patent deadlines and portfolio count
**Issue.** Which patent deadlines and portfolio representations require action?

**Rule.** A U.S. provisional application generally provides a 12-month priority period under 35 U.S.C. §111(b); a PCT application generally must be filed within 12 months to claim priority under the Paris Convention, Art. 4C. A provisional itself is not examined and cannot mature into a patent without a timely nonprovisional/PCT filing.

**Application.** The audit has no authoritative USPTO receipt/deadline entity. The records and prior instructions conflict on 64/145,825: one source says filed September 1, while the latest legal record says the displayed filing date was a draft placeholder and the document was unfiled. Application 19/693,343 is also marked dropped/abandoned in the current portfolio doctrine and should not be counted as a live pending application. Therefore, the defensible public statement remains **7 patents pending + 5 SBIR tracks only after 64/145,825 filing receipt is verified**; do not publish “8 patents pending” until counsel confirms the portfolio.

**Conclusion / mitigation.** Obtain and preserve the USPTO filing receipt for 64/145,825, create a counsel-controlled priority calendar for each live provisional, and confirm the earliest priority date for PCT planning. No maintenance fees are due on provisionals, but nonprovisional/PCT fees and deadlines must be calendared.

### 2. Tax and filing calendar
**Issue.** Are any tax records actionable now?

**Rule.** Federal estimated tax dates are generally April 15, June 15, September 15, and January 15 under IRC §§6654 and 7503, subject to taxpayer-specific rules. Texas franchise-tax reports are due May 15 under Tex. Tax Code §171.202 and Comptroller guidance.

**Application.** Nine TaxFiling rows were read; all are `simulated`. They include September 15, 2026, October 20, 2026, January 15, 2027, and April 15, 2027 dates, but none establishes a real obligation. The tax database must not be used to bill, pay, or report liability without a record explicitly confirmed real by Leon.

**Conclusion / mitigation.** Keep simulated records permanently quarantined. Separately confirm the LLC's actual federal election, Texas franchise-tax status, sales-tax nexus, and estimated-tax position with a CPA. BOI: FinCEN's 2026 rule exempts domestic U.S.-formed entities; retain evidence of the rule check and monitor only if ownership/entity facts change.

### 3. Contract corpus
**Issue.** Are contracts expiring or renewing without control?

**Rule.** Contract administration requires honoring express renewal, notice, termination, and payment terms; Texas contract remedies may include damages for breach, subject to the agreement and applicable law. Automatic renewal risk is controlled by a dated notice calendar and verified counterparty records.

**Application.** 533 VendorContract records were read across two pages. Numerous records show an August 1, 2026 end date while remaining `active`; several auto-renewing Base44, QuickBooks, Wix, Cloudflare, OpenRouter, Microsoft/Pax8, and SaaS records have October 1, 2026 or August/September 2027 dates. The corpus appears partly synthetic/demo data and is not reliable enough to treat every row as an executed contract.

**Conclusion / mitigation.** Reconcile each real vendor/customer agreement against executed documents, assign a real-vs-simulated field, and create 30/60/90-day renewal notices. Do not send termination or renewal notices based solely on these rows.

### 4. Privacy, security, and regulatory change
**Issue.** Is the organization ready for multi-jurisdictional data protection and AI governance?

**Rule.** Applicable duties depend on nexus, data categories, role, volume, and contracts. Relevant authorities include GDPR (Regulation (EU) 2016/679), CCPA/CPRA (Cal. Civ. Code §§1798.100 et seq.), Texas Data Privacy and Security Act (Tex. Bus. & Com. Code ch. 541), state breach-notification statutes, FTC Act §5, and sector laws such as HIPAA (45 C.F.R. Parts 160, 164) when applicable. NIST AI RMF 1.0 is voluntary guidance, not a statute.

**Application.** 75 ConnectedApp records were read. Several records identify PQC configurations, but some operational/infrastructure records have `pqc_config` null or N/A; that is not proof of noncompliance, but it prevents a blanket “Kyber everywhere” assertion. 88 CompliancePolicy records were read, mostly audited September 6–7. Privacy policy coverage is represented in the entity corpus, but actual public policy text and data-processing agreements were not verified in this run. NIST reports that an AI RMF critical-infrastructure profile concept is under development; OFAC reports September 10, 2026 sanctions-list updates; both require operational monitoring before customer screening claims are made.

**Conclusion / mitigation.** Maintain a data map, controller/processor role matrix, DPA/subprocessor register, incident-response clock, and jurisdiction-specific breach playbook. Treat the approved PQC trio as an engineering target, not legal certification. Screen counterparties against current OFAC lists where sanctions obligations apply; do not claim sanctions clearance from this audit.

### 5. Securities activity
No verified fundraising, Form D, SAFE, convertible note, or 506(c) activity was found in the records reviewed. If fundraising begins, counsel must analyze Securities Act §§4(a)(2), 3(b), Rule 506(b)/(c), Form D under Regulation D, state Blue Sky notice filings, investor accreditation procedures, and anti-fraud duties under Securities Act §17(a) and Exchange Act §10(b)/Rule 10b-5.

### 6. Corporate formalities and IP ownership
The audit did not find authoritative records proving registered-agent status, operating-agreement review, IP assignment from Leon to the LLC, copyright registrations, or trademark applications for “Squirrel OS,” “SQUIRL OS,” or “Squirrel OS Technologies.” Under Texas Business Organizations Code and federal IP rules, these should be documented rather than inferred from branding or repository history. Execute and store a signed IP assignment, maintain an invention/patent docket, and run clearance searches before trademark filing or broad commercial launch.

## Deadline tracker

| Item | Date/window | Finding | Priority |
|---|---:|---|---|
| Federal Q3 estimated tax | Sep. 15, 2026 | Only simulated TaxFiling rows; verify real facts with CPA | High, verification only |
| Texas franchise-tax report | May 15 annually | 2026 threshold reported as $2.65M; actual filing status not verified | Medium |
| Sales-tax record | Oct. 20, 2026 | Simulated only; confirm Texas tax permit/nexus separately | Medium, verification only |
| Federal Q4 estimate | Jan. 15, 2027 | Simulated only; confirm actual liability | Medium |
| Annual federal return | Apr. 15, 2027 | Simulated only; entity/tax election must be confirmed | Medium |
| Provisional conversions/PCT | 12 months from each priority date | No authoritative patent docket in entities; 64/145,825 receipt conflict | **High** |
| BOI | Current 2026 rule | Domestic U.S. entity exemption indicated by FinCEN | Monitor |

## Compliance policy review
88 policies were read. Most show last audit dates of September 6–7, 2026, so the 90-day staleness test is generally passed. Policy records include GDPR, CCPA/CPRA, TDPSA, breach notification, PCI-DSS, HIPAA, NIST, OFAC-related controls, and AI governance, but policy existence is not proof of implementation. No policy text was modified because the audit lacked a safe one-to-one record mapping for all 88 rows and blanket date updates would destroy audit history.

## Risk matrix

| Risk | Likelihood | Impact | Current posture | Mitigation |
|---|---|---|---|---|
| Patent deadline / chain-of-title error | Medium | High | **Yellow/Red** | Verify receipts, execute assignment, counsel docket |
| Data breach / privacy violation | Medium | High | Yellow | Data map, DPA, incident drills, 50-state matrix |
| Worker misclassification | Low/Unknown | Medium/High | Yellow | Written role/classification files; CPA/employment counsel review |
| Securities violation | Low currently | High | Green/Yellow | No fundraising until offering workflow exists |
| Contract breach / missed renewal | High in data, unknown in reality | Medium/High | **Yellow/Red** | Reconcile synthetic vs executed contracts |
| IP ownership dispute | Medium | High | Yellow | Signed Leon-to-LLC assignment and invention docket |
| Tax non-compliance | Unknown | High | Yellow | Confirm real tax facts; simulated rows excluded |
| Tenant isolation / data leakage | Medium | High | Yellow | Customer-scoped reads, redaction, access review |

## Active alerts and operational flags
The entity audit found active critical PredictiveAlert/PlatformAlert records associated with the synthetic September 13 birthday 600-level chaos run. They are not evidence of a real production outage, but critical alerts must not be auto-resolved; human acknowledgment remains required under the standing governance rules. A separate high token-refresh alert reports a missing OneDrive `Files.Read.All` scope.

## Recommendations
1. **Today/next business day:** verify the 64/145,825 USPTO receipt and place every live provisional/PCT date in a counsel-controlled calendar.
2. **Within 7 days:** reconcile 533 contracts into executed, simulated, expired, and pending; do not rely on the entity status alone.
3. **Within 14 days:** verify the public privacy notice, DPA/subprocessor terms, breach matrix, IP assignment, registered agent, operating agreement, and trademark clearance.
4. **Before any fundraising or customer money:** obtain securities counsel review and document the exemption/registration path.
5. **Ongoing:** monitor FinCEN BOI, OFAC, FTC, NIST AI RMF, and EU AI Act developments; record source URLs and effective dates.

## Sources checked
- FinCEN BOI: https://www.fincen.gov/boi and https://www.fincen.gov/boi-faqs
- IRS estimated tax: https://www.irs.gov/faqs/estimated-tax
- Texas Comptroller franchise tax: https://comptroller.texas.gov/taxes/franchise/
- NIST AI RMF: https://www.nist.gov/itl/ai-risk-management-framework
- OFAC recent actions: https://ofac.treasury.gov/recent-actions
- 35 U.S.C. §111(b); Paris Convention, Art. 4C; IRC §§6654, 7503; Tex. Tax Code ch. 171; GDPR; CCPA/CPRA; Tex. Bus. & Com. Code ch. 541; FTC Act §5; 45 C.F.R. Parts 160, 164; Securities Act §§3(b), 4(a)(2), 17(a); Exchange Act §10(b), Rule 10b-5.

**Signature:** Leon Calvin Long, II  
SQUIRL OS — Self-Healing AI Infrastructure  
github.com/LLong2026 · x.com/leonlongITC1 · squirlos-technologies.com  
**7 patents pending + 5 SBIR tracks**
