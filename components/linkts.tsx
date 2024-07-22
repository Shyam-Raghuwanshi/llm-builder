import type { IconType } from "react-icons";
import {
  FaDiscord,
  FaGear,
  FaGithub,
  FaHouse,
  FaLinkedin,
  FaQuestion,
  FaXTwitter,
} from "react-icons/fa6";

type LinkMetadata = {
  name: string;
  href: string;
  icon: IconType;
  className?: string;
};

export const PAGE_LINKS: LinkMetadata[] = [
  {
    name: "Home",
    href: "/",
    icon: FaHouse,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: FaGear,
    className: "transition-transform group-hover:rotate-90",
  },
];

export const SOCIAL_LINKS: LinkMetadata[] = [
  {
    name: "Github",
    href: "https://github.com/shyam-Raghuwanshi/",
    icon: FaGithub,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/shyam_raghuonec",
    icon: FaXTwitter,
  },
  {
    name: "Discord",
    href: "https://discord.gg/68Hsd5RE",
    icon: FaDiscord,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/shyam-raghuwanshi/",
    icon: FaLinkedin,
  },
];
