import Socials from "../Socials/Socials";
import { MdOutlineMail } from "react-icons/md";

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

        <div className="text-center md:text-center flex-1 flex flex-col justify-center">
          <p className="text-sm mb-1">© {new Date().getFullYear()} Movie Guide</p>
          <p className="text-xs text-[#cbd5e1]">Providing reliable movie info — built with ❤️</p>
        </div>

        <div className="flex flex-col justify-center md:justify-end items-center md:items-end text-xs gap-1">
          <p className="m-0">Questions or feedback?</p>
          <a
            href="mailto:liliiaszivak@gmail.com"
            className="flex items-center gap-1 text-[#ffb347] hover:text-[#f97316] hover:underline transition-colors duration-300"
          >
            <MdOutlineMail className="w-4 h-4" /> Drop me a line 
          </a>
        </div>
      </div>
    </footer>
  );
}
