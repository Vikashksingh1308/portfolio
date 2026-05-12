import { NextResponse } from "next/server";
import { getGitHubRepos } from "@/lib/github";

export const revalidate = 3600;

export async function GET() {
  try {
    const repos = await getGitHubRepos();
    return NextResponse.json(repos);
  } catch {
    return NextResponse.json({ error: "Failed to fetch repos" }, { status: 500 });
  }
}
