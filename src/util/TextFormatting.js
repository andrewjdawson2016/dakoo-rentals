import { DateTime } from "luxon";

export function formatDateToMonthYear(dateString) {
  const date = DateTime.fromISO(dateString + "-01");
  return date.toFormat("LLL yyyy");
}

export function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export function formatDate(dateISO) {
  const date = DateTime.fromISO(dateISO);
  if (!date.isValid) {
    throw new Error("Invalid date");
  }
  return date.toFormat("MMMM d, yyyy");
}

export function formatDateRange(startDateISO, endDateISO) {
  const formattedStartDate = formatDate(startDateISO);
  const formattedEndDate = formatDate(endDateISO);

  return `${formattedStartDate} - ${formattedEndDate}`;
}

export function parseAndFormatMonthlyMoneyValue(moneyValueString) {
  const rawValue = moneyValueString.replace(/[^\d.]/g, "");
  let numericValue = parseFloat(rawValue);

  if (isNaN(numericValue)) {
    return { numericValue: 0, formattedValue: "" };
  }

  numericValue = Math.round(numericValue);
  const formattedValue = formatMonthlyMoneyValue(numericValue);

  return { numericValue, formattedValue };
}

export function formatMonthlyMoneyValue(numericValue) {
  if (isNaN(numericValue)) {
    return "";
  }

  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(numericValue));

  return `${formattedValue}`;
}

export function mapEventDescription(description) {
  switch (description) {
    case "START":
      return "Lease Starts";
    case "SIX_MONTH":
      return "Send Renewal Option (6 Mo.)";
    case "TWO_MONTH":
      return "Renewal Deadline Reminder (2 Mo.)";
    case "ONE_MONTH":
      return "Renewal Deadline (1 Mo.)";
    case "END":
      return "Lease Ends";
    default:
      return description;
  }
}
