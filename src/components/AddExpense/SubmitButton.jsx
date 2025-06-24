import { motion } from 'framer-motion';

const SubmitButton = ({ type, variants }) => (
  <motion.button
    type="submit"
    className={`w-full py-3 md:py-4 text-xl font-semibold rounded-xl
      ${type === 'income' ? 'bg-emerald-500/80 hover:bg-emerald-500/90' : 'bg-rose-500/80 hover:bg-rose-500/90'}
      text-white shadow-lg backdrop-blur-sm border ${
        type === 'income' ? 'border-emerald-400/50' : 'border-rose-400/50'
      } transition-all duration-300`}
    whileHover={{
      scale: 1.02,
      boxShadow: type === 'income'
        ? '0 8px 25px rgba(16, 185, 129, 0.4)'
        : '0 8px 25px rgba(244, 63, 94, 0.4)',
      y: -1
    }}
    whileTap={{ scale: 0.98, y: 0 }}
    variants={variants}
  >
    Add {type === 'income' ? 'Income' : 'Expense'}
  </motion.button>
);

export default SubmitButton;
