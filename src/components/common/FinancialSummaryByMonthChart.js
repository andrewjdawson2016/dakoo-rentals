import "chartjs-adapter-luxon";
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { computeFinancialSummaryByMonth } from "../../util";

Chart.register(...registerables);

function FinancialSummaryByMonthChart({ buildings }) {
  const financialSummary = computeFinancialSummaryByMonth(buildings);
  const chartData = {
    labels: [],
    datasets: [
      {
        label: "Income",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
      {
        label: "Expenses",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false,
      },
      {
        label: "Profit",
        data: [],
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        fill: false,
      },
    ],
  };

  let maxValue = 0;
  let minValue = 0;
  financialSummary.forEach(({ monthYear, income, expense, profit }) => {
    chartData.labels.push(monthYear);
    chartData.datasets[0].data.push(income);
    chartData.datasets[1].data.push(expense);
    chartData.datasets[2].data.push(profit);
    maxValue = Math.max(maxValue, income, expense, profit);
    minValue = Math.min(minValue, income, expense, profit);
  });

  const suggestedMax = maxValue + maxValue * 0.1;
  const suggestedMin = minValue - Math.abs(minValue) * 0.1;

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
        suggestedMin: suggestedMin,
      },
      x: {
        type: "time",
        time: {
          unit: "month",
          tooltipFormat: "MMM yyyy",
        },
        title: {
          display: true,
          text: "Month",
        },
        ticks: {
          maxTicksLimit: 12,
          autoSkip: true,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Monthly Income/Expense/Profit",
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

  return <Line data={chartData} options={options} />;
}

export default FinancialSummaryByMonthChart;
