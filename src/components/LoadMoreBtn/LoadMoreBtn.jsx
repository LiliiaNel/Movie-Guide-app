export default function LoadMoreBtn({ onPaginate }) {
  return (
    <button
      onClick={onPaginate}
      className="
        border-2 border-[#cd8e37]
        text-[#cd8e37]
        bg-transparent
        rounded-md
        px-4 py-2
        text-sm
        transition-all duration-300
        hover:bg-[#ffb347]
        hover:border-[#ffb347]
        hover:text-[#1f2937]
        focus:bg-[#ffb347]
        focus:border-[#ffb347]
        focus:text-[#1f2937]
        focus:outline-none
      "
    >
      Load more
    </button>
  );
}
