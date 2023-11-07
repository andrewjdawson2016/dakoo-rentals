import { DateTime } from "luxon";

export function formatDateRange(startDateISO, endDateISO) {
  const start = DateTime.fromISO(startDateISO);
  const end = DateTime.fromISO(endDateISO);

  if (!start.isValid || !end.isValid) {
    throw new Error("Invalid start or end date");
  }

  const formattedStartDate = start.toFormat("MMMM d, yyyy");
  const formattedEndDate = end.toFormat("MMMM d, yyyy");

  return `${formattedStartDate} - ${formattedEndDate}`;
}

export function parseAndFormatRent(rentString) {
  const rawValue = rentString.replace(/[^\d.]/g, "");
  let numericValue = parseFloat(rawValue);

  if (isNaN(numericValue) || numericValue === 0) {
    return { numericValue: 0, formattedValue: "" };
  }

  numericValue = Math.round(numericValue);
  const formattedValue = formatRent(numericValue);

  return { numericValue, formattedValue };
}

export function formatRent(numericValue) {
  if (isNaN(numericValue) || numericValue === 0) {
    return "";
  }

  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(numericValue));

  return `${formattedValue}/mo.`;
}

export function getStartDateFromPrevious(prevLease) {
  return DateTime.fromISO(prevLease.end_date).plus({ days: 1 }).toISODate();
}

export function findLeaseOnDate(leases, targetDate) {
  return (
    leases.find((lease) => {
      const startDate = DateTime.fromISO(lease.start_date);
      const endDate = DateTime.fromISO(lease.end_date);
      return targetDate >= startDate && targetDate <= endDate;
    }) || null
  );
}
