import clsx from "clsx";
import { NavLink } from "react-router-dom";

const Styles = {
  wrapper: "flex-shrink-0",
  navBaseRow: "flex gap-8 items-center justify-center",
  navBaseCol: "flex flex-col gap-3 items-start",
  linkBase:
    "text-[#e5e7eb] text-[19px] transition-colors duration-300 hover:text-[#ffb347]",
  active: "text-[#f97316] font-bold",
};

export default function Navigation({ vertical = false, onNavigate }) {
  const navBase = vertical ? Styles.navBaseCol : Styles.navBaseRow;

  const buildLinkClass = ({ isActive }) =>
    clsx(Styles.linkBase, isActive && Styles.active);

  return (
    <div className={Styles.wrapper}>
      <nav className={navBase} aria-label="Main navigation">
        <NavLink to="/" className={buildLinkClass} onClick={onNavigate}>
          Home
        </NavLink>

        <NavLink to="/movies" className={buildLinkClass} onClick={onNavigate}>
          Movies
        </NavLink>
      </nav>
    </div>
  );
}
