function parseAndFormatRent(rentString) {
  const rawValue = rentString.replace(/[^\d.]/g, "");
  let numericValue = parseFloat(rawValue);

  if (isNaN(numericValue) || Math.round(numericValue) === 0) {
    return { numericValue: 0, formattedValue: "" };
  }

  numericValue = Math.round(numericValue);

  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericValue);

  return { numericValue, formattedValue };
}

module.exports = {
  parseAndFormatRent,
};
