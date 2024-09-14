import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { useSelector } from "react-redux";

export default function PieChartWithCustomizedLabel() {
  // Use useSelector inside the component
  const expenses = useSelector((state) => state.expense.expenses) || 0;
  const incomes = useSelector((state) => state.expense.incomes) || 0;

  const data = [
    { label: "Expenses", value: expenses, color: "#FF6384" },
    { label: "Incomes", value: incomes, color: "#36A2EB" },
  ];

  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    if (TOTAL === 0) {
      return "0%";
    }
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  const sizing = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    legend: { hidden: true },
  };
  if (TOTAL === 0) {
    return null;
  }
  return (
    <PieChart
      series={[
        {
          outerRadius: 80,
          data,
          arcLabel: getArcLabel, // Arc label to show percentages
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: "white",
          fontSize: 14,
        },
      }}
      {...sizing}
    />
  );
}
