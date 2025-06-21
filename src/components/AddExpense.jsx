import React, { useRef, useState } from 'react';
import { addTransaction, falseAddTransaction } from '../Store/Slice';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

const AddExpense = () => {
  const [selectedValue, setSelectedValue] = useState('income');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const descRef = useRef('');
  const amountRef = useRef('');

  // Define color based on selected type for dynamic accents
  const accentColorClass =
    selectedValue === 'expense'
      ? 'from-red-400 to-red-600'
      : 'from-green-400 to-green-600'; // Changed from teal to green for better income association

  const handleCloseTransaction = () => dispatch(falseAddTransaction());

  const handleRadioChange = (selected) => setSelectedValue(selected);

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    setError('');
    const desc = descRef.current.value.trim();
    const amount = Number(amountRef.current.value);

    if (!desc || !amount || isNaN(amount) || amount <= 0) {
      setError('Please enter a valid description and a positive amount.');
      return;
    }

    try {
      const data = {
        type: selectedValue,
        desc,
        amount,
        userId: auth.currentUser.uid,
        time: new Date().toLocaleString(), // Store date as a more robust timestamp if possible
      };
      console.log(data.userId);
      
      await addDoc(collection(db, 'transactions'), data);
      dispatch(addTransaction(data));
      handleCloseTransaction();
    } catch (err) {
      console.error('Error adding transaction:', err);
      setError('Failed to add transaction. Please try again.');
    }
  };

  // Framer Motion variants
  const formVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.1, // Slight delay to integrate with App.jsx overlay animation
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: '0px 8px 20px rgba(0,0,0,0.2)' },
    tap: { scale: 0.95 },
  };

  const inputVariants = {
    focus: {
      borderColor: 'rgba(255,255,255,0.7)',
      boxShadow: '0 0 0 3px rgba(255,255,255,0.4)',
      transition: { duration: 0.2 },
    },
  };

  const radioLabelVariants = {
    hover: { scale: 1.05, color: '#FFFFFF', textShadow: '0px 0px 8px rgba(255,255,255,0.5)' },
    tap: { scale: 0.9 },
  };

  return (
    <motion.form
      onSubmit={handleAddTransaction}
      className={`relative p-6 md:p-8 w-full max-w-lg lg:max-w-xl flex flex-col gap-5 md:gap-6
        bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl z-50
        text-white font-poppins`}
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit" // Essential for AnimatePresence in App.jsx
    >
      {/* Dynamic Glass-like Border based on type (subtle effect) */}
      <div
        className={`absolute inset-0 rounded-3xl -z-10`}
        style={{
          background: `linear-gradient(45deg, rgba(255,255,255,0.05), var(--tw-gradient-stops))`,
          mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          maskComposite: `exclude`,
          WebkitMaskComposite: `exclude`, // For Safari
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
        }}
      >
        <div
          className={`absolute inset-0 rounded-3xl opacity-20 transition-all duration-300 ease-out ${
            selectedValue === 'expense'
              ? 'bg-gradient-to-br from-red-600 to-red-900'
              : 'bg-gradient-to-br from-green-600 to-green-900'
          }`}
        ></div>
      </div>

      <div className="flex justify-between items-center mb-2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-md">
          Add Transaction
        </h2>
        <motion.button
          type="button"
          onClick={handleCloseTransaction}
          className="bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-5 rounded-full transition-all duration-300 backdrop-blur-sm shadow-md"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </motion.button>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="description" className="text-xl md:text-2xl font-medium text-white/90 mb-2 block">
            Description
          </label>
          <motion.input
            type="text"
            id="description"
            ref={descRef}
            className="w-full p-4 text-lg bg-white/15 border border-white/30 rounded-xl focus:outline-none focus:ring-4 focus:ring-white/40 placeholder-white/60 transition-all duration-300 text-white"
            placeholder="e.g., Groceries, Salary"
            variants={inputVariants}
            whileFocus="focus"
          />
        </div>

        <div>
          <label htmlFor="amount" className="text-xl md:text-2xl font-medium text-white/90 mb-2 block">
            Amount
          </label>
          <motion.input
            type="number"
            id="amount"
            ref={amountRef}
            className="w-full p-4 text-lg bg-white/15 border border-white/30 rounded-xl focus:outline-none focus:ring-4 focus:ring-white/40 placeholder-white/60 transition-all duration-300 text-white"
            placeholder="e.g., 50.00"
            variants={inputVariants}
            whileFocus="focus"
          />
        </div>
      </div>

      <div className="flex justify-center gap-6 md:gap-10 mt-2">
        {['income', 'expense'].map((type) => (
          <motion.label
            key={type}
            className={`flex items-center text-xl md:text-2xl font-semibold cursor-pointer select-none
                      transition-colors duration-300 group ${
                        selectedValue === type ? 'text-white drop-shadow-lg' : 'text-white/70'
                      }`}
            variants={radioLabelVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <input
              type="radio"
              value={type}
              checked={selectedValue === type}
              onChange={() => handleRadioChange(type)}
              className="hidden" // Hide default radio button
            />
            {/* Custom Radio Button */}
            <span
              className={`w-6 h-6 md:w-7 md:h-7 rounded-full border-2 border-white/70 mr-3 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:border-white ${
                selectedValue === type
                  ? `bg-gradient-to-br ${accentColorClass} border-white shadow-lg`
                  : 'bg-white/20'
              }`}
            >
              {selectedValue === type && (
                <motion.span
                  className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-white block"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                />
              )}
            </span>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </motion.label>
        ))}
      </div>

      <motion.button
        type="submit"
        className={`w-full py-4 text-xl md:text-2xl font-bold rounded-xl shadow-xl transition-all duration-300
                    bg-gradient-to-r ${accentColorClass} text-white hover:shadow-2xl hover:opacity-90 mt-4`}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        Add Transaction
      </motion.button>

      <AnimatePresence>
        {error && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Error Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-3xl" />
            <motion.div
              initial={{ y: -50, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="relative bg-white/20 backdrop-blur-lg border border-red-400 text-white font-semibold text-center rounded-xl p-8 z-30 w-11/12 max-w-md shadow-2xl"
            >
              <p className="text-xl md:text-2xl text-red-200 drop-shadow-lg">{error}</p>
              <motion.button
                type="button"
                onClick={() => setError('')}
                className="mt-6 px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 shadow-lg"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Got It!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
};

export default AddExpense;