"use client";

import { useState } from "react";
import { Send, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

interface FormState {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "rate-limited">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.status === 429) {
        setStatus("rate-limited");
        return;
      }
      if (!res.ok) {
        const d = await res.json();
        setErrorMsg(d.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Get in touch</h1>
        <p className="text-[var(--muted)] text-sm mt-2">
          Open to new opportunities, collaborations, and interesting
          conversations.
        </p>
      </div>

      {/* Social links */}
      <div className="flex gap-4 mb-10">
        <Link
          href="https://github.com/Vikashksingh1308"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          <Github size={15} /> GitHub
        </Link>
        <Link
          href="https://www.linkedin.com/in/ksinghvikash"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          <Linkedin size={15} /> LinkedIn
        </Link>
        <Link
          href="mailto:vikashksingh1308@gmail.com"
          className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          <Mail size={15} /> Email
        </Link>
      </div>

      {status === "success" ? (
        <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5 p-6 text-center">
          <p className="font-semibold text-[var(--accent)] mb-1">Message sent!</p>
          <p className="text-sm text-[var(--muted)]">
            I&apos;ll get back to you soon.
          </p>
        </div>
      ) : status === "rate-limited" ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 text-center">
          <p className="text-sm text-[var(--muted)]">
            You&apos;ve reached the message limit for this session. Please try
            again later or email me directly at{" "}
            <Link
              href="mailto:vikashksingh1308@gmail.com"
              className="text-[var(--accent)] hover:underline"
            >
              vikashksingh1308@gmail.com
            </Link>
            .
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-xs font-mono text-[var(--muted)] mb-1.5">
              Name
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full px-3 py-2 text-sm bg-[var(--surface)] border border-[var(--border)] rounded-md text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-[var(--muted)] mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full px-3 py-2 text-sm bg-[var(--surface)] border border-[var(--border)] rounded-md text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-[var(--muted)] mb-1.5">
              Message
            </label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) =>
                setForm((f) => ({ ...f, message: e.target.value }))
              }
              className="w-full px-3 py-2 text-sm bg-[var(--surface)] border border-[var(--border)] rounded-md text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
              placeholder="What's on your mind?"
            />
          </div>

          {status === "error" && errorMsg && (
            <p className="text-xs text-red-400">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-md bg-[var(--accent)] text-white hover:bg-[var(--accent-muted)] transition-colors disabled:opacity-60"
          >
            {status === "loading" ? "Sending…" : <><Send size={14} /> Send message</>}
          </button>
        </form>
      )}
    </div>
  );
}
