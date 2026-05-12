"use client";

import Link from "next/link";
import { Github, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="group flex flex-col rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 hover:border-[var(--accent)] transition-colors"
    >
      <div className="flex-1">
        <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2 py-0.5 rounded bg-[var(--surface-raised)] border border-[var(--border)] text-[var(--muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[var(--border)]">
        <Link
          href={`https://github.com/Vikashksingh1308/${project.githubRepo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <Github size={13} /> GitHub
        </Link>
        <Link
          href={`/projects/${project.slug}`}
          className="ml-auto inline-flex items-center gap-1 text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          Details <ArrowRight size={12} />
        </Link>
      </div>
    </motion.div>
  );
}
