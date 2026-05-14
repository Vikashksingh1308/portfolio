"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleMobileNav, setMobileNavOpen } from "@/store/slices/uiSlice";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/upcoming", label: "Upcoming" },
  { href: "/open-source", label: "Open Source" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const mobileOpen = useAppSelector((s) => s.ui.mobileNavOpen);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface-raised">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono text-sm font-semibold text-accent tracking-tight"
            onClick={() => dispatch(setMobileNavOpen(false))}
          >
            vks<span className="text-muted">.dev</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors",
                  pathname === link.href
                    ? "text-accent"
                    : "text-muted hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Mobile hamburger */}
            <button
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-border text-muted hover:text-foreground transition-colors"
              onClick={() => dispatch(toggleMobileNav())}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-surface">
          <nav className="flex flex-col py-2 px-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => dispatch(setMobileNavOpen(false))}
                className={cn(
                  "py-3 text-sm border-b border-border last:border-0 transition-colors",
                  pathname === link.href
                    ? "text-accent"
                    : "text-muted hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
