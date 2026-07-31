# Implementation Plan: Bachelorette Survey Wizard

## Overview

Build a frontend-only React 19 survey wizard that guides users through 12 questions to discover their ideal bachelorette party. The implementation follows a bottom-up approach: install dependencies, set up global styles, create the data layer, build reusable components, implement the state hook, compose pages, and wire everything together in App.jsx.

## Tasks

- [x] 1. Project setup and dependencies
  - [x] 1.1 Install Tailwind CSS 4, Framer Motion 12, and lucide-react
    - Run `npm install tailwindcss@4 framer-motion@12 lucide-react`
    - Update `src/index.css` to use Tailwind CSS 4 with `@import "tailwindcss"` directive and set body font-family
    - _Requirements: 11.1, 11.4_

  - [x] 1.2 Create directory structure and placeholder files
    - Create directories: `src/components/`, `src/pages/`, `src/hooks/`, `src/data/`
    - Create empty placeholder files for all components, pages, hook, and data
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

- [x] 2. Data layer and state management
  - [x] 2.1 Implement questions data file (`src/data/questions.js`)
    - Export a `questions` array with 12 question objects
    - Each question includes: `id` (string), `text` (string), `type` ("single" | "multiple" | "text"), `hasImage` (boolean), and `options` array (with `id`, `emoji`, `label` per option)
    - Mark questions 4, 5, and 7 with `hasImage: true` for future image support
    - All display strings (question text, option labels) reside in this data file
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [ ]* 2.2 Write property test for questions data integrity
    - **Property 9: Questions data structure integrity**
    - **Validates: Requirements 7.1, 7.2**

  - [x] 2.3 Implement useSurvey hook (`src/hooks/useSurvey.js`)
    - Manage state: `page` (landing|survey|summary), `currentStep`, `answers`, `direction`
    - Implement `loadFromStorage` and `saveToStorage` with localStorage key `'bachelorette-survey'`
    - Persist `page`, `currentStep`, and `answers` to localStorage on every state change via `useEffect`
    - Restore state from localStorage on initialization
    - Implement `canAdvance` validation: single-select requires non-null value, multiple-select requires non-empty array, text requires non-whitespace string
    - Implement `setAnswer`, `nextStep`, `prevStep`, `startSurvey`, `resetSurvey`, `submitAnswers`
    - `submitAnswers` returns a Promise that resolves immediately (ready for future API replacement)
    - _Requirements: 2.3, 2.4, 2.5, 2.6, 2.7, 3.1, 3.2, 3.3, 3.4, 8.1, 8.2, 8.3, 13.1_

  - [ ]* 2.4 Write property test for validation logic
    - **Property 5: Validation disables advance when no valid answer exists**
    - **Validates: Requirements 3.1, 3.2**

  - [ ]* 2.5 Write property test for localStorage round-trip persistence
    - **Property 10: localStorage round-trip persistence**
    - **Validates: Requirements 8.1, 8.2**

- [x] 3. Checkpoint - Verify data layer and hook
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Reusable UI components
  - [x] 4.1 Implement Layout component (`src/components/Layout.jsx`)
    - Centered max-width container (`max-w-lg`) with horizontal padding and vertical padding
    - _Requirements: 11.3, 11.5, 12.1_

  - [x] 4.2 Implement Button component (`src/components/Button.jsx`)
    - Accept props: `children`, `onClick`, `disabled`, `variant` (primary, secondary, ghost)
    - Primary: dark background `#222222`, white text, rounded-full, disabled state with reduced opacity
    - Secondary: bordered with `#E5E5E5`, hover background
    - Ghost: underline text style for reset actions
    - Include focus ring for accessibility
    - _Requirements: 11.1, 12.1_

  - [x] 4.3 Implement ProgressBar component (`src/components/ProgressBar.jsx`)
    - Accept `currentStep` and `totalSteps` props
    - Display text "Paso {currentStep} de {totalSteps}"
    - Render animated horizontal progress bar using Framer Motion `motion.div` with width percentage
    - Bar background `#E5E5E5`, fill color `#222222`, rounded-full
    - _Requirements: 2.1, 2.2, 12.1_

  - [ ]* 4.4 Write property test for ProgressBar
    - **Property 1: Progress bar reflects current step**
    - **Validates: Requirements 2.1, 2.2**

  - [x] 4.5 Implement OptionCard component (`src/components/OptionCard.jsx`)
    - Accept props: `emoji`, `label`, `selected`, `onClick`
    - Render as button with emoji + label text
    - Selected state: black border `#222222`, shadow, Check icon from lucide-react in top-right corner
    - Unselected state: light border `#E5E5E5`, white background
    - Hover effect: shadow and slight scale transform
    - Border-radius 16px (rounded-2xl)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 5.1, 5.2, 5.3, 11.2, 12.1_

  - [ ]* 4.6 Write property test for single-select enforcement
    - **Property 6: Single-select enforces exactly one selection**
    - **Validates: Requirements 4.2, 4.3**

  - [ ]* 4.7 Write property test for multiple-select toggle
    - **Property 7: Multiple-select toggle is idempotent in pairs**
    - **Validates: Requirements 5.2, 5.4**

  - [x] 4.8 Implement QuestionStep component (`src/components/QuestionStep.jsx`)
    - Accept props: `question`, `answer`, `onAnswer`
    - For `type === 'text'`: render textarea with placeholder, wire `onChange` to `onAnswer`
    - For `type === 'single'`: render OptionCard list, clicking selects one (replaces previous)
    - For `type === 'multiple'`: render OptionCard list, clicking toggles selection in array
    - Display question text as heading
    - _Requirements: 4.1, 4.2, 4.3, 5.1, 5.2, 5.3, 5.4, 6.1, 6.2, 6.3, 12.1_

  - [ ]* 4.9 Write property test for text validation
    - **Property 8: Text validation rejects whitespace-only input**
    - **Validates: Requirements 6.2**

  - [x] 4.10 Create ImageOption placeholder component (`src/components/ImageOption.jsx`)
    - Stub component for future image-based option cards
    - Accept same props as OptionCard plus an optional `imageUrl` prop
    - _Requirements: 7.3, 12.1_

