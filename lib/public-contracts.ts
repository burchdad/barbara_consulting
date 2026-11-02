import sewp from "./content/sewp.json";
import { getContractStatus } from "./contract-period";

type PublicContract = {
  name: string;
  contractNumber: string;
  agency: string;
  period: string;
  beginDate?: Date | null;
  expirationDate?: Date | null;
};

export function isSewpViContract(contract: Pick<PublicContract, "name" | "contractNumber">) {
  return /^(?:NASA\s+)?SEWP\s+VI$/i.test(contract.name.trim()) ||
    contract.contractNumber === sewp.contractNumber ||
    contract.contractNumber === "80TECH26DXXX";
}

// Public pages share the reviewed SEWP record with /sewp-vi. This also corrects
// existing database-backed records without mutating admin content or other vehicles.
export function normalizePublicContract<T extends PublicContract>(contract: T): T {
  if (!isSewpViContract(contract)) return contract;
  return { ...contract, contractNumber: sewp.contractNumber, agency: "NASA" };
}

export function getPublicContractStatus(contract: PublicContract, now = new Date()) {
  // A contract award or date range alone does not establish ordering activation.
  if (isSewpViContract(contract)) return "Confirm current ordering availability with the SEWP VI team";
  return getContractStatus(contract, now);
}
