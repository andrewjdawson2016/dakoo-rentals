import { DateTime } from "luxon";
import {
  getTotalIncomeByYear,
  getYearsLeaseSpans,
  getTotalLeaseIncomeInYear,
  getTotalIncomeFromBounds,
  getLeaseBoundsInYear,
} from "../Graphing";

describe("getTotalIncomeByYear", () => {
  test("should handle a single building with a single lease", () => {
    const buildings = [
      {
        units: [
          {
            leases: [
              {
                start_date: "2021-01-01",
                end_date: "2021-12-31",
                price_per_month: 1000,
              },
            ],
          },
        ],
      },
    ];
    const totalIncome = getTotalIncomeByYear(buildings);
    expect(totalIncome.get(2021)).toBeCloseTo(12000);
  });

  test("should handle a single building with multiple leases", () => {
    const buildings = [
      {
        units: [
          {
            leases: [
              {
                start_date: "2020-06-01",
                end_date: "2020-12-31",
                price_per_month: 1000,
              },
              {
                start_date: "2021-01-01",
                end_date: "2021-12-31",
                price_per_month: 1200,
              },
            ],
          },
        ],
      },
    ];
    const totalIncome = getTotalIncomeByYear(buildings);
    expect(totalIncome.get(2020)).toBeCloseTo(7000);
    expect(totalIncome.get(2021)).toBeCloseTo(14400);
  });

  test("should handle multiple buildings with various leases", () => {
    const buildings = [
      {
        units: [
          {
            leases: [
              {
                start_date: "2019-05-01",
                end_date: "2019-12-31",
                price_per_month: 800,
              },
            ],
          },
        ],
      },
      {
        units: [
          {
            leases: [
              {
                start_date: "2020-01-01",
                end_date: "2020-06-30",
                price_per_month: 900,
              },
              {
                start_date: "2021-07-01",
                end_date: "2021-12-31",
                price_per_month: 1100,
              },
            ],
          },
        ],
      },
      {
        units: [
          {
            leases: [
              {
                start_date: "2018-06-15",
                end_date: "2020-06-05",
                price_per_month: 600,
              },
            ],
          },
        ],
      },
      {
        units: [
          {
            leases: [
              {
                start_date: "2016-01-15",
                end_date: "2018-10-10",
                price_per_month: 1100,
              },
            ],
          },
        ],
      },
    ];
    const totalIncome = getTotalIncomeByYear(buildings);
    expect(totalIncome.get(2016)).toBeCloseTo(12703.2258);
    expect(totalIncome.get(2017)).toBeCloseTo(13200);
    expect(totalIncome.get(2018)).toBeCloseTo(14174.838);
    expect(totalIncome.get(2019)).toBeCloseTo(13600);
    expect(totalIncome.get(2020)).toBeCloseTo(8500);
    expect(totalIncome.get(2021)).toBeCloseTo(6600);
  });
});

describe("getYearsLeaseSpans", () => {
  test("should handle lease within a single year", () => {
    const lease = { start_date: "2021-04-01", end_date: "2021-10-31" };
    const years = getYearsLeaseSpans(lease);
    expect(years).toEqual([2021]);
  });

  test("should handle lease spanning multiple years", () => {
    const lease = { start_date: "2020-05-01", end_date: "2022-03-01" };
    const years = getYearsLeaseSpans(lease);
    expect(years).toEqual([2020, 2021, 2022]);
  });

  test("should handle lease at year boundary", () => {
    const lease = { start_date: "2020-12-31", end_date: "2021-01-02" };
    const years = getYearsLeaseSpans(lease);
    expect(years).toEqual([2020, 2021]);
  });
});

describe("getTotalLeaseIncomeInYear", () => {
  const pricePerMonth = 1000;

  test("should handle lease entirely within the year", () => {
    const year = 2021;
    const lease = {
      start_date: "2021-04-01",
      end_date: "2021-10-31",
      price_per_month: pricePerMonth,
    };
    const income = getTotalLeaseIncomeInYear(year, lease);
    const expectedIncome = 7 * pricePerMonth;
    expect(income).toBeCloseTo(expectedIncome);
  });

  test("should handle lease starting before and ending within the year", () => {
    const year = 2021;
    const lease = {
      start_date: "2020-12-15",
      end_date: "2021-05-15",
      price_per_month: pricePerMonth,
    };
    const income = getTotalLeaseIncomeInYear(year, lease);
    const expectedIncome = (4 + 15 / 31) * pricePerMonth;
    expect(income).toBeCloseTo(expectedIncome);
  });

  test("should handle lease starting within and ending after the year", () => {
    const year = 2021;
    const lease = {
      start_date: "2021-07-05",
      end_date: "2022-03-01",
      price_per_month: pricePerMonth,
    };
    const income = getTotalLeaseIncomeInYear(year, lease);
    const expectedIncome = (5 + 27 / 31) * pricePerMonth;
    expect(income).toBeCloseTo(expectedIncome);
  });

  test("should handle lease completely outside the year", () => {
    const year = 2021;
    const lease = {
      start_date: "2019-01-01",
      end_date: "2020-12-31",
      price_per_month: pricePerMonth,
    };
    const income = getTotalLeaseIncomeInYear(year, lease);
    expect(income).toBeCloseTo(0);
  });
});

describe("getTotalIncomeFromBounds", () => {
  const pricePerMonth = 1000;

  test("should handle lease covering entire month", () => {
    const start = DateTime.fromISO("2021-06-01");
    const end = DateTime.fromISO("2021-06-30");
    const income = getTotalIncomeFromBounds(start, end, pricePerMonth);
    expect(income).toBeCloseTo(pricePerMonth);
  });

  test("should handle lease starting and ending mid-month", () => {
    const start = DateTime.fromISO("2021-06-15");
    const end = DateTime.fromISO("2021-06-25");
    const income = getTotalIncomeFromBounds(start, end, pricePerMonth);
    const expectedIncome = (11 / 30) * pricePerMonth;
    expect(income).toBeCloseTo(expectedIncome);
  });

  test("should handle lease spanning multiple months", () => {
    const start = DateTime.fromISO("2021-06-15");
    const end = DateTime.fromISO("2021-08-10");
    const income = getTotalIncomeFromBounds(start, end, pricePerMonth);
    const expectedIncome = (16 / 30 + 1 + 10 / 31) * pricePerMonth;
    expect(income).toBeCloseTo(expectedIncome);
  });

  test("should handle lease within a single month", () => {
    const start = DateTime.fromISO("2021-06-05");
    const end = DateTime.fromISO("2021-06-20");
    const income = getTotalIncomeFromBounds(start, end, pricePerMonth);
    const expectedIncome = (16 / 30) * pricePerMonth;
    expect(income).toBeCloseTo(expectedIncome);
  });

  test("should handle lease with same start and end date", () => {
    const start = DateTime.fromISO("2021-06-01");
    const end = DateTime.fromISO("2021-06-01");
    const income = getTotalIncomeFromBounds(start, end, pricePerMonth);
    const expectedIncome = (1 / 30) * pricePerMonth;
    expect(income).toBeCloseTo(expectedIncome);
  });
});

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
