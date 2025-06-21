import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Stats = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const expenses = useSelector((state) => state.expense.expenses);
  const incomes = useSelector((state) => state.expense.incomes);

  useEffect(() => {
    setTotalBalance(incomes - expenses);
  }, [incomes, expenses]);

  const balanceTextColor =
    totalBalance > 0
      ? 'text-green-400'
      : totalBalance < 0
      ? 'text-red-400'
      : 'text-white/80';

  const containerVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.3,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 15,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
      y: -3,
      borderColor: 'rgba(255,255,255,0.4)',
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="p-6 md:p-8 lg:p-10
                 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl
                 flex flex-col gap-6 md:gap-8 items-center py-8
                 text-white relative z-10" // Removed font-poppins here
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-lg leading-tight ${balanceTextColor}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
      >
        Balance is{' '}
        <motion.span
          key={totalBalance}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </motion.span>
      </motion.p>

      <motion.div
        className="flex flex-col items-center gap-2 md:gap-3
                   bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-4 md:p-5
                   w-full max-w-xs sm:max-w-sm md:max-w-md cursor-pointer"
        variants={itemVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <span className="text-xl md:text-2xl lg:text-3xl font-bold text-green-300 drop-shadow-sm">
          ${incomes.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
        <span className="text-base md:text-lg lg:text-xl text-white/80 font-medium flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6 text-green-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          Total Income
        </span>
      </motion.div>

      <motion.div
        className="flex flex-col items-center gap-2 md:gap-3
                   bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-4 md:p-5
                   w-full max-w-xs sm:max-w-sm md:max-w-md cursor-pointer"
        variants={itemVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <span className="text-xl md:text-2xl lg:text-3xl font-bold text-red-300 drop-shadow-sm">
          ${expenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
        <span className="text-base md:text-lg lg:text-xl text-white/80 font-medium flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6 text-red-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Total Expense
        </span>
      </motion.div>
    </motion.div>
  );
};

export default Stats;