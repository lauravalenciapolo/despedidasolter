# Design Document

## Introduction

This document defines the technical architecture for the bachelorette party survey wizard — a frontend-only React 19 application built with Vite 8. The wizard guides users through a 12-question survey using animated multi-step navigation, localStorage persistence, and a summary page. The design emphasizes a clean component hierarchy, a centralized state hook, and separation of data from presentation.

## Architecture Overview

The application follows a page-based architecture without a router. A single `App.jsx` manages which page (Landing, Survey, Summary) is displayed via a `page` state variable. All survey logic is encapsulated in a custom `useSurvey` hook, which owns step navigation, answer storage, validation, and localStorage persistence. Question data is defined in a dedicated data file, making it easy to update content without touching components.

```
┌─────────────────────────────────────────────────┐
│                    App.jsx                       │
│         page state: landing | survey | summary   │
├────────────┬────────────────┬───────────────────┤
│  Landing   │    Survey      │    Summary        │
│  Page      │    Page        │    Page           │
│            │  ┌───────────┐ │                   │
│            │  │ProgressBar│ │                   │
│            │  │QuestionStep│ │                   │
│            │  │OptionCard │ │                   │
│            │  │ Button Nav│ │                   │
│            │  └───────────┘ │                   │
└────────────┴────────────────┴───────────────────┘
                     │
              ┌──────┴──────┐
              │ useSurvey   │ ←── localStorage
              │   Hook      │
              └──────┬──────┘
                     │
              ┌──────┴──────┐
              │ questions.js│
              │   (data)    │
              └─────────────┘
```

## Technology Stack

| Layer         | Technology            | Purpose                              |
|---------------|-----------------------|--------------------------------------|
| UI Framework  | React 19              | Component rendering & state          |
| Build Tool    | Vite 8                | Development server & bundling        |
| Styling       | Tailwind CSS 4        | Utility-first CSS                    |
| Animation     | Framer Motion 12      | Step transition animations           |
| Icons         | lucide-react          | Check icon for selected cards        |
| Persistence   | localStorage API      | Browser-native key-value storage     |

## File Structure

```
src/
├── App.jsx                    # Root component, page state management
├── main.jsx                   # React entry point
├── index.css                  # Tailwind directives & global styles
├── components/
│   ├── Button.jsx             # Reusable button (primary, secondary, ghost)
│   ├── ProgressBar.jsx        # Step counter + animated progress bar
│   ├── OptionCard.jsx         # Selectable card with emoji, text, check icon
│   ├── QuestionStep.jsx       # Question renderer (dispatches by type)
│   ├── ImageOption.jsx        # Future: card variant with image support
│   └── Layout.jsx             # Centered max-width container wrapper
├── pages/
│   ├── Landing.jsx            # Landing page with CTA
│   ├── Survey.jsx             # Survey wizard orchestrator
│   └── Summary.jsx            # Results display page
├── hooks/
│   └── useSurvey.js           # Custom hook: state, navigation, persistence
└── data/
    └── questions.js           # 12-question array with metadata
```

## Component Design

### App.jsx

Top-level component managing page state without a routing library.

```jsx
import { useState } from 'react';
import Landing from './pages/Landing';
import Survey from './pages/Survey';
import Summary from './pages/Summary';
import { useSurvey } from './hooks/useSurvey';

function App() {
  const survey = useSurvey();
  const { page, startSurvey, resetSurvey } = survey;

  return (
    <div className="min-h-screen bg-[#F7F7F7] font-sans text-[#333333]">
      {page === 'landing' && <Landing onStart={startSurvey} />}
      {page === 'survey' && <Survey survey={survey} />}
      {page === 'summary' && <Summary survey={survey} onReset={resetSurvey} />}
    </div>
  );
}

export default App;
```

### Layout.jsx

Reusable centered container providing consistent padding and max-width.

```jsx
function Layout({ children }) {
  return (
    <div className="mx-auto max-w-lg px-5 py-10">
      {children}
    </div>
  );
}

export default Layout;
```

### Button.jsx

Reusable button with variant support.

```jsx
function Button({ children, onClick, disabled, variant = 'primary' }) {
  const base = 'px-6 py-3 rounded-full font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'bg-[#222222] text-white hover:bg-[#444444] disabled:opacity-40 disabled:cursor-not-allowed',
    secondary: 'border border-[#E5E5E5] text-[#333333] hover:bg-[#ECECEC]',
    ghost: 'text-[#666666] hover:text-[#333333] underline',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;
```

### ProgressBar.jsx

Displays step counter text and animated width bar.

```jsx
import { motion } from 'framer-motion';

function ProgressBar({ currentStep, totalSteps }) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <p className="text-sm text-[#666666] mb-2">
        Paso {currentStep} de {totalSteps}
      </p>
      <div className="h-2 w-full rounded-full bg-[#E5E5E5]">
        <motion.div
          className="h-full rounded-full bg-[#222222]"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
```

### OptionCard.jsx

Selectable card for single-select and multiple-select questions.

