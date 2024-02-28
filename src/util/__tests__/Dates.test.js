import { DateTime } from "luxon";
import {
  getExpenseMonths,
  getStartDateFromPrevious,
  findLeaseOnDate,
  determineLeaseStatus,
  getEventsInRange,
} from "../Dates";

describe("getExpenseMonths", () => {
  test("should return all months with null expenses when no expenses are logged", () => {
    const expenses = [];
    const firstRentalMonth = "2020-01";
    const currentDate = DateTime.fromISO("2020-06-01").toISODate();
    const expected = [
      ["2020-01", null],
      ["2020-02", null],
      ["2020-03", null],
      ["2020-04", null],
      ["2020-05", null],
      ["2020-06", null],
    ];
    expect(getExpenseMonths(expenses, firstRentalMonth, currentDate)).toEqual(
      expected
    );
  });

  test("should return no months when all are logged", () => {
    const expenses = [
      { month_year: "2020-01" },
      { month_year: "2020-02" },
      { month_year: "2020-03" },
      { month_year: "2020-04" },
      { month_year: "2020-05" },
      { month_year: "2020-06" },
    ];
    const firstRentalMonth = "2020-01";
    const currentDate = DateTime.fromISO("2020-06-01").toISODate();
    const expected = expenses.map((expense) => [expense.month_year, expense]);
    expect(getExpenseMonths(expenses, firstRentalMonth, currentDate)).toEqual(
      expected
    );
  });

  test("should return only unlogged months with corresponding null expenses", () => {
    const expenses = [{ month_year: "2020-01" }, { month_year: "2020-03" }];
    const firstRentalMonth = "2020-01";
    const currentDate = DateTime.fromISO("2020-06-01").toISODate();
    const expected = [
      ["2020-01", expenses[0]],
      ["2020-02", null],
      ["2020-03", expenses[1]],
      ["2020-04", null],
      ["2020-05", null],
      ["2020-06", null],
    ];
    expect(getExpenseMonths(expenses, firstRentalMonth, currentDate)).toEqual(
      expected
    );
  });

  test("should handle empty expenses and future firstRentalMonth correctly", () => {
    const expenses = [];
    const firstRentalMonth = "2021-01";
    const currentDate = DateTime.fromISO("2020-06-01").toISODate();
    expect(getExpenseMonths(expenses, firstRentalMonth, currentDate)).toEqual(
      []
    );
  });
});

describe("getStartDateFromPrevious", () => {
  it("should return the next day as a start date in ISO format", () => {
    const prevLease = { end_date: "2023-01-15" };
    const expectedStartDate = "2023-01-16";
    const actualStartDate = getStartDateFromPrevious(prevLease);
    expect(actualStartDate).toBe(expectedStartDate);
  });

  it("should handle leap years correctly", () => {
    const prevLease = { end_date: "2024-02-29" };
    const expectedStartDate = "2024-03-01";
    const actualStartDate = getStartDateFromPrevious(prevLease);
    expect(actualStartDate).toBe(expectedStartDate);
  });

  it("should roll over to the next month correctly", () => {
    const prevLease = { end_date: "2023-03-31" };
    const expectedStartDate = "2023-04-01";
    const actualStartDate = getStartDateFromPrevious(prevLease);
    expect(actualStartDate).toBe(expectedStartDate);
  });

  it("should roll over to the next year correctly", () => {
    const prevLease = { end_date: "2023-12-31" };
    const expectedStartDate = "2024-01-01";
    const actualStartDate = getStartDateFromPrevious(prevLease);
    expect(actualStartDate).toBe(expectedStartDate);
  });
});

describe("findLeaseOnDate", () => {
  const leases = [
    { start_date: "2023-01-01", end_date: "2023-06-30" },
    { start_date: "2023-07-01", end_date: "2023-12-31" },
  ];

  test("should return the lease if target date is within a lease period", () => {
    const targetDate = DateTime.fromISO("2023-02-15");
    const expectedLease = leases[0];
    expect(findLeaseOnDate(leases, targetDate)).toEqual(expectedLease);
  });

  test("should return null if target date is not within any lease periods", () => {
    const targetDate = DateTime.fromISO("2024-01-01");
    expect(findLeaseOnDate(leases, targetDate)).toBeNull();
  });

  test("should return the lease if target date is the start date of a lease period", () => {
    const targetDate = DateTime.fromISO("2023-07-01");
    const expectedLease = leases[1];
    expect(findLeaseOnDate(leases, targetDate)).toEqual(expectedLease);
  });

  test("should return the lease if target date is the end date of a lease period", () => {
    const targetDate = DateTime.fromISO("2023-06-30");
    const expectedLease = leases[0];
    expect(findLeaseOnDate(leases, targetDate)).toEqual(expectedLease);
  });

  test("should return null if the leases array is empty", () => {
    const targetDate = DateTime.fromISO("2023-02-15");
    expect(findLeaseOnDate([], targetDate)).toBeNull();
  });
});

describe("determineLeaseStatus", () => {
  it("should return a negative number for a past lease", () => {
    const startDate = DateTime.now().minus({ days: 30 }).toISO();
    const endDate = DateTime.now().minus({ days: 15 }).toISO();
    const currentDate = DateTime.now().toISO();

    const result = determineLeaseStatus(startDate, endDate, currentDate);
    expect(result).toBeLessThan(0);
  });

  it("should return 0 for a current lease", () => {
    const startDate = DateTime.now().minus({ days: 15 }).toISO();
    const endDate = DateTime.now().plus({ days: 15 }).toISO();
    const currentDate = DateTime.now().toISO();

    const result = determineLeaseStatus(startDate, endDate, currentDate);
    expect(result).toBe(0);
  });

  it("should return a positive number for a future lease", () => {
    const startDate = DateTime.now().plus({ days: 15 }).toISO();
    const endDate = DateTime.now().plus({ days: 30 }).toISO();
    const currentDate = DateTime.now().toISO();

    const result = determineLeaseStatus(startDate, endDate, currentDate);
    expect(result).toBeGreaterThan(0);
  });
});

describe("getEventsInRange", () => {
  const buildings = [
    {
      building_type: "SINGLE_FAMILY",
      nickname: "SingleFamilyHome",
      units: [
        {
          leases: [
            {
              leaseEvents: [
                { due_date: "2024-03-15", execution_date: null },
                { due_date: "2024-09-20", execution_date: "2024-04-01" },
              ],
            },
          ],
        },
      ],
    },
    {
      building_type: "MULTI_FAMILY",
      nickname: "MultiFamilyComplex",
      units: [
        {
          unit_number: "101",
          leases: [
            {
              leaseEvents: [
                { due_date: "2024-04-01", execution_date: null },
                { due_date: "2024-10-31", execution_date: null },
              ],
            },
          ],
        },
      ],
    },
  ];

  it("should return events without an execution date and due within the next 6 months", () => {
    const currentDateISO = "2024-01-01";
    const events = getEventsInRange(buildings, currentDateISO);
    expect(events).toHaveLength(2);
    expect(events[0].event.due_date).toEqual("2024-03-15");
    expect(events[1].event.due_date).toEqual("2024-04-01");
  });

  it("should return events sorted by due_date", () => {
    const currentDateISO = "2024-01-01";
    const events = getEventsInRange(buildings, currentDateISO);
    expect(events).toEqual(
      events.sort(
        (a, b) =>
          DateTime.fromISO(a.event.due_date) -
          DateTime.fromISO(b.event.due_date)
      )
    );
  });
});