- [x] 5. Checkpoint - Verify components render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Page components
  - [x] 6.1 Implement Landing page (`src/pages/Landing.jsx`)
    - Display large "💍" emoji
    - Display title: "Descubre tu despedida de soltera ideal"
    - Display description: "No significa que vaya a pasar... pero imaginemos por un momento la despedida de tus sueños. 😏 Responde sin pensarlo mucho."
    - Display "Empecemos" button using Button component (primary variant)
    - Button click calls `onStart` prop
    - Use Layout wrapper for consistent spacing
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 12.2_

  - [x] 6.2 Implement Survey page (`src/pages/Survey.jsx`)
    - Use Layout wrapper
    - Render ProgressBar with currentStep and totalSteps
    - Wrap QuestionStep in AnimatePresence + motion.div with slide variants based on direction
    - Render navigation buttons: "Anterior" (secondary, hidden on step 1) and "Siguiente"/"Finalizar" (primary, disabled when !canAdvance)
    - Wire `nextStep`, `prevStep`, `setAnswer` from survey hook
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 3.1, 3.2, 3.3, 3.4, 10.1, 10.2, 10.3, 12.2_

  - [ ]* 6.3 Write property test for Previous button visibility
    - **Property 2: Previous button visibility follows step position**
    - **Validates: Requirements 2.3, 2.4**

  - [ ]* 6.4 Write property test for navigation button label
    - **Property 3: Navigation button label follows step position**
    - **Validates: Requirements 2.5, 2.6**

  - [x] 6.5 Implement Summary page (`src/pages/Summary.jsx`)
    - Display large "🎉" emoji and title "¡Gracias!" with subtitle "Tus respuestas fueron registradas."
    - Render all 12 questions with their corresponding answers from the survey hook
    - For single-select answers: display the emoji + label of the selected option
    - For multiple-select answers: display all selected options' emoji + labels
    - For text answers: display the raw text
    - Render "Volver al inicio" button (primary) that calls `onReset`
    - Render a discrete reset button (ghost variant) that clears localStorage and returns to landing
    - Call `submitAnswers` with collected answers on mount
    - Use Layout wrapper
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 13.2, 12.2_

  - [ ]* 6.6 Write property test for summary display completeness
    - **Property 11: Summary displays all questions with corresponding answers**
    - **Validates: Requirements 9.4**

- [x] 7. Wire everything together in App.jsx
  - [x] 7.1 Update App.jsx as root component
    - Import and use `useSurvey` hook
    - Conditionally render Landing, Survey, or Summary based on `page` state
    - Pass appropriate props to each page component
    - Apply global wrapper with `min-h-screen`, background color `#F7F7F7`, and font settings
    - Remove existing boilerplate content
    - _Requirements: 1.5, 3.4, 12.5_

  - [ ]* 7.2 Write property test for answer persistence across navigation
    - **Property 4: Navigating back preserves previously saved answers**
    - **Validates: Requirements 2.7**

  - [ ]* 7.3 Write property test for OptionCard rendering count
    - **Property 12: Option cards render all defined options**
    - **Validates: Requirements 4.1, 5.1**

- [x] 8. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- The project uses React 19 with JSX (not TypeScript) and Vite 8
- Tailwind CSS 4 uses the new CSS-based import (`@import "tailwindcss"`) — no config file needed
- All text content lives in `src/data/questions.js` — components contain no hardcoded strings
- The `submitAnswers` function is a no-op Promise for now, structured for future API integration

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["2.1"] },
    { "id": 2, "tasks": ["2.2", "2.3"] },
    { "id": 3, "tasks": ["2.4", "2.5", "4.1", "4.2"] },
    { "id": 4, "tasks": ["4.3", "4.5", "4.10"] },
    { "id": 5, "tasks": ["4.4", "4.6", "4.7", "4.8"] },
    { "id": 6, "tasks": ["4.9", "6.1"] },
    { "id": 7, "tasks": ["6.2", "6.5"] },
    { "id": 8, "tasks": ["6.3", "6.4", "6.6"] },
    { "id": 9, "tasks": ["7.1"] },
    { "id": 10, "tasks": ["7.2", "7.3"] }
  ]
}
```
