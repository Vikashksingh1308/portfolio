import type { Metadata } from "next";
import UpcomingClient from "./UpcomingClient";

export const metadata: Metadata = {
  title: "Upcoming Projects",
  description:
    "Projects in the pipeline - distributed systems, Spring Boot APIs, Kafka event services, and developer tooling.",
};

export default function UpcomingPage() {
  return <UpcomingClient />;
}
