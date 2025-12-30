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
    <ul className="flex flex-col gap-2 p-5 bg-background-secondary rounded-tl-lg rounded-bl-lg">
      {links.map((link) => (
        <li>
          <Link
            href={link.href}
            className={`flex gap-2 hover:bg-utell-laccent cursor-pointer rounded-md transition-colors py-4 px-8 ${
              pathName === link.href ? "bg-utell-laccent" : ""
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
