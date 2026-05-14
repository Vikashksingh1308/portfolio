"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const GROUPS = [
  {
    label: "Platform Engineering",
    tags: [
      "Full-stack development",
      "System architecture",
      "API design & integration",
      "Platform scalability",
      "Infrastructure ownership",
    ],
  },
  {
    label: "Technical Stack",
    tags: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Java",
      "Spring Boot",
      "SQL",
      "HTML5",
      "CSS",
      "REST APIs",
      "Git",
      "AMPScript",
    ],
  },
  {
    label: "Data & Systems",
    tags: [
      "SQL",
      "Data modelling",
      "Data visualisation",
      "Automation workflows",
      "Metrics & reporting",
    ],
  },
  {
    label: "Engineering Practice",
    tags: [
      "Code reviews",
      "System design",
      "Documentation",
      "Testing",
      "Refactoring legacy systems",
      "Open source",
      "Cross-functional collaboration",
    ],
  },
];

export default function Competencies() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="competencies"
      className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-border"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-mono text-xs text-accent uppercase tracking-widest mb-8">
          Core Competencies
        </h2>
        <div className="grid sm:grid-cols-2 gap-8">
          {GROUPS.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: gi * 0.1, duration: 0.4 }}
            >
              <h3 className="text-xs font-mono text-muted mb-3 uppercase tracking-wide">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block text-xs px-2.5 py-1 rounded-md bg-surface-raised border border-border text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
