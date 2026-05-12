"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/store";
import { hydrateProjects } from "@/store/slices/projectsSlice";
import { setTheme } from "@/store/slices/themeSlice";
import type { Project } from "@/lib/projects";
import type { Theme } from "@/types";

interface StoreProviderProps {
  children: React.ReactNode;
  initialProjects?: Project[];
  initialTheme?: Theme;
}

export default function StoreProvider({
  children,
  initialProjects,
  initialTheme,
}: StoreProviderProps) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    if (initialProjects) {
      storeRef.current.dispatch(hydrateProjects(initialProjects));
    }
    if (initialTheme) {
      storeRef.current.dispatch(setTheme(initialTheme));
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
