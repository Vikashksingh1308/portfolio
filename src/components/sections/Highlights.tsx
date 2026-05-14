"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  value: string;
  suffix?: string;
  label: string;
}

const STATS: Stat[] = [
  { value: "6", suffix: "+ yrs", label: "Engineering experience" },
  { value: "150", suffix: "+", label: "Airline partner integrations" },
  { value: "22", suffix: "+", label: "Email products delivered" },
  { value: "60", suffix: "%", label: "Dev time reduction" },
  { value: "14", suffix: "%", label: "Insurance booking uplift" },
  { value: "10", suffix: "%", label: "NPS improvement" },
];

function Counter({ target, suffix }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const step = target / steps;
    let current = 0;

    ref.current = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(ref.current!);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(ref.current!);
  }, [target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Highlights() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="py-12 px-4 sm:px-6 border-y border-border bg-surface"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            className="text-center"
          >
            <div className="font-mono text-2xl sm:text-3xl font-bold text-accent">
              {inView ? (
                <Counter
                  target={parseInt(stat.value)}
                  suffix={stat.suffix}
                />
              ) : (
                <span>0{stat.suffix}</span>
              )}
            </div>
            <p className="text-xs text-muted mt-1 leading-snug">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
