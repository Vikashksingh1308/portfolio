import { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, GitMerge, GitPullRequest, Circle } from "lucide-react";
import { getOpenSourceContributions } from "@/lib/github";
import type { GitHubPR } from "@/types";

export const metadata: Metadata = {
  title: "Open Source",
  description:
    "Open source contributions by Vikash Kumar Singh - PRs, bug fixes, and documentation.",
};

function PrState({ pr }: { pr: GitHubPR }) {
  const merged = pr.pull_request?.merged_at;
  if (merged)
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400">
        <GitMerge size={10} /> Merged
      </span>
    );
  if (pr.state === "open")
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border border-accent/30 bg-accent/10 text-accent">
        <Circle size={10} /> Open
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border border-border bg-surface-raised text-muted">
      <GitPullRequest size={10} /> Closed
    </span>
  );
}

function repoName(url: string) {
  return url.replace("https://api.github.com/repos/", "").split("/").slice(0, 2).join("/");
}

export default async function OpenSourcePage() {
  const data = await getOpenSourceContributions();
  const prs: GitHubPR[] = data?.items ?? [];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Open Source</h1>
        <p className="text-muted text-sm mt-2 max-w-xl leading-relaxed">
          Active contributor to public repositories - security documentation
          improvements, bug fixes, and feature additions. I enjoy reading
          unfamiliar codebases, finding issues, and collaborating with
          distributed engineering teams on real-world projects.
        </p>
      </div>

      {prs.length === 0 ? (
        <div className="rounded-lg border border-border bg-surface p-10 text-center">
          <GitPullRequest size={24} className="mx-auto text-muted mb-3" />
          <p className="text-sm text-muted">
            Contribution data unavailable right now - GitHub API may be rate
            limited.
          </p>
          <Link
            href="https://github.com/Vikashksingh1308"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-accent mt-3 hover:underline"
          >
            View GitHub profile <ExternalLink size={12} />
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {prs.map((pr) => (
            <div
              key={pr.id}
              className="rounded-lg border border-border bg-surface p-4 flex items-start gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-muted truncate">
                    {repoName(pr.repository_url)}
                  </span>
                  <PrState pr={pr} />
                </div>
                <Link
                  href={pr.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-foreground hover:text-accent transition-colors line-clamp-2"
                >
                  {pr.title}
                </Link>
                <p className="font-mono text-xs text-muted mt-1">
                  {new Date(pr.created_at).toLocaleDateString("en-IE", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <Link
                href={pr.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-muted hover:text-accent transition-colors"
                aria-label="View PR"
              >
                <ExternalLink size={14} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
