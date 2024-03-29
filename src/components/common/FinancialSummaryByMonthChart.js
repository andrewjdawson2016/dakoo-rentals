import "chartjs-adapter-luxon";
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { computeFinancialSummaryByMonth } from "../../util";

Chart.register(...registerables);

function FinancialSummaryByMonthChart({
  buildings,
  showIncome,
  showExpenses,
  showProfit,
}) {
  const financialSummary = computeFinancialSummaryByMonth(buildings);

  const datasets = [];
  if (showIncome) {
    datasets.push({
      label: "Income",
      data: financialSummary.map((item) => item.income),
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      fill: false,
    });
  }

  if (showExpenses) {
    datasets.push({
      label: "Expenses",
      data: financialSummary.map((item) => item.expense),
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      fill: false,
    });
  }

  if (showProfit) {
    datasets.push({
      label: "Profit",
      data: financialSummary.map((item) => item.profit),
      backgroundColor: "rgba(153, 102, 255, 0.2)",
      borderColor: "rgba(153, 102, 255, 1)",
      fill: false,
    });
  }

  const chartData = {
    labels: financialSummary.map((item) => item.monthYear),
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

  const suggestedMax = maxValue !== null ? maxValue + maxValue * 0.1 : 0;
  const suggestedMin =
    minValue !== null ? minValue - Math.abs(minValue) * 0.1 : 0;

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
      legend: {
        display: true,
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
