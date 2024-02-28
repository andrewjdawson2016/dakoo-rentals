import { DateTime } from "luxon";

export function getExpenseMonths(expenses, firstRentalMonth, currentDate) {
  const expenseMap = new Map();

  expenses.forEach((expense) => {
    expenseMap.set(expense.month_year, expense);
  });

  const start = DateTime.fromISO(firstRentalMonth + "-01");
  const end = DateTime.fromISO(currentDate);
  const result = [];
  let month = start;

  while (month <= end) {
    const monthStr = month.toISODate().slice(0, 7);
    const expense = expenseMap.get(monthStr) || null;
    result.push([monthStr, expense]);
    month = month.plus({ months: 1 });
  }

  return result;
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

export function getEventsInRange(buildings, currentDateISO) {
  const currentDate = DateTime.fromISO(currentDateISO);
  const threeMonthsBefore = currentDate.minus({ months: 3 });
  const sixMonthsAfter = currentDate.plus({ months: 6 });

  const isDateInRange = (dateStr) => {
    const date = DateTime.fromISO(dateStr);
    return date >= threeMonthsBefore && date <= sixMonthsAfter;
  };

  const eventsInRange = [];

  for (const building of buildings) {
    for (const unit of building.units) {
      for (const lease of unit.leases) {
        for (const event of lease.leaseEvents) {
          if (isDateInRange(event.due_date)) {
            eventsInRange.push(event);
          }
        }
      }
    }
  }

  return eventsInRange;
}
