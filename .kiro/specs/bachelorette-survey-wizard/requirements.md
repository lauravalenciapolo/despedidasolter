# Requirements Document

## Introduction

Interactive bachelorette party survey wizard — a frontend-only React application that guides users through a 12-question survey to discover their ideal bachelorette party. The app features a landing page, animated multi-step survey with validation, localStorage persistence, and a summary page displaying all collected answers. Built with React 19, Vite 8, Tailwind CSS, Framer Motion, and lucide-react. Designed mobile-first with a neutral color palette and modern card-based UI.

## Glossary

- **App**: The top-level React component that manages page state (Landing, Survey, Summary) without a router.
- **Survey_Wizard**: The multi-step survey flow including progress tracking, navigation, validation, and step transitions.
- **Landing_Page**: The initial page displayed to the user with an introduction and a call-to-action button to start the survey.
- **Summary_Page**: The final page displaying all user answers after the survey is completed.
- **Question_Step**: A single survey step presenting one question with its corresponding input type (single select, multiple select, or open text).
- **Progress_Bar**: A visual indicator showing the current step number and an animated horizontal bar representing completion progress.
- **Option_Card**: A selectable card UI element representing one answer option, featuring emoji, text, and visual feedback on selection.
- **useSurvey_Hook**: A custom React hook managing survey state, step navigation, answer persistence, and validation logic.
- **questions_data**: A separate JavaScript data file (`questions.js`) containing all question definitions, options, and metadata.
- **localStorage_Persistence**: The mechanism to auto-save user answers and current step to the browser's localStorage.

## Requirements

### Requirement 1: Landing Page Display

**User Story:** As a user, I want to see an inviting landing page when I open the app, so that I understand the purpose of the survey and feel motivated to start.

#### Acceptance Criteria

1. THE Landing_Page SHALL display the emoji "💍" at a large size as the primary visual element.
2. THE Landing_Page SHALL display the title "Descubre tu despedida de soltera ideal" below the emoji.
3. THE Landing_Page SHALL display the description text "No significa que vaya a pasar... pero imaginemos por un momento la despedida de tus sueños. 😏 Responde sin pensarlo mucho." below the title.
4. THE Landing_Page SHALL display a button labeled "Empecemos" below the description.
5. WHEN the user clicks the "Empecemos" button, THE App SHALL transition the page state from Landing to Survey starting at step 1.

### Requirement 2: Survey Navigation and Progress

**User Story:** As a user, I want to see my progress and navigate between questions, so that I know how far along I am and can revisit previous answers.

#### Acceptance Criteria

1. WHILE the Survey_Wizard is active, THE Progress_Bar SHALL display the text "Paso X de 12" where X is the current step number.
2. WHILE the Survey_Wizard is active, THE Progress_Bar SHALL display an animated horizontal bar representing the percentage of completion (current step divided by total steps).
3. WHILE the current step is greater than 1, THE Survey_Wizard SHALL display a "Previous" button that navigates to the preceding step.
4. WHILE the current step equals 1, THE Survey_Wizard SHALL hide the "Previous" button.
5. WHILE the current step is less than 12, THE Survey_Wizard SHALL display a "Next" button for advancing to the following step.
6. WHILE the current step equals 12, THE Survey_Wizard SHALL display a "Finalizar" button instead of the "Next" button.
7. WHEN the user clicks the "Previous" button, THE Survey_Wizard SHALL navigate to the previous step and display the previously saved answer for that step.

### Requirement 3: Mandatory Validation Before Advancing

**User Story:** As a user, I want to be prevented from advancing without answering, so that I complete all required questions.

#### Acceptance Criteria

1. WHILE the current question has no valid answer selected or entered, THE Survey_Wizard SHALL disable the "Next" or "Finalizar" button.
2. WHEN the user provides a valid answer (selects at least one option for select questions or enters non-empty text for text questions), THE Survey_Wizard SHALL enable the "Next" or "Finalizar" button.
3. WHEN the user clicks the enabled "Next" button, THE Survey_Wizard SHALL advance to the next step.
4. WHEN the user clicks the enabled "Finalizar" button on step 12, THE App SHALL transition the page state from Survey to Summary.

### Requirement 4: Single-Select Questions

**User Story:** As a user, I want to select one option from a set of choices, so that I can provide my preference for single-choice questions.

#### Acceptance Criteria

1. WHEN a single-select question is displayed, THE Question_Step SHALL render each option as an Option_Card with its representative emoji and text label.
2. WHEN the user clicks an Option_Card in a single-select question, THE Question_Step SHALL mark that card as selected with a black border, slight shadow, and a check icon in the corner.
3. WHEN the user clicks a different Option_Card in a single-select question, THE Question_Step SHALL deselect the previously selected card and select the newly clicked card.
4. THE Option_Card SHALL display a hover effect when the user hovers over the card.

### Requirement 5: Multiple-Select Questions

**User Story:** As a user, I want to select multiple options from a set of choices, so that I can express all my preferences for multi-choice questions.

#### Acceptance Criteria

