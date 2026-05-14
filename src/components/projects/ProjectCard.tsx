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
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="group flex flex-col rounded-lg border border-border bg-surface p-5 hover:border-accent transition-colors"
    >
      <div className="flex-1">
        <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted mt-2 leading-relaxed line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2 py-0.5 rounded bg-surface-raised border border-border text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
        <Link
          href={`https://github.com/Vikashksingh1308/${project.githubRepo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <Github size={13} /> GitHub
        </Link>
        <Link
          href={`/projects/${project.slug}`}
          className="ml-auto inline-flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors"
        >
          Details <ArrowRight size={12} />
        </Link>
      </div>
    </motion.div>
  );
}
