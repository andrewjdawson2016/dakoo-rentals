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

  let maxValue = 0;
  let minValue = 0;
  financialSummary.forEach(({ income, expense, profit }) => {
    maxValue = Math.max(maxValue, income, expense, profit);
    minValue = Math.min(minValue, income, expense, profit);
  });

  const suggestedMax = maxValue + maxValue * 0.1;
  const suggestedMin = minValue - Math.abs(minValue) * 0.1;

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
      title: {
        display: true,
        text: "Financial Summary By Year",
      },
      legend: {
        display: true,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default FinancialSummaryByYearChart;
