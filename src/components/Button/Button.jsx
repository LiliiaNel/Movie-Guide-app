export default function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="
        inline-flex items-center justify-center
        px-4 py-2
        text-xs font-medium
        rounded-md
        border border-[#cd8e37]
        text-[#e3e0dc]
        bg-transparent
        hover:bg-[#cd8e37]/20
        transition-colors duration-300
      "
    >
      {children}
    </button>
  );
}