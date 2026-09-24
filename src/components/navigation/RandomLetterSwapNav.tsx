"use client";

import { RandomLetterSwap } from "@/components/ui/random-letter-swap";

const links = ["Home", "Work", "About", "Blog", "Contact"];

export default function RandomLetterSwapNav() {
  return (
    <div className="w-full shrink-0 z-40 bg-transparent">
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-7 pt-2 pb-3.5 sm:pb-4 flex items-center justify-start">
        <nav className="flex items-center gap-6 sm:gap-8">
          {links.map((link) => (
            <RandomLetterSwap
              className="cursor-pointer font-medium text-slate-400 text-sm hover:text-white transition-colors"
              key={link}
              label={link}
              staggerDuration={0.025}
              transition={{ duration: 0.6, type: "spring" }}
            />
          ))}
        </nav>
      </div>
    </div>
  );
}
