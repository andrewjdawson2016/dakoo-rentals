import {
  parseAndFormatRent,
  getStartDateFromPrevious,
  findLeaseOnDate,
} from "../index";
import { DateTime } from "luxon";

describe("parseAndFormatRent", () => {
  test("should handle a string with decimal points, rounding to the nearest dollar", () => {
    const input = "1234.56";
    const output = parseAndFormatRent(input);
    expect(output.numericValue).toBe(1235);
    expect(output.formattedValue).toBe("$1,235");
  });

  test("should handle a string with decimal points, rounding down to the nearest dollar", () => {
    const input = "1234.49";
    const output = parseAndFormatRent(input);
    expect(output.numericValue).toBe(1234);
    expect(output.formattedValue).toBe("$1,234");
  });

  test("should return 0 and an empty string if the rounded value is 0", () => {
    const inputs = ["0", "0.00"];
    inputs.forEach((input) => {
      const output = parseAndFormatRent(input);
      expect(output.numericValue).toBe(0);
      expect(output.formattedValue).toBe("");
    });
  });

  test("should handle an empty string", () => {
    const input = "";
    const output = parseAndFormatRent(input);
    expect(output.numericValue).toBe(0);
    expect(output.formattedValue).toBe("");
  });

  test("should handle a string with non-numeric characters", () => {
    const input = "abcd";
    const output = parseAndFormatRent(input);
    expect(output.numericValue).toBe(0);
    expect(output.formattedValue).toBe("");
  });

  test("should ignore non-numeric characters when parsing", () => {
    const input = "$1,234.99";
    const output = parseAndFormatRent(input);
    expect(output.numericValue).toBe(1235);
    expect(output.formattedValue).toBe("$1,235");
  });

  test("should round and format a large number correctly", () => {
    const input = "1234567.89";
    const output = parseAndFormatRent(input);
    expect(output.numericValue).toBe(1234568);
    expect(output.formattedValue).toBe("$1,234,568");
  });

  test("should handle a string with just a decimal point", () => {
    const input = ".";
    const output = parseAndFormatRent(input);
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