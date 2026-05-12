"use client";

import { useEffect } from "react";
import { setCookie } from "cookies-next";
import { useAppSelector } from "@/store/hooks";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useAppSelector((s) => s.theme.theme);

  useEffect(() => {
    const resolved = theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

    document.documentElement.setAttribute("data-theme", resolved);
    setCookie("theme", theme, { maxAge: 60 * 60 * 24 * 365 });
  }, [theme]);

  return <>{children}</>;
}
