function parseAndFormatRent(rentString) {
  const rawValue = rentString.replace(/[^\d.]/g, "");
  const numericValue = parseFloat(rawValue) || 0;

  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);

  return { numericValue, formattedValue };
}

module.exports = {
  parseAndFormatRent,
};
