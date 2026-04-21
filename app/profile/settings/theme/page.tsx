"use client";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export default function page() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  function handleThemeChange(e) {
    setTheme(e.target.value);
    router.refresh(); // refresh to apply theme immediately
  }

  return (
    <div className="flex flex-col gap-2">
      <p>Theme</p>
      <select
        className="p-2 border-2 border-background-accent-light rounded-lg"
        value={theme}
        onChange={handleThemeChange}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
      <hr className="border-0 h-0.5 bg-background-accent-light" />
    </div>
  );
}
