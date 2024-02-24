"use client";

import { SunIcon, MoonIcon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ColorModeSwitchButton() {
  const { setTheme } = useTheme();

  return (
    <div className="p-1">
      <SunIcon
        onClick={() => setTheme("light")}
        className="hover:cursor-pointer text-yellow-100 absolute h-[1.4rem] w-[1.4rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 drop-shadow-[0px_9px_7px_#FFE87C]"
      />
      <MoonIcon
        onClick={() => setTheme("dark")}
        className="hover:cursor-pointer text-zinc-400 h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 drop-shadow-[0px_13px_15px_#1F2937]"
      />
    </div>
  );
}