import { motion } from 'framer-motion';

const InputField = ({ label, id, value, onChange, placeholder, type, inputType = 'text', variants }) => (
  <motion.div variants={variants}>
    <label htmlFor={id} className="block text-lg font-medium mb-2 text-white/80">
      {label}
    </label>
    <motion.input
      type={inputType}
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full p-3 rounded-xl bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 text-lg placeholder-white/40"
      whileFocus={{
        borderColor: type === 'income' ? 'rgba(16, 185, 129, 0.6)' : 'rgba(244, 63, 94, 0.6)',
        boxShadow: type === 'income' ? '0 0 0 2px rgba(16, 185, 129, 0.2)' : '0 0 0 2px rgba(244, 63, 94, 0.2)'
      }}
    />
  </motion.div>
);

export default InputField;
