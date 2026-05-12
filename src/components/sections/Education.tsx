"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap } from "lucide-react";

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="education"
      className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-[var(--border)]"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest mb-8">
          Education
        </h2>
        <div className="flex gap-4 items-start">
          <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-[var(--surface)] border border-[var(--border)]">
            <GraduationCap size={16} className="text-[var(--accent)]" />
          </div>
          <div>
            <h3 className="font-semibold text-[var(--foreground)]">
              MSc Digital Marketing
            </h3>
            <p className="text-sm text-[var(--accent)] mt-0.5">
              National University of Ireland
              <span className="text-[var(--muted)]"> · Galway, Ireland</span>
            </p>
            <p className="font-mono text-xs text-[var(--muted)] mt-1">
              09/2018 – 12/2019
            </p>
            <p className="text-sm text-[var(--muted)] mt-2 max-w-lg">
              Postgraduate program combining marketing strategy, digital
              analytics, consumer behaviour, and data-driven campaign
              management.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
