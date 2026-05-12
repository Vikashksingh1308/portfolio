"use client";

import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import themeReducer from "./slices/themeSlice";
import projectsReducer from "./slices/projectsSlice";
import { githubApi } from "./api/githubApi";

export const makeStore = () =>
  configureStore({
    reducer: {
      ui: uiReducer,
      theme: themeReducer,
      projects: projectsReducer,
      [githubApi.reducerPath]: githubApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(githubApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
