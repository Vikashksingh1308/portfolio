"use client";

import { useAppSelector } from "@/store/hooks";
import { selectFilteredProjects } from "@/store/slices/projectsSlice";
import ProjectCard from "./ProjectCard";
import { AnimatePresence } from "framer-motion";

export default function ProjectGrid() {
  const projects = useAppSelector(selectFilteredProjects);

  if (projects.length === 0) {
    return (
      <div className="py-16 text-center text-muted text-sm">
        No projects match your filters.
      </div>
    );
  }

  return (
    <AnimatePresence mode="popLayout">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </AnimatePresence>
  );
}
