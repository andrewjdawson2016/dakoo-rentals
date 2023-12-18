import { DateTime } from "luxon";

export function getFlattenedLeases(buildings) {
  let leases = [];

  buildings.forEach((building) => {
    building.units.forEach((unit) => {
      unit.leases.forEach((lease) => {
        leases.push(lease);
      });
    });
  });

  return leases;
}

export function getLeaseYears(lease) {
  const startYear = DateTime.fromISO(lease.start_date).year;
  const endYear = DateTime.fromISO(lease.end_date).year;
  const years = [];

  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }

  return years;
}

export function getLeaseDatesForYear(year, lease) {
  const leaseStart = DateTime.fromISO(lease.start_date);
  const leaseEnd = DateTime.fromISO(lease.end_date);
  const yearStart = DateTime.fromObject({ year: year, month: 1, day: 1 });
  const yearEnd = DateTime.fromObject({ year: year, month: 12, day: 31 });

  let effectiveStart = leaseStart > yearStart ? leaseStart : yearStart;
  let effectiveEnd = leaseEnd < yearEnd ? leaseEnd : yearEnd;

  if (effectiveStart > effectiveEnd) {
    return null;
  }

  return {
    start_date: effectiveStart.toISODate(),
    end_date: effectiveEnd.toISODate(),
    price_per_month: lease.price_per_month,
  };
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

  if (isNaN(numericValue) || numericValue === 0) {
    return { numericValue: 0, formattedValue: "" };
  }

  numericValue = Math.round(numericValue);
  const formattedValue = formatMonthlyMoneyValue(numericValue);

  return { numericValue, formattedValue };
}

export function formatMonthlyMoneyValue(numericValue) {
  if (isNaN(numericValue) || numericValue === 0) {
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

export function determineLeaseStatus(startDateISO, endDateISO, currentDateISO) {
  const startDate = DateTime.fromISO(startDateISO);
  const endDate = DateTime.fromISO(endDateISO);
  const currentDate = DateTime.fromISO(currentDateISO);

  if (currentDate < startDate) {
    return startDate.diff(currentDate, "days").days;
  } else if (currentDate >= startDate && currentDate <= endDate) {
    return 0;
  } else {
    return endDate.diff(currentDate, "days").days;
  }
}
