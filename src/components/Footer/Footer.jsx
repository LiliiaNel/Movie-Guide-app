import Socials from "../Socials/Socials";

export default function Footer() {
  const handleTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={
        "relative w-full 'bg-gradient-to-r' from-[#2e3c51] to-[#111827] " +
        "border-t border-[#333] shadow-[0_2px_4px_rgba(0,0,0,0.3)] text-[#f1f5f9] " +
        "px-6 py-6 sm:px-10 sm:py-8"
      }
      role="contentinfo"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-8 flex flex-col md:flex-row items-center md:items-center justify-center gap-4 md:gap-0">
        <div className="md:absolute md:left-8 md:top-1/2 md:-translate-y-1/2">
          <div className="hidden md:block">
            <Socials />
          </div>
          <div className="block md:hidden mb-2">
            <Socials />
          </div>
        </div>

        {/* center text */}
        <div className="flex-1 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Movie Guide
          </p>
          <p className="mt-1 text-xs text-[#cbd5e1]">
            Providing reliable movie info — built with ❤️
          </p>
        </div>

        <div className="md:absolute md:right-8 md:top-1/2 md:-translate-y-1/2">
          <button
            onClick={handleTop}
            aria-label="Back to top"
            className={
              "inline-flex items-center gap-2 px-3 py-1.5 rounded-sm text-[0.85rem] " +
              "border border-[#ffb347] text-[#ffb347] bg-transparent transition-all duration-200 " +
              "hover:bg-[#ffb347] hover:text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffb347]"
            }
          >
            ↑ Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}