function Button({ children, onClick, disabled, variant = 'primary', className = '' }) {
  const base =
    'rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4849A]/50';
  const variants = {
    primary:
      'bg-gradient-to-r from-[#D4849A] to-[#C06B83] text-white hover:from-[#C06B83] hover:to-[#A8566E] shadow-lg shadow-[#D4849A]/30 hover:shadow-xl hover:shadow-[#D4849A]/40 disabled:opacity-40 disabled:cursor-not-allowed px-6 py-3',
    secondary: 'border-2 border-[#F2D4DC] text-[#4A3035] hover:bg-[#FFF5F7] hover:border-[#D4849A] px-6 py-3',
    ghost: 'text-[#8C6B73] hover:text-[#D4849A] underline decoration-[#D4849A]/30 hover:decoration-[#D4849A]',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
