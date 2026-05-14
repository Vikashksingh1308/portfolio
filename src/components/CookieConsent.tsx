"use client";

import { useState, useEffect } from "react";
import { setCookie, getCookie } from "cookies-next";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getCookie("cookieConsent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    setCookie("cookieConsent", "accepted", { maxAge: 60 * 60 * 24 * 365 });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 rounded-lg border border-border bg-surface p-4 shadow-lg"
    >
      <p className="text-sm text-muted mb-3">
        This site uses cookies to remember your theme preference and session.
      </p>
      <button
        onClick={accept}
        className="text-sm font-medium px-4 py-1.5 rounded bg-accent text-white hover:bg-accent-muted transition-colors"
      >
        Accept
      </button>
    </div>
  );
}
