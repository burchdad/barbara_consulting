import assert from "node:assert/strict";
import { test } from "node:test";
import { getContractStatus, readLegacyContractPeriod } from "./contract-period";
import { contractSchema } from "./validators";

test("expiration remains active through the full Eastern calendar day", () => {
  const contract = { period: "", expirationDate: new Date("2026-09-15T00:00:00Z") };
  assert.equal(getContractStatus(contract, new Date("2026-09-16T03:59:59Z")), "Active");
  assert.equal(getContractStatus(contract, new Date("2026-09-16T04:00:00Z")), "Expired");
});

test("begin date determines upcoming status and structured dates override legacy text", () => {
  const contract = { period: "2020 Expiration", beginDate: new Date("2026-10-01Z"), expirationDate: new Date("2027-10-01Z") };
  assert.equal(getContractStatus(contract, new Date("2026-09-15T12:00:00Z")), "Upcoming");
  assert.equal(getContractStatus(contract, new Date("2026-10-01T12:00:00Z")), "Active");
});

test("legacy full dates, ranges, and year-only expirations", () => {
  assert.deepEqual(readLegacyContractPeriod("Expiration Date: 7/1/2029"), { beginDate: "", expirationDate: "2029-07-01" });
  assert.deepEqual(readLegacyContractPeriod("2030 Expiration"), { beginDate: "", expirationDate: "2030-12-31" });
  assert.deepEqual(readLegacyContractPeriod("2025 - 2030"), { beginDate: "2025-01-01", expirationDate: "2030-12-31" });
  assert.deepEqual(readLegacyContractPeriod("1/1/2025 - 7/1/2029"), { beginDate: "2025-01-01", expirationDate: "2029-07-01" });
  assert.equal(getContractStatus({ period: "2030 Expiration" }, new Date("2026-09-15Z")), "Active");
});

test("missing, invalid and explicitly active legacy records", () => {
  assert.equal(getContractStatus({ period: "Active" }), "Active");
  for (const period of ["", "TBD", "2/30/2029", "2029-01-01 / 2028-01-01"]) {
    assert.equal(getContractStatus({ period }), "Status unavailable");
  }
});

test("date fields reject missing expirations and impossible dates", () => {
  assert.equal(contractSchema.shape.expirationDate.safeParse("").success, false);
  assert.equal(contractSchema.shape.expirationDate.safeParse("2027-02-29").success, false);
  assert.equal(contractSchema.shape.expirationDate.safeParse("2028-02-29").success, true);
  assert.equal(contractSchema.shape.beginDate.safeParse("").success, true);
});
