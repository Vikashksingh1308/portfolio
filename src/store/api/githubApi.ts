"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GitHubRepo } from "@/types";

export const githubApi = createApi({
  reducerPath: "githubApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getGithubRepos: builder.query<GitHubRepo[], void>({
      query: () => "github",
    }),
  }),
});

export const { useGetGithubReposQuery } = githubApi;
