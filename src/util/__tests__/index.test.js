const { parseAndFormatRent } = require("../index");

describe("parseAndFormatRent", () => {
  test("should parse and format a simple number string", () => {
    const input = "1000";
    const output = parseAndFormatRent(input);
    expect(output.numericValue).toBeCloseTo(1000);
    expect(output.formattedValue).toBe("$1,000.00");
  });

  test("should handle a string with dollar sign and commas", () => {
    const input = "$1,000";
    const output = parseAndFormatRent(input);
    expect(output.numericValue).toBeCloseTo(1000);
    expect(output.formattedValue).toBe("$1,000.00");
  });

  test("should handle a string with decimal points and include decimal values", () => {
    const input = "1234.56";
    const output = parseAndFormatRent(input);
    expect(output.numericValue).toBeCloseTo(1234.56);
    expect(output.formattedValue).toBe("$1,234.56");
  });

  test("should handle a string with non-numeric characters", () => {
    const input = "1a2b3c4.56";
    const output = parseAndFormatRent(input);
    expect(output.numericValue).toBeCloseTo(1234.56);
    expect(output.formattedValue).toBe("$1,234.56");
  });

  test("should return 0 for non-numeric string", () => {
    const input = "abc";
    const output = parseAndFormatRent(input);
    expect(output.numericValue).toBeCloseTo(0);
    expect(output.formattedValue).toBe("$0.00");
  });

  test("should handle a string with multiple decimal points", () => {
    const input = "1234.56.78.90";
    const output = parseAndFormatRent(input);
    expect(output.numericValue).toBeCloseTo(1234.56);
    expect(output.formattedValue).toBe("$1,234.56");
  });

  test("should handle an empty string", () => {
    const input = "";
    const output = parseAndFormatRent(input);
    expect(output.numericValue).toBeCloseTo(0);
    expect(output.formattedValue).toBe("$0.00");
  });
});
