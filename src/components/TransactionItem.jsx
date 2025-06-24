import React, { forwardRef } from "react";
import { motion } from "framer-motion";

const TransactionItem = forwardRef(({ item, type, onDeleteClick }, ref) => {
  const isExpense = type === "expense";
  const itemColorClass = isExpense ? "text-red-300" : "text-green-300";
  const amountColorClass = isExpense ? "text-red-400" : "text-green-400";

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
    exit: {
      opacity: 0,
      x: isExpense ? 50 : -50,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
    hover: {
      scale: 1.03,
      boxShadow: isExpense
        ? "0 6px 15px rgba(255,0,0,0.2)"
        : "0 6px 15px rgba(0,255,0,0.2)",
      borderColor: isExpense
        ? "rgba(252,165,165,0.5)"
        : "rgba(110,231,183,0.5)",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.98 },
  };

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col md:flex-row md:justify-between md:items-center gap-4 p-4 md:p-5 mb-3 rounded-xl backdrop-blur-sm border border-white/20 shadow-md cursor-pointer bg-white/5 hover:bg-white/10 transition-all duration-300 ease-in-out relative`}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover="hover"
      whileTap="tap"
    >
      <div className="flex items-center flex-1">
        <span className="text-2xl mr-3 drop-shadow-sm font-light">
          {isExpense ? "💸" : "💰"}
        </span>
        <p
          className={`text-base sm:text-lg md:text-xl font-medium ${itemColorClass} break-words drop-shadow-sm`}
        >
          {item.desc}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center text-right sm:text-left">
        <p
          className={`text-lg sm:text-xl font-bold ${amountColorClass} drop-shadow-lg`}
        >
          ${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
        <p className="text-sm text-white/60 ml-0 sm:ml-4 mt-1 sm:mt-0 font-light">
          {item.date || "Just now"}
        </p>
      </div>

      <button
        onClick={() => onDeleteClick(item)}
        className="absolute top-2 right-2 md:static md:self-start md:ml-auto text-white/50 hover:text-red-300 transition-colors duration-200 p-1 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-red-400"
        aria-label={`Delete ${item.desc}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6
                m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </motion.div>
  );
});

export default TransactionItem;
