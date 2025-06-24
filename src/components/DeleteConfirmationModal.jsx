import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white/10 border border-white/20 backdrop-blur-xl p-6 rounded-2xl shadow-xl text-center text-white w-[90%] max-w-sm"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
        >
          <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
          <p className="text-sm mb-6 text-white/70">Are you sure you want to delete this transaction?</p>
          <div className="flex justify-around">
            <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Delete</button>
            <button onClick={onClose} className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition">Cancel</button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default DeleteConfirmationModal;
