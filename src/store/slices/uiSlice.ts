"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  mobileNavOpen: boolean;
  commandPaletteOpen: boolean;
  activeFilterTags: string[];
  searchQuery: string;
}

const initialState: UiState = {
  mobileNavOpen: false,
  commandPaletteOpen: false,
  activeFilterTags: [],
  searchQuery: "",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMobileNavOpen(state, action: PayloadAction<boolean>) {
      state.mobileNavOpen = action.payload;
    },
    toggleMobileNav(state) {
      state.mobileNavOpen = !state.mobileNavOpen;
    },
    setCommandPaletteOpen(state, action: PayloadAction<boolean>) {
      state.commandPaletteOpen = action.payload;
    },
    toggleFilterTag(state, action: PayloadAction<string>) {
      const tag = action.payload;
      const idx = state.activeFilterTags.indexOf(tag);
      if (idx === -1) {
        state.activeFilterTags.push(tag);
      } else {
        state.activeFilterTags.splice(idx, 1);
      }
    },
    clearFilterTags(state) {
      state.activeFilterTags = [];
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setMobileNavOpen,
  toggleMobileNav,
  setCommandPaletteOpen,
  toggleFilterTag,
  clearFilterTags,
  setSearchQuery,
} = uiSlice.actions;

export default uiSlice.reducer;
