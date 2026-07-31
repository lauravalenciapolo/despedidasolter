import OptionCard from './OptionCard';
import ImageOption from './ImageOption';

function QuestionStep({ question, answer, onAnswer }) {
  if (question.type === 'info') {
    return (
      <div className="flex flex-col items-center text-center">
        <h2 className="text-xl font-semibold text-[#4A3035] mb-6">
          {question.text}
        </h2>
        <p className="text-[#8C6B73] text-lg mb-6 leading-relaxed">
          {question.description}
        </p>
        <a
          href={question.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#1DB954] hover:bg-[#1ed760] text-white font-medium px-6 py-3 rounded-full transition-all shadow-lg shadow-[#1DB954]/30"
        >
          🎵 {question.linkLabel}
        </a>
      </div>
    );
  }

  if (question.type === 'text') {
    return (
      <div>
        <h2 className="text-xl font-semibold text-[#4A3035] mb-6">
          {question.text}
        </h2>
        <textarea
          className="w-full p-4 rounded-2xl border-2 border-[#F2D4DC] focus:border-[#D4849A] outline-none resize-none min-h-[120px] transition-colors bg-[#FFFBFC]"
          value={answer || ''}
          onChange={(e) => onAnswer(e.target.value)}
          placeholder={question.placeholder || 'Escribe tu respuesta...'}
        />
      </div>
    );
  }

  const isMultiple = question.type === 'multiple';

  // For single questions with textInput options, answer can be:
  // - a string id (normal option)
  // - an object { id, text } (option with text input)
  const getSelectedId = () => {
    if (isMultiple) return answer || [];
    if (typeof answer === 'object' && answer !== null && answer.id) return answer.id;
    return answer;
  };

  const selectedId = getSelectedId();
  const selectedValues = isMultiple ? (answer || []) : selectedId;

  const handleSelect = (optionId) => {
    const option = question.options.find((o) => o.id === optionId);

    if (isMultiple) {
      const current = answer || [];
      if (current.includes(optionId)) {
        onAnswer(current.filter((id) => id !== optionId));
      } else {
        if (question.maxSelections && current.length >= question.maxSelections) {
          return;
        }
        onAnswer([...current, optionId]);
      }
    } else {
      if (option?.hasTextInput) {
        onAnswer({ id: optionId, text: typeof answer === 'object' ? answer.text || '' : '' });
      } else {
        onAnswer(optionId);
      }
    }
  };

  const handleTextInput = (text) => {
    onAnswer({ id: selectedId, text });
  };

  // Find if a selected option has text input
  const selectedOptionWithText = !isMultiple
    ? question.options.find((o) => o.id === selectedId && o.hasTextInput)
    : null;

  const hasImages = question.hasImage && question.options.some((opt) => opt.image);
  const OptionComponent = hasImages ? ImageOption : OptionCard;

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#4A3035] mb-2">
        {question.text}
      </h2>
      {question.description && (
        <p className="text-sm text-[#8C6B73] mb-6">{question.description}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((option) => (
          <OptionComponent
            key={option.id}
            emoji={option.emoji}
            label={option.label}
            description={option.description}
            image={option.image}
            selected={
              isMultiple
                ? (selectedValues || []).includes(option.id)
                : selectedValues === option.id
            }
            onClick={() => handleSelect(option.id)}
          />
        ))}
      </div>

      {/* Text input for "other" style options */}
      {selectedOptionWithText && (
        <textarea
          className="w-full mt-4 p-4 rounded-2xl border-2 border-[#F2D4DC] focus:border-[#D4849A] outline-none resize-none min-h-[80px] transition-colors bg-[#FFFBFC]"
          value={typeof answer === 'object' ? answer.text || '' : ''}
          onChange={(e) => handleTextInput(e.target.value)}
          placeholder={selectedOptionWithText.textPlaceholder || 'Escribe aquí...'}
        />
      )}
    </div>
  );
}

export default QuestionStep;
