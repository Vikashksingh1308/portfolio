"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, ArrowRight, MapPin } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

export default function Hero() {
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
      <motion.div
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Location badge */}
        <motion.div custom={0} variants={fadeUp}>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--muted)] border border-[var(--border)] rounded-full px-3 py-1">
            <MapPin size={11} className="text-[var(--accent)]" />
            Dublin, Ireland
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
        >
          Vikash Kumar Singh
        </motion.h1>

        {/* Title */}
        <motion.p
          custom={2}
          variants={fadeUp}
          className="font-mono text-sm sm:text-base text-[var(--accent)]"
        >
          Software Engineer · Platform &amp; Full-Stack
        </motion.p>

        {/* Tagline */}
        <motion.p
          custom={3}
          variants={fadeUp}
          className="text-[var(--muted)] text-lg max-w-xl leading-relaxed"
        >
          MarTech Developer by day, aspiring Backend Engineer by night.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={4}
          variants={fadeUp}
          className="flex flex-wrap gap-3 pt-2"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-[var(--accent)] text-white hover:bg-[var(--accent-muted)] transition-colors"
          >
            View projects <ArrowRight size={14} />
          </Link>
          <Link
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            <Download size={14} /> Download CV
          </Link>
          <Link
            href="https://github.com/Vikashksingh1308"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-[var(--border)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
          >
            <Github size={16} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/ksinghvikash"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-[var(--border)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
          >
            <Linkedin size={16} />
          </Link>
          <Link
            href="mailto:vikashksingh1308@gmail.com"
            aria-label="Email"
            className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-[var(--border)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
          >
            <Mail size={16} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
