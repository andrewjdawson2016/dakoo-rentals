import { DateTime } from "luxon";

export function getTotalIncomeByYear(buildings) {
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
  return totalIncomeByYear;
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
  return getTotalIncomeFromBounds(start, end, lease.price_per_month);
}

export function getTotalIncomeFromBounds(start, end, pricePerMonth) {
  let sum = 0;
  let current = start.startOf("month");
  end = end.endOf("day");

  while (current <= end) {
    const daysInMonth = current.daysInMonth;
    const startOfMonth = current;
    const endOfMonth = current.endOf("month");

    const overlapStart = start > startOfMonth ? start : startOfMonth;
    const overlapEnd = end < endOfMonth ? end : endOfMonth;
    const daysActive = overlapEnd.diff(overlapStart, "days").days;

    sum += (daysActive / daysInMonth) * pricePerMonth;
    current = current.plus({ months: 1 }).startOf("month");
  }

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
