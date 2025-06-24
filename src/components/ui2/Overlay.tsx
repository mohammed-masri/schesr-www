// BacgroundLay.jsx
import { AnimatePresence, motion } from 'framer-motion';

const BacgroundLay = ({ expandedCard, handleCardClick }) => {
  return (
    <AnimatePresence>
      {expandedCard && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="fixed inset-0 "
          
          style={{ background: 'rgba(14, 68, 93)'  , zIndex:49}}
          onClick={() => handleCardClick(expandedCard)}
        />
      )}
    </AnimatePresence>
  );
};

export default BacgroundLay;
