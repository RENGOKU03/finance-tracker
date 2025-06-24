import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { auth, db } from "../firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { deleteTransaction } from "../Store/Slice";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import TransactionItem from "./TransactionItem";

const TransactionList = ({ items, type, title }) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    const user = auth.currentUser;
    if (!user) return toast.error("No user logged in.");

    try {
      await deleteDoc(doc(db, "users", user.uid, "expenses", selectedItem.id));
      dispatch(deleteTransaction(selectedItem.id));
      toast.success("Transaction deleted successfully.", {
        position: "bottom-left",
        className: "glass-toast",
      });
    } catch {
      toast.error("Failed to delete transaction.");
    } finally {
      setModalOpen(false);
      setSelectedItem(null);
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.3, staggerChildren: 0.1, when: "beforeChildren" },
    },
  };

  const noTransactionsVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      <motion.div
        className="p-6 md:p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl flex flex-col"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <h3 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-6 drop-shadow-lg">
          {title}
        </h3>
        <div className="flex-grow overflow-y-auto max-h-[400px] md:max-h-[500px] custom-scrollbar pr-2">
          <AnimatePresence mode="popLayout">
            {items.length > 0 ? (
              items.map((item) => (
                <TransactionItem
                  key={item.id}
                  item={item}
                  type={type}
                  onDeleteClick={handleDeleteClick}
                />
              ))
            ) : (
              <motion.div
                className="text-white/70 text-lg md:text-xl text-center p-8 flex flex-col items-center justify-center h-full"
                variants={noTransactionsVariants}
                initial="hidden"
                animate="visible"
              >
                <span className="text-6xl mb-4 opacity-70">
                  {type === "expense" ? "😌" : "🥳"}
                </span>
                <p className="font-medium">
                  No {title.toLowerCase()} recorded yet.
                </p>
                <p className="text-sm mt-2 font-light">
                  {type === "expense"
                    ? "Time to spend wisely!"
                    : "Let's get that money!"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <DeleteConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default TransactionList;
