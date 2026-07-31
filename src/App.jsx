import Landing from './pages/Landing';
import Survey from './pages/Survey';
import Summary from './pages/Summary';
import { useSurvey } from './hooks/useSurvey';

function App() {
  const survey = useSurvey();
  const { page, startSurvey, resetSurvey } = survey;

  return (
    <div className="min-h-screen font-sans text-[#4A3035]">
      {page === 'landing' && <Landing onStart={startSurvey} />}
      {page === 'survey' && <Survey survey={survey} />}
      {page === 'summary' && <Summary survey={survey} onReset={resetSurvey} />}
    </div>
  );
}

export default App;
