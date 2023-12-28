import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { computeFinancialSummaryByYear } from "../../util";

Chart.register(...registerables);

function FinancialSummaryByYearChart({ buildings }) {
  const financialSummary = computeFinancialSummaryByYear(buildings);
  const chartData = {
    labels: [],
    datasets: [
      {
        label: "Income",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Expenses",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Profit/Loss",
        data: [],
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },
    ],
  };

  let maxValue = 0;
  financialSummary.forEach(({ year, income, expense, profit }) => {
    chartData.labels.push(year);
    chartData.datasets[0].data.push(income);
    chartData.datasets[1].data.push(expense);
    chartData.datasets[2].data.push(profit);
    maxValue = Math.max(maxValue, income, expense, Math.abs(profit));
  });

  const buffer = maxValue * 0.1;
  const suggestedMax = maxValue + buffer;

  const options = {
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function (value) {
            return value < 0
              ? `($${Math.abs(value).toLocaleString()})`
              : "$" + value.toLocaleString();
          },
        },
        suggestedMax: suggestedMax,
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
        display: false,
      },
      tooltip: {
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
                  ? `($${Math.abs(value).toLocaleString()})`
                  : "$" + value.toLocaleString();
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
