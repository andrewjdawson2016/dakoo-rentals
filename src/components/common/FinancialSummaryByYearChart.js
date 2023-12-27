import React from "react";
import { Bar } from "react-chartjs-2";
import { computeFinancialSummaryByYear } from "../../util";

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
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
            callback: function (value, index, values) {
              return value.toLocaleString();
            },
          },
          scaleLabel: {
            display: true,
            labelString: "Dollars",
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Year",
          },
        },
      ],
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default FinancialSummaryByYearChart;
