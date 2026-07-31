import { useState, useCallback, useEffect } from 'react';
import { questions } from '../data/questions';

const STORAGE_KEY = 'bachelorette-survey';

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function saveToStorage(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useSurvey() {
  const saved = loadFromStorage();

  const [page, setPage] = useState(saved?.page || 'landing');
  const [currentStep, setCurrentStep] = useState(saved?.currentStep || 1);
  const [answers, setAnswers] = useState(saved?.answers || {});
  const [direction, setDirection] = useState(1);

  // Persist on every change
  useEffect(() => {
    saveToStorage({ page, currentStep, answers });
  }, [page, currentStep, answers]);

  // Validation logic
  const currentQuestion = questions[currentStep - 1];
  const currentAnswer = answers[currentQuestion?.id];
  const canAdvance = (() => {
    if (!currentQuestion) return false;
    if (currentQuestion.type === 'info') return true;
    if (currentQuestion.type === 'text') {
      return typeof currentAnswer === 'string' && currentAnswer.trim().length > 0;
    }
    if (currentQuestion.type === 'multiple') {
      return Array.isArray(currentAnswer) && currentAnswer.length > 0;
    }
    // Handle object answers (option with text input)
    if (typeof currentAnswer === 'object' && currentAnswer !== null && currentAnswer.id) {
      const option = currentQuestion.options?.find((o) => o.id === currentAnswer.id);
      if (option?.hasTextInput) {
        return currentAnswer.text && currentAnswer.text.trim().length > 0;
      }
      return true;
    }
    return currentAnswer != null && currentAnswer !== '';
  })();

  const setAnswer = useCallback((questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const nextStep = useCallback(() => {
    if (!canAdvance) return;
    if (currentStep === questions.length) {
      setPage('summary');
    } else {
      setDirection(1);
      setCurrentStep((s) => s + 1);
    }
  }, [canAdvance, currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep]);

  const startSurvey = useCallback(() => {
    setPage('survey');
    setCurrentStep(1);
    setDirection(1);
  }, []);

  const goHome = useCallback(() => {
    setPage('landing');
  }, []);

  const resetSurvey = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setAnswers({});
    setCurrentStep(1);
    setPage('landing');
  }, []);

  const submitAnswers = useCallback(async (collectedAnswers) => {
    // Future: replace with API POST
    return Promise.resolve(collectedAnswers);
  }, []);

  return {
    page,
    currentStep,
    answers,
    direction,
    canAdvance,
    setAnswer,
    nextStep,
    prevStep,
    startSurvey,
    goHome,
    resetSurvey,
    submitAnswers,
  };
}
