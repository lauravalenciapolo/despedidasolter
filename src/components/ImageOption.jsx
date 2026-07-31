import { Check } from 'lucide-react';

function ImageOption({ emoji, label, description, selected, onClick, image }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative w-full rounded-2xl border-3 text-left transition-all duration-200 overflow-hidden
        hover:shadow-lg hover:scale-[1.02]
        ${selected
          ? 'border-[#D4849A] shadow-lg shadow-[#D4849A]/25 bg-[#FFF5F7] ring-2 ring-[#D4849A]/30'
          : 'border-[#F2D4DC] bg-[#FFFBFC] hover:border-[#D4849A]/50'}
      `}
    >
      {image && (
        <img
          src={image}
          alt={label}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4 flex items-center">
        <span className="text-2xl mr-3">{emoji}</span>
        <div className="flex-1 min-w-0">
          <span className="text-[#4A3035] font-medium">{label}</span>
          {description && (
            <p className="text-sm text-[#8C6B73] mt-1">{description}</p>
          )}
        </div>
      </div>
      {selected && (
        <span className="absolute top-3 right-3 bg-[#D4849A] text-white rounded-full p-1.5 shadow-md">
          <Check size={16} strokeWidth={3} />
        </span>
      )}
    </button>
  );
}

export default ImageOption;
