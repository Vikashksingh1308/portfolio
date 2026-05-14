"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase } from "lucide-react";

interface Role {
  company: string;
  title: string;
  location: string;
  period: string;
  current?: boolean;
  bullets: string[];
}

const EXPERIENCE: Role[] = [
  {
    company: "CarTrawler",
    title: "Marketing Technology Developer",
    location: "Dublin, Ireland",
    period: "06/2021 – Present",
    current: true,
    bullets: [
      "Platform engineer & SME for Salesforce Marketing Cloud, owning end-to-end design, architecture, and optimization across 150+ airline partner integrations serving millions of users.",
      "Architected a standardized development framework enforcing consistent design patterns platform-wide - achieved 40% reduction in development time and significantly improved maintainability.",
      "Designed and implemented REST API integrations between platform APIs and core product systems, enabling personalized experiences and real-time data synchronization.",
      "Built CRM automation workflows in SQL and JavaScript that drove a 14% increase in insurance booking volume.",
      "Led end-to-end delivery of 22+ marketing email products and optimized 9 service email products across 110+ partners using HTML, CSS, AMPScript, SQL and REST APIs.",
      "Orchestrated GDPR-compliant data model enhancements for customer subscription management.",
      "Configured SPF and DMARC authentication infrastructure from scratch, resolved deliverability issues and protected sending reputation.",
      "Implemented strategic processes that contributed to a 10% NPS improvement and growth in gross car bookings.",
    ],
  },
  {
    company: "Physio Needs Ltd.",
    title: "Software Engineer",
    location: "Dublin, Ireland",
    period: "09/2019 – 05/2021",
    bullets: [
      "Developed and optimized search components using React, elevating user search experience and product discoverability.",
      "Revamped product components for enhanced visual appeal and functionality; built a quick price filter for efficient user experience.",
      "Designed and implemented reusable UI code and interfaces, improving development efficiency and code maintainability.",
      "Identified and debugged inefficient code; conducted regression testing and code quality reviews across multiple release cycles.",
    ],
  },
  {
    company: "VKC Group",
    title: "Junior Software Engineer",
    location: "Vapi, India",
    period: "04/2017 – 05/2018",
    bullets: [
      "Developed and maintained the company website with a focus on responsive design and seamless frontend↔backend integration.",
      "Designated internal SME for the data analysis team - delivered knowledge transfer sessions and technical onboarding for new members.",
      "Collaborated with cross-functional teams to deliver integrated solutions aligned with business objectives.",
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="experience"
      className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-border"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-mono text-xs text-accent uppercase tracking-widest mb-10">
          Experience
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3.5 top-2 bottom-2 w-px bg-[var(--border)] hidden sm:block" />

          <div className="space-y-12">
            {EXPERIENCE.map((role, i) => (
              <motion.div
                key={`${role.company}-${role.period}`}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.45 }}
                className="sm:pl-10 relative"
              >
                {/* Timeline dot */}
                <div className="hidden sm:flex absolute left-0 top-1 w-7 h-7 items-center justify-center rounded-full bg-surface border border-border">
                  <Briefcase size={12} className="text-accent" />
                </div>

                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {role.title}
                    </h3>
                    <p className="text-sm text-accent mt-0.5">
                      {role.company}
                      <span className="text-muted">
                        {" "}· {role.location}
                      </span>
                    </p>
                  </div>
                  <span className="font-mono text-xs text-muted border border-border px-2 py-0.5 rounded-full whitespace-nowrap">
                    {role.period}
                    {role.current && (
                      <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-accent align-middle" />
                    )}
                  </span>
                </div>

                <ul className="space-y-1.5">
                  {role.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="flex gap-2 text-sm text-muted leading-relaxed"
                    >
                      <span className="mt-2 shrink-0 w-1 h-1 rounded-full bg-[var(--border)]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
