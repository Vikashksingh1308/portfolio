"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="about"
      className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-[var(--border)]"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest mb-6">
          About
        </h2>
        <div className="space-y-4 text-[var(--muted)] leading-relaxed max-w-2xl">
          <p>
            I&apos;m a software engineer with 6+ years of experience building
            scalable platforms, APIs, and full-stack applications. Most of my
            career has been in MarTech — owning end-to-end design, architecture,
            and optimization of a Salesforce Marketing Cloud platform that serves
            millions of users across 150+ airline partner integrations.
          </p>
          <p>
            I care about platform architecture, API design, and the kind of
            database and system design work that keeps things running reliably at
            scale. I&apos;ve built automation frameworks, integrated REST APIs
            across complex partner networks, enforced GDPR-compliant data
            governance, and refactored legacy systems to be maintainable long
            term.
          </p>
          <p>
            Outside of work I&apos;m an active open source contributor,
            currently leaning further into backend engineering with Java and
            Spring Boot — building distributed systems, event-driven
            architectures, and APIs that go well beyond what a single SaaS
            platform needs.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
