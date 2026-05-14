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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    // Honeypot — if a bot filled this, pretend it succeeded and bail
    const formEl = e.currentTarget;
    const botField = formEl.elements.namedItem("botcheck") as HTMLInputElement | null;
    if (botField?.value) {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setErrorMsg("Form is not configured. Please email me directly.");
      setStatus("error");
      return;
    }

    const payload = {
      access_key: accessKey,
      subject: `New portfolio message from ${form.name}`,
      from_name: "Portfolio Contact Form",
      name: form.name,
      email: form.email,
      message: form.message,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setErrorMsg(data.message ?? "Something went wrong.");
        setStatus("error");
      }
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
      ) : (
        <form onSubmit={submit} className="space-y-5">
          {/* Honeypot — hidden from real users, traps bots */}
          <input
            type="text"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            style={{ display: "none" }}
          />

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
