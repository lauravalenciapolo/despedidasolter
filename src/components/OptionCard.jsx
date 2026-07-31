import { Check } from 'lucide-react';

function OptionCard({ emoji, label, description, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative w-full p-4 rounded-2xl border-2 text-left transition-all duration-200
        hover:shadow-md hover:scale-[1.02]
        ${selected
          ? 'border-[#D4849A] shadow-md shadow-[#D4849A]/20 bg-[#FFF5F7] ring-2 ring-[#D4849A]/30'
          : 'border-[#F2D4DC] bg-[#FFFBFC] hover:border-[#D4849A]/50'}
      `}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0">{emoji}</span>
        <div className="flex-1 min-w-0">
          <span className={`font-medium ${selected ? 'text-[#D4849A]' : 'text-[#4A3035]'}`}>{label}</span>
          {description && (
            <p className="text-sm text-[#8C6B73] mt-1">{description}</p>
          )}
        </div>
      </div>
      {selected && (
        <span className="absolute top-3 right-3 bg-[#D4849A] text-white rounded-full p-1">
          <Check size={14} strokeWidth={3} />
        </span>
      )}
    </button>
  );
}

export default OptionCard;
