import {
  parseAndFormatMonthlyMoneyValue,
  getStartDateFromPrevious,
  findLeaseOnDate,
  formatDateRange,
  determineLeaseStatus,
  getLeaseBoundsInYear,
} from "../index";
import { DateTime } from "luxon";

describe("getLeaseBoundsInYear", () => {
  test("should handle lease entirely within the year", () => {
    const year = 2021;
    const lease = { start_date: "2021-04-01", end_date: "2021-10-31" };
    const bounds = getLeaseBoundsInYear(year, lease);
    expect(bounds.start.toISODate()).toBe("2021-04-01");
    expect(bounds.end.toISODate()).toBe("2021-10-31");
  });

  test("should handle lease starting before and ending within the year", () => {
    const year = 2021;
    const lease = { start_date: "2020-12-15", end_date: "2021-05-15" };
    const bounds = getLeaseBoundsInYear(year, lease);
    expect(bounds.start.toISODate()).toBe("2021-01-01");
    expect(bounds.end.toISODate()).toBe("2021-05-15");
  });

  test("should handle lease starting within and ending after the year", () => {
    const year = 2021;
    const lease = { start_date: "2021-07-01", end_date: "2022-03-01" };
    const bounds = getLeaseBoundsInYear(year, lease);
    expect(bounds.start.toISODate()).toBe("2021-07-01");
    expect(bounds.end.toISODate()).toBe("2021-12-31");
  });

  test("should handle lease completely before the year", () => {
    const year = 2021;
    const lease = { start_date: "2019-01-01", end_date: "2020-12-31" };
    const bounds = getLeaseBoundsInYear(year, lease);
    expect(bounds.start.toISODate()).toBe("2021-01-01");
    expect(bounds.end.toISODate()).toBe("2020-12-31");
  });

  test("should handle lease completely after the year", () => {
    const year = 2018;
    const lease = { start_date: "2019-01-01", end_date: "2020-12-31" };
    const bounds = getLeaseBoundsInYear(year, lease);
    expect(bounds.start.toISODate()).toBe("2019-01-01");
    expect(bounds.end.toISODate()).toBe("2018-12-31");
  });
});

describe("formatDateRange", () => {
  it("formats a date range correctly", () => {
    const startDate = "2023-07-01";
    const endDate = "2024-06-30";
    const range = formatDateRange(startDate, endDate);
    expect(range).toBe("July 1, 2023 - June 30, 2024");
  });

  it("throws an error for invalid start dates", () => {
    const startDate = "invalid-date";
    const endDate = "2024-06-30";
    expect(() => formatDateRange(startDate, endDate)).toThrow("Invalid date");
  });

  it("throws an error for invalid end dates", () => {
    const startDate = "2023-07-01";
    const endDate = "invalid-date";
    expect(() => formatDateRange(startDate, endDate)).toThrow("Invalid date");
  });

  it("formats a date range for the same start and end date", () => {
    const startDate = "2023-07-01";
    const endDate = "2023-07-01";
    const range = formatDateRange(startDate, endDate);
    expect(range).toBe("July 1, 2023 - July 1, 2023");
  });

  it("formats a date range across years correctly", () => {
    const startDate = "2022-12-31";
    const endDate = "2023-01-01";
    const range = formatDateRange(startDate, endDate);
    expect(range).toBe("December 31, 2022 - January 1, 2023");
  });
});

describe("parseAndFormatMonthlyMoneyValue", () => {
  test("should handle a string with decimal points, rounding to the nearest dollar", () => {
    const input = "1234.56";
    const output = parseAndFormatMonthlyMoneyValue(input);
    expect(output.numericValue).toBe(1235);
    expect(output.formattedValue).toBe("$1,235");
  });

  test("should handle a string with decimal points, rounding down to the nearest dollar", () => {
    const input = "1234.49";
    const output = parseAndFormatMonthlyMoneyValue(input);
    expect(output.numericValue).toBe(1234);
    expect(output.formattedValue).toBe("$1,234");
  });

  test("should return 0 and an empty string if the rounded value is 0", () => {
    const inputs = ["0", "0.00"];
    inputs.forEach((input) => {
      const output = parseAndFormatMonthlyMoneyValue(input);
      expect(output.numericValue).toBe(0);
      expect(output.formattedValue).toBe("");
    });
  });

  test("should handle an empty string", () => {
    const input = "";
    const output = parseAndFormatMonthlyMoneyValue(input);
    expect(output.numericValue).toBe(0);
    expect(output.formattedValue).toBe("");
  });

  test("should handle a string with non-numeric characters", () => {
    const input = "abcd";
    const output = parseAndFormatMonthlyMoneyValue(input);
    expect(output.numericValue).toBe(0);
    expect(output.formattedValue).toBe("");
  });

  test("should ignore non-numeric characters when parsing", () => {
    const input = "$1,234.99";
    const output = parseAndFormatMonthlyMoneyValue(input);
    expect(output.numericValue).toBe(1235);
    expect(output.formattedValue).toBe("$1,235");
  });

  test("should round and format a large number correctly", () => {
    const input = "1234567.89";
    const output = parseAndFormatMonthlyMoneyValue(input);
    expect(output.numericValue).toBe(1234568);
    expect(output.formattedValue).toBe("$1,234,568");
  });

  test("should handle a string with just a decimal point", () => {
    const input = ".";
    const output = parseAndFormatMonthlyMoneyValue(input);
    expect(output.numericValue).toBe(0);
    expect(output.formattedValue).toBe("");
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
