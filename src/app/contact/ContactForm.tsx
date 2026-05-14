"use client";

import { useState } from "react";
import { Send, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

interface FormState {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
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

      if (res.status === 429) { setStatus("rate-limited"); return; }
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
        <p className="text-muted text-sm mt-2">
          Open to new opportunities, collaborations, and interesting conversations.
        </p>
      </div>

      <div className="flex gap-4 mb-10">
        <Link href="https://github.com/Vikashksingh1308" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors">
          <Github size={15} /> GitHub
        </Link>
        <Link href="https://www.linkedin.com/in/ksinghvikash" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors">
          <Linkedin size={15} /> LinkedIn
        </Link>
        <Link href="mailto:vikashksingh1308@gmail.com"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors">
          <Mail size={15} /> Email
        </Link>
      </div>

      {status === "success" ? (
        <div className="rounded-lg border border-accent/30 bg-accent/5 p-6 text-center">
          <p className="font-semibold text-accent mb-1">Message sent!</p>
          <p className="text-sm text-muted">I&apos;ll get back to you soon.</p>
        </div>
      ) : status === "rate-limited" ? (
        <div className="rounded-lg border border-border bg-surface p-6 text-center">
          <p className="text-sm text-muted">
            You&apos;ve reached the message limit for this session. Email me directly at{" "}
            <Link href="mailto:vikashksingh1308@gmail.com" className="text-accent hover:underline">
              vikashksingh1308@gmail.com
            </Link>.
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-xs font-mono text-muted mb-1.5">Name</label>
            <input type="text" required value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full px-3 py-2 text-sm bg-surface border border-border rounded-md text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
              placeholder="Your name" />
          </div>
          <div>
            <label className="block text-xs font-mono text-muted mb-1.5">Email</label>
            <input type="email" required value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full px-3 py-2 text-sm bg-surface border border-border rounded-md text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
              placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-xs font-mono text-muted mb-1.5">Message</label>
            <textarea required rows={5} value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="w-full px-3 py-2 text-sm bg-surface border border-border rounded-md text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-none"
              placeholder="What's on your mind?" />
          </div>

          {status === "error" && errorMsg && (
            <p className="text-xs text-red-400">{errorMsg}</p>
          )}

          <button type="submit" disabled={status === "loading"}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-md bg-accent text-white hover:bg-accent-muted transition-colors disabled:opacity-60">
            {status === "loading" ? "Sending…" : <><Send size={14} /> Send message</>}
          </button>
        </form>
      )}
    </div>
  );
}
