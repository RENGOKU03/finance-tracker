import { motion } from 'framer-motion';

const TransactionTypeSelector = ({ type, setType, variants }) => {
  const radioStyle = (currentType) => ({
    background: currentType === type 
      ? (currentType === 'income' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)')
      : 'rgba(255, 255, 255, 0.05)',
    borderColor: currentType === type 
      ? (currentType === 'income' ? 'rgba(16, 185, 129, 0.5)' : 'rgba(244, 63, 94, 0.5)')
      : 'rgba(255, 255, 255, 0.2)',
  });

  return (
    <motion.div variants={variants}>
      <label className="block text-lg font-medium mb-2 text-white/80">Type</label>
      <div className="flex space-x-4">
        {['expense', 'income'].map((item) => (
          <motion.label
            key={item}
            className="flex items-center text-lg cursor-pointer px-4 py-2 rounded-lg transition-all"
            style={radioStyle(item)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <input
              type="radio"
              name="type"
              value={item}
              checked={type === item}
              onChange={() => setType(item)}
              className={`form-radio h-5 w-5 ${item === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}
            />
            <span className="ml-2 capitalize">{item}</span>
          </motion.label>
        ))}
      </div>
    </motion.div>
  );
};

export default TransactionTypeSelector;
