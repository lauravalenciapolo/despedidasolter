import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';
import ProgressBar from '../components/ProgressBar';
import QuestionStep from '../components/QuestionStep';
import Button from '../components/Button';
import { questions } from '../data/questions';

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? -100 : 100, opacity: 0 }),
};

function Survey({ survey }) {
  const { currentStep, answers, direction, setAnswer, nextStep, prevStep, canAdvance, goHome } = survey;
  const question = questions[currentStep - 1];
  const isLastStep = currentStep === questions.length;

  return (
    <>
      {/* Top navbar with home button */}
      <div className="sticky top-0 z-50 bg-[#FFF5F7]/80 backdrop-blur-md border-b border-[#F2D4DC]">
        <div className="mx-auto max-w-2xl px-5 py-3 flex items-center">
          <button
            type="button"
            onClick={goHome}
            className="flex items-center gap-2 text-[#8C6B73] hover:text-[#D4849A] transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Inicio
          </button>
        </div>
      </div>

      <Layout>
        <ProgressBar currentStep={currentStep} totalSteps={questions.length} />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <QuestionStep
              question={question}
              answer={answers[question.id]}
              onAnswer={(value) => setAnswer(question.id, value)}
            />
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center mt-8">
          {currentStep > 1 ? (
            <Button variant="secondary" onClick={prevStep}>
              Anterior
            </Button>
          ) : (
            <div />
          )}
          <Button onClick={nextStep} disabled={!canAdvance}>
            {isLastStep ? 'Finalizar' : 'Siguiente'}
          </Button>
        </div>
      </Layout>
    </>
  );
}

export default Survey;
