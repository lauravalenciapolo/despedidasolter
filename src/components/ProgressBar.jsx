import { motion } from 'framer-motion';

function ProgressBar({ currentStep, totalSteps }) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <p className="text-sm text-[#8C6B73] mb-2">
        Paso {currentStep} de {totalSteps}
      </p>
      <div className="h-2 w-full rounded-full bg-[#F2D4DC]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#D4849A] to-[#C06B83]"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
