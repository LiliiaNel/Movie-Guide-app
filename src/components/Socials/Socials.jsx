import { FaFacebook, FaTelegram, FaInstagram } from "react-icons/fa";

const base = " text-[1.8rem] transition-colors duration-300 ease-linear hover:text-[#ffb347]";

const socials = [
  { id: "facebook", href: "https://www.facebook.com/", Icon: FaFacebook, label: "Facebook" },
  { id: "telegram", href: "https://t.me/", Icon: FaTelegram, label: "Telegram" },
  { id: "instagram", href: "https://www.instagram.com/", Icon: FaInstagram, label: "Instagram" },
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
