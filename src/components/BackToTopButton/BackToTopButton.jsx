import { useState, useEffect } from "react";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";

export default function BackToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!show) return null;

  return (
    <button
      onClick={handleTop}
      aria-label="Back to top"
      className="
        fixed bottom-6 right-6 z-50
        inline-flex items-center gap-2 px-3 py-1.5 rounded-[10px] text-sm
        border border-[#ffb347] text-[#ffb347] bg-[#2e3c51]/70 
        transition-colors duration-200 hover:bg-[#ffb347] hover:text-[#0f1720]
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffb347]
      "
    >
      <MdOutlineKeyboardDoubleArrowUp className="w-8 h-8"/>
    </button>
  );
}
