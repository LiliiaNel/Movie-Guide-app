import { FaGithub, FaTelegram,  FaLinkedin  } from "react-icons/fa";

const base = " text-[1.8rem] transition-colors duration-300 ease-linear hover:text-[#ffb347]";

const socials = [
  { id: "github", href: "https://github.com/LiliiaNel/Movie-Guide-app", Icon: FaGithub, label: "GitHub" },
  { id: "telegram", href: "https://t.me/lilisziv", Icon: FaTelegram, label: "Telegram" },
  { id: "linkedin", href: "https://www.linkedin.com/in/liliia-szivak/", Icon: FaLinkedin, label: "LinkedIn" },
];

export default function Socials() {
  return (
    <ul className="flex gap-5 list-none p-0 m-0">
      {socials.map(({ id, href, Icon, label }) => {
        return (
        <li key={id}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={base}
          >
            <Icon className="w-6 h-6 fill-[#f97316] hover:fill-[#ffb347]" />
          </a>
        </li>
      )})}
    </ul>
  );
}
