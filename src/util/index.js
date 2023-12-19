import { DateTime, Interval } from "luxon";

export function getLeasesWithDatesByYear(buildings) {
  const totalIncomeByYear = new Map();
  buildings.forEach((building) => {
    building.units.forEach((unit) => {
      unit.leases.forEach((lease) => {
        let yearsLeaseSpans = getYearsLeaseSpans(lease);
        yearsLeaseSpans.forEach((year) => {
          let totalLeaseIncomeInYear = getTotalLeaseIncomeInYear(year, lease);
          if (totalIncomeByYear.has(year)) {
            totalIncomeByYear.set(
              year,
              totalIncomeByYear.get(year) + totalLeaseIncomeInYear
            );
          } else {
            totalIncomeByYear.set(year, totalLeaseIncomeInYear);
          }
        });
      });
    });
  });
}

export function getYearsLeaseSpans(lease) {
  let years = [];
  const startYear = DateTime.fromISO(lease.start_date).year;
  const endYear = DateTime.fromISO(lease.end_date).year;

  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }
  return years;
}

export function getTotalLeaseIncomeInYear(year, lease) {
  let { start, end } = getLeaseBoundsInYear(year, lease);
  if (start > end) {
    return 0;
  }
  return getTotalIncomeInYearFromBounds(start, end, lease.price_per_month);
}

export function getTotalIncomeInYearFromBounds(start, end, pricePerMonth) {
  const interval = Interval.fromDateTimes(start, end);
  let sum = 0;

  interval.splitBy({ months: 1 }).forEach((period) => {
    const startOfMonth = period.start.startOf("month");
    const endOfMonth = period.end.endOf("month");
    const daysInMonth = startOfMonth.daysInMonth;
    const overlap = period.intersection(
      Interval.fromDateTimes(startOfMonth, endOfMonth)
    );
    const daysActive = overlap ? overlap.length("days") : 0;
    const dailyRate = pricePerMonth / daysInMonth;

    sum += daysActive * dailyRate;
  });

  return sum;
}

export function getLeaseBoundsInYear(year, lease) {
  const leaseStart = DateTime.fromISO(lease.start_date);
  const leaseEnd = DateTime.fromISO(lease.end_date);
  const yearStart = DateTime.fromObject({ year: year, month: 1, day: 1 });
  const yearEnd = DateTime.fromObject({ year: year, month: 12, day: 31 });

  const effectiveStart = leaseStart > yearStart ? leaseStart : yearStart;
  const effectiveEnd = leaseEnd < yearEnd ? leaseEnd : yearEnd;
  return { start: effectiveStart, end: effectiveEnd };
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
