export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  githubRepo: string;
  liveUrl?: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: "snake-game",
    title: "Snake Game",
    description:
      "Classic Snake game implemented in Java, demonstrating OOP design, game loops, and rendering.",
    tech: ["Java"],
    githubRepo: "SnakeGame",
    featured: false,
  },
  {
    slug: "react-full-stack-booking-app",
    title: "Full-Stack Booking App",
    description:
      "End-to-end booking application with React frontend, REST API backend, and persistent data layer.",
    tech: ["JavaScript", "React", "Node.js", "REST APIs"],
    githubRepo: "react-full-stack-booking-app",
    featured: true,
  },
  {
    slug: "leetcode-solutions",
    title: "LeetCode Solutions",
    description:
      "Curated collection of data structures and algorithm solutions, covering common interview patterns.",
    tech: ["Java", "Algorithms", "Data Structures"],
    githubRepo: "Leetcode-Solutions",
    featured: false,
  },
  {
    slug: "react-book-store",
    title: "React Book Store",
    description:
      "A responsive e-commerce bookstore UI built with React, featuring search, filtering, and cart functionality.",
    tech: ["JavaScript", "React", "CSS"],
    githubRepo: "react-book-store",
    featured: true,
  },
  {
    slug: "car-rental-system",
    title: "Car Rental System",
    description:
      "A full-featured car rental management system with booking, fleet management, and customer workflows.",
    tech: ["Java", "Spring Boot", "SQL"],
    githubRepo: "CarRentalSystem",
    featured: true,
  },
  {
    slug: "java-rest-api-httpclient-tutorial",
    title: "Java REST API & HttpClient Tutorial",
    description:
      "A practical guide and reference implementation for building REST APIs in Java using the HttpClient library.",
    tech: ["Java", "REST APIs"],
    githubRepo: "java-rest-api-httpclient-tutorial",
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllTechTags(): string[] {
  const tags = new Set<string>();
  PROJECTS.forEach((p) => p.tech.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
