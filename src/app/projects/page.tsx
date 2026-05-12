import type { Metadata } from "next";
import ProjectFilters from "@/components/projects/ProjectFilters";
import ProjectGrid from "@/components/projects/ProjectGrid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of projects by Vikash Kumar Singh — Java, React, Spring Boot, and more.",
};

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-[var(--muted)] text-sm mt-2">
          A mix of professional demos, open-source contributions, and personal
          builds.
        </p>
      </div>
      <ProjectFilters />
      <ProjectGrid />
    </div>
  );
}
