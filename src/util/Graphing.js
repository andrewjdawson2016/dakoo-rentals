import { DateTime } from "luxon";

export function getPercentageFinancialSummaryYearlyPercentChange(buildings) {
  const financialSummary = computeFinancialSummaryByYear(buildings);
  const percentageSummary = [];
  const currentYear = new Date().getFullYear();

  for (let i = 1; i < financialSummary.length; i++) {
    const prevYearData = financialSummary[i - 1];
    const currentYearData = financialSummary[i];

    if (currentYearData.year === currentYear) {
      break;
    }

    const incomeChangePercent = calculatePercentageChange(
      prevYearData.income,
      currentYearData.income
    );
    const expenseChangePercent = calculatePercentageChange(
      prevYearData.expense,
      currentYearData.expense
    );
    const profitChangePercent = calculateProfitChangePercent(
      prevYearData.profit,
      currentYearData.profit
    );

    percentageSummary.push({
      year: currentYearData.year,
      incomeChangePercent,
      expenseChangePercent,
      profitChangePercent,
    });
  }

  return percentageSummary;
}

export function calculateProfitChangePercent(prevProfit, currentProfit) {
  if (prevProfit < 0 && currentProfit >= 0) {
    return ((currentProfit - prevProfit) / -prevProfit) * 100;
  }

  if (prevProfit > 0 && currentProfit <= 0) {
    return ((currentProfit - prevProfit) / prevProfit) * 100;
  }

  return ((currentProfit - prevProfit) / Math.abs(prevProfit)) * 100;
}

export function calculatePercentageChange(oldValue, newValue) {
  return ((newValue - oldValue) / Math.abs(oldValue)) * 100;
}

export function computeFinancialSummaryByMonth(buildings) {
  const startMonth = getEarliestFirstRentalMonth(buildings);
  const endMonth = DateTime.now().toFormat("yyyy-MM");

  const totalIncomeByMonth = getTotalIncomeByMonth(buildings);
  const totalExpensesByMonth = getTotalExpensesByMonth(buildings);
  const financialSummary = [];

  let currentMonth = DateTime.fromFormat(startMonth, "yyyy-MM");

  while (currentMonth.toFormat("yyyy-MM") <= endMonth) {
    const monthYear = currentMonth.toFormat("yyyy-MM");
    const income = totalIncomeByMonth.get(monthYear) || 0;
    const expense = totalExpensesByMonth.get(monthYear) || 0;
    const profit = income - expense;

    financialSummary.push({ monthYear, income, expense, profit });

    currentMonth = currentMonth.plus({ months: 1 });
  }

  return financialSummary;
}

export function getTotalIncomeByMonth(buildings) {
  const totalIncomeByMonth = new Map();

  buildings.forEach((building) => {
    building.units.forEach((unit) => {
      unit.leases.forEach((lease) => {
        const incomeByMonth = getTotalIncomeFromBoundsByMonth(
          DateTime.fromISO(lease.start_date),
          DateTime.fromISO(lease.end_date),
          lease.price_per_month
        );

        incomeByMonth.forEach((income, monthYear) => {
          if (!totalIncomeByMonth.has(monthYear)) {
            totalIncomeByMonth.set(monthYear, 0);
          }
          totalIncomeByMonth.set(
            monthYear,
            totalIncomeByMonth.get(monthYear) + income
          );
        });
      });
    });
  });

  return totalIncomeByMonth;
}

export function getTotalExpensesByMonth(buildings) {
  const totalExpensesByMonth = new Map();

  buildings.forEach((building) => {
    building.expenses.forEach((expense) => {
      if (!totalExpensesByMonth.has(expense.month_year)) {
        totalExpensesByMonth.set(expense.month_year, 0);
      }

      totalExpensesByMonth.set(
        expense.month_year,
        totalExpensesByMonth.get(expense.month_year) + expense.amount
      );
    });
  });

  return totalExpensesByMonth;
}

export function computeFinancialSummaryByYear(buildings) {
  const currentYear = DateTime.now().year;
  const totalIncomeByYear = getTotalIncomeByYear(buildings, DateTime.now());
  const totalExpensesByYear = getTotalExpensesByYear(buildings);
  const financialSummary = [];

  totalIncomeByYear.forEach((income, year) => {
    if (year <= currentYear) {
      const expense = totalExpensesByYear.get(year) || 0;
      const profit = income - expense;
      financialSummary.push({ year, income, expense, profit });
    }
  });

  totalExpensesByYear.forEach((expense, year) => {
    if (
      year <= currentYear &&
      !financialSummary.some((summary) => summary.year === year)
    ) {
      const income = 0;
      const profit = income - expense;
      financialSummary.push({ year, income, expense, profit });
    }
  });

  financialSummary.sort((a, b) => a.year - b.year);

  return financialSummary;
}

export function getTotalExpensesByYear(buildings) {
  const totalExpensesByYear = new Map();

  buildings.forEach((building) => {
    building.expenses.forEach((expense) => {
      const year = parseInt(expense.month_year.split("-")[0], 10);

      if (!totalExpensesByYear.has(year)) {
        totalExpensesByYear.set(year, 0);
      }

      totalExpensesByYear.set(
        year,
        totalExpensesByYear.get(year) + expense.amount
      );
    });
  });

  return totalExpensesByYear;
}

export function getTotalIncomeByYear(buildings, now) {
  const totalIncomeByYear = new Map();
  buildings.forEach((building) => {
    building.units.forEach((unit) => {
      unit.leases.forEach((lease) => {
        let yearsLeaseSpans = getYearsLeaseSpans(lease);
        yearsLeaseSpans.forEach((year) => {
          let totalLeaseIncomeInYear = getTotalLeaseIncomeInYear(
            year,
            lease,
            now
          );
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

export function getTotalLeaseIncomeInYear(year, lease, now) {
  let { start, end } = getLeaseBoundsInYear(year, lease);
  if (start > end) {
    return 0;
  }
  if (end > now) {
    end = now;
  }
  return getTotalIncomeFromBounds(start, end, lease.price_per_month);
}

export function getTotalIncomeFromBoundsByMonth(start, end, pricePerMonth) {
  let incomeByMonth = new Map();
  let current = start.startOf("month");
  end = end.endOf("day");

  while (current <= end) {
    const daysInMonth = current.daysInMonth;
    const startOfMonth = current;
    const endOfMonth = current.endOf("month");

    const overlapStart = start > startOfMonth ? start : startOfMonth;
    const overlapEnd = end < endOfMonth ? end : endOfMonth;
    const daysActive = overlapEnd.diff(overlapStart, "days").days;

    incomeByMonth.set(
      current.toFormat("yyyy-MM"),
      (daysActive / daysInMonth) * pricePerMonth
    );

    current = current.plus({ months: 1 }).startOf("month");
  }

  return incomeByMonth;
}

export function getTotalIncomeFromBounds(start, end, pricePerMonth) {
  const incomeByMonth = getTotalIncomeFromBoundsByMonth(
    start,
    end,
    pricePerMonth
  );
  let sum = 0;
  incomeByMonth.forEach((income) => {
    sum += income;
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

export function getEarliestFirstRentalMonth(buildings) {
  let earliestMonth = DateTime.now().toFormat("yyyy-MM");

  buildings.forEach((building) => {
    if (building.first_rental_month < earliestMonth) {
      earliestMonth = building.first_rental_month;
    }
  });

  return earliestMonth;
}