```jsx
import { Check } from 'lucide-react';

function OptionCard({ emoji, label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative w-full p-4 rounded-2xl border-2 text-left transition-all duration-200
        hover:shadow-md hover:scale-[1.02]
        ${selected
          ? 'border-[#222222] shadow-md'
          : 'border-[#E5E5E5] bg-white'}
      `}
    >
      <span className="text-2xl mr-3">{emoji}</span>
      <span className="text-[#333333] font-medium">{label}</span>
      {selected && (
        <span className="absolute top-3 right-3 text-[#222222]">
          <Check size={18} />
        </span>
      )}
    </button>
  );
}

export default OptionCard;
```

### QuestionStep.jsx

Renders the appropriate input UI based on question type.

```jsx
import OptionCard from '../components/OptionCard';

function QuestionStep({ question, answer, onAnswer }) {
  if (question.type === 'text') {
    return (
      <div>
        <h2 className="text-xl font-semibold text-[#222222] mb-6">
          {question.text}
        </h2>
        <textarea
          className="w-full p-4 rounded-2xl border-2 border-[#E5E5E5] focus:border-[#222222] outline-none resize-none min-h-[120px] transition-colors"
          value={answer || ''}
          onChange={(e) => onAnswer(e.target.value)}
          placeholder="Escribe tu respuesta..."
        />
      </div>
    );
  }

  const isMultiple = question.type === 'multiple';
  const selectedValues = isMultiple ? (answer || []) : answer;

  const handleSelect = (optionId) => {
    if (isMultiple) {
      const current = answer || [];
      const updated = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      onAnswer(updated);
    } else {
      onAnswer(optionId);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#222222] mb-6">
        {question.text}
      </h2>
      <div className="flex flex-col gap-3">
        {question.options.map((option) => (
          <OptionCard
            key={option.id}
            emoji={option.emoji}
            label={option.label}
            selected={
              isMultiple
                ? (selectedValues || []).includes(option.id)
                : selectedValues === option.id
            }
            onClick={() => handleSelect(option.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default QuestionStep;
```

### Survey.jsx (Page)

Orchestrates the survey wizard with progress, question step, navigation buttons, and animations.

```jsx
import { AnimatePresence, motion } from 'framer-motion';
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
  const { currentStep, answers, direction, setAnswer, nextStep, prevStep, canAdvance } = survey;
  const question = questions[currentStep - 1];
  const isLastStep = currentStep === questions.length;

  return (
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

      <div className="flex justify-between mt-8">
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
  );
}

export default Survey;
```

## Data Model

### Question Schema

```javascript
// src/data/questions.js
export const questions = [
  {
    id: 'destination',           // Unique identifier string
    text: '¿A dónde te gustaría ir?', // Display question text
    type: 'single',             // 'single' | 'multiple' | 'text'
    hasImage: false,            // Whether options support future image URLs
    options: [                  // Array of selectable options (empty for 'text' type)
      { id: 'beach', emoji: '🏖️', label: 'Playa' },
      { id: 'mountain', emoji: '🏔️', label: 'Montaña' },
      { id: 'city', emoji: '🌆', label: 'Ciudad' },
      { id: 'countryside', emoji: '🌿', label: 'Campo' },
    ],
  },
  // ... 11 more questions
];
```

### Answers Shape

```javascript
// Stored in useSurvey hook state and localStorage
{
  "destination": "beach",          // single-select: option id string
  "activities": ["spa", "dance"],  // multiple-select: array of option ids
  "message": "Quiero que sea..."   // text: raw string value
}
```

### localStorage Schema

```javascript
// Key: 'bachelorette-survey'
{
  "answers": { /* answers object */ },
  "currentStep": 5,
  "page": "survey"
}
```

## State Management — useSurvey Hook

The `useSurvey` hook is the single source of truth for all survey state.

```javascript
// src/hooks/useSurvey.js
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
    if (currentQuestion.type === 'text') {
      return typeof currentAnswer === 'string' && currentAnswer.trim().length > 0;
    }
    if (currentQuestion.type === 'multiple') {
      return Array.isArray(currentAnswer) && currentAnswer.length > 0;
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
    resetSurvey,
    submitAnswers,
  };
}
```

## Interfaces

### Component Props

| Component      | Prop          | Type                          | Description                              |
|----------------|---------------|-------------------------------|------------------------------------------|
| `Landing`      | `onStart`     | `() => void`                  | Callback to start survey                 |
| `Survey`       | `survey`      | `UseSurveyReturn`             | Full hook return object                  |
| `Summary`      | `survey`      | `UseSurveyReturn`             | Hook return for answers & submit         |
| `Summary`      | `onReset`     | `() => void`                  | Callback to clear data & go to landing   |
| `ProgressBar`  | `currentStep` | `number`                      | Current step (1-12)                      |
| `ProgressBar`  | `totalSteps`  | `number`                      | Total steps (12)                         |
| `QuestionStep` | `question`    | `Question`                    | Current question object from data        |
| `QuestionStep` | `answer`      | `string \| string[] \| null`  | Current saved answer                     |
| `QuestionStep` | `onAnswer`    | `(value) => void`             | Callback to update answer                |
| `OptionCard`   | `emoji`       | `string`                      | Emoji character to display               |
| `OptionCard`   | `label`       | `string`                      | Option text label                        |
| `OptionCard`   | `selected`    | `boolean`                     | Whether this card is selected            |
| `OptionCard`   | `onClick`     | `() => void`                  | Selection toggle callback                |
| `Button`       | `variant`     | `'primary' \| 'secondary' \| 'ghost'` | Visual style variant          |
| `Button`       | `disabled`    | `boolean`                     | Disabled state                           |
| `Button`       | `onClick`     | `() => void`                  | Click handler                            |

### useSurvey Return Type

```typescript
interface UseSurveyReturn {
  page: 'landing' | 'survey' | 'summary';
  currentStep: number;
  answers: Record<string, string | string[]>;
  direction: 1 | -1;
  canAdvance: boolean;
  setAnswer: (questionId: string, value: string | string[]) => void;
  nextStep: () => void;
  prevStep: () => void;
  startSurvey: () => void;
  resetSurvey: () => void;
  submitAnswers: (answers: Record<string, string | string[]>) => Promise<any>;
}
```

## Animation Strategy

Framer Motion's `AnimatePresence` with `mode="wait"` ensures outgoing steps finish exit animations before incoming steps mount. A `direction` variable (1 for forward, -1 for backward) controls the slide direction.

| Transition | Enter         | Exit          |
|------------|---------------|---------------|
| Forward    | Slide from right, fade in | Slide to left, fade out  |
| Backward   | Slide from left, fade in  | Slide to right, fade out |

```javascript
const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? -100 : 100, opacity: 0 }),
};
```

## Error Handling

| Scenario                      | Handling                                               |
|-------------------------------|--------------------------------------------------------|
| Corrupt localStorage JSON     | `loadFromStorage` catches parse errors, returns null, app starts fresh |
| Missing question data         | `canAdvance` returns false if `currentQuestion` is undefined |
| Empty text input              | Trim-based validation rejects whitespace-only strings  |
| Future API failure            | `submitAnswers` returns a Promise; caller can `.catch()` to display an error |

## Tailwind CSS Configuration

Tailwind CSS 4 uses the new CSS-based configuration via `@import "tailwindcss"` in `index.css`. No `tailwind.config.js` needed for this project since only default utilities and custom colors (applied inline) are used.

```css
/* src/index.css */
@import "tailwindcss";

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Progress bar reflects current step

*For any* step number X in the range [1, 12], the ProgressBar SHALL display the text "Paso X de 12" and render the bar at exactly (X / 12) * 100 percent width.

**Validates: Requirements 2.1, 2.2**

### Property 2: Previous button visibility follows step position

*For any* step X where X > 1, the "Previous" button SHALL be visible; and when X equals 1, the "Previous" button SHALL not be rendered.

**Validates: Requirements 2.3, 2.4**

### Property 3: Navigation button label follows step position

*For any* step X where X < 12, the advance button SHALL display "Siguiente"; and when X equals 12, the advance button SHALL display "Finalizar".

**Validates: Requirements 2.5, 2.6**

### Property 4: Navigating back preserves previously saved answers

*For any* step X > 1 with a previously saved answer, navigating forward and then backward SHALL restore the exact same answer value for that step.

**Validates: Requirements 2.7**

### Property 5: Validation disables advance when no valid answer exists

*For any* question (of any type), when no valid answer is provided (no selection for select types, or only whitespace for text type), the advance button SHALL be disabled.

**Validates: Requirements 3.1, 3.2**

### Property 6: Single-select enforces exactly one selection

*For any* single-select question and any sequence of option clicks, exactly one option SHALL be marked as selected at any given time (the most recently clicked one).

**Validates: Requirements 4.2, 4.3**

### Property 7: Multiple-select toggle is idempotent in pairs

*For any* multiple-select question and any option, clicking it an even number of times SHALL return to the original selection state (toggle behavior: click once = selected, click twice = deselected).

**Validates: Requirements 5.2, 5.4**

### Property 8: Text validation rejects whitespace-only input

*For any* string composed entirely of whitespace characters (spaces, tabs, newlines), the validation logic SHALL report the answer as invalid and the advance button SHALL remain disabled.

**Validates: Requirements 6.2**

### Property 9: Questions data structure integrity

*For any* question in the questions array, it SHALL have a non-empty `id` string, a non-empty `text` string, a `type` value of "single", "multiple", or "text", and when type is not "text", a non-empty `options` array where each option has an `id`, `emoji`, and `label`.

**Validates: Requirements 7.1, 7.2**

### Property 10: localStorage round-trip persistence

*For any* set of answers and any step number, persisting to localStorage and then restoring SHALL produce the exact same answers object and step number.

**Validates: Requirements 8.1, 8.2**

### Property 11: Summary displays all questions with corresponding answers

*For any* complete set of 12 answers (one per question), the Summary page SHALL render each question's text paired with its corresponding answer value, resulting in exactly 12 question-answer pairs displayed.

**Validates: Requirements 9.4**

### Property 12: Option cards render all defined options

*For any* question of type "single" or "multiple", the number of rendered OptionCard components SHALL equal the number of options defined in that question's data.

**Validates: Requirements 4.1, 5.1**
