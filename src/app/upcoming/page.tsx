"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Zap, FlaskConical } from "lucide-react";
import type { Metadata } from "next";
import type { UpcomingProject } from "@/types";

// Note: metadata export can't be used in client component files.
// For a real app extract to a server component wrapper. Here it's inline.

const UPCOMING: UpcomingProject[] = [
  {
    slug: "distributed-url-shortener",
    title: "Distributed URL Shortener",
    description:
      "A horizontally scalable URL shortener service with Redis caching, Postgres persistence, and a Spring Boot REST API. Designed for high read throughput with consistent hashing for routing.",
    tech: ["Java", "Spring Boot", "Redis", "Postgres", "REST APIs"],
    status: "In progress",
  },
  {
    slug: "personal-finance-tracker",
    title: "Personal Finance Tracker API",
    description:
      "A secure REST API for personal finance tracking — accounts, transactions, budgets, and reports. JWT auth, role-based access, and OpenAPI documentation.",
    tech: ["Java", "Spring Boot", "JWT", "SQL", "REST APIs"],
    status: "Planning",
  },
  {
    slug: "event-driven-order-service",
    title: "Event-Driven Order Service",
    description:
      "Microservice order processing with Kafka event streaming, demonstrating saga pattern, dead-letter queues, and idempotent consumers in a Spring Boot ecosystem.",
    tech: ["Java", "Spring Boot", "Kafka", "SQL"],
    status: "Planning",
  },
  {
    slug: "sfmc-cli",
    title: "TypeScript CLI for SFMC Bulk Ops",
    description:
      "A command-line tool for automating bulk operations in Salesforce Marketing Cloud — data extension management, deployment workflows, and audit tooling.",
    tech: ["TypeScript", "Node.js", "REST APIs", "AMPScript"],
    status: "Planning",
  },
];

const STATUS_CONFIG = {
  "In progress": {
    icon: Zap,
    color: "text-[var(--accent)] border-[var(--accent)] bg-[var(--accent)]/10",
  },
  Planning: {
    icon: Clock,
    color: "text-[var(--muted)] border-[var(--border)] bg-[var(--surface-raised)]",
  },
  Beta: {
    icon: FlaskConical,
    color: "text-amber-500 border-amber-500/30 bg-amber-500/10",
  },
};

export default function UpcomingPage() {
  const [notified, setNotified] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const notify = async (slug: string, title: string) => {
    setLoading((l) => ({ ...l, [slug]: true }));
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Visitor",
          email: "interest@portfolio",
          message: `Interested in: ${title}`,
          subject: `interest:${slug}`,
        }),
      });
      setNotified((n) => ({ ...n, [slug]: true }));
    } finally {
      setLoading((l) => ({ ...l, [slug]: false }));
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Upcoming</h1>
        <p className="text-[var(--muted)] text-sm mt-2">
          Projects in the pipeline — backend systems, distributed architectures,
          and developer tooling.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {UPCOMING.map((project, i) => {
          const cfg = STATUS_CONFIG[project.status];
          const Icon = cfg.icon;

          return (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex flex-col rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-semibold text-[var(--foreground)]">
                  {project.title}
                </h3>
                <span
                  className={`shrink-0 inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded-full border ${cfg.color}`}
                >
                  <Icon size={10} />
                  {project.status}
                </span>
              </div>

              <p className="text-sm text-[var(--muted)] leading-relaxed flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2 py-0.5 rounded bg-[var(--surface-raised)] border border-[var(--border)] text-[var(--muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => notify(project.slug, project.title)}
                disabled={notified[project.slug] || loading[project.slug]}
                className="mt-4 text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors disabled:opacity-50 text-left"
              >
                {notified[project.slug]
                  ? "✓ You'll be notified"
                  : loading[project.slug]
                  ? "Sending…"
                  : "Notify me when live →"}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
