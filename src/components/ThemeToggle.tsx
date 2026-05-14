"use client";

import { Moon, Sun } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleTheme } from "@/store/slices/themeSlice";
import { cn } from "@/lib/cn";

export default function ThemeToggle({ className }: { className?: string }) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.theme.theme);
  const isDark = theme === "dark" || theme === "system";

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
      className={cn(
        "inline-flex items-center justify-center w-9 h-9 rounded-md",
        "border border-border text-muted",
        "hover:text-foreground hover:border-muted transition-colors",
        className
      )}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
