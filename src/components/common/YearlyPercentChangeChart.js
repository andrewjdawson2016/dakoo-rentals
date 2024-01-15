import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { getPercentageFinancialSummaryYearlyPercentChange } from "../../util";

Chart.register(...registerables);

function YearlyPercentChangeChart({
  buildings,
  showIncome,
  showExpenses,
  showProfit,
}) {
  const percentageSummary =
    getPercentageFinancialSummaryYearlyPercentChange(buildings);

  const datasets = [];
  if (showIncome) {
    datasets.push({
      label: "Income Change",
      data: percentageSummary.map((item) => item.incomeChangePercent),
      backgroundColor: "rgba(75, 192, 192, 0.2)",
    });
  }
  if (showExpenses) {
    datasets.push({
      label: "Expense Change",
      data: percentageSummary.map((item) => item.expenseChangePercent),
      backgroundColor: "rgba(255, 99, 132, 0.2)",
    });
  }
  if (showProfit) {
    datasets.push({
      label: "Profit Change",
      data: percentageSummary.map((item) => item.profitChangePercent),
      backgroundColor: "rgba(153, 102, 255, 0.2)",
    });
  }

  const chartData = {
    labels: percentageSummary.map((item) => item.year),
    datasets: datasets,
  };

  let maxValue = 0;
  let minValue = 0;
  percentageSummary.forEach(
    ({ incomeChangePercent, expenseChangePercent, profitChangePercent }) => {
      maxValue = Math.max(
        maxValue,
        incomeChangePercent,
        expenseChangePercent,
        profitChangePercent
      );
      minValue = Math.min(
        minValue,
        incomeChangePercent,
        expenseChangePercent,
        profitChangePercent
      );
    }
  );

  const suggestedMax = maxValue + 10;
  const suggestedMin = minValue - 10;

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value.toFixed(2) + "%";
          },
        },
        suggestedMax: suggestedMax,
        suggestedMin: suggestedMin,
      },
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Percent Change YoY",
      },
      legend: {
        display: true,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            const value = context.parsed.y;
            if (value !== null) {
              label +=
                value < 0
                  ? `(${Math.abs(value).toFixed(2)}%)`
                  : value.toFixed(2) + "%";
            }
            return label;
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default YearlyPercentChangeChart;
