// Calendar dates use Eastern time, including the full expiration day.
export function isContractDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function readLegacyContractPeriod(period: string) {
  const tokens = period.match(/\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{4}|\b\d{4}\b/g) ?? [];
  const dates = tokens.map((token, index) => {
    if (/^\d{4}$/.test(token)) return `${token}-${tokens.length > 1 && index === 0 ? "01-01" : "12-31"}`;
    if (token.includes("/")) {
      const [month, day, year] = token.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
    return token;
  });
  if (!dates.length || dates.length > 2 || dates.some((date) => !isContractDate(date))) {
    return { beginDate: "", expirationDate: "" };
  }
  return { beginDate: dates.length === 2 ? dates[0] : "", expirationDate: dates.at(-1)! };
}

type ContractPeriod = { period: string; beginDate?: Date | null; expirationDate?: Date | null };

export function getContractDates(contract: ContractPeriod) {
  // Structured dates take precedence; never mix an edited date with legacy text.
  if (contract.beginDate || contract.expirationDate) {
    return {
      beginDate: contract.beginDate?.toISOString().slice(0, 10) ?? "",
      expirationDate: contract.expirationDate?.toISOString().slice(0, 10) ?? "",
    };
  }
  return readLegacyContractPeriod(contract.period);
}

export function getContractStatus(contract: ContractPeriod, now = new Date()) {
  const { beginDate, expirationDate } = getContractDates(contract);
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(now);
  if (beginDate && expirationDate && beginDate > expirationDate) return "Status unavailable";
  if (expirationDate && today > expirationDate) return "Expired";
  if (beginDate && today < beginDate) return "Upcoming";
  if (expirationDate) return "Active";
  // Preserve explicitly active legacy records until an expiration is supplied.
  return contract.period.trim().toLowerCase() === "active" ? "Active" : "Status unavailable";
}
