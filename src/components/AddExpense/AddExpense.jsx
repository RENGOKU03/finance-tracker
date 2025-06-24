import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { db, auth } from "../../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { addTransaction, falseAddTransaction } from "../../Store/Slice";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "./InputField";
import TransactionTypeSelector from "./TransactionTypeSelector";
import SubmitButton from "./SubmitButton";

const AddExpense = () => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [error, setError] = useState("");

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const glassStyle =
    type === "income"
      ? "bg-gradient-to-br from-green-500/10 to-emerald-700/20 border-green-400/30"
      : "bg-gradient-to-br from-red-500/10 to-rose-700/20 border-rose-400/30";

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    setError("");

    const parsedAmount = parseFloat(amount);
    if (!description.trim() || isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Please enter a valid description and a positive amount.");
      return;
    }

    const currentUser = auth.currentUser;
    if (!currentUser) {
      setError("You must be logged in to add a transaction.");
      return;
    }

    try {
      const transactionData = {
        description: description.trim(),
        amount: parsedAmount,
        type,
        userId: currentUser.uid,
        timestamp: serverTimestamp(),
        date: new Date().toISOString().split("T")[0],
      };

      const docRef = await addDoc(
        collection(db, "users", currentUser.uid, "expenses"),
        transactionData
      );

      dispatch(
        addTransaction({
          type: transactionData.type,
          desc: transactionData.description,
          amount: transactionData.amount,
          id: docRef.id,
          date: transactionData.date,
        })
      );

      setDescription("");
      setAmount("");
      setType("expense");
      dispatch(falseAddTransaction());
      toast.success("Transaction added successfully!", {
        position: "bottom-left",
        className: "glass-toast",
      });
    } catch (e) {
      console.error("Error adding transaction:", e);
      setError("Failed to add transaction. Please try again.");
    }
  };

  return (
    <motion.div
      className={`${glassStyle} backdrop-blur-lg border rounded-3xl shadow-xl p-6 md:p-8 w-full max-w-md mx-auto text-white relative overflow-hidden`}
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.button
        onClick={() => dispatch(falseAddTransaction())}
        className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        &times;
      </motion.button>

      <motion.h2
        className="text-3xl font-bold mb-6 text-center text-white/90"
        variants={itemVariants}
      >
        Add New Transaction
      </motion.h2>

      <form onSubmit={handleAddTransaction} className="space-y-5">
        <InputField
          label="Description"
          id="description"
          value={description}
          onChange={setDescription}
          placeholder="e.g., Coffee, Salary"
          type={type}
          variants={itemVariants}
        />
        <InputField
          label="Amount"
          id="amount"
          value={amount}
          onChange={setAmount}
          placeholder="0.00"
          type={type}
          inputType="number"
          variants={itemVariants}
        />
        <TransactionTypeSelector
          type={type}
          setType={setType}
          variants={itemVariants}
        />
        <AnimatePresence>
          {error && (
            <motion.p
              className="text-red-300 text-center text-sm py-2 px-4 rounded-lg bg-red-900/20 border border-red-500/30"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
        <SubmitButton type={type} variants={itemVariants} />
      </form>
    </motion.div>
  );
};

export default AddExpense;
