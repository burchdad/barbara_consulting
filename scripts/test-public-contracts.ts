import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getPublicContractStatus, isSewpViContract, normalizePublicContract } from "../lib/public-contracts";
import sewp from "../lib/content/sewp.json";

const legacy = {
  name: "NASA SEWP VI", contractNumber: "80TECH26DXXX", agency: "GSA",
  period: "Active", beginDate: new Date("2026-01-01"), expirationDate: new Date("2036-01-01"),
  summary: "Category C", id: "existing-record",
};
const normalized = normalizePublicContract(legacy);
assert.equal(normalized.contractNumber, sewp.contractNumber);
assert.equal(normalized.agency, "NASA");
assert.equal(normalized.id, legacy.id);
assert.equal(normalized.summary, legacy.summary);
assert.equal(legacy.agency, "GSA", "must not mutate the database object");
assert.match(getPublicContractStatus(normalized), /Confirm current ordering availability/);
assert.equal(getPublicContractStatus(normalized, new Date("2040-01-01")), getPublicContractStatus(normalized));
const other = { ...legacy, name: "GSA MAS Schedule", contractNumber: "GS-35F-290CA" };
assert.equal(normalizePublicContract(other), other);
assert.equal(getPublicContractStatus(other, new Date("2026-11-02")), "Active");
assert.equal(isSewpViContract({ name: "NASA SEWP V", contractNumber: "unrelated" }), false);
assert.equal(isSewpViContract({ name: " SEWP VI ", contractNumber: "" }), true);
const homepage = readFileSync("app/(public)/page.tsx", "utf8");
assert.doesNotMatch(homepage, /84%|-32%/);
assert.match(homepage, /Assess &amp; Plan/);
assert.match(homepage, /Map &amp; Improve/);
console.log("Public contract and homepage content regression checks passed.");
const siteData = readFileSync("lib/site-data.ts", "utf8");
assert.equal((siteData.match(/contracts: contracts\.map\(normalizePublicContract\)/g) ?? []).length, 2);
const contractsPage = readFileSync("app/(public)/contracts/page.tsx", "utf8");
assert.match(contractsPage, /getPublicContractStatus\(contract\)/);
assert.doesNotMatch(contractsPage, /\{getContractStatus\(contract\)\}/);
