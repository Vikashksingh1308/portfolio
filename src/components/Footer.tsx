import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} Vikash Kumar Singh
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/Vikashksingh1308"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted hover:text-accent transition-colors"
            >
              <Github size={16} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/ksinghvikash"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted hover:text-accent transition-colors"
            >
              <Linkedin size={16} />
            </Link>
            <Link
              href="mailto:vikashksingh1308@gmail.com"
              aria-label="Email"
              className="text-muted hover:text-accent transition-colors"
            >
              <Mail size={16} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
