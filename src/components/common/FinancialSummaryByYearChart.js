import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { computeFinancialSummaryByYear } from "../../util";

Chart.register(...registerables);

function FinancialSummaryByYearChart({ buildings }) {
  const financialSummary = computeFinancialSummaryByYear(buildings);
  console.log("andrew got financialSummary: ", financialSummary);
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
        label: "Profit",
        data: [],
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },
    ],
  };
  financialSummary.forEach(([income, expenses, profit], year) => {
    chartData.labels.push(year);
    chartData.datasets[0].data.push(income);
    chartData.datasets[1].data.push(expenses);
    chartData.datasets[2].data.push(profit);
  });

  const options = {
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function (value) {
            return value.toLocaleString();
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default FinancialSummaryByYearChart;
