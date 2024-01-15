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

  let maxValue = null;
  let minValue = null;

  chartData.datasets.forEach((dataset) => {
    dataset.data.forEach((value) => {
      maxValue = maxValue === null ? value : Math.max(maxValue, value);
      minValue = minValue === null ? value : Math.min(minValue, value);
    });
  });

  const suggestedMax = maxValue !== null ? maxValue + 10 : 10;
  const suggestedMin = minValue !== null ? minValue - 10 : -10;

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
