import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { PiFilmSlate } from "react-icons/pi";
import Navigation from "../Navigation/Navigation";
import { Styles } from "./header.styles.js";
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
  }, [open]); 

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
          <div className={Styles.popoverPanel}>
            <Navigation vertical onNavigate={handleNavigate} />
          </div>
        </div>,
        document.body
      )
    : null;

  return (
      <header className={Styles.header} role="banner">
        <div className={Styles.container}>
          <div className={Styles.inner}>
            <div className={Styles.leftCell}>
              <Link to="/" className={Styles.logoLink} aria-label="Movie Guide home">
                <PiFilmSlate className={Styles.logoIcon} />
                <span className={Styles.logoText}>Movie Guide</span>
              </Link>
            </div>

            <nav className={Styles.navDesktop} aria-label="Main navigation" aria-hidden={open ? "true" : "false"}>
              <Navigation />
            </nav>

            {/* randomMovies button + mobile menu */}
            <div className={Styles.rightCell}>
              <div className={Styles.randomWrapper}>
                <RandomMovieButtonFromList movies={moviesList} />
              </div>

              <button
                ref={btnRef}
                type="button"
                aria-expanded={open}
                aria-haspopup="menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className={Styles.moreButton}
                onClick={() => setOpen((s) => !s)}
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