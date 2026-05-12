export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  pushed_at: string;
  topics: string[];
}

export interface GitHubPR {
  id: number;
  number: number;
  title: string;
  html_url: string;
  state: "open" | "closed";
  pull_request?: {
    merged_at: string | null;
  };
  created_at: string;
  repository_url: string;
}

export type Theme = "light" | "dark" | "system";

export interface UpcomingProject {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  status: "Planning" | "In progress" | "Beta";
}
