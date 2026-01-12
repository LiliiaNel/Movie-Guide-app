import Socials from "../Socials/Socials";

export default function Footer() {

  return (
    <footer
      className="w-full bg-linear-to-r from-[#2e3c51] to-[#111827]
                 border-t border-[#333] text-[#f1f5f9] shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
      role="contentinfo"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6
                      flex flex-col md:flex-row items-center md:items-center
                      md:justify-between gap-4">
        <div className="w-full md:w-auto flex justify-center md:justify-start">
          <Socials />
        </div>

        <div className="w-full md:flex-1 text-center">
          <p className="text-sm">© {new Date().getFullYear()} Movie Guide</p>
          <p className="mt-1 text-xs text-[#cbd5e1]">Providing reliable movie info — built with ❤️</p>
        </div>
      </div>
    </footer>
  );
}
