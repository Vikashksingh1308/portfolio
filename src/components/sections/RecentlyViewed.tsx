import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROJECTS } from "@/lib/projects";

interface RecentlyViewedProps {
  slugs: string[];
}

export default function RecentlyViewed({ slugs }: RecentlyViewedProps) {
  if (slugs.length === 0) return null;

  const projects = slugs
    .map((s) => PROJECTS.find((p) => p.slug === s))
    .filter(Boolean);

  if (projects.length === 0) return null;

  return (
    <section className="py-12 px-4 sm:px-6 max-w-5xl mx-auto border-t border-border">
      <h2 className="font-mono text-xs text-accent uppercase tracking-widest mb-6">
        Recently Viewed
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
        {projects.map((project) => (
          <Link
            key={project!.slug}
            href={`/projects/${project!.slug}`}
            className="shrink-0 flex items-center gap-3 px-4 py-3 rounded-lg border border-border bg-surface hover:border-accent transition-colors group"
          >
            <div>
              <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                {project!.title}
              </p>
              <p className="text-xs text-muted mt-0.5">
                {project!.tech.slice(0, 2).join(" · ")}
              </p>
            </div>
            <ArrowRight
              size={14}
              className="text-muted group-hover:text-accent transition-colors"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