1. WHEN a multiple-select question is displayed, THE Question_Step SHALL render each option as an Option_Card with its representative emoji and text label.
2. WHEN the user clicks an Option_Card in a multiple-select question, THE Question_Step SHALL toggle the selection state of that card.
3. WHEN an Option_Card is selected in a multiple-select question, THE Question_Step SHALL display that card with a black border, slight shadow, and a check icon in the corner.
4. THE Question_Step SHALL allow the user to select one or more options in a multiple-select question.

### Requirement 6: Open Text Questions

**User Story:** As a user, I want to type free-form text answers, so that I can express my preferences in my own words.

#### Acceptance Criteria

1. WHEN an open-text question is displayed, THE Question_Step SHALL render a textarea input field.
2. THE Question_Step SHALL validate that the textarea contains at least one non-whitespace character before enabling the advance button.
3. WHILE the user types in the textarea, THE useSurvey_Hook SHALL update the stored answer for the current step in real time.

### Requirement 7: Questions Data Structure

**User Story:** As a developer, I want all questions defined in a separate data file, so that questions can be modified without changing component code.

#### Acceptance Criteria

1. THE questions_data SHALL define 12 questions in an exported array structure.
2. THE questions_data SHALL specify for each question: an id, question text, input type (single, multiple, or text), and an array of options (for select types) where each option includes an emoji and a text label.
3. THE questions_data SHALL mark questions 4, 5, and 7 (ambiente, temática, color de vestir) as having image placeholders for future use.
4. THE questions_data SHALL contain no hardcoded UI content — all display strings reside in the data file.

### Requirement 8: localStorage Persistence

**User Story:** As a user, I want my progress saved automatically, so that I can return later without losing my answers.

#### Acceptance Criteria

1. WHEN the user provides or changes an answer, THE useSurvey_Hook SHALL persist all answers and the current step number to localStorage.
2. WHEN the App initializes, THE useSurvey_Hook SHALL restore previously saved answers and the current step from localStorage if they exist.
3. WHEN the user clicks the reset button on the Summary_Page, THE useSurvey_Hook SHALL clear all persisted data from localStorage and return the App to the Landing_Page.

### Requirement 9: Summary Page

**User Story:** As a user, I want to see a summary of all my answers after completing the survey, so that I can review what I submitted.

#### Acceptance Criteria

1. THE Summary_Page SHALL display the emoji "🎉" at a large size as the primary visual element.
2. THE Summary_Page SHALL display the title "¡Gracias!" below the emoji.
3. THE Summary_Page SHALL display the subtitle "Tus respuestas fueron registradas." below the title.
4. THE Summary_Page SHALL display all 12 questions with their corresponding user answers in a visually structured summary.
5. THE Summary_Page SHALL display a "Volver al inicio" button that transitions the App back to the Landing_Page.
6. THE Summary_Page SHALL display a discrete reset button that clears all stored data and returns to the Landing_Page.

### Requirement 10: Step Transition Animations

**User Story:** As a user, I want smooth animations between steps, so that the survey feels polished and engaging.

#### Acceptance Criteria

1. WHEN the Survey_Wizard transitions from one step to another, THE Question_Step SHALL animate with a combined fade and slide effect using Framer Motion.
2. WHEN navigating forward, THE Question_Step SHALL slide in from the right and fade in.
3. WHEN navigating backward, THE Question_Step SHALL slide in from the left and fade in.

### Requirement 11: Visual Design System

**User Story:** As a user, I want a clean, modern, and visually consistent interface, so that the survey experience feels premium and easy to use.

#### Acceptance Criteria

1. THE App SHALL use a neutral color palette consisting of: #FFFFFF, #F7F7F7, #ECECEC, #333333, #666666, #E5E5E5, #222222, #444444.
2. THE Option_Card SHALL have a border-radius of 16px and soft box shadows.
3. THE App SHALL use generous white space between elements to maintain a clean layout.
4. THE App SHALL use modern sans-serif typography for all text elements.
5. THE App SHALL be responsive with a mobile-first design approach, adapting gracefully to larger viewports.

### Requirement 12: Component Architecture

**User Story:** As a developer, I want reusable, clean components with no hardcoded content, so that the codebase is maintainable and extensible.

#### Acceptance Criteria

1. THE App SHALL organize components in `src/components/` including: Button, ProgressBar, OptionCard, QuestionStep, ImageOption, and Layout.
2. THE App SHALL organize page-level components in `src/pages/` including: Landing, Survey, and Summary.
3. THE App SHALL define survey state management in a custom hook at `src/hooks/useSurvey.js`.
4. THE App SHALL define question data in `src/data/questions.js`.
5. THE App SHALL manage page state (Landing, Survey, Summary) in App.jsx without a routing library.

### Requirement 13: Future API Readiness

**User Story:** As a developer, I want the app prepared for future backend integration, so that sending results via API or WhatsApp can be added with minimal changes.

#### Acceptance Criteria

1. THE useSurvey_Hook SHALL expose a `submitAnswers` function that accepts a collected answers object and returns a Promise, currently resolving immediately but structured for future API POST replacement.
2. THE Summary_Page SHALL invoke the `submitAnswers` function when the survey is completed, preparing the data payload in a format suitable for API transmission.
