"use client";

import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import type { Project } from "@/lib/projects";

interface ProjectsState {
  items: Project[];
  hydrated: boolean;
}

const initialState: ProjectsState = {
  items: [],
  hydrated: false,
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    hydrateProjects(state, action: PayloadAction<Project[]>) {
      if (!state.hydrated) {
        state.items = action.payload;
        state.hydrated = true;
      }
    },
  },
});

export const { hydrateProjects } = projectsSlice.actions;
export default projectsSlice.reducer;

// Selectors
const selectAllProjects = (state: RootState) => state.projects.items;
const selectActiveTags = (state: RootState) => state.ui.activeFilterTags;
const selectSearchQuery = (state: RootState) => state.ui.searchQuery;

export const selectFilteredProjects = createSelector(
  [selectAllProjects, selectActiveTags, selectSearchQuery],
  (projects, tags, query) => {
    let filtered = projects;
    if (tags.length > 0) {
      filtered = filtered.filter((p) =>
        tags.every((t) => p.tech.includes(t))
      );
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return filtered;
  }
);
