import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const TransactionItem = ({ item, type }) => {
  const isExpense = type === 'expense';
  const itemColorClass = isExpense
    ? 'text-red-300'
    : 'text-green-300';
  const amountColorClass = isExpense ? 'text-red-400' : 'text-green-400';

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      scale: 1.03,
      boxShadow: isExpense
        ? '0 6px 15px rgba(255,0,0,0.2)'
        : '0 6px 15px rgba(0,255,0,0.2)',
      borderColor: isExpense ? 'rgba(252,165,165,0.5)' : 'rgba(110,231,183,0.5)',
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.98 },
  };

  return (
    <motion.div
      className={`flex flex-col sm:flex-row justify-between items-start sm:items-center
                  p-4 md:p-5 mb-3 rounded-xl backdrop-blur-sm
                  border border-white/20 shadow-md cursor-pointer
                  bg-white/5 hover:bg-white/10 transition-all duration-300 ease-in-out`}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
    >
      <div className="flex items-center mb-2 sm:mb-0">
        <span className="text-2xl mr-3 drop-shadow-sm font-light"> {/* Added font-light for icon emoji */}
          {isExpense ? '💸' : '💰'}
        </span>
        <p className={`text-lg md:text-xl font-medium ${itemColorClass} break-words drop-shadow-sm`}>
          {item.desc}
        </p>
      </div>
      <div className="flex items-center text-right sm:text-left">
        <p className={`text-xl md:text-2xl font-bold ${amountColorClass} drop-shadow-lg`}>
          ${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
        {item.time && (
          <p className="text-sm text-white/60 ml-4 hidden md:block font-light"> {/* Added font-light */}
            {new Date(item.time).toLocaleDateString()}
          </p>
        )}
      </div>
    </motion.div>
  );
};

const TransactionList = ({ items, type, title }) => {
  const isExpense = type === 'expense';

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        staggerChildren: 0.1,
        when: 'beforeChildren',
      },
    },
  };

  const noTransactionsVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.div
      className="p-6 md:p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl flex flex-col"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-6 drop-shadow-lg"> {/* Changed font-bold to font-extrabold */}
        {title}
      </h3>
      <div className="flex-grow overflow-y-auto max-h-[400px] md:max-h-[500px] custom-scrollbar pr-2">
        <AnimatePresence mode="popLayout">
          {items.length > 0 ? (
            items.map((item) => (
              <TransactionItem key={item.id || item.time} item={item} type={type} />
            ))
          ) : (
            <motion.div
              className="text-white/70 text-lg md:text-xl text-center p-8 flex flex-col items-center justify-center h-full"
              variants={noTransactionsVariants}
              initial="hidden"
              animate="visible"
            >
              <span className="text-6xl mb-4 opacity-70">
                {isExpense ? '😌' : '🥳'}
              </span>
              <p className="font-medium">No {title.toLowerCase()} recorded yet.</p> {/* Added font-medium */}
              <p className="text-sm mt-2 font-light">{isExpense ? 'Time to spend wisely!' : 'Let\'s get that money!'}</p> {/* Added font-light */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TransactionList;