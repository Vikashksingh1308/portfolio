import { notFound } from "next/navigation";
import Link from "next/link";
import { Github, Star, GitFork, Clock, ArrowLeft } from "lucide-react";
import { getProjectBySlug, PROJECTS } from "@/lib/projects";
import { getRepoDetails } from "@/lib/github";
import type { Metadata } from "next";
import ViewTracker from "./ViewTracker";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { repoData, readmeText } = await getRepoDetails(project.githubRepo);

  const pushedAt = repoData?.pushed_at
    ? new Date(repoData.pushed_at).toLocaleDateString("en-IE", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <ViewTracker slug={slug} />
      {/* Back */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors mb-8"
      >
        <ArrowLeft size={14} /> All projects
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
        <p className="text-[var(--muted)] mt-2 leading-relaxed">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2.5 py-1 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* GitHub stats */}
        {repoData && (
          <div className="flex flex-wrap items-center gap-4 mt-5">
            <Link
              href={repoData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors border border-[var(--border)] px-3 py-1.5 rounded-md"
            >
              <Github size={14} /> View on GitHub
            </Link>
            {repoData.stargazers_count > 0 && (
              <span className="inline-flex items-center gap-1 text-xs text-[var(--muted)]">
                <Star size={12} /> {repoData.stargazers_count}
              </span>
            )}
            {repoData.forks_count > 0 && (
              <span className="inline-flex items-center gap-1 text-xs text-[var(--muted)]">
                <GitFork size={12} /> {repoData.forks_count}
              </span>
            )}
            {pushedAt && (
              <span className="inline-flex items-center gap-1 text-xs text-[var(--muted)]">
                <Clock size={12} /> Last push: {pushedAt}
              </span>
            )}
          </div>
        )}
      </div>

      {/* README */}
      {readmeText ? (
        <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none">
          <pre className="whitespace-pre-wrap text-sm text-[var(--muted)] leading-relaxed font-mono bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6 overflow-auto">
            {readmeText}
          </pre>
        </div>
      ) : (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-sm text-[var(--muted)]">
          No README available for this project.
        </div>
      )}
    </div>
  );
}
