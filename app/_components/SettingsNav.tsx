"use client";

import { Palette, UserRound, Lock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsNav() {
  const pathName = usePathname(); // for setting active link

  const links = [
    { href: "/profile/settings", label: "Profile", icon: UserRound },
    { href: "/profile/settings/account", label: "Account", icon: Lock },
    { href: "/profile/settings/theme", label: "Theme", icon: Palette },
  ];
  return (
    <ul className="bg-bg flex flex-row justify-center gap-2 rounded-tl-lg rounded-tr-lg p-2 md:flex-col md:rounded-tr-none md:rounded-bl-lg md:p-5">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className={`hover:bg-bg-light flex cursor-pointer gap-2 rounded-md px-2 py-4 transition-colors md:px-8 ${
              pathName === link.href ? "bg-bg-light" : ""
            }`}
          >
            <link.icon />
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
