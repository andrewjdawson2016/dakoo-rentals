const { parseAndFormatRent } = require("../index");

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
