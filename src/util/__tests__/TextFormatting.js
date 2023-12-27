import {
  formatDateToMonthYear,
  formatDateRange,
  parseAndFormatMonthlyMoneyValue,
} from "../TextFormatting";

describe("formatDateToMonthYear", () => {
  test('converts "2020-12" to "Dec 2020"', () => {
    expect(formatDateToMonthYear("2020-12")).toBe("Dec 2020");
  });

  test('converts "2021-05" to "May 2021"', () => {
    expect(formatDateToMonthYear("2021-05")).toBe("May 2021");
  });

  test('converts "2019-01" to "Jan 2019"', () => {
    expect(formatDateToMonthYear("2019-01")).toBe("Jan 2019");
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
