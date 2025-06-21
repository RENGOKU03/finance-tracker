import React from 'react';
import { useDispatch } from 'react-redux';
import { trueAddTransaction } from '../Store/Slice';
import Login from './Login';
import FetchFirebase from './FetchFirebase';
import { motion } from 'framer-motion';

const Navbar = () => {
  const dispatch = useDispatch();

  function handleAddTransaction() {
    dispatch(trueAddTransaction());
  }

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.1,
      },
    },
  };

  const addButtonVariants = {
    hover: {
      scale: 1.08,
      boxShadow: '0 8px 25px rgba(255,100,200,0.4)',
      y: -3,
      transition: { type: 'spring', stiffness: 300, damping: 10 },
    },
    tap: { scale: 0.95, y: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  };

  return (
    <motion.div
      className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-6
                 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl
                 text-white relative z-20
                 flex flex-col sm:flex-row items-center justify-between gap-6 flex-wrap"
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Title */}
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide
                   bg-gradient-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent
                   drop-shadow-lg leading-tight text-center sm:text-left"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
      >
        Expense<br className="sm:hidden" />Tracker
      </motion.h1>

      {/* Buttons */}
      <div className="flex flex-col xs:flex-row items-center gap-4 sm:gap-6 md:gap-8 flex-shrink-0">
        {/* Add Transaction Block */}
        <motion.button
          onClick={handleAddTransaction}
          className="w-full sm:w-auto min-w-[180px] px-5 py-3 md:px-6 md:py-3 text-base md:text-lg lg:text-xl font-semibold
                     rounded-xl bg-pink-500/80 text-white shadow-xl text-center
                     backdrop-blur-sm border border-pink-400/50
                     transition-all duration-300 ease-in-out hover:shadow-pink-400/60"
          variants={addButtonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <div className="flex justify-center items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 md:h-6 md:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>Add</span>
          </div>
        </motion.button>

        {/* Login Block with Username */}
        <div className="w-full sm:w-auto min-w-[180px] flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm text-white/80">Welcome, <span className="font-semibold">User</span></p>
          <Login />
        </div>
      </div>

      {/* Firebase Fetch Handler (non-visual) */}
      <FetchFirebase />
    </motion.div>
  );
};

export default Navbar;
