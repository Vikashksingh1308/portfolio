import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { Suspense } from "react";
import "./globals.css";
import StoreProvider from "@/components/StoreProvider";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { PROJECTS } from "@/lib/projects";
import type { Theme } from "@/types";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vikashksingh.dev"),
  title: {
    default: "Vikash Kumar Singh — Software Engineer",
    template: "%s | Vikash Kumar Singh",
  },
  description:
    "Software Engineer with 6+ years building scalable platforms, APIs, and full-stack applications. Based in Dublin, Ireland.",
  keywords: [
    "Software Engineer",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "Java",
    "Spring Boot",
    "Dublin",
  ],
  authors: [{ name: "Vikash Kumar Singh", url: "https://vikashksingh.dev" }],
  creator: "Vikash Kumar Singh",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://vikashksingh.dev",
    siteName: "Vikash Kumar Singh",
    title: "Vikash Kumar Singh — Software Engineer",
    description:
      "Software Engineer with 6+ years building scalable platforms, APIs, and full-stack applications.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vikash Kumar Singh — Software Engineer",
    description:
      "Software Engineer with 6+ years building scalable platforms, APIs, and full-stack applications.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value as Theme | undefined;
  const initialTheme: Theme = themeCookie ?? "dark";

  return (
    <html
      lang="en"
      data-theme={initialTheme === "system" ? "dark" : initialTheme}
      className={`${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        <StoreProvider
          initialProjects={PROJECTS}
          initialTheme={initialTheme}
        >
          <ThemeProvider>
            <Suspense fallback={<div className="h-14 border-b border-border bg-surface-raised" />}>
              <Navbar />
            </Suspense>
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieConsent />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
