import React from 'react';
import { useSelector } from 'react-redux';
import AddExpense from './components/AddExpense';
import Navbar from './components/Navbar';
import Stats from './components/Stats';
import Chart from './components/Chart';
import TransactionList from './components/TransactionList';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const addExpense = useSelector((state) => state.expense.addExpense);
  const expensesList = useSelector((state) => state.expense.expensesList);

  const expenses = expensesList.filter((item) => item.type === 'expense');
  const incomes = expensesList.filter((item) => item.type === 'income');

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-900
                 font-sans relative overflow-hidden p-4 sm:p-6 md:p-8 lg:p-10"
    >
      {/* Background Bubbles/Blobs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-screen filter blur-3xl animate-blob"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      ></motion.div>
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/30 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      ></motion.div>
      <motion.div
        className="absolute top-1/2 left-0 w-72 h-72 bg-fuchsia-500/30 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
      ></motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto space-y-6 md:space-y-8 lg:space-y-10">
        <Navbar />

        <AnimatePresence>
          {addExpense && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
            >
              <AddExpense />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Row: Balance and Income vs. Expenses Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 mt-6 md:mt-8">
          <Stats />
          <Chart />
        </div>

        {/* Bottom Row: Incomes and Expenses Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 mt-6 md:mt-8">
          <TransactionList items={incomes} type="income" title="Incomes" />
          <TransactionList items={expenses} type="expense" title="Expenses" />
        </div>
      </div>
    </div>
  );
};

export default App;