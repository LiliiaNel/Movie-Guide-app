import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { PiFilmSlate } from "react-icons/pi";
import Navigation from "../Navigation/Navigation";
import RandomMovieButtonFromList from "../RandomMovieButtonFromList/RandomMovieButtonFromList.jsx";
import { useMovies } from "../../context/MoviesContext.jsx"; 

export default function Header() {
  const { moviesList } = useMovies();
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const [panelPos, setPanelPos] = useState({ top: 0, left: 0, width: 200 });

  useEffect(() => {
    if (!open || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const margin = 8;
    const top = rect.bottom + margin + window.scrollY;
    // keeps panel right-aligned
    const left = rect.right - panelPos.width + window.scrollX;
    setPanelPos({ top, left, width: panelPos.width });
  }, [open, panelPos.width]); 

  // close on outside click or Escape
  useEffect(() => {
    if (!open) return;

    function onDoc(event) {
      const panel = document.getElementById("header-popover-panel");
      if (!panel) return;
      if (!panel.contains(event.target) && !btnRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }
    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function handleNavigate() {
    setOpen(false);
  }

  const popover = open
    ? createPortal(
        <div
        id="header-popover-panel"
        role="menu"
        aria-label="Mobile navigation"
        style={{
          position: "absolute",
          top: `${panelPos.top}px`,
          left: `${Math.max(8, panelPos.left)}px`,
          width: `${panelPos.width}px`,
          zIndex: 9999,
        }}
        >
          <div className="bg-[#2e3c51]/95 border border-[#333] rounded-lg p-3 shadow-lg backdrop-blur-sm z-50">
            <Navigation vertical onNavigate={handleNavigate} />
          </div>
        </div>,
        document.body
      )
    : null;

  return (
  <header
    role="banner"
    className="
      w-full bg-linear-to-r from-[#2e3c51] to-[#111827]
      border-b border-[#333]
      shadow-[0_2px_4px_rgba(0,0,0,0.3)]
      text-[#e5e7f0]
    "
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-12">
      <div className="h-16 flex items-center justify-between gap-4">
        
        {/* logo */}
        <div className="flex items-center gap-1">
          <Link
            to="/"
            aria-label="Movie Guide home"
            className="
              inline-flex items-center gap-1 shrink-0
              no-underline transition-all duration-300
              hover:-translate-y-0.5 hover:brightness-110
            "
          >
            <PiFilmSlate className="w-7 h-7 text-[#f97316] shrink-0" />
            <span
              className="
                text-[20px] md:text-[26px] font-bold leading-none
                bg-linear-to-r from-[#eca22b] to-[#cc5d08]
                bg-clip-text text-transparent
              "
            >
              Movie Guide
            </span>
          </Link>
        </div>

        {/* desktop nav */}
        <nav
          aria-label="Main navigation"
          aria-hidden={open ? "true" : "false"}
          className="hidden md:flex md:flex-1 md:justify-center"
        >
          <Navigation />
        </nav>

        {/* random button + mobile menu */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center justify-center">
            <RandomMovieButtonFromList movies={moviesList} />
          </div>

          <button
            ref={btnRef}
            type="button"
            aria-expanded={open}
            aria-haspopup="menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((s) => !s)}
            className="
              inline-flex items-center justify-center p-2 rounded-md
              text-[#e5e7eb] md:hidden
              focus:outline-none focus:ring-2 focus:ring-[#ffb347] focus:ring-offset-2
            "
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
            </svg>
          </button>
        </div>

      </div>
    </div>

    {popover}
  </header>
);

}