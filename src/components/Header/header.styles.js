export const Styles = {
  header:
    "w-full bg-gradient-to-r from-[#2e3c51] to-[#111827] border-b border-[#333] " +
    "shadow-[0_2px_4px_rgba(0,0,0,0.3)] text-[#e5e7f0]",

  container: "container mx-auto px-4 sm:px-6 lg:px-12",
  inner: "h-[64px] flex items-center justify-between gap-4",

  // logo 
  leftCell: "flex items-center gap-3",
  logoLink: "inline-flex items-center gap-3 no-underline flex-shrink-0 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110",
  logoIcon: "w-[38px] h-[38px] text-[#f97316] flex-shrink-0",
  logoText:
    "text-[20px] md:text-[26px] font-bold bg-gradient-to-r from-[#eca22b] to-[#cc5d08] " +
    "bg-clip-text text-transparent leading-none",

  // nav
  navDesktop: "hidden md:flex md:flex-1 md:justify-center",

  // random button + menu
  rightCell: "flex items-center gap-3",
  randomWrapper: "inline-flex items-center justify-center",
  moreButton:
    "inline-flex items-center justify-center p-2 rounded-md text-[#e5e7eb] md:hidden " +
    "focus:outline-none focus:ring-2 focus:ring-[#ffb347] focus:ring-offset-2",
  popoverPanel:
    "bg-[#0b1320]/95 border border-[#222] rounded-lg p-3 shadow-lg backdrop-blur-sm " +
    "z-50",
};

