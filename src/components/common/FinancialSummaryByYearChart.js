import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { computeFinancialSummaryByYear } from "../../util";

Chart.register(...registerables);

function FinancialSummaryByYearChart({
  buildings,
  showIncome,
  showExpenses,
  showProfit,
}) {
  const financialSummary = computeFinancialSummaryByYear(buildings);

  const chartData = {
    labels: financialSummary.map((item) => item.year),
    datasets: [],
  };

  if (showIncome) {
    chartData.datasets.push({
      label: "Income",
      data: financialSummary.map((item) => Math.round(item.income)),
      backgroundColor: "rgba(75, 192, 192, 0.2)",
    });
  }

  if (showExpenses) {
    chartData.datasets.push({
      label: "Expenses",
      data: financialSummary.map((item) => Math.round(item.expense)),
      backgroundColor: "rgba(255, 99, 132, 0.2)",
    });
  }

  if (showProfit) {
    chartData.datasets.push({
      label: "Profit/Loss",
      data: financialSummary.map((item) => Math.round(item.profit)),
      backgroundColor: "rgba(153, 102, 255, 0.2)",
    });
  }

  let maxValue = null;
  let minValue = null;
  chartData.datasets.forEach((dataset) => {
    dataset.data.forEach((value) => {
      maxValue = maxValue === null ? value : Math.max(maxValue, value);
      minValue = minValue === null ? value : Math.min(minValue, value);
    });
  });

  const suggestedMax = maxValue !== null ? maxValue + maxValue * 0.1 : 0;
  const suggestedMin =
    minValue !== null ? minValue - Math.abs(minValue) * 0.1 : 0;

  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: "Total",
        },
        beginAtZero: false,
        position: "left",
        ticks: {
          callback: function (value) {
            return value < 0
              ? `($${Math.abs(value).toLocaleString()})`
              : "$" + value.toLocaleString();
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
              const formattedValue = new Intl.NumberFormat().format(
                Math.abs(Math.round(value))
              );
              label +=
                value < 0 ? `($${formattedValue})` : `$${formattedValue}`;
            }
            return label;
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default FinancialSummaryByYearChart;
