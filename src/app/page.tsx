import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";
import type { SessionData } from "@/lib/session";
import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Highlights from "@/components/sections/Highlights";
import Competencies from "@/components/sections/Competencies";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import RecentlyViewed from "@/components/sections/RecentlyViewed";

export const metadata: Metadata = {
  title: "Vikash Kumar Singh - Software Engineer",
  description:
    "Software Engineer with 6+ years building scalable platforms, APIs, and full-stack applications. Based in Dublin, Ireland.",
};

export default async function HomePage() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  const viewedProjects = session.viewedProjects ?? [];

  return (
    <>
      <Hero />
      <Highlights />
      <About />
      <Competencies />
      <Experience />
      <Education />
      {viewedProjects.length > 0 && (
        <RecentlyViewed slugs={viewedProjects} />
      )}
    </>
  );
}
