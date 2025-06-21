import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';

export default function PieChartWithCustomizedLabel() {
  const expenses = useSelector((state) => state.expense.expenses) || 0;
  const incomes = useSelector((state) => state.expense.incomes) || 0;

  const data = [
    { label: "Expenses", value: expenses, color: "#F25F5C" },
    { label: "Incomes", value: incomes, color: "#2EC4B6" },
  ];

  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    if (TOTAL === 0) return '';
    const percent = (params.value / TOTAL) * 100;
    return `${percent.toFixed(0)}%`;
  };

  const chartSizing = {
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    width: 250,
    height: 250,
    legend: { hidden: true },
  };

  const chartContainerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut', delay: 0.2 } },
  };

  if (TOTAL === 0) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center p-6 md:p-8
                   bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl
                   text-white min-h-[350px] md:min-h-[400px] w-full"
        variants={chartContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Adjusted font size here */}
        <h3 className="text-xl md:text-2xl font-bold mb-4 text-white drop-shadow-lg text-center">
          Income vs. Expenses
        </h3>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center h-full text-white/70 text-lg md:text-xl text-center flex-grow"
        >
          <span className="text-6xl mb-4 opacity-70">🤔</span>
          <p className="font-medium">No transactions yet.</p>
          <p className="text-sm mt-2 font-light">Add some to see your breakdown!</p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex flex-col items-center p-6 md:p-8
                 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl
                 text-white min-h-[350px] md:min-h-[400px] w-full"
      variants={chartContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Adjusted font size here */}
      <h3 className="text-xl md:text-2xl font-bold mb-6 text-white drop-shadow-lg text-center">
        Income vs. Expenses
      </h3>
      <div className="flex flex-col md:flex-row items-center justify-center w-full flex-grow">
        <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
          <PieChart
            series={[
              {
                arcLabel: getArcLabel,
                arcLabelMinAngle: 15,
                data,
                outerRadius: 110,
                innerRadius: 50,
                paddingAngle: 2,
                cornerRadius: 5,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -20, color: 'gray' },
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: 'white',
                fontSize: 15,
                fontWeight: 'bold',
                textShadow: '0px 0px 4px rgba(0,0,0,0.5)',
                fontFamily: 'Inter, sans-serif',
              },
            }}
            {...chartSizing}
            className="w-[250px] h-[250px] md:w-[300px] md:h-[300px]"
          />
        </div>

        <motion.div
          className="flex flex-col space-y-3 w-full max-w-[200px] md:max-w-none md:w-auto"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {data.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center text-lg md:text-xl font-medium text-white/90 cursor-pointer p-2 rounded-xl
                         bg-white/5 hover:bg-white/15 transition-all duration-300"
              whileHover={{ scale: 1.05, x: 5, boxShadow: '0 4px 12px rgba(0,0,0,0.2)', transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="w-5 h-5 rounded-full mr-3 border border-white/30 shadow-sm flex-shrink-0"
                style={{ backgroundColor: item.color }}
              ></div>
              {item.label}:{' '}
              <span className="font-bold ml-2">
                ${item.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}