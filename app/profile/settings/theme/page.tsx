"use client";

import { ChevronDown, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function page() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold">Theme</p>

      <div
        className="flex justify-between border-2 rounded-md p-4 border-bg hover:bg-bg max-w-56 transition-all cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="flex gap-2">
          {theme === "light" ? (
            <Sun color="#fcbf49" />
          ) : (
            <Moon color="#57afe6" />
          )}
          <span>{theme === "light" ? "Light" : "Dark"}</span>
        </div>
        <ChevronDown color="var(--bg-dark)" />
      </div>

      <ul
        className={`flex-col justify-between border-2 rounded-md p-2 border-bg max-w-56 cursor-pointer relative ${isDropdownOpen ? "block" : "hidden"}`}
      >
        <li
          className="flex gap-2 p-2 hover:bg-bg transition-all rounded-sm"
          onClick={() => {
            setTheme("light");
            setIsDropdownOpen(false);
            router.refresh;
          }}
        >
          <Sun color="#fcbf49" />
          <span>Light</span>
        </li>
        <li
          className="flex gap-2 p-2 hover:bg-bg transition-all rounded-sm"
          onClick={() => {
            setTheme("dark");
            setIsDropdownOpen(false);
            router.refresh();
          }}
        >
          <Moon color="#49b7fc" />
          <span>Dark</span>
        </li>
      </ul>
    </div>
  );
}
